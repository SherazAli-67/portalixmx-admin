"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, header as h, search as s, filter as f, table as t, modal as m } from "./Paymentsfinance.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

// ─── Types ────────────────────────────────────────────────────────────────────
interface Payment {
  id: string;
  adminName: string;
  adminAvatar: string;
  society: string;
  paymentType: "Maintenance Fee" | "Late Fee" | "Other Charges";
  dateTime: string;
  amount: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const paymentList: Payment[] = [
  { id: "PMT-10234", adminName: "Alex Johnson",   adminAvatar: "https://i.pravatar.cc/150?img=11", society: "Ikoyi Phase 1",    paymentType: "Maintenance Fee", dateTime: "08 Jan 2026 · 12:10 PM", amount: "$120.00" },
  { id: "PMT-10233", adminName: "Sarah Williams", adminAvatar: "https://i.pravatar.cc/150?img=47", society: "Lekki Gardens",    paymentType: "Late Fee",        dateTime: "04 Jan 2026 · 04:01 PM", amount: "$80.00"  },
  { id: "PMT-10232", adminName: "Michael Brown",  adminAvatar: "https://i.pravatar.cc/150?img=15", society: "Mainland Heights", paymentType: "Other Charges",   dateTime: "04 Jan 2026 · 01:01 AM", amount: "$150.00" },
  { id: "PMT-10231", adminName: "Emily Davis",    adminAvatar: "https://i.pravatar.cc/150?img=20", society: "Eko Island",       paymentType: "Maintenance Fee", dateTime: "04 Jan 2026 · 12:01 AM", amount: "$200.00" },
  { id: "PMT-10234", adminName: "Fatima Bello",   adminAvatar: "https://i.pravatar.cc/150?img=25", society: "Post Service 1",   paymentType: "Maintenance Fee", dateTime: "08 Jan 2026 · 12:10 PM", amount: "$120.00" },
  { id: "PMT-10233", adminName: "Chinedu Obi",    adminAvatar: "https://i.pravatar.cc/150?img=14", society: "Palmview Estate",  paymentType: "Late Fee",        dateTime: "04 Jan 2026 · 04:01 PM", amount: "$80.00"  },
  { id: "PMT-10232", adminName: "Amaka Nwosu",    adminAvatar: "https://i.pravatar.cc/150?img=44", society: "Coral Springs",    paymentType: "Other Charges",   dateTime: "04 Jan 2026 · 01:01 AM", amount: "$150.00" },
  { id: "PMT-10231", adminName: "Nkechi Eze",     adminAvatar: "https://i.pravatar.cc/150?img=32", society: "Emerald Park",     paymentType: "Maintenance Fee", dateTime: "04 Jan 2026 · 12:01 AM", amount: "$200.00" },
];

const MONTHS = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TABLE_HEADERS = ["Payment ID", "Resident Admin", "Society", "Payment Type", "Date & Time", "Amount"];

// ─── Chevron Icon ─────────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <svg className={m.selectIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Payment Detail Modal ─────────────────────────────────────────────────────
interface PaymentModalProps {
  payment: Payment;
  onClose: () => void;
}

function PaymentDetailModal({ payment, onClose }: PaymentModalProps) {
  return (
    <div
      className={m.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`${montserrat.className} ${m.card}`}>
        <div className={m.headerRow}>
          <div style={{ width: 20 }} />
          <span className={m.title}>Payment Details</span>
          <button onClick={onClose} className={m.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className={m.fieldLabel}>Payment ID:</p>
        <div className={m.fieldBox}>{payment.id}</div>

        <p className={m.fieldLabel}>Amount:</p>
        <div className={m.fieldBox}>{payment.amount}</div>

        <p className={m.fieldLabel}>Date & Time</p>
        <div className={m.fieldBox}>{payment.dateTime}</div>

        <p className={m.fieldLabel}>Payment Type</p>
        <div className={m.fieldBox}>{payment.paymentType}</div>

        <p className={m.fieldLabel}>Resident Admin</p>
        <div className={m.adminWrap}>
          <img src={payment.adminAvatar} alt={payment.adminName} className={m.adminAvatar} />
          <span className={m.adminName}>{payment.adminName}</span>
        </div>

        <p className={m.fieldLabel}>Society</p>
        <div className={m.fieldBox}>{payment.society}</div>

        <button onClick={onClose} className={m.closeActionBtn}>Close</button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PaymentsFinancePage() {
  const [activeNav, setActiveNav]             = useState("Payments & Finance");
  const [search, setSearch]                   = useState("");
  const [headerSearch, setHeaderSearch]       = useState("");
  const [sidebarOpen, setSidebarOpen]         = useState(false);
  const [filterMonth, setFilterMonth]         = useState("All");
  const [filterOpen, setFilterOpen]           = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat]       = useState("PDF");
  const [exportDateRange, setExportDateRange] = useState("This Month");
  const [exportSociety, setExportSociety]     = useState("All");
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = paymentList.filter((p) => {
    const matchSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.adminName.toLowerCase().includes(search.toLowerCase()) ||
      p.society.toLowerCase().includes(search.toLowerCase());
    const matchMonth =
      filterMonth === "All" ||
      p.dateTime.toLowerCase().includes(filterMonth.toLowerCase().slice(0, 3));
    return matchSearch && matchMonth;
  });

  // ─── Export Handler ──────────────────────────────────────────────────────────
  function handleExport() {
    const exportData = exportSociety === "All"
      ? paymentList
      : paymentList.filter((p) => p.society === exportSociety);

    if (exportFormat === "CSV") {
      const headers = ["Payment ID", "Resident Admin", "Society", "Payment Type", "Date & Time", "Amount"];
      const rows = exportData.map((p) => [p.id, p.adminName, p.society, p.paymentType, p.dateTime, p.amount]);
      const csvContent = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payments_statement.csv";
      a.click();
      URL.revokeObjectURL(url);

    } else if (exportFormat === "Excel") {
      const headers = ["Payment ID", "Resident Admin", "Society", "Payment Type", "Date & Time", "Amount"];
      const rows = exportData.map((p) => [p.id, p.adminName, p.society, p.paymentType, p.dateTime, p.amount]);
      const xlsContent = [headers, ...rows].map((r) => r.join("\t")).join("\n");
      const blob = new Blob([xlsContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payments_statement.xls";
      a.click();
      URL.revokeObjectURL(url);

    } else {
      // PDF — plain text formatted
      const line = "─".repeat(90);
      const rows = exportData.map((p) =>
        `${p.id.padEnd(14)} ${p.adminName.padEnd(18)} ${p.society.padEnd(18)} ${p.paymentType.padEnd(18)} ${p.dateTime.padEnd(24)} ${p.amount}`
      ).join("\n");
      const content = [
        "PAYMENTS & FINANCE STATEMENT",
        "",
        `Date Range  : ${exportDateRange}`,
        `Society     : ${exportSociety}`,
        `Generated   : ${new Date().toLocaleString()}`,
        `Total       : ${exportData.length} transaction(s)`,
        "",
        line,
        `${"Payment ID".padEnd(14)} ${"Resident Admin".padEnd(18)} ${"Society".padEnd(18)} ${"Payment Type".padEnd(18)} ${"Date & Time".padEnd(24)} Amount`,
        line,
        rows,
        line,
      ].join("\n");

      const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payments_statement.txt";
      a.click();
      URL.revokeObjectURL(url);
    }

    setExportModalOpen(false);
  }

  return (
    <div className={`${montserrat.className} ${page.wrapper}`}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={page.content}>
        <Header search={headerSearch} setSearch={setHeaderSearch} onMenuOpen={() => setSidebarOpen(true)} />

        <main className={page.main}>

          {/* Header row */}
          <div className={h.row}>
            <h1 className={h.title}>Payments &amp; Finance</h1>
            <button className={h.exportBtn} onClick={() => setExportModalOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Statement
            </button>
          </div>

          {/* Search + Filter row */}
          <div className={s.row}>
            <div className={s.wrapper}>
              <svg className={s.icon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={s.input}
              />
            </div>

            <div ref={filterRef} className={f.wrapper}>
              <button onClick={() => setFilterOpen(!filterOpen)} className={f.btn}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                  <circle cx="8" cy="6" r="2" fill="white" />
                  <circle cx="16" cy="12" r="2" fill="white" />
                  <circle cx="10" cy="18" r="2" fill="white" />
                </svg>
                <span>Filter:</span>
                <span className={f.btnMonth}>{filterMonth}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {filterOpen && (
                <div className={f.dropdown}>
                  {MONTHS.map((mm) => (
                    <button
                      key={mm}
                      onClick={() => { setFilterMonth(mm); setFilterOpen(false); }}
                      className={filterMonth === mm ? f.itemActive : f.item}
                    >
                      {mm}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className={t.card}>
            <div className={t.scroll}>
              <table className={t.table}>
                <thead>
                  <tr className={t.theadRow}>
                    {TABLE_HEADERS.map((col, i, arr) => (
                      <th key={i} className={`${t.th} ${i === 0 ? t.thFirst : ""} ${i === arr.length - 1 ? t.thLast : ""}`}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={i}
                      className={`${t.tr} cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-100`}
                      onClick={() => setSelectedPayment(p)}
                    >
                      <td className={t.td}>{p.id}</td>
                      <td className={t.tdAdmin}>
                        <div className={t.tdAdminWrap}>
                          <img src={p.adminAvatar} alt={p.adminName} className={t.adminAvatar} />
                          <span className={t.adminName}>{p.adminName}</span>
                        </div>
                      </td>
                      <td className={t.td}>{p.society}</td>
                      <td className={t.td}>{p.paymentType}</td>
                      <td className={t.td}>{p.dateTime}</td>
                      <td className={t.tdAmount}>{p.amount}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className={t.emptyCell}>No payments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <div
          className={m.overlay}
          onClick={(e) => { if (e.target === e.currentTarget) setExportModalOpen(false); }}
        >
          <div className={`${montserrat.className} ${m.card}`}>
            <div className={m.headerRow}>
              <div style={{ width: 20 }} />
              <span className={m.title}>Export Statement</span>
              <button onClick={() => setExportModalOpen(false)} className={m.closeBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className={m.fieldLabel}>Date Range:</p>
            <div className={m.selectWrapper}>
              <select className={m.selectBox} value={exportDateRange} onChange={(e) => setExportDateRange(e.target.value)}>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
              <ChevronDown />
            </div>

            <p className={m.fieldLabel}>Filter by society (optional)</p>
            <div className={m.selectWrapper}>
              <select className={m.selectBox} value={exportSociety} onChange={(e) => setExportSociety(e.target.value)}>
                <option>All</option>
                <option>Ikoyi Phase 1</option>
                <option>Lekki Gardens</option>
                <option>Mainland Heights</option>
                <option>Eko Island</option>
                <option>Palmview Estate</option>
                <option>Post Service 1</option>
                <option>Coral Springs</option>
                <option>Emerald Park</option>
              </select>
              <ChevronDown />
            </div>

            <p className={m.fieldLabel}>File Format</p>
            <div className={m.selectWrapper}>
              <select className={m.selectBox} value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
                <option>PDF</option>
                <option>CSV</option>
                <option>Excel</option>
              </select>
              <ChevronDown />
            </div>

            <div className={m.footerRow}>
              <button onClick={() => setExportModalOpen(false)} className={m.cancelBtn}>Cancel</button>
              <button onClick={handleExport} className={m.exportBtn}>Export</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
}