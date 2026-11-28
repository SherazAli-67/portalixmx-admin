import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchRecentPayments, fetchTotalPaymentAmount } from "./payments";
import type { Payment } from "@/types/payment";

export interface DashboardStats {
  residents: number;
  societies: number;
  openTickets: number;
  totalPayments: number;
}

export interface DashboardData {
  stats: DashboardStats;
  transactions: Payment[];
}

async function count(q: Parameters<typeof getCountFromServer>[0]): Promise<number> {
  return (await getCountFromServer(q)).data().count;
}

/** Runs `fn`, returning `fallback` if it fails so one bad query doesn't blank the page. */
async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[dashboard] ${label} failed`, err);
    return fallback;
  }
}

export async function fetchDashboard(recentCount = 10): Promise<DashboardData> {
  const [residents, societies, openTickets, totalPayments, transactions] = await Promise.all([
    safe("residents", () => count(collection(db, "residents")), 0),
    safe("societies", () => count(collection(db, "societies")), 0),
    safe(
      "tickets",
      () => count(query(collection(db, "support_tickets"), where("status", "==", "Open"))),
      0,
    ),
    safe("total payments", fetchTotalPaymentAmount, 0),
    safe("recent payments", () => fetchRecentPayments(recentCount), [] as Payment[]),
  ]);

  return { stats: { residents, societies, openTickets, totalPayments }, transactions };
}
