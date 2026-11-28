// ─── societyDetail.styles.ts ──────────────────────────────────────────────────
// All Tailwind className strings for SocietyDetailPage

export const page = {
  wrapper:        "font-[Montserrat] flex h-screen bg-[#FAFAFA] overflow-hidden",
  content:        "flex flex-1 flex-col overflow-hidden",
};

export const breadcrumb = {
  wrapper:        "flex items-center gap-1.5 px-4 sm:px-7 pt-4 sm:pt-5",
  backBtn:        "bg-transparent border-none cursor-pointer text-black text-[13px] sm:text-[15px] p-0",
  chevron:        "text-black",
  current:        "text-[13px] sm:text-sm font-semibold text-[#E87A00]",
};

export const layout = {
  main:           "flex flex-1 overflow-y-auto flex-col lg:flex-row p-4 sm:px-7 pb-7 gap-4 sm:gap-5 overflow-x-hidden",
};

// ─── Left Panel ───────────────────────────────────────────────────────────────
export const leftPanel = {
  card:           "w-full lg:w-[270px] lg:flex-shrink-0 bg-white rounded-[18px] border border-[#F0F0F0] shadow-sm p-4 lg:self-start",
  bannerImg:      "w-full h-[160px] sm:h-[148px] object-cover rounded-xl mb-3.5",
  name:           "text-[15px] font-medium text-black mb-2",
  statusActive:   "inline-block text-[11px] font-medium px-3.5 py-0.5 rounded-full mb-3 bg-[#E6F9E8] text-[#0AB024]",
  statusSusp:     "inline-block text-[11px] font-medium px-3.5 py-0.5 rounded-full mb-3 bg-[#FFF3E0] text-[#E87A00]",
  location:       "text-xs text-black mb-4",
  metaLabel:      "text-xs text-black font-semibold mb-0.5",
  metaValue:      "text-[11px] text-black mb-4",
  adminLabel:     "text-xs text-black font-semibold mb-1",
  adminRow:       "flex items-center gap-2",
  adminAvatar:    "w-6 h-6 rounded-full object-cover flex-shrink-0",
  adminInfo:      "text-[10px] font-light text-black leading-snug",
};

// ─── Right Panel ──────────────────────────────────────────────────────────────
export const rightPanel = {
  card:           "flex flex-1 flex-col bg-white rounded-[18px] border border-[#F0F0F0] shadow-sm p-4 sm:p-5 pb-3 w-full lg:max-w-[calc(100%-290px)] min-h-[400px] lg:min-h-0 overflow-hidden",
  topBar:         "flex items-center justify-between mb-4 gap-3 flex-wrap flex-shrink-0",
  panelTitle:     "text-[15px] sm:text-[17px] font-semibold text-black",
  searchWrap:     "relative",
  searchIcon:     "absolute left-4 top-1/2 -translate-y-1/2 text-black",
  searchInput:    "w-[140px] sm:w-[200px] pl-9 py-[8px] sm:py-[10px] bg-[#FAFAFA] border border-[#FAFAFA] rounded-full text-[11px] text-black placeholder:text-[#999999] outline-none focus:border-[#D1D5DB] transition-all duration-200",
};

// ─── Residents Table ──────────────────────────────────────────────────────────
export const resTable = {
  scroll:         "overflow-auto flex-1 min-h-[300px]",
  table:          "w-full border-separate border-spacing-0",
  th:             "px-2 sm:px-3 py-2.5 text-left text-[11px] sm:text-[13px] font-medium text-black bg-[#F9F9F9] whitespace-nowrap leading-6 tracking-[0.15px]",
  thFirst:        "rounded-tl-xl rounded-bl-xl",
  thLast:         "rounded-tr-xl rounded-br-xl",
  tr:             "",
  td:             "px-2 sm:px-3 py-[9px] sm:py-[11px] text-[11px] sm:text-[13px] leading-6 tracking-[0.15px] text-black whitespace-nowrap border-b border-[#F0F0F0]",
  residentCell:   "px-2 sm:px-3 py-[9px] sm:py-[11px] border-b border-[#F0F0F0]",
  residentRow:    "flex items-center gap-1.5 sm:gap-2",
  residentAvatar: "w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover",
  residentName:   "text-[11px] sm:text-[13px] leading-6 tracking-[0.15px] text-black whitespace-nowrap",
  statusActive:   "text-[11px] sm:text-[13px] leading-6 tracking-[0.15px] text-[#0AB024]",
  statusInactive: "text-[11px] sm:text-[13px] leading-6 tracking-[0.15px] text-[#E87A00]",
  emptyCell:      "px-3 py-8 text-center text-xs text-gray-400",
};