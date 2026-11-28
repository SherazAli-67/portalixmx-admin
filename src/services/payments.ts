import {
  collection,
  getAggregateFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  sum,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { Payment, PaymentDoc } from "@/types/payment";
import { FALLBACK_AVATAR, getPeopleByUid, getSocietyNames } from "./lookups";

/**
 * Collection holding the payments shown in the admin panel.
 * Change this one constant if payments are stored elsewhere.
 */
export const PAYMENTS_COLLECTION = "payments_to_admin";

/** Joins raw payment documents with payer and society display data. */
export async function enrichPayments(
  docs: { id: string; data: PaymentDoc }[],
): Promise<Payment[]> {
  const [people, societies] = await Promise.all([
    getPeopleByUid(docs.map((d) => d.data.paymentByUID)),
    getSocietyNames(docs.map((d) => d.data.societyID)),
  ]);

  return docs.map(({ id, data }) => {
    const person = people.get(data.paymentByUID);
    return {
      id: data.paymentID || id,
      adminName: person?.name ?? "Unknown",
      adminAvatar: person?.avatar ?? FALLBACK_AVATAR,
      society: societies.get(data.societyID) ?? data.societyID ?? "—",
      paymentType: data.paymentForTitle || data.description || "Payment",
      dateTime: formatDateTime(data.dateTime),
      amount: formatCurrency(Number(data.amount) || 0),
      rawAmount: Number(data.amount) || 0,
      rawDate: data.dateTime,
    };
  });
}

/** Most recent payments, newest first. */
export async function fetchRecentPayments(count: number): Promise<Payment[]> {
  const snap = await getDocs(
    query(collection(db, PAYMENTS_COLLECTION), orderBy("dateTime", "desc"), limit(count)),
  );
  return enrichPayments(snap.docs.map((d) => ({ id: d.id, data: d.data() as PaymentDoc })));
}

/** Sum of all payment amounts (server-side aggregation, no documents downloaded). */
export async function fetchTotalPaymentAmount(): Promise<number> {
  const snap = await getAggregateFromServer(collection(db, PAYMENTS_COLLECTION), {
    total: sum("amount"),
  });
  return snap.data().total ?? 0;
}
