"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, editor as ed, saveRow } from "./privacyPolicy.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

const initialContent = `<p><strong>At Portalixmx</strong>, we are committed to protecting the privacy and personal information of all users who interact with our platform. This Privacy Policy explains how Portalixmx collects, uses, stores, and protects information provided by users, including Super Admins, Resident Admins, Residents, and other associated roles.</p>

<p><strong>1. Information We Collect</strong></p>
<p>Portalixmx may collect the following types of information:</p>
<ul>
  <li>Personal information such as name, email address, phone number, and profile images</li>
  <li>Society-related information including society name, location, and assigned administrators</li>
  <li>Payment and billing information related to subscription fees</li>
  <li>Support-related data such as tickets, messages, and issue history</li>
  <li>System usage data including login activity and interactions within the platform</li>
</ul>

<p><strong>2. How We Use Information</strong></p>
<p>The information collected is used to:</p>
<ul>
  <li>Manage and operate the Portalixmx platform effectively</li>
  <li>Create and manage societies and user accounts</li>
  <li>Process subscription payments and generate financial records</li>
  <li>Respond to support tickets and resolve issues</li>
  <li>Improve platform performance, security, and user experience</li>
  <li>Maintain system integrity and prevent unauthorized access</li>
</ul>

<p><strong>3. Data Storage and Security</strong></p>
<p>All user data is stored securely using appropriate technical and organizational measures. Access to sensitive information is restricted to authorized administrators only. Portalixmx takes reasonable steps to protect data from loss, misuse, unauthorized access, or disclosure.</p>`;

// ── SVG Icons ─────────────────────────────────────────────────────────────────

const IconIndent = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3"  y1="7"  x2="21" y2="7"/>
    <line x1="3"  y1="17" x2="21" y2="17"/>
    <polyline points="18 10 21 12 18 14"/>
    <line x1="3"  y1="10" x2="11" y2="10"/>
    <line x1="3"  y1="14" x2="11" y2="14"/>
  </svg>
);

const IconBulletList = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="4" cy="6"  r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>
    <line x1="8" y1="6"  x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconBold = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  </svg>
);

const IconItalic = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="4"  x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5"  y2="20"/>
    <line x1="15" y1="4"  x2="9"  y2="20"/>
  </svg>
);

const IconUnderline = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
    <line x1="4" y1="21" x2="20" y2="21"/>
  </svg>
);

const IconTable = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="4" x2="21" y2="4"/>
    <rect x="3"  y="9" width="6" height="11" rx="1"/>
    <rect x="13" y="9" width="6" height="8"  rx="1"/>
  </svg>
);

const IconAlignCenter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3"  y1="6"  x2="21" y2="6"/>
    <line x1="6"  y1="12" x2="18" y2="12"/>
    <line x1="4"  y1="18" x2="20" y2="18"/>
  </svg>
);

const IconAlignRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3"  y1="6"  x2="21" y2="6"/>
    <line x1="9"  y1="12" x2="21" y2="12"/>
    <line x1="6"  y1="18" x2="21" y2="18"/>
  </svg>
);

// ── ToolBtn ───────────────────────────────────────────────────────────────────

function ToolBtn({
  title,
  onMouseDown,
  children,
}: {
  title: string;
  onMouseDown: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button title={title} onMouseDown={onMouseDown} className={ed.toolBtn}>
      {children}
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  const [activeNav, setActiveNav]       = useState("Privacy Policy");
  const [headerSearch, setHeaderSearch] = useState("");
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, []);

  const exec = useCallback((e: React.MouseEvent, cmd: string, value?: string) => {
    e.preventDefault();
    editorRef.current?.focus();
    document.execCommand(cmd, false, value ?? undefined);
  }, []);

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
          search={headerSearch}
          setSearch={setHeaderSearch}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <main className={page.main}>
          <h1 className={page.title}>Privacy Policy</h1>

          <div className="bg-white rounded-[18px] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 mb-6">
            <p className={ed.sectionTitle}>Information</p>

            <div className={ed.card}>
              {/* Toolbar */}
              <div className={ed.toolbar}>
                <ToolBtn title="Indent" onMouseDown={(e) => exec(e, "indent")}>
                  <IconIndent />
                </ToolBtn>
                <ToolBtn title="Bullet List" onMouseDown={(e) => exec(e, "insertUnorderedList")}>
                  <IconBulletList />
                </ToolBtn>
                <ToolBtn title="Bold" onMouseDown={(e) => exec(e, "bold")}>
                  <IconBold />
                </ToolBtn>
                <ToolBtn title="Italic" onMouseDown={(e) => exec(e, "italic")}>
                  <IconItalic />
                </ToolBtn>
                <ToolBtn title="Underline" onMouseDown={(e) => exec(e, "underline")}>
                  <IconUnderline />
                </ToolBtn>
                <ToolBtn
                  title="Insert Table"
                  onMouseDown={(e) =>
                    exec(
                      e,
                      "insertHTML",
                      '<table border="1" style="border-collapse:collapse;width:100%;margin:8px 0"><tr><td style="padding:6px">&nbsp;</td><td style="padding:6px">&nbsp;</td></tr><tr><td style="padding:6px">&nbsp;</td><td style="padding:6px">&nbsp;</td></tr></table>'
                    )
                  }
                >
                  <IconTable />
                </ToolBtn>
                <ToolBtn title="Align Center" onMouseDown={(e) => exec(e, "justifyCenter")}>
                  <IconAlignCenter />
                </ToolBtn>
                <ToolBtn title="Align Right" onMouseDown={(e) => exec(e, "justifyRight")}>
                  <IconAlignRight />
                </ToolBtn>
              </div>

              {/* ✅ data-policy-editor attribute add kiya — globals.css se target hoga */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                data-policy-editor
                className={ed.content}
                style={{ fontFamily: "inherit" }}
              />
            </div>
          </div>

          {/* Save */}
          <div className={saveRow.wrapper}>
            <button className={saveRow.btn}>Save Changes</button>
          </div>
        </main>
      </div>
    </div>
  );
}