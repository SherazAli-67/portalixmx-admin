"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, statsGrid, transactions as tx } from "./dashboard.styles";
import { fetchDashboard, type DashboardData } from "@/services/dashboard";
import { formatCurrencyCompact, formatNumber } from "@/lib/format";
import type { Payment } from "@/types/payment";

const montserrat = Montserrat({ subsets: ["latin"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

const statCards = [
  { key: "residents",     label: "Total Residents", iconBg: "#F5F4FC", icon: "/dashboard/residents.png" },
  { key: "societies",     label: "Total Societies", iconBg: "#FEF6F9", icon: "/dashboard/societies.png" },
  { key: "openTickets",   label: "Support Tickets", iconBg: "#F2FBF4", icon: "/dashboard/ticket.png"    },
  { key: "totalPayments", label: "Total Payments",  iconBg: "#FEF9F5", icon: "/dashboard/payment.png"   },
] as const;

const TABLE_HEADERS = ["Payment ID", "Resident Admin", "Society", "Payment Type", "Date & Time", "Amount"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch]       = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDashboard().then((d) => { if (!cancelled) setData(d); });
    return () => { cancelled = true; };
  }, []);

  const transactionList: Payment[] = data?.transactions ?? [];

  const statValue = (key: (typeof statCards)[number]["key"]): string => {
    if (!data) return "—";
    const v = data.stats[key];
    return key === "totalPayments" ? formatCurrencyCompact(v) : formatNumber(v);
  };

  const filtered = transactionList.filter((t) =>
    t.adminName.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())        ||
    t.society.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${montserrat.className} ${page.wrapper}`}>

      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={page.content}>
        <Header
          search={search}
          setSearch={setSearch}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <main className={page.main}>

          {/* Page Title */}
          <h1 className={page.title}>Admin Dashboard Overview</h1>

          {/* Stats Cards */}
          <div className={statsGrid.grid}>
            {statCards.map((stat) => (
              <div key={stat.key} className={statsGrid.card}>
                <div className={statsGrid.iconWrap} style={{ background: stat.iconBg }}>
                  <img src={stat.icon} alt={stat.label} className={statsGrid.icon} />
                </div>
                <div>
                  <p className={statsGrid.label}>{stat.label}</p>
                  <p className={statsGrid.value}>{statValue(stat.key)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Transactions */}
          <h2 className={tx.sectionTitle}>Recent Transaction</h2>
          <div className={tx.card}>
            <div className={tx.scroll}>
              <table className={tx.table}>
                <thead>
                  <tr className={tx.theadRow}>
                    {TABLE_HEADERS.map((h, i, arr) => (
                      <th key={h} className={`${tx.th} ${i === 0 ? tx.thFirst : ""} ${i === arr.length - 1 ? tx.thLast : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t, i) => (
                    <tr key={`${t.id}-${i}`} className={tx.tr}>
                      <td className={tx.tdId}>{t.id}</td>
                      <td className={tx.tdAdmin}>
                        <div className={tx.tdAdminRow}>
                          <img src={t.adminAvatar} alt={t.adminName} className={tx.adminAvatar} />
                          <span className={tx.adminName}>{t.adminName}</span>
                        </div>
                      </td>
                      <td className={tx.td}>{t.society}</td>
                      <td className={tx.td}>{t.paymentType}</td>
                      <td className={tx.td}>{t.dateTime}</td>
                      <td className={tx.td}>{t.amount}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className={tx.emptyCell}>No transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}