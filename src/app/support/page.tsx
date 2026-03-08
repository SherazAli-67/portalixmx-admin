"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, header as h, search as s, filter as f, table as t, dropdown as dd, modal as m, closeTicket as lm } from "./Supporttickets.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

interface Ticket {
  id: string;
  adminName: string;
  adminAvatar: string;
  subject: string;
  message: string;
  status: "Open" | "Closed";
}

const initialTicketList: Ticket[] = [
  { id: "TCK-201", adminName: "Alex Johnson",  adminAvatar: "https://i.pravatar.cc/150?img=11", subject: "Payment Issue", message: "My payment is not reflecting on my dashboard after completing the transaction.", status: "Open"   },
  { id: "TCK-222", adminName: "Amaka Nwosu",   adminAvatar: "https://i.pravatar.cc/150?img=44", subject: "Login Error",   message: "I am not able to login on the admin portal. It keeps showing invalid credentials.", status: "Closed" },
  { id: "TCK-198", adminName: "Fatima Bello",  adminAvatar: "https://i.pravatar.cc/150?img=25", subject: "Payment Issue", message: "My payment is not reflecting on my dashboard after completing the transaction.", status: "Open"   },
  { id: "TCK-122", adminName: "Emily Davis",   adminAvatar: "https://i.pravatar.cc/150?img=20", subject: "Login Error",   message: "I am not able to login on the admin portal. It keeps showing invalid credentials.", status: "Open"   },
  { id: "TCK-234", adminName: "Michael Brown", adminAvatar: "https://i.pravatar.cc/150?img=15", subject: "Payment Issue", message: "My payment is not reflecting on my dashboard after completing the transaction.", status: "Closed" },
];

const FILTER_OPTIONS = ["All", "Open", "Closed"];
const TABLE_HEADERS  = ["Ticket ID", "Resident Admin", "Subject", "Message", "Status", ""];

function CloseConfirmModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return createPortal(
    <div className={lm.overlay} onClick={onCancel}>
      <div className={`${montserrat.className} ${lm.card}`} onClick={(e) => e.stopPropagation()}>
        <div className={lm.headerRow}>
          <span className={lm.spacer} />
          <h2 className={lm.title}>Close Ticket</h2>
          <button onClick={onCancel} className={lm.closeBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <p className={lm.body}>
          Are you sure you want to close this ticket? You can reopen it later if needed.
        </p>
        <div className={lm.btnRow}>
          <button onClick={onCancel} className={lm.cancelBtn}>Cancel</button>
          <button onClick={onConfirm} className={lm.confirmBtn}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function TicketDetailModal({ ticket, onClose, onCloseTicket }: { ticket: Ticket; onClose: () => void; onCloseTicket: (id: string) => void }) {
  const [reply, setReply] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.35)" }}
      onClick={onClose}
    >
      <div className={`${montserrat.className} ${m.card}`} onClick={(e) => e.stopPropagation()}>
        <div className={m.headerRow}>
          <h2 className={m.title}>Ticket Details</h2>
          <button type="button" onClick={onClose} className={m.closeBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={m.fieldWrap}>
          <label className={m.label}>Ticket ID:</label>
          <div className={m.fieldBox}>{ticket.id}</div>
        </div>
        <div className={m.fieldWrap}>
          <label className={m.label}>Resident Admin</label>
          <div className={m.adminWrap}>
            <img src={ticket.adminAvatar} alt={ticket.adminName} className={m.adminAvatar} />
            <span className={m.adminName}>{ticket.adminName}</span>
          </div>
        </div>
        <div className={m.fieldWrap}>
          <label className={m.label}>Subject</label>
          <div className={m.fieldBox}>{ticket.subject}</div>
        </div>
        <div className={m.fieldWrap}>
          <label className={m.label}>Message</label>
          <div className={m.fieldBox}>{ticket.message}</div>
        </div>
        <div className={m.replySection}>
          <p className={m.replyTitle}>Reply to Ticket</p>
          <label className={m.label}>Description:</label>
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your Response" className={m.textarea} />
        </div>
        <div className={m.btnRow}>
          <button type="button" onClick={onClose} className={m.cancelBtn}>Close</button>
          <button type="button" className={m.sendBtn}>Send Response</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function SupportTicketsPage() {
  const [activeNav, setActiveNav]           = useState("Support Tickets");
  const [search, setSearch]                 = useState("");
  const [headerSearch, setHeaderSearch]     = useState("");
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [filterStatus, setFilterStatus]     = useState("All");
  const [filterOpen, setFilterOpen]         = useState(false);
  const [openMenu, setOpenMenu]             = useState<{ index: number; rect: DOMRect } | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [mounted, setMounted]               = useState(false);
  const [confirmTicketId, setConfirmTicketId] = useState<string | null>(null);

 
  const [tickets, setTickets]               = useState<Ticket[]>(initialTicketList);

  const filterRef = useRef<HTMLDivElement>(null);
  const menuRef   = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
      if (menuRef.current  && !menuRef.current.contains(e.target as Node))   setOpenMenu(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ✅ FIX: Ticket ka status "Closed" karne ka function
  const handleCloseTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((tk) => (tk.id === id ? { ...tk, status: "Closed" } : tk))
    );
  };

  const filtered = tickets.filter((tk) => {
    const matchSearch =
      tk.id.toLowerCase().includes(search.toLowerCase()) ||
      tk.adminName.toLowerCase().includes(search.toLowerCase()) ||
      tk.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || tk.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className={`${montserrat.className} ${page.wrapper}`}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={page.content}>
        <Header search={headerSearch} setSearch={setHeaderSearch} onMenuOpen={() => setSidebarOpen(true)} />
        <main className={page.main}>
          <div className={h.row}>
            <h1 className={h.title}>Support Tickets</h1>
          </div>
          <div className={s.row}>
            <div className={s.wrapper}>
              <svg className={s.icon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className={s.input} />
            </div>
            <div ref={filterRef} className={f.wrapper}>
              <button onClick={() => setFilterOpen((v) => !v)} className={f.btn}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                  <circle cx="8" cy="6" r="2" fill="white" /><circle cx="16" cy="12" r="2" fill="white" /><circle cx="10" cy="18" r="2" fill="white" />
                </svg>
                <span>Filter:</span>
                <span className={f.btnValue}>{filterStatus}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {filterOpen && (
                <div className={f.dropdown}>
                  {FILTER_OPTIONS.map((opt) => (
                    <button key={opt} onClick={() => { setFilterStatus(opt); setFilterOpen(false); }} className={filterStatus === opt ? f.itemActive : f.item}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={t.card}>
            <div className={t.scroll}>
              <table className={t.table}>
                <thead>
                  <tr className={t.theadRow}>
                    {TABLE_HEADERS.map((col, i, arr) => (
                      <th key={i} className={`${t.th} ${i === 0 ? t.thFirst : ""} ${i === arr.length - 1 ? t.thLast : ""}`}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tk, i) => (
                    <tr key={tk.id} className={t.tr} onClick={() => setSelectedTicket(tk)}>
                      <td className={t.td}>{tk.id}</td>
                      <td className={t.tdAdmin}>
                        <div className={t.tdAdminWrap}>
                          <img src={tk.adminAvatar} alt={tk.adminName} className={t.adminAvatar} />
                          <span className={t.adminName}>{tk.adminName}</span>
                        </div>
                      </td>
                      <td className={t.td}>{tk.subject}</td>
                      <td className={t.tdMsg}>{tk.message}</td>
                      <td className={t.tdStatus}>
                        <span className={tk.status === "Open" ? t.statusOpen : t.statusClosed}>{tk.status}</span>
                      </td>
                      <td className={t.tdActions} onClick={(e) => e.stopPropagation()}>
                        <button
                          className={t.menuBtn}
                          onClick={(e) => {
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
                    <tr><td colSpan={6} className={t.emptyCell}>No tickets found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

   
      {openMenu && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: openMenu.rect.bottom + 4, left: openMenu.rect.left - 120, zIndex: 200, background: "white", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", padding: "6px", minWidth: 148 }}
        >
          {[
            {
              label: "View",
              action: () => { setSelectedTicket(filtered[openMenu.index]); setOpenMenu(null); },
            },
            {
              label: "Close",
             
              action: () => {
                setConfirmTicketId(filtered[openMenu.index].id);
                setOpenMenu(null);
              },
            },
          ].map((item) => (
            <button key={item.label} onClick={item.action} className={dd.menuItem}>{item.label}</button>
          ))}
        </div>
      )}

      {mounted && selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onCloseTicket={handleCloseTicket}
        />
      )}

      {mounted && confirmTicketId && (
        <CloseConfirmModal
          onCancel={() => setConfirmTicketId(null)}
          onConfirm={() => { handleCloseTicket(confirmTicketId); setConfirmTicketId(null); }}
        />
      )}
    </div>
  );
}