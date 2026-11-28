"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { page, breadcrumb, layout, leftPanel, rightPanel, resTable } from "./societyDetail.styles";
import { fetchAdmin, fetchSociety, fetchSocietyResidents, toSociety } from "@/services/societies";
import type { Resident, Society } from "@/types/society";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function SocietyDetailPage() {
  const params   = useParams();
  const router   = useRouter();
  const [activeNav, setActiveNav]   = useState("Societies");
  const [search, setSearch]         = useState("");
  const [resSearch, setResSearch]   = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const societyId = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const [society, setSociety]           = useState<Society | null>(null);
  const [residentsList, setResidents]  = useState<Resident[]>([]);
  const [loading, setLoading]          = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await fetchSociety(societyId);
        if (!d) { if (!cancelled) setLoading(false); return; }
        const [admin, residents] = await Promise.all([
          d.residentAdmin ? fetchAdmin(d.residentAdmin) : Promise.resolve(null),
          fetchSocietyResidents(societyId),
        ]);
        if (cancelled) return;
        const admins = new Map(admin ? [[admin.uid, admin] as const] : []);
        setSociety(toSociety(d, admins, new Map([[d.id, residents.length]])));
        setResidents(residents);
      } catch (err) {
        console.error("[society detail] load failed", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [societyId]);

  const filteredResidents = residentsList.filter((r) =>
    r.name.toLowerCase().includes(resSearch.toLowerCase())
  );

  if (!society) {
    return (
      <div className={`${montserrat.className} flex items-center justify-center h-screen text-sm text-gray-400`}>
        {loading ? "Loading…" : "Society not found."}
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
            <img src={society.image || "/sidebar/logo.png"} alt={society.name} className={leftPanel.bannerImg} />
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
                {society.adminEmail ? `${society.admin} (${society.adminEmail})` : society.admin}
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
                  {filteredResidents.map((r) => (
                    <tr key={r.uid} className={resTable.tr}>
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
