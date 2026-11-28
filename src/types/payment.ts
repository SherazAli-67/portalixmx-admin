/** A payment as stored in Firestore (`payments_to_admin`). */
export interface PaymentDoc {
  paymentID?: string;
  amount: number;
  dateTime: string; // ISO string written by the mobile app
  description?: string;
  paymentByUID: string;
  paymentForTitle?: string;
  paymentStatus?: number;
  paymentType?: number;
  receipt?: string;
  societyID: string;
}

/** A payment joined with the payer's and the society's display data. */
export interface Payment {
  id: string;
  adminName: string;
  adminAvatar: string;
  society: string;
  paymentType: string;
  dateTime: string; // formatted for display
  amount: string;   // formatted for display
  rawAmount: number;
  rawDate: string;
}
