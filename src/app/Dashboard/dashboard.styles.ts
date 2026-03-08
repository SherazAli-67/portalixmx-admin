// ─── dashboard.styles.ts ──────────────────────────────────────────────────────
// All Tailwind className strings for Dashboard page

export const page = {
  wrapper:        "flex h-screen bg-[#FAFAFA] overflow-hidden",
  content:        "flex-1 flex flex-col overflow-hidden",
  main:           "flex-1 overflow-y-auto px-4 sm:px-7 py-4 sm:py-6",
  title:          "font-bold text-[18px] sm:text-[20px] text-black mb-4 sm:mb-5 tracking-tight",
};

// ─── Stats Cards ──────────────────────────────────────────────────────────────
export const statsGrid = {
  grid:           "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-7",
  card:           "bg-white rounded-2xl px-4 sm:px-5 py-4 sm:py-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F0F0F0] flex flex-col gap-3",
  iconWrap:       "w-9 h-9 sm:w-10 sm:h-10 rounded-4xl flex items-center justify-center flex-shrink-0",
  icon:           "w-4 h-4 sm:w-5 sm:h-5 object-contain",
  label:          "text-[13px] sm:text-[15px] text-black font-small mb-1",
  value:          "text-[18px] sm:text-[20px] font-bold text-black leading-tight",
};

// ─── Recent Transactions ──────────────────────────────────────────────────────
export const transactions = {
  sectionTitle:   "font-bold text-[15px] sm:text-[17px] text-black mb-3",
  card:           "bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F0F0F0] overflow-hidden",
  scroll:         "overflow-x-auto px-3 sm:px-4 pt-3 pb-2",
  table:          "w-full border-separate border-spacing-y-0",
  theadRow:       "bg-[#F9F9F9]",
  th:             "px-3 sm:px-4 py-3 sm:py-3.5 text-left text-[12px] sm:text-[13px] font-semibold text-black whitespace-nowrap",
  thFirst:        "rounded-l-xl",
  thLast:         "rounded-r-xl",
  tr:             "border-b border-[#F8F8F8] hover:bg-[#FAFAFA] transition-colors duration-100",
  tdId:           "px-3 sm:px-6 py-3 sm:py-3.5 text-[12px] sm:text-[13px] text-black whitespace-nowrap",
  tdAdmin:        "px-3 sm:px-6 py-3 sm:py-3.5",
  tdAdminRow:     "flex items-center gap-2 sm:gap-2.5",
  adminAvatar:    "w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover flex-shrink-0",
  adminName:      "text-[12px] sm:text-[13px] text-black whitespace-nowrap",
  td:             "px-3 sm:px-6 py-3 sm:py-3.5 text-[12px] sm:text-[13px] text-black whitespace-nowrap",
  emptyCell:      "px-6 py-8 text-center text-xs text-gray-400",
};