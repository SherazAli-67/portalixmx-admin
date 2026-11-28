import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { FALLBACK_AVATAR } from "./lookups";
import type {
  AdminOption,
  Resident,
  Society,
  SocietyDoc,
  SocietyFormInput,
  SocietyStatus,
} from "@/types/society";

const COVER_DIR = "society_coverImage";
export const NO_ADMIN_LABEL = "Unassigned";

// ─── Mapping helpers ──────────────────────────────────────────────────────────

export function toStatus(raw?: string): SocietyStatus {
  return raw?.toLowerCase() === "suspended" ? "Suspended" : "Active";
}

function fromStatus(status: SocietyStatus): string {
  return status === "Suspended" ? "suspended" : "active";
}

/** "Feb 01, 2026" */
function formatCreated(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export function toSociety(
  d: SocietyDoc,
  admins: Map<string, AdminOption>,
  counts: Map<string, number>,
): Society {
  const admin = d.residentAdmin ? admins.get(d.residentAdmin) : undefined;
  return {
    id: d.id,
    name: d.name ?? "",
    location: d.location ?? "",
    image: d.imageUrl ?? "",
    status: toStatus(d.status),
    adminUid: d.residentAdmin ?? "",
    admin: admin?.name ?? NO_ADMIN_LABEL,
    adminEmail: admin?.email ?? "",
    adminAvatar: admin?.avatar ?? FALLBACK_AVATAR,
    residents: counts.get(d.id) ?? 0,
    created: formatCreated(d.createdAt),
  };
}

// ─── Reads ────────────────────────────────────────────────────────────────────

/** Live list of societies (sorted by name). */
export function subscribeSocieties(
  onData: (docs: SocietyDoc[]) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, "societies"),
    (snap) => {
      const docs = snap.docs.map((d) => ({ ...(d.data() as SocietyDoc), id: d.id }));
      docs.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
      onData(docs);
    },
    (err) => onError?.(err),
  );
}

export async function fetchSociety(id: string): Promise<SocietyDoc | null> {
  const snap = await getDoc(doc(db, "societies", id));
  return snap.exists() ? { ...(snap.data() as SocietyDoc), id: snap.id } : null;
}

/** Resident count per society id (server-side count queries). */
export async function fetchResidentCounts(ids: string[]): Promise<Map<string, number>> {
  const result = new Map<string, number>();
  await Promise.all(
    ids.map(async (id) => {
      try {
        const snap = await getCountFromServer(
          query(collection(db, "residents"), where("societyID", "==", id)),
        );
        result.set(id, snap.data().count);
      } catch {
        result.set(id, 0);
      }
    }),
  );
  return result;
}

export function toAdminOption(uid: string, d: Record<string, unknown>): AdminOption {
  return {
    uid,
    name: (d.userName as string) || (d.emailAddress as string) || "Unknown",
    email: (d.emailAddress as string) || "",
    avatar: (d.profileImg as string) || FALLBACK_AVATAR,
    societyID: (d.societyID as string) || "",
    status: typeof d.status === "number" ? d.status : 0,
  };
}

export async function fetchAdmins(): Promise<AdminOption[]> {
  const snap = await getDocs(collection(db, "resident-admins"));
  return snap.docs.map((d) => toAdminOption(d.id, d.data()));
}

export async function fetchAdmin(uid: string): Promise<AdminOption | null> {
  const snap = await getDoc(doc(db, "resident-admins", uid));
  return snap.exists() ? toAdminOption(snap.id, snap.data()) : null;
}

export async function fetchSocietyResidents(societyId: string): Promise<Resident[]> {
  const snap = await getDocs(
    query(collection(db, "residents"), where("societyID", "==", societyId)),
  );
  return snap.docs
    .map((d) => {
      const r = d.data();
      return {
        uid: d.id,
        name: (r.userName as string) || "Unknown",
        email: (r.emailAddress as string) || "—",
        unit: (r.houseNumber as string) || "—",
        phone: (r.phoneNum as string) || "—",
        status: r.status === 1 ? "Active" : "Inactive",
        avatar: (r.profileImg as string) || FALLBACK_AVATAR,
      } as Resident;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ─── Storage ──────────────────────────────────────────────────────────────────

async function uploadBanner(societyId: string, file: File): Promise<string> {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileRef = ref(storage, `${COVER_DIR}/${societyId}/${Date.now()}-${safe}`);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return getDownloadURL(fileRef);
}

/** Best-effort removal of a previously uploaded banner (ignores missing files). */
async function removeBannerByUrl(url?: string): Promise<void> {
  if (!url) return;
  try {
    await deleteObject(ref(storage, url));
  } catch {
    // already gone, or not a Storage URL
  }
}

async function removeAllBanners(societyId: string): Promise<void> {
  try {
    const listing = await listAll(ref(storage, `${COVER_DIR}/${societyId}`));
    await Promise.all(listing.items.map((i) => deleteObject(i)));
  } catch {
    // nothing to delete
  }
}

// ─── Writes ───────────────────────────────────────────────────────────────────

export async function createSociety(input: SocietyFormInput): Promise<string> {
  const societyRef = doc(collection(db, "societies"));
  const id = societyRef.id;
  const imageUrl = input.banner ? await uploadBanner(id, input.banner) : "";

  const batch = writeBatch(db);
  const data: SocietyDoc = {
    id,
    name: input.name.trim(),
    location: input.location.trim(),
    imageUrl,
    residentAdmin: input.adminUid,
    status: fromStatus(input.status),
    createdAt: new Date().toISOString(),
  };
  batch.set(societyRef, data);
  if (input.adminUid) {
    batch.update(doc(db, "resident-admins", input.adminUid), { societyID: id, status: 1 });
  }
  await batch.commit();
  return id;
}

export async function updateSociety(
  current: Society,
  input: SocietyFormInput,
): Promise<void> {
  const imageUrl = input.banner ? await uploadBanner(current.id, input.banner) : current.image;

  const batch = writeBatch(db);
  batch.update(doc(db, "societies", current.id), {
    name: input.name.trim(),
    location: input.location.trim(),
    imageUrl,
    residentAdmin: input.adminUid,
    status: fromStatus(input.status),
  });
  if (input.adminUid && input.adminUid !== current.adminUid) {
    batch.update(doc(db, "resident-admins", input.adminUid), {
      societyID: current.id,
      status: 1,
    });
  }
  await batch.commit();

  if (input.banner) await removeBannerByUrl(current.image);
}

export async function setSocietyStatus(id: string, status: SocietyStatus): Promise<void> {
  const batch = writeBatch(db);
  batch.update(doc(db, "societies", id), { status: fromStatus(status) });
  await batch.commit();
}

/**
 * Deletes a society and its banner images.
 * Refuses when residents or a Resident Admin are still attached, so no data is orphaned.
 */
export async function deleteSociety(society: Society): Promise<void> {
  if (society.residents > 0 || society.adminUid) {
    throw new Error(
      "This society still has residents or an assigned Resident Admin. Remove or reassign them before deleting it.",
    );
  }
  await deleteDoc(doc(db, "societies", society.id));
  await removeAllBanners(society.id);
}
