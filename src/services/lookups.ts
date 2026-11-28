import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface PersonInfo {
  name: string;
  avatar: string;
}

export const FALLBACK_AVATAR = "/sidebar/profile.jpg";

/**
 * Resolves user ids to display data. A payer can be a Resident Admin
 * (`resident-admins/{uid}`) or a Resident (`residents/{uid}`), so both are tried.
 */
export async function getPeopleByUid(uids: string[]): Promise<Map<string, PersonInfo>> {
  const unique = [...new Set(uids.filter(Boolean))];
  const result = new Map<string, PersonInfo>();

  await Promise.all(
    unique.map(async (uid) => {
      for (const col of ["resident-admins", "residents"]) {
        try {
          const snap = await getDoc(doc(db, col, uid));
          if (snap.exists()) {
            const d = snap.data();
            result.set(uid, {
              name: (d.userName as string) || (d.emailAddress as string) || "Unknown",
              avatar: (d.profileImg as string) || FALLBACK_AVATAR,
            });
            return;
          }
        } catch {
          // permission / network problem on one collection: try the next one
        }
      }
    }),
  );
  return result;
}

/** Resolves society ids to society names. */
export async function getSocietyNames(ids: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(ids.filter(Boolean))];
  const result = new Map<string, string>();
  await Promise.all(
    unique.map(async (id) => {
      try {
        const snap = await getDoc(doc(db, "societies", id));
        if (snap.exists()) result.set(id, (snap.data().name as string) || id);
      } catch {
        // leave unresolved; caller falls back to the id
      }
    }),
  );
  return result;
}
