"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, breadcrumb, layout, leftPanel, rightPanel, resTable } from "./societyDetail.styles";

const montserrat = Montserrat({ subsets: ["latin"] });

interface Society {
  id: string; name: string; admin: string; adminEmail: string;
  adminAvatar: string; residents: number; status: string;
  location: string; created: string; image: string;
}
interface Resident {
  name: string; email: string; unit: string;
  phone: string; status: string; avatar: string;
}

const societies: Society[] = [
  { id: "1", name: "Ikoyi Phase 1",   admin: "Alex Johnson",   adminEmail: "alexjohn@mail.com", adminAvatar: "https://i.pravatar.cc/150?img=11", residents: 120, status: "Active",    location: "Tanke, Ilorin united state", created: "Feb 01, 2026", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=80" },
  { id: "2", name: "Lekki Garden",    admin: "Sarah Williams", adminEmail: "sarah@mail.com",     adminAvatar: "https://i.pravatar.cc/150?img=47", residents: 101, status: "Suspended", location: "Lekki, Lagos",               created: "Mar 10, 2025", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80" },
  { id: "3", name: "Palmview Estate", admin: "Chinedu Obi",    adminEmail: "chinedu@mail.com",   adminAvatar: "https://i.pravatar.cc/150?img=14", residents: 98,  status: "Active",    location: "Abuja, FCT",                 created: "Jan 15, 2025", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
  { id: "4", name: "Emerald Park",    admin: "Nkechi Eze",     adminEmail: "nkechi@mail.com",    adminAvatar: "https://i.pravatar.cc/150?img=44", residents: 80,  status: "Active",    location: "Port Harcourt, Rivers",      created: "Apr 20, 2025", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80" },
  { id: "5", name: "Rosewood Estate", admin: "Halima Musa",    adminEmail: "halima@mail.com",    adminAvatar: "https://i.pravatar.cc/150?img=25", residents: 100, status: "Active",    location: "Kano, Kano State",           created: "Jun 05, 2025", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" },
  { id: "6", name: "Harmony Court",   admin: "Kelechi Onu",    adminEmail: "kelechi@mail.com",   adminAvatar: "https://i.pravatar.cc/150?img=32", residents: 176, status: "Suspended", location: "Enugu, Enugu State",         created: "Sep 12, 2025", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" },
];

const residentsList: Resident[] = [
  { name: "Samuel Bello",     email: "sam.bello@gmail.com", unit: "Block A – 12", phone: "0803 456 7821", status: "Active",   avatar: "https://i.pravatar.cc/150?img=1"  },
  { name: "Aisha Lawal",      email: "sam.bello@gmail.com", unit: "Block A – 20", phone: "0803 456 7821", status: "Active",   avatar: "https://i.pravatar.cc/150?img=5"  },
  { name: "Daniel Ogun",      email: "sam.bello@gmail.com", unit: "Block C – 15", phone: "0803 456 7821", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=8"  },
  { name: "Blessing Uche",    email: "sam.bello@gmail.com", unit: "Block C – 07", phone: "0803 456 7821", status: "Active",   avatar: "https://i.pravatar.cc/150?img=9"  },
  { name: "Ibrahim Musa",     email: "sam.bello@gmail.com", unit: "Block A – 08", phone: "0803 456 7821", status: "Active",   avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Victor Onyekachi", email: "sam.bello@gmail.com", unit: "Block D – 16", phone: "0803 456 7821", status: "Active",   avatar: "https://i.pravatar.cc/150?img=15" },
  { name: "Yusuf Abdullahi",  email: "sam.bello@gmail.com", unit: "Block B – 02", phone: "0803 456 7821", status: "Active",   avatar: "https://i.pravatar.cc/150?img=17" },
  { name: "Kelvin Eze",       email: "sam.bello@gmail.com", unit: "Block C – 10", phone: "0803 456 7821", status: "Active",   avatar: "https://i.pravatar.cc/150?img=20" },
];

export default function SocietyDetailPage() {
  const params   = useParams();
  const router   = useRouter();
  const [activeNav, setActiveNav]   = useState("Societies");
  const [search, setSearch]         = useState("");
  const [resSearch, setResSearch]   = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const society = societies.find((s) => s.id === params.id);

  const filteredResidents = residentsList.filter((r) =>
    r.name.toLowerCase().includes(resSearch.toLowerCase())
  );

  if (!society) {
    return (
      <div className={`${montserrat.className} flex items-center justify-center h-screen text-sm text-gray-400`}>
        Society not found.
      </div>
    );
  }

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
          search={search}
          setSearch={setSearch}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        {/* Breadcrumb */}
        <div className={breadcrumb.wrapper}>
          <button onClick={() => router.push("/Societies")} className={breadcrumb.backBtn}>
            Societies
          </button>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className={breadcrumb.current}>{society.name}</span>
        </div>

        {/* Main Content */}
        <main className={layout.main}>

          {/* Left Panel */}
          <div className={leftPanel.card}>
            <img src={society.image} alt={society.name} className={leftPanel.bannerImg} />
            <div className={leftPanel.name}>{society.name}</div>
            <span className={society.status === "Active" ? leftPanel.statusActive : leftPanel.statusSusp}>
              {society.status}
            </span>
            <div className={leftPanel.location}>{society.location}</div>
            <div className={leftPanel.metaLabel}>Created:</div>
            <div className={leftPanel.metaValue}>{society.created}</div>
            <div className={leftPanel.adminLabel}>Resident Admin:</div>
            <div className={leftPanel.adminRow}>
              <img src={society.adminAvatar} alt={society.admin} className={leftPanel.adminAvatar} />
              <div className={leftPanel.adminInfo}>
                {society.admin} ({society.adminEmail})
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={rightPanel.card}>
            <div className={rightPanel.topBar}>
              <span className={rightPanel.panelTitle}>Residents List</span>
              <div className={rightPanel.searchWrap}>
                <svg className={rightPanel.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search residents"
                  value={resSearch}
                  onChange={(e) => setResSearch(e.target.value)}
                  className={rightPanel.searchInput}
                />
              </div>
            </div>

            {/* Table */}
            <div className={resTable.scroll}>
              <table className={resTable.table}>
                <thead>
                  <tr>
                    {["Resident", "Email", "Unit / Flat", "Phone", "Status"].map((h, i, arr) => (
                      <th key={i} className={`${resTable.th} ${i === 0 ? resTable.thFirst : ""} ${i === arr.length - 1 ? resTable.thLast : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredResidents.map((r, i) => (
                    <tr key={i} className={resTable.tr}>
                      <td className={resTable.residentCell}>
                        <div className={resTable.residentRow}>
                          <img src={r.avatar} alt={r.name} className={resTable.residentAvatar} />
                          <span className={resTable.residentName}>{r.name}</span>
                        </div>
                      </td>
                      <td className={resTable.td}>{r.email}</td>
                      <td className={resTable.td}>{r.unit}</td>
                      <td className={resTable.td}>{r.phone}</td>
                      <td className={resTable.td}>
                        <span className={r.status === "Active" ? resTable.statusActive : resTable.statusInactive}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredResidents.length === 0 && (
                    <tr>
                      <td colSpan={5} className={resTable.emptyCell}>No residents found.</td>
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