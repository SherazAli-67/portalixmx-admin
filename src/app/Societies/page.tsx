"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, header, search, table, dropdown, modal, confirm } from "./societies.styles";
import {
  subscribeSocieties, fetchAdmins, fetchResidentCounts, toSociety,
  createSociety, updateSociety, setSocietyStatus, deleteSociety as removeSociety,
} from "@/services/societies";
import type { AdminOption, Society, SocietyDoc, SocietyFormInput, SocietyStatus } from "@/types/society";

// ─── Data ─────────────────────────────────────────────────────────────────────

const menuActions = ["View", "Edit", "Suspend", "Delete"];

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreateSocietyForm {
  name: string;
  location: string;
  admin: string; // label chosen in the "Assign Resident Admin" dropdown
  status: string;
  banner: File | null;
}

interface AdminChoice { uid: string; label: string }

const errorMessage = (e: unknown) =>
  e instanceof Error && e.message ? e.message : "Something went wrong. Please try again.";

// ─── Dropdown Menu ────────────────────────────────────────────────────────────

function DropdownMenu({ onClose, onView, onEdit, onDelete, onSuspend, anchorRect, status }: {
  onClose: () => void; onView: () => void; onEdit: () => void;
  onDelete: () => void; onSuspend: () => void; anchorRect: DOMRect; status: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const handleAction = (label: string) => {
    if (label === "View") onView();
    else if (label === "Edit") onEdit();
    else if (label === "Delete") onDelete();
    else if (label === "Suspend") onSuspend();
    else onClose();
  };

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: anchorRect.bottom + 6,
        right: window.innerWidth - anchorRect.right,
        zIndex: 9999,
        width: 168,
        background: "#FFFFFF",
        border: "1px solid #EBEBEB",
        borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        padding: "6px",
        animation: "dropIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      {menuActions.filter(label => !(label === "Suspend" && status === "Suspended")).map((label) => (
        <button key={label} onClick={() => handleAction(label)} className={dropdown.menuItem}>
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Banner Upload (shared) ───────────────────────────────────────────────────

function BannerUpload({ preview, onChange }: { preview: string | null; onChange: (f: File | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.files?.[0] ?? null);
  return (
    <div className={modal.bannerWrap}>
      <button onClick={() => ref.current?.click()} className={modal.bannerBtn}>
        {preview ? (
          <img src={preview} alt="banner" className={modal.bannerImg} />
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span className={modal.bannerLabel}>Upload Banner</span>
          </>
        )}
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}

// ─── Select Field (shared) ────────────────────────────────────────────────────

function SelectField({ label, value, onChange, options }: {
  label: string; value: string;
  onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className={modal.fieldWrap}>
      <label className={modal.label}>{label}</label>
      <div className={modal.selectWrap}>
        <select className={modal.select} value={value} onChange={e => onChange(e.target.value)}>
          <option value="" disabled>Select {label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg className={modal.selectIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Close Button (shared) ────────────────────────────────────────────────────

function CloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button onClick={onClose} className={modal.closeBtn}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

// ─── Create Society Modal ─────────────────────────────────────────────────────

function CreateSocietyModal({ onClose, onSubmit, adminOptions }: { onClose: () => void; onSubmit: (d: CreateSocietyForm) => Promise<void>; adminOptions: string[] }) {
  const [form, setForm] = useState<CreateSocietyForm>({ name: "", location: "", admin: "", status: "Active", banner: null });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const submit = async () => {
    if (!form.name.trim() || saving) return;
    setSaving(true); setError("");
    try { await onSubmit(form); onClose(); }
    catch (e) { setError(errorMessage(e)); setSaving(false); }
  };
  const [preview, setPreview] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleBanner = (file: File | null) => {
    setForm(f => ({ ...f, banner: file }));
    if (file) { const r = new FileReader(); r.onload = e => setPreview(e.target?.result as string); r.readAsDataURL(file); }
    else setPreview(null);
  };

  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()} className={modal.overlay}>
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
      <div className={modal.card} style={{ animation: "slideUp 0.22s cubic-bezier(0.16,1,0.3,1)" }}>

        <div className={modal.headerRow}>
          <h2 className={modal.title}>Create Society</h2>
          <CloseBtn onClose={onClose} />
        </div>

        <BannerUpload preview={preview} onChange={handleBanner} />

        <div className={modal.fieldWrap}>
          <label className={modal.label}>Society Name</label>
          <input className={modal.input} placeholder="Ikoyi Phase 1" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>

        <div className={modal.fieldWrap}>
          <label className={modal.label}>Location</label>
          <input className={modal.input} placeholder="Tanke, Ilorin united state" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
        </div>

        <SelectField label="Assign Resident Admin" value={form.admin} onChange={v => setForm(f => ({ ...f, admin: v }))} options={adminOptions} />
        <SelectField label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={["Active", "Suspended"]} />

        {error && <p className="text-[13px] text-[#CC3333] mb-2">{error}</p>}
        <div className={modal.btnRow}>
          <button onClick={onClose} className={modal.cancelBtn}>Cancel</button>
          <button
            onClick={submit}
            disabled={saving}
            className={`${modal.submitBtn} ${form.name.trim() ? modal.submitActive : modal.submitDisabled}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Society Modal ───────────────────────────────────────────────────────

function EditSocietyModal({ society, onClose, onSubmit, adminOptions, currentAdminLabel }: { society: Society; onClose: () => void; onSubmit: (d: CreateSocietyForm) => Promise<void>; adminOptions: string[]; currentAdminLabel: string }) {
  const [form, setForm] = useState<CreateSocietyForm>({ name: society.name, location: society.location, admin: currentAdminLabel, status: society.status, banner: null });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const submit = async () => {
    if (!form.name.trim() || saving) return;
    setSaving(true); setError("");
    try { await onSubmit(form); onClose(); }
    catch (e) { setError(errorMessage(e)); setSaving(false); }
  };
  const [preview, setPreview] = useState<string | null>(society.image || null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleBanner = (file: File | null) => {
    setForm(f => ({ ...f, banner: file }));
    if (file) { const r = new FileReader(); r.onload = e => setPreview(e.target?.result as string); r.readAsDataURL(file); }
    else setPreview(null);
  };

  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()} className={modal.overlay}>
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
      <div className={modal.card} style={{ animation: "slideUp 0.22s cubic-bezier(0.16,1,0.3,1)" }}>

        <div className={modal.headerRow}>
          <h2 className={modal.title}>Edit Society</h2>
          <CloseBtn onClose={onClose} />
        </div>

        <BannerUpload preview={preview} onChange={handleBanner} />

        <div className={modal.fieldWrap}>
          <label className={modal.label}>Society Name</label>
          <input className={modal.input} placeholder="Ikoyi Phase 1" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>

        <div className={modal.fieldWrap}>
          <label className={modal.label}>Location</label>
          <input className={modal.input} placeholder="Tanke, Ilorin united state" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
        </div>

        <SelectField label="Assign Resident Admin" value={form.admin} onChange={v => setForm(f => ({ ...f, admin: v }))} options={adminOptions} />
        <SelectField label="Status" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={["Active", "Suspended"]} />

        {error && <p className="text-[13px] text-[#CC3333] mb-2">{error}</p>}
        <div className={modal.btnRow}>
          <button onClick={onClose} className={modal.cancelBtn}>Cancel</button>
          <button
            onClick={submit}
            disabled={saving}
            className={`${modal.submitBtn} ${form.name.trim() ? modal.submitActive : modal.submitDisabled}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Confirm Modal (Delete / Suspend) ─────────────────────────────────────────

function ConfirmModal({ title, message, confirmLabel, confirmColor, confirmHover, onClose, onConfirm }: {
  title: string; message: string; confirmLabel: string;
  confirmColor: string; confirmHover: string;
  onClose: () => void; onConfirm: () => void | Promise<void>;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const handleConfirm = async () => {
    if (busy) return;
    setBusy(true); setError("");
    try { await onConfirm(); onClose(); }
    catch (e) { setError(errorMessage(e)); setBusy(false); }
  };
  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()} className={confirm.overlay}>
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
      <div className={confirm.card} style={{ animation: "slideUp 0.22s cubic-bezier(0.16,1,0.3,1)" }}>

        <div className={confirm.headerRow}>
          <div className={confirm.spacer} />
          <h2 className={confirm.title}>{title}</h2>
          <button onClick={onClose} className={confirm.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className={confirm.body}>{message}</p>
        {error && <p className="text-[13px] text-[#CC3333] px-1 mb-2">{error}</p>}

        <div className={confirm.btnRow}>
          <button onClick={onClose} className={confirm.cancelBtn}>Cancel</button>
          <button
            onClick={handleConfirm}
            disabled={busy}
            className={confirm.confirmBtn}
            style={{ background: confirmColor }}
            onMouseEnter={e => (e.currentTarget.style.background = confirmHover)}
            onMouseLeave={e => (e.currentTarget.style.background = confirmColor)}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SocietiesPage() {
  const router = useRouter();
  const [activeNav, setActiveNav]           = useState("Societies");
  const [searchVal, setSearchVal]           = useState("");
  const [openMenu, setOpenMenu]             = useState<{ index: number; rect: DOMRect } | null>(null);
  const [showCreate, setShowCreate]         = useState(false);
  const [editSociety, setEditSociety]       = useState<Society | null>(null);
  const [deleteSociety, setDeleteSociety]   = useState<Society | null>(null);
  const [suspendSociety, setSuspendSociety] = useState<Society | null>(null);

  const [docs, setDocs]       = useState<SocietyDoc[]>([]);
  const [admins, setAdmins]   = useState<AdminOption[]>([]);
  const [counts, setCounts]   = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeSocieties(
      (d) => { setDocs(d); setLoading(false); },
      (err) => { console.error("[societies] subscribe failed", err); setLoading(false); },
    );
    fetchAdmins().then(setAdmins).catch((err) => console.error("[societies] admins failed", err));
    return unsub;
  }, []);

  // Resident counts are refreshed whenever the list of societies changes.
  const idsKey = docs.map(d => d.id).join(",");
  useEffect(() => {
    if (!idsKey) return;
    let cancelled = false;
    fetchResidentCounts(idsKey.split(",")).then(c => { if (!cancelled) setCounts(c); });
    return () => { cancelled = true; };
  }, [idsKey]);

  const societies: Society[] = useMemo(() => {
    const byUid = new Map(admins.map(a => [a.uid, a]));
    return docs.map(d => toSociety(d, byUid, counts));
  }, [docs, admins, counts]);

  // Admins that can be assigned: anyone who is not already the admin of another society.
  const adminChoices = (exceptSocietyId?: string): AdminChoice[] => {
    const free = admins.filter(a => !docs.some(d => d.residentAdmin === a.uid && d.id !== exceptSocietyId));
    const seen = new Map<string, number>();
    free.forEach(a => seen.set(a.name, (seen.get(a.name) ?? 0) + 1));
    return free
      .map(a => ({ uid: a.uid, label: (seen.get(a.name) ?? 0) > 1 && a.email ? `${a.name} (${a.email})` : a.name }))
      .sort((x, y) => x.label.localeCompare(y.label));
  };

  const toInput = (d: CreateSocietyForm, choices: AdminChoice[]): SocietyFormInput => ({
    name: d.name,
    location: d.location,
    adminUid: choices.find(c => c.label === d.admin)?.uid ?? "",
    status: (d.status === "Suspended" ? "Suspended" : "Active") as SocietyStatus,
    banner: d.banner,
  });

  const filtered = societies.filter(s =>
    s.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    s.admin.toLowerCase().includes(searchVal.toLowerCase())
  );

  // Navigate to detail page
  const handleRowClick = (s: Society) => {
    router.push(`/Societies/${s.id}`);
  };

  return (
    <div className={page.wrapper}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className={page.content}>
        <Header search={searchVal} setSearch={setSearchVal} />

        <main className={page.main}>

          {/* Title + New Button */}
          <div className={header.row}>
            <h1 className={header.title}>Societies</h1>
            <button onClick={() => setShowCreate(true)} className={header.newBtn}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              New Society
            </button>
          </div>

          {/* Search */}
          <div className={search.wrapper}>
            <svg className={search.icon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search societies"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              className={search.input}
            />
          </div>

          {/* Table */}
          <div className={table.card}>
            <div className={table.scroll}>
              <table className={table.table}>
                <thead>
                  <tr className={table.theadRow}>
                    {["Name", "Resident Admin", "Residents", "Status", ""].map((h, i, arr) => (
                      <th key={i} className={`${table.th} ${i === 0 ? table.thFirst : ""} ${i === arr.length - 1 ? table.thLast : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr
                      key={s.id}
                      className={`${table.tr} cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-100`}
                      onClick={() => handleRowClick(s)}
                    >
                      <td className={table.td}>{s.name}</td>
                      <td className={table.tdAdmin}>
                        <div className={table.tdAdminWrap}>
                          <img src={s.adminAvatar} alt={s.admin} className={table.adminAvatar} />
                          <span className={table.adminName}>{s.admin}</span>
                        </div>
                      </td>
                      <td className={table.tdResidents}>{s.residents}</td>
                      <td className={table.tdStatus}>
                        <span className={s.status === "Active" ? table.statusActive : table.statusSusp}>
                          {s.status}
                        </span>
                      </td>
                      <td
                        className={table.tdActions}
                        // Stop row click from firing when interacting with the actions cell
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setOpenMenu(openMenu?.index === i ? null : { index: i, rect });
                          }}
                          className={table.menuBtn}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="19" r="2" />
                          </svg>
                        </button>
                        {openMenu?.index === i && (
                          <DropdownMenu
                            anchorRect={openMenu.rect}
                            onClose={() => setOpenMenu(null)}
                            onView={() => { setOpenMenu(null); router.push(`/Societies/${s.id}`); }}
                            onEdit={() => { setOpenMenu(null); setEditSociety(s); }}
                            onDelete={() => { setOpenMenu(null); setDeleteSociety(s); }}
                            onSuspend={() => { setOpenMenu(null); setSuspendSociety(s); }}
                            status={s.status}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className={table.emptyCell}>{loading ? "Loading societies…" : "No societies found."}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {showCreate && (
        <CreateSocietyModal
          onClose={() => setShowCreate(false)}
          adminOptions={adminChoices().map(c => c.label)}
          onSubmit={async d => { await createSociety(toInput(d, adminChoices())); }}
        />
      )}
      {editSociety && (
        <EditSocietyModal
          society={editSociety}
          onClose={() => setEditSociety(null)}
          adminOptions={adminChoices(editSociety.id).map(c => c.label)}
          currentAdminLabel={adminChoices(editSociety.id).find(c => c.uid === editSociety.adminUid)?.label ?? ""}
          onSubmit={async d => { await updateSociety(editSociety, toInput(d, adminChoices(editSociety.id))); }}
        />
      )}
      {deleteSociety && (
        <ConfirmModal
          title="Delete Society"
          message={`This action will permanently remove this society from Portalix. This cannot be undone.`}
          confirmLabel="Delete" confirmColor="#E87A00" confirmHover="#EA6C0E"
          onClose={() => setDeleteSociety(null)} onConfirm={() => removeSociety(deleteSociety)}
        />
      )}
      {suspendSociety && (
        <ConfirmModal
          title="Suspend Society"
          message={`This action will temporarily suspend this society. This can be reversed later.`}
          confirmLabel="Suspend" confirmColor="#E87A00" confirmHover="#EA6C0E"
          onClose={() => setSuspendSociety(null)} onConfirm={() => setSocietyStatus(suspendSociety.id, "Suspended")}
        />
      )}
    </div>
  );
}