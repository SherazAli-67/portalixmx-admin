"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, editor as ed, saveRow } from "./termsOfService.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

const initialContent = `<p><strong>Terms &amp; Conditions – Portalixmx</strong></p>

<p>These Terms of Service govern the use of the Portalixmx platform. By accessing or using Portalixmx, users agree to comply with these terms and conditions.</p>

<p><strong>1. Platform Usage</strong></p>
<p>Portalixmx is a management platform designed to support societies and communities through administrative tools. Users must use the platform only for lawful and intended purposes. Any misuse of the system is strictly prohibited.</p>

<p><strong>2. User Roles and Responsibilities</strong></p>
<ul>
  <li>Super Admins are responsible for managing societies, resident admins, payments, and platform settings.</li>
  <li>Resident Admins are responsible for managing residents within their assigned societies.</li>
  <li>Users must ensure that all information provided is accurate and up to date.</li>
</ul>

<p><strong>3. Account Security</strong></p>
<p>Users are responsible for maintaining the confidentiality of their login credentials. Portalixmx will not be liable for any loss or damage resulting from unauthorized access due to user negligence.</p>

<p><strong>4. Payments and Subscriptions</strong></p>
<p>Resident Admins may be required to pay subscription fees to access Portalixmx services. All payments made are recorded within the platform. Failure to make required payments may result in restricted access or suspension of services.</p>

<p><strong>5. Suspension and Termination</strong></p>
<p>Portalixmx reserves the right to suspend or terminate any society or user account if there is:</p>
<ul>
  <li>Violation of platform policies</li>
  <li>Non-payment of subscription fees</li>
  <li>Fraudulent or malicious activity</li>
</ul>

<p><strong>6. Limitation of Liability</strong></p>
<p>Portalixmx shall not be held liable for any indirect, incidental, or consequential damages arising from the use or inability to use the platform.</p>

<p><strong>7. Modifications to Terms</strong></p>
<p>Portalixmx reserves the right to modify these Terms of Service at any time. Users will be notified of significant changes. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

<p><strong>8. Governing Law</strong></p>
<p>These terms shall be governed by and construed in accordance with the applicable laws of the jurisdiction in which Portalixmx operates.</p>`;

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

export default function TermsOfServicePage() {
  const [activeNav, setActiveNav]       = useState("Terms of Service");
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
          <h1 className={page.title}>Terms of Service</h1>

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

              {/* Editor */}
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