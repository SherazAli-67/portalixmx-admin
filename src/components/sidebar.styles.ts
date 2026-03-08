// ─── sidebar.styles.ts ───────────────────────────────────────────────────────
// All Tailwind className strings for Sidebar component

export const sidebar = {
  // Overlay (mobile only)
  overlay:       "fixed inset-0 z-40 bg-black/50 lg:hidden",

  // Sidebar wrapper — hidden on mobile, slide in when open
  wrapper:       "fixed lg:static inset-y-0 left-0 z-50 w-[250px] min-w-[250px] h-screen flex flex-col transition-transform duration-300 lg:translate-x-0",
  wrapperOpen:   "-translate-x-0",
  wrapperClosed: "-translate-x-full",

  logoWrap:      "flex items-center justify-between px-5 py-4",
  logo:          "w-auto h-[36px] object-contain",

  // Close button — visible only on mobile
  closeBtn:      "lg:hidden text-white bg-transparent border-none cursor-pointer p-1",

  nav:           "flex-1 py-2 overflow-y-auto",
  navItemActive: "w-full flex items-center gap-3 px-5 py-[14px] text-left transition-all duration-150 relative bg-[#E87A00] text-white border-r-4 border-white",
  navItemIdle:   "w-full flex items-center gap-3 px-5 py-[14px] text-left transition-all duration-150 relative text-white hover:bg-white/10",
  navIcon:       "object-contain flex-shrink-0",
  navLabel:      "text-[14px] leading-[1]",

  bottomWrap:    "px-2 py-3",
  userCard:      "flex items-center gap-3 border border-white/30 rounded-xl px-3 py-3",
  userAvatar:    "w-10 h-10 rounded-full object-cover flex-shrink-0",
  userInfo:      "overflow-hidden",
  userName:      "text-[14px] font-semibold text-white truncate",
  userEmail:     "text-[11px] font-light text-white truncate",

  // Hamburger button — shown in Header on mobile
  hamburger:     "lg:hidden flex items-center justify-center w-8 h-8 text-[#1C1C1C] bg-transparent border-none cursor-pointer",
};