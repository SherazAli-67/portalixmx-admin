/** A society as stored in Firestore (`societies/{id}`). */
export interface SocietyDoc {
  id: string;
  name: string;
  location?: string;
  imageUrl?: string;
  residentAdmin?: string; // uid of a resident-admins doc, "" when unassigned
  status?: string;        // "active" | "suspended"
  createdAt?: string;     // ISO string (set by the admin panel on create)
}

export type SocietyStatus = "Active" | "Suspended";

/** A society prepared for display. */
export interface Society {
  id: string;
  name: string;
  location: string;
  image: string;
  status: SocietyStatus;
  adminUid: string;
  admin: string;        // display name, "Unassigned" when none
  adminEmail: string;
  adminAvatar: string;
  residents: number;
  created: string;
}

/** A Resident Admin that can be assigned to a society. */
export interface AdminOption {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  societyID: string;
  status: number;
}

/** A resident as stored in Firestore (`residents/{uid}`). */
export interface Resident {
  uid: string;
  name: string;
  email: string;
  unit: string;
  phone: string;
  status: "Active" | "Inactive";
  avatar: string;
}

export interface SocietyFormInput {
  name: string;
  location: string;
  adminUid: string;
  status: SocietyStatus;
  banner: File | null;
}
