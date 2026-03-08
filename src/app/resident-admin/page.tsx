"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, header as h, search as s, table as t, dropdown as dd, confirm as cf } from "./Residentadmin.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

// ─── Types ────────────────────────────────────────────────────────────────────
interface Admin {
  id: string;
  name: string;
  email: string;
  society: string;
  dateJoined: string;
  status: "Active" | "Suspended";
  avatar: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const adminList: Admin[] = [
  { id: "1", name: "Alex Johnson",   email: "john@mail.com",    society: "Ikoyi Phase 1",    dateJoined: "Jan 5, 2026",  status: "Active",    avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "2", name: "Sarah Williams", email: "sarah@mail.com",   society: "Lekki Gardens",    dateJoined: "Dec 12, 2025", status: "Suspended", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "3", name: "Chinedu Obi",    email: "chinedu@mail.com", society: "Mainland Heights", dateJoined: "Dec 3, 2025",  status: "Active",    avatar: "https://i.pravatar.cc/150?img=14" },
  { id: "4", name: "Nkechi Eze",     email: "Eze@mail.com",     society: "Eko Island",       dateJoined: "Dec 3, 2025",  status: "Active",    avatar: "https://i.pravatar.cc/150?img=44" },
  { id: "5", name: "Halima Musa",    email: "musa@mail.com",    society: "Palmview Estate",  dateJoined: "Dec 2, 2025",  status: "Active",    avatar: "https://i.pravatar.cc/150?img=25" },
  { id: "6", name: "Kelechi Onu",    email: "Kelechi@mail.com", society: "Coral Springs",    dateJoined: "Dec 2, 2025",  status: "Suspended", avatar: "https://i.pravatar.cc/150?img=32" },
];

const TABLE_HEADERS = ["Admin", "Email address", "Society", "Date Joined", "Status", ""];

// ─── Confirm Modal ─────────────────────────────────────────────────────────────
interface ConfirmModalProps {
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmModal({ name, onConfirm, onClose }: ConfirmModalProps) {
  const confirmColor = "#E87A00";
  const confirmHover = "#D06A00";

  return (
    <div className={cf.overlay} style={{ backgroundColor: "rgba(0,0,0,0.25)" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`${montserrat.className} ${cf.card}`}>
        <div className={cf.headerRow}>
          <div className={cf.spacer} />
          <h2 className={cf.title}>Suspend Admin</h2>
          <button onClick={onClose} className={cf.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <p className={cf.body}>{`This action will temporarily suspend this admin. This can be reversed later.`}</p>
        <div className={cf.btnRow}>
          <button onClick={onClose} className={cf.cancelBtn}>Cancel</button>
          <button
            onClick={onConfirm}
            className={cf.confirmBtn}
            style={{ backgroundColor: confirmColor }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = confirmHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = confirmColor)}
          >
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResidentAdminPage() {
  const router = useRouter();
  const [activeNav, setActiveNav]       = useState("Resident Admin");
  const [search, setSearch]             = useState("");
  const [headerSearch, setHeaderSearch] = useState("");
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [openMenu, setOpenMenu]         = useState<{ index: number; rect: DOMRect } | null>(null);
  const [confirmModal, setConfirmModal] = useState<Admin | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = adminList.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.society.toLowerCase().includes(search.toLowerCase())
  );

  // Navigate to detail page
  const handleRowClick = (admin: Admin) => {
    router.push(`/resident-admin/${admin.id}`);
  };

  return (
    <div className={`${montserrat.className} ${page.wrapper}`}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={page.content}>
        <Header search={headerSearch} setSearch={setHeaderSearch} onMenuOpen={() => setSidebarOpen(true)} />

        <main className={page.main}>

          {/* Header row */}
          <div className={h.row}>
            <h1 className={h.title}>Resident Admins</h1>
          </div>

          {/* Search */}
          <div className={s.wrapper}>
            <svg className={s.icon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={s.input}
            />
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
                  {filtered.map((admin, i) => (
                    <tr
                      key={admin.id}
                      className={`${t.tr} cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-100`}
                      onClick={() => handleRowClick(admin)}
                    >
                      {/* Admin name + avatar */}
                      <td className={t.tdAdmin}>
                        <div className={t.tdAdminWrap}>
                          <img src={admin.avatar} alt={admin.name} className={t.adminAvatar} />
                          <span className={t.adminName}>{admin.name}</span>
                        </div>
                      </td>
                      <td className={t.td}>{admin.email}</td>
                      <td className={t.td}>{admin.society}</td>
                      <td className={t.td}>{admin.dateJoined}</td>
                      {/* Status */}
                      <td className={t.tdStatus}>
                        <span className={admin.status === "Active" ? t.statusActive : t.statusSusp}>
                          {admin.status}
                        </span>
                      </td>
                      {/* Actions — stop row click here */}
                      <td
                        className={t.tdActions}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={t.menuBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            setOpenMenu(openMenu?.index === i ? null : { index: i, rect });
                          }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className={t.emptyCell}>No admins found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Dropdown Menu (fixed position) */}
      {openMenu && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: openMenu.rect.bottom + 4,
            left: openMenu.rect.left - 120,
            zIndex: 200,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            padding: "6px",
            minWidth: 148,
          }}
        >
          {[
            { label: "View",    action: () => { router.push(`/resident-admin/${filtered[openMenu.index].id}`); setOpenMenu(null); } },
            ...(filtered[openMenu.index].status !== "Suspended"
              ? [{ label: "Suspend", action: () => { setConfirmModal(filtered[openMenu.index]); setOpenMenu(null); } }]
              : []),
          ].map((item) => (
            <button key={item.label} onClick={item.action} className={dd.menuItem}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <ConfirmModal
          name={confirmModal.name}
          onConfirm={() => setConfirmModal(null)}
          onClose={() => setConfirmModal(null)}
        />
      )}
    </div>
  );
}