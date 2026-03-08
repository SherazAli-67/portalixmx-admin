"use client";

import { Montserrat } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { header as h, dropdown as dd, logoutModal as lm } from "./header.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

interface HeaderProps {
  search: string;
  setSearch: (val: string) => void;
  onLogout?: () => void;
  onMenuOpen?: () => void;
}

export default function Header({ search, setSearch, onLogout, onMenuOpen }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const showSearch = pathname === "/Dashboard";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    onLogout?.();
  };

  return (
    <>
      <header className={`${montserrat.className} ${h.wrapper}`}>

        {/* Hamburger — mobile only */}
        <button onClick={onMenuOpen} className="lg:hidden flex items-center justify-center w-8 h-8 text-[#1C1C1C] bg-transparent border-none cursor-pointer mr-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Search — only on Dashboard */}
        {showSearch && (
          <div className={h.searchWrap}>
            <svg className={h.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search societies, admins, payments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={h.searchInput}
            />
          </div>
        )}

        {/* Avatar + Dropdown */}
        <div className={h.avatarWrap} ref={dropdownRef}>
          <img
            src="/sidebar/profile.jpg"
            alt="Admin Avatar"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={h.avatar}
          />

          {dropdownOpen && (
            <div className={dd.wrapper} style={{ filter: "drop-shadow(0px 4px 24px rgba(0,0,0,0.10))" }}>
              <div
                className={dd.inner}
                style={{
                  backgroundImage: "url('/header/Union.png')",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <button
                  onClick={() => { setDropdownOpen(false); setLogoutModalOpen(true); }}
                  className={dd.logoutBtn}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dd.logoutIcon}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className={dd.logoutLabel}>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {logoutModalOpen && (
        <div className={lm.overlay} style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
          <div className={`${montserrat.className} ${lm.card}`}>

            <div className={lm.headerRow}>
              <div className={lm.spacer} />
              <h2 className={lm.title}>Log out</h2>
              <button onClick={() => setLogoutModalOpen(false)} className={lm.closeBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className={lm.body}>
              Log out of Portalix? You will be required to sign in again for dashboard access.
            </p>

            <div className={lm.btnRow}>
              <button onClick={() => setLogoutModalOpen(false)} className={lm.cancelBtn}>Cancel</button>
              <button onClick={handleLogoutConfirm} className={lm.confirmBtn}>Log Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}