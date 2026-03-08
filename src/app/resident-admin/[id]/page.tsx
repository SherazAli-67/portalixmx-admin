"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, breadcrumb, layout, leftPanel, rightPanel, payTable } from "./residentAdminDetail.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

// ─── Types ────────────────────────────────────────────────────────────────────
interface Admin {
  id: string; name: string; email: string; status: "Active" | "Suspended";
  joined: string; society: string; emergency: string;
  vehicle: string; vehicleColor: string; licensePlate: string; regNumber: string;
  avatar: string;
}

interface Payment {
  month: string; amount: string; status: "Paid" | "Unpaid"; reference: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const admins: Admin[] = [
  { id: "1", name: "Alex Johnson",   email: "alexjohn@mail.com", status: "Active",    joined: "Jan 05, 2026", society: "Ikoyi Phase 1",    emergency: "+234 123478907", vehicle: "Lexus GX460",    vehicleColor: "Black", licensePlate: "BDG-FFF09", regNumber: "1234700000002", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "2", name: "Sarah Williams", email: "sarah@mail.com",    status: "Suspended", joined: "Dec 12, 2025", society: "Lekki Gardens",    emergency: "+234 987654321", vehicle: "Toyota Camry",   vehicleColor: "White", licensePlate: "LGS-ABC12", regNumber: "9876500000001", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "3", name: "Chinedu Obi",    email: "chinedu@mail.com",  status: "Active",    joined: "Dec 03, 2025", society: "Mainland Heights", emergency: "+234 111222333", vehicle: "Honda Accord",   vehicleColor: "Silver",licensePlate: "ABJ-XYZ99", regNumber: "1112223330000", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: "4", name: "Nkechi Eze",     email: "Eze@mail.com",      status: "Active",    joined: "Dec 03, 2025", society: "Eko Island",       emergency: "+234 444555666", vehicle: "Kia Sorento",    vehicleColor: "Blue",  licensePlate: "EKO-KIA01", regNumber: "4445556660000", avatar: "https://i.pravatar.cc/150?img=44" },
  { id: "5", name: "Halima Musa",    email: "musa@mail.com",     status: "Active",    joined: "Dec 02, 2025", society: "Palmview Estate",  emergency: "+234 777888999", vehicle: "Ford Explorer",  vehicleColor: "Red",   licensePlate: "KAN-FOR55", regNumber: "7778889990000", avatar: "https://i.pravatar.cc/150?img=25" },
  { id: "6", name: "Kelechi Onu",    email: "Kelechi@mail.com",  status: "Suspended", joined: "Dec 02, 2025", society: "Coral Springs",    emergency: "+234 000111222", vehicle: "Hyundai Tucson", vehicleColor: "Gray",  licensePlate: "ENU-HYN88", regNumber: "0001112220000", avatar: "https://i.pravatar.cc/150?img=32" },
];

const payments: Payment[] = [
  { month: "Jan 2026", amount: "$300.00", status: "Paid",   reference: "INV-1021" },
  { month: "Jan 2026", amount: "$300.00", status: "Paid",   reference: "INV-1021" },
  { month: "Jan 2026", amount: "$300.00", status: "Paid",   reference: "INV-1021" },
  { month: "Jan 2026", amount: "$300.00", status: "Paid",   reference: "INV-1021" },
  { month: "Jan 2026", amount: "$300.00", status: "Paid",   reference: "INV-1021" },
  { month: "Jan 2026", amount: "$300.00", status: "Unpaid", reference: "INV-1021" },
  { month: "Jan 2026", amount: "$300.00", status: "Paid",   reference: "INV-1021" },
  { month: "Jan 2026", amount: "$300.00", status: "Paid",   reference: "INV-1021" },
];

const MONTHS = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TABLE_HEADERS = ["Month", "Amount ($)", "Status", "Reference"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResidentAdminDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeNav, setActiveNav]     = useState("Resident Admin");
  const [headerSearch, setHeaderSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterMonth, setFilterMonth] = useState("All");

  const admin = admins.find((a) => a.id === params.id);

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-gray-400">
        Admin not found.
      </div>
    );
  }

  const filteredPayments = filterMonth === "All"
    ? payments
    : payments.filter((p) => p.month.toLowerCase().includes(filterMonth.toLowerCase().slice(0, 3)));

  return (
    <div className={`${montserrat.className} ${page.wrapper}`}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={page.content}>
        <Header search={headerSearch} setSearch={setHeaderSearch} onMenuOpen={() => setSidebarOpen(true)} />

        {/* Breadcrumb */}
        <div className={breadcrumb.wrapper}>
          <button onClick={() => router.push("/resident-admin")} className={breadcrumb.backBtn}>
            Resident Admin
          </button>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className={breadcrumb.current}>{admin.name}</span>
        </div>

        {/* Main */}
        <main className={layout.main}>

          {/* ── Left Panel ── */}
          <div className={leftPanel.card}>
            <img src={admin.avatar} alt={admin.name} className={leftPanel.avatar} />

            <div className={leftPanel.name}>{admin.name}</div>

            <span className={admin.status === "Active" ? leftPanel.statusActive : leftPanel.statusSusp}>
              {admin.status}
            </span>

            <div className={leftPanel.email}>{admin.email}</div>

            <div className={leftPanel.metaLabel}>Joined:</div>
            <div className={leftPanel.metaValue}>{admin.joined}</div>

            <div className={leftPanel.metaLabel}>Society:</div>
            <div className={leftPanel.metaValue}>{admin.society}</div>

            <div className={leftPanel.metaLabel}>Emergency Contact:</div>
            <div className={leftPanel.metaValue}>{admin.emergency}</div>

            <div className={leftPanel.metaLabel}>Vehicle Name</div>
            <div className={leftPanel.metaValue}>{admin.vehicle}</div>

            <div className={leftPanel.metaLabel}>Vehicle Color:</div>
            <div className={leftPanel.metaValue}>{admin.vehicleColor}</div>

            <div className={leftPanel.metaLabel}>License plate number:</div>
            <div className={leftPanel.metaValue}>{admin.licensePlate}</div>

            <div className={leftPanel.metaLabel}>Registration number:</div>
            <div className={leftPanel.metaValue}>{admin.regNumber}</div>
          </div>

          {/* ── Right Panel ── */}
          <div className={rightPanel.card}>
            <div className={rightPanel.topBar}>
              <span className={rightPanel.panelTitle}>Payment History</span>

              {/* Filter */}
              <div className={rightPanel.filterWrap}>
              <svg className={rightPanel.filterIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <line x1="4" y1="6" x2="20" y2="6" />
  <line x1="4" y1="12" x2="20" y2="12" />
  <line x1="4" y1="18" x2="20" y2="18" />
  <circle cx="8" cy="6" r="2" fill="white" />
  <circle cx="16" cy="12" r="2" fill="white" />
  <circle cx="10" cy="18" r="2" fill="white" />
</svg>
                <span className={rightPanel.filterLabel}>Filter:</span>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className={rightPanel.filterSelect}
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className={payTable.scroll}>
              <table className={payTable.table}>
                <thead>
                  <tr>
                    {TABLE_HEADERS.map((h, i, arr) => (
                      <th key={i} className={`${payTable.th} ${i === 0 ? payTable.thFirst : ""} ${i === arr.length - 1 ? payTable.thLast : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p, i) => (
                    <tr key={i} className={payTable.tr}>
                      <td className={payTable.td}>{p.month}</td>
                      <td className={payTable.td}>{p.amount}</td>
                      <td className={payTable.td}>
                        <span className={p.status === "Paid" ? payTable.statusPaid : payTable.statusUnpaid}>
                          {p.status}
                        </span>
                      </td>
                      <td className={payTable.td}>{p.reference}</td>
                    </tr>
                  ))}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={4} className={payTable.emptyCell}>No payments found.</td>
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