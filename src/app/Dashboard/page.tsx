"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, statsGrid, transactions as tx } from "./dashboard.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Residents", value: "1,240", iconBg: "#F5F4FC", icon: "/dashboard/residents.png" },
  { label: "Total Societies", value: "134",   iconBg: "#FEF6F9", icon: "/dashboard/societies.png" },
  { label: "Support Tickets", value: "18",    iconBg: "#F2FBF4", icon: "/dashboard/ticket.png"    },
  { label: "Total Payments",  value: "$2.1M", iconBg: "#FEF9F5", icon: "/dashboard/payment.png"   },
];

const transactionList = [
  { id: "PMT-10234", name: "Alex Johnson",   avatar: "https://i.pravatar.cc/150?img=11", society: "Ikoyi Phase 1",     type: "Maintenance Fee", date: "08 Jan 2026 · 12:10 PM", amount: "$120.00" },
  { id: "PMT-10233", name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?img=47", society: "Lekki Gardens",     type: "Late Fee",        date: "04 Jan 2026 · 04:01 PM", amount: "$80.00"  },
  { id: "PMT-10232", name: "Michael Brown",  avatar: "https://i.pravatar.cc/150?img=53", society: "Mainland Heights",  type: "Other Charges",   date: "04 Jan 2026 · 01:01 AM", amount: "$150.00" },
  { id: "PMT-10231", name: "Emily Davis",    avatar: "https://i.pravatar.cc/150?img=38", society: "Eko Island",        type: "Maintenance Fee", date: "04 Jan 2026 · 12:01 AM", amount: "$200.00" },
  { id: "PMT-10234", name: "Fatima Bello",   avatar: "https://i.pravatar.cc/150?img=25", society: "Post Service 1",    type: "Maintenance Fee", date: "08 Jan 2026 · 12:10 PM", amount: "$120.00" },
  { id: "PMT-10233", name: "Chinedu Obi",    avatar: "https://i.pravatar.cc/150?img=14", society: "Palmview Estate",   type: "Late Fee",        date: "04 Jan 2026 · 04:01 PM", amount: "$80.00"  },
  { id: "PMT-10232", name: "Amaka Nwosu",    avatar: "https://i.pravatar.cc/150?img=32", society: "Coral Springs",     type: "Other Charges",   date: "04 Jan 2026 · 01:01 AM", amount: "$150.00" },
  { id: "PMT-10231", name: "Nkechi Eze",     avatar: "https://i.pravatar.cc/150?img=44", society: "Emerald Park",      type: "Maintenance Fee", date: "04 Jan 2026 · 12:01 AM", amount: "$200.00" },
];

const TABLE_HEADERS = ["Payment ID", "Resident Admin", "Society", "Payment Type", "Date & Time", "Amount"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch]       = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = transactionList.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())   ||
    t.id.toLowerCase().includes(search.toLowerCase())     ||
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
            {stats.map((stat, i) => (
              <div key={i} className={statsGrid.card}>
                <div className={statsGrid.iconWrap} style={{ background: stat.iconBg }}>
                  <img src={stat.icon} alt={stat.label} className={statsGrid.icon} />
                </div>
                <div>
                  <p className={statsGrid.label}>{stat.label}</p>
                  <p className={statsGrid.value}>{stat.value}</p>
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
                    <tr key={i} className={tx.tr}>
                      <td className={tx.tdId}>{t.id}</td>
                      <td className={tx.tdAdmin}>
                        <div className={tx.tdAdminRow}>
                          <img src={t.avatar} alt={t.name} className={tx.adminAvatar} />
                          <span className={tx.adminName}>{t.name}</span>
                        </div>
                      </td>
                      <td className={tx.td}>{t.society}</td>
                      <td className={tx.td}>{t.type}</td>
                      <td className={tx.td}>{t.date}</td>
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