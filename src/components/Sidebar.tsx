"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebar as s } from "./sidebar.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

const navItems = [
  { label: "Dashboard",           icon: "/sidebar/home.png",      href: "/Dashboard"      },
  { label: "Societies",           icon: "/sidebar/societies.png", href: "/Societies"      },
  { label: "Resident Admin",      icon: "/sidebar/resident.png",  href: "/resident-admin" },
  { label: "Payment and Finance", icon: "/sidebar/payment.png",   href: "/payments"       },
  { label: "Support Ticket",      icon: "/sidebar/support.png",   href: "/support"        },
  { label: "Settings",            icon: "/sidebar/setting.png",   href: "/settings"       },
  { label: "Privacy Policy",      icon: "/sidebar/privacy.png",   href: "/privacy-policy" },
  { label: "Terms of Service",    icon: "/sidebar/terms.png",     href: "/terms"          },
];

interface SidebarProps {
  activeNav?: string;
  setActiveNav?: (label: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeNav, setActiveNav, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className={s.overlay} onClick={onClose} />
      )}

      <aside
        className={`${montserrat.className} ${s.wrapper} ${isOpen ? s.wrapperOpen : s.wrapperClosed}`}
        style={{ backgroundImage: "url('/sidebar/bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      >
        {/* Logo + Close btn */}
        <div className={s.logoWrap}>
          <img src="/sidebar/logo.png" alt="Portalix Logo" className={s.logo} />
          <button onClick={onClose} className={s.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className={s.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || activeNav === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => { setActiveNav?.(item.label); onClose?.(); }}
                className={isActive ? s.navItemActive : s.navItemIdle}
              >
                <img src={item.icon} alt={item.label} width={18} height={18} className={s.navIcon} />
                <span className={s.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom user */}
        <div className={s.bottomWrap}>
          <div className={s.userCard}>
            <img src="/sidebar/profile.jpg" alt="Admin Avatar" className={s.userAvatar} />
            <div className={s.userInfo}>
              <p className={s.userName}>Portalix Admin</p>
              <p className={s.userEmail}>Portalix01@mail.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}