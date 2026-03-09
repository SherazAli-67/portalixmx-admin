"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, form as f, section, faq as fq, saveRow, faqModal as fm, deleteModal as dm } from "./settings.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

interface FAQ { id: number; question: string; answer: string; }

const initialFaqs: FAQ[] = [
  { id: 1, question: "How do I create a society?", answer: "Only the Super Admin can create a society. Once created, a resident admin can be assigned to manage residents and daily operations." },
  { id: 2, question: "How do I create a society?", answer: "Only the Super Admin can create a society. Once created, a resident admin can be assigned to manage residents and daily operations." },
];

// ─── ChevronDown SVG ──────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── FAQ Modal ────────────────────────────────────────────────────────────────
interface FaqModalProps {
  initial?: FAQ;
  onSave: (q: string, a: string) => void;
  onClose: () => void;
}
function FaqModal({ initial, onSave, onClose }: FaqModalProps) {
  const [q, setQ] = useState(initial?.question ?? "");
  const [a, setA] = useState(initial?.answer ?? "");
  const title = initial ? "Edit FAQ" : "Add FAQ";

  return (
    <div className={fm.overlay} style={{ backgroundColor: "rgba(0,0,0,0.25)" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`${montserrat.className} ${fm.card}`}>
        <div className={fm.headerRow}>
          <div className={fm.spacer} />
          <h2 className={fm.title}>{title}</h2>
          <button onClick={onClose} className={fm.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={fm.fieldWrap}>
          <label className={fm.label}>Question</label>
          <input className={fm.input} placeholder="Enter question" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className={fm.fieldWrap}>
          <label className={fm.label}>Answer</label>
          <textarea className={fm.textarea} placeholder="Enter answer" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div className={fm.btnRow}>
          <button onClick={onClose} className={fm.cancelBtn}>Cancel</button>
          <button onClick={() => { if (q && a) { onSave(q, a); onClose(); } }} className={fm.saveBtn}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeNav, setActiveNav]   = useState("Settings");
  const [headerSearch, setHeaderSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form state
  const [companyName, setCompanyName]     = useState("Portalixmx");
  const [email, setEmail]                 = useState("admin@portalixmx.com");
  const [phone, setPhone]                 = useState("123456789");
  const [timezone, setTimezone]           = useState("UTC 01:00");
  const [logoFile, setLogoFile]           = useState<string>("No file chosen");
  const [language, setLanguage]           = useState("English");
  const [currency, setCurrency]           = useState("$");
  const [monthlyPrice, setMonthlyPrice]   = useState("$300");
  const [oldPassword, setOldPassword]     = useState("");
  const [newPassword, setNewPassword]     = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // FAQs
  const [faqs, setFaqs]                   = useState<FAQ[]>(initialFaqs);
  const [faqModal, setFaqModal]           = useState<{ mode: "add" | "edit"; faq?: FAQ } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<FAQ | null>(null);
  const nextId = useRef(faqs.length + 1);

  const handleSaveFaq = (q: string, a: string) => {
    if (faqModal?.mode === "edit" && faqModal.faq) {
      setFaqs((prev) => prev.map((f) => f.id === faqModal.faq!.id ? { ...f, question: q, answer: a } : f));
    } else {
      setFaqs((prev) => [...prev, { id: nextId.current++, question: q, answer: a }]);
    }
  };

  const handleDeleteFaq = (id: number) => setFaqs((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className={`${montserrat.className} ${page.wrapper}`}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={page.content}>
        <Header search={headerSearch} setSearch={setHeaderSearch} onMenuOpen={() => setSidebarOpen(true)} />

        <main className={page.main}>
          <h1 className={page.title}>Settings</h1>

          {/* ── General Settings Grid ── */}
          <div className={f.grid}>

            {/* Company Name */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Company Name</label>
              <input className={f.input} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Portalixmx" />
            </div>

            {/* Email */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Email</label>
              <input className={f.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@portalixmx.com" />
            </div>

            {/* Phone */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Company Phone Number</label>
              <input className={f.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="123456789" />
            </div>

            {/* Timezone */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Default Timezone</label>
              <div className={f.selectWrap}>
                <select className={f.select} value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                  {["UTC 01:00", "UTC 00:00", "UTC +01:00", "UTC +02:00", "UTC +03:00", "UTC -05:00"].map((tz) => (
                    <option key={tz}>{tz}</option>
                  ))}
                </select>
                <span className={f.selectIcon}><ChevronDown /></span>
              </div>
            </div>

            {/* Logo */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Logo</label>
              <div className={f.fileWrap}>
                <button className={f.fileBtn} onClick={() => fileRef.current?.click()}>Choose File</button>
                <span className={f.fileName}>{logoFile}</span>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => setLogoFile(e.target.files?.[0]?.name ?? "No file chosen")} />
              </div>
            </div>

            {/* Language */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Language</label>
              <div className={f.selectWrap}>
                <select className={f.select} value={language} onChange={(e) => setLanguage(e.target.value)}>
                  {["English", "French", "Spanish", "Arabic", "Hausa", "Yoruba", "Igbo"].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
                <span className={f.selectIcon}><ChevronDown /></span>
              </div>
            </div>

            {/* Currency */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Default Currency</label>
              <div className={f.selectWrap}>
                <select className={f.select} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  {["$", "₦", "€", "£", "¥"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <span className={f.selectIcon}><ChevronDown /></span>
              </div>
            </div>

            {/* Monthly Price */}
            <div className={f.fieldWrap}>
              <label className={f.label}>Monthly Price (Resident Admin):</label>
              <input className={f.input} value={monthlyPrice} onChange={(e) => setMonthlyPrice(e.target.value)} placeholder="$300" />
            </div>
          </div>

          {/* ── Account Settings ── */}
          <div className={section.title}>Account Settings:</div>
          <div className={f.grid}>
            <div className={f.fieldWrap}>
              <label className={f.label}>Old Password</label>
              <input className={f.input} type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <div className={f.fieldWrap}>
              <label className={f.label}>New Password</label>
              <input className={f.input} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••••" />
            </div>
          </div>

          {/* ── FAQs ── */}
          <div className={section.title}>FAQs</div>
          <div className={fq.wrapper}>
            {faqs.map((item) => (
              <div key={item.id} className={fq.item}>
                <div className={fq.textWrap}>
                  <p className={fq.question}>{item.question}</p>
                  <p className={fq.answer}>{item.answer}</p>
                </div>
                <div className={fq.actions}>
                  <button onClick={() => setFaqModal({ mode: "edit", faq: item })} className={fq.editBtn}>
                    <img src="/settings/edit.png" alt="Edit" width={20} height={20} />
                  </button>
                  <button onClick={() => setDeleteConfirm(item)} className={fq.deleteBtn}>
                    <img src="/settings/del.png" alt="Delete" width={20} height={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add FAQ button */}
          <button onClick={() => setFaqModal({ mode: "add" })} className={fq.addBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add FAQ
          </button>

          {/* Save Changes */}
          <div className={saveRow.wrapper}>
            <button className={saveRow.btn}>Save Changes</button>
          </div>

        </main>
      </div>

      {/* FAQ Modal */}
      {faqModal && (
        <FaqModal
          initial={faqModal.faq}
          onSave={handleSaveFaq}
          onClose={() => setFaqModal(null)}
        />
      )}

      {/* Delete FAQ Confirm Modal */}
      {deleteConfirm && (
        <div className={dm.overlay} style={{ backgroundColor: "rgba(0,0,0,0.25)" }} onClick={(e) => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}>
          <div className={`${montserrat.className} ${dm.card}`}>
            <div className={dm.headerRow}>
              <div className={dm.spacer} />
              <h2 className={dm.title}>Delete FAQ</h2>
              <button onClick={() => setDeleteConfirm(null)} className={dm.closeBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p className={dm.body}>
              This action will permanently remove this FAQ from Portalix. This cannot be undone.
            </p>
            <div className={dm.btnRow}>
              <button onClick={() => setDeleteConfirm(null)} className={dm.cancelBtn}>Cancel</button>
              <button onClick={() => { handleDeleteFaq(deleteConfirm.id); setDeleteConfirm(null); }} className={dm.confirmBtn}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
