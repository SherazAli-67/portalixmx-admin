// ─── residentAdmin.styles.ts ──────────────────────────────────────────────────
// All Tailwind className strings for ResidentAdminPage

export const page = {
  wrapper:      "font-[Montserrat] flex h-screen bg-[#FAFAFA] overflow-hidden",
  content:      "flex-1 flex flex-col overflow-hidden",
  main:         "flex-1 overflow-y-auto p-4 sm:p-6 sm:px-7",
};

export const header = {
  row:          "flex items-center justify-between mb-4 sm:mb-5",
  title:        "font-bold text-[18px] sm:text-[22px] text-[#1C1C1C] tracking-tight m-0",
};

export const search = {
  wrapper:      "relative mb-4 sm:mb-5 w-full sm:w-[300px]",
  icon:         "absolute left-[14px] top-1/2 -translate-y-1/2 text-[#999]",
  input:        "w-full pl-9 pr-5 py-[11px] bg-white rounded-full text-[11px] text-[#111] outline-none font-[inherit] box-border",
};

export const table = {
  card:         "bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F0F0F0]",
  scroll:       "overflow-x-auto px-3 sm:px-4 pt-3 pb-2",
  table:        "w-full border-separate border-spacing-0",
  theadRow:     "bg-[#F9F9F9]",
  th:           "py-3 px-3 sm:px-5 text-left text-[12px] sm:text-[13px] font-semibold text-[#1C1C1C] whitespace-nowrap",
  thFirst:      "rounded-tl-[10px] rounded-bl-[10px]",
  thLast:       "rounded-tr-[10px] rounded-br-[10px]",
  tr:           "",
  tdAdmin:      "py-[11px] sm:py-[13px] px-3 sm:px-5 border-b border-[#F0F0F0]",
  tdAdminWrap:  "flex items-center gap-2 sm:gap-[10px]",
  adminAvatar:  "w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0",
  adminName:    "text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap",
  td:           "py-[11px] sm:py-[13px] px-3 sm:px-5 text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap border-b border-[#F0F0F0]",
  tdStatus:     "py-[11px] sm:py-[13px] px-3 sm:px-5 whitespace-nowrap border-b border-[#F0F0F0]",
  statusActive: "text-[12px] sm:text-[13px] font-semibold text-[#0AB024]",
  statusSusp:   "text-[12px] sm:text-[13px] font-semibold text-[#E87A00]",
  tdActions:    "py-[11px] sm:py-[13px] px-3 sm:px-5 text-right whitespace-nowrap border-b border-[#F0F0F0]",
  menuBtn:      "bg-transparent border-none cursor-pointer p-1 rounded-md text-[#374151]",
  emptyCell:    "py-10 px-5 text-center text-[12px] text-[#9CA3AF]",
};

export const dropdown = {
  menuItem:     "flex items-center w-full px-[10px] py-2 rounded-[9px] border-none bg-transparent text-[#1C1C1C] text-[13px] font-normal cursor-pointer transition-colors duration-[120ms] text-left font-[inherit] hover:bg-[#F5F6FA]",
};

export const confirm = {
  overlay:      "fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/25",
  card:         "bg-white rounded-2xl shadow-2xl w-full max-w-[360px] mx-4 px-6 sm:px-8 py-4 relative font-[Montserrat]",
  headerRow:    "flex items-center justify-between mb-7 sm:mb-10",
  spacer:       "w-[18px]",
  title:        "text-[17px] sm:text-[20px] font-semibold text-black text-center",
  closeBtn:     "text-black border-none bg-transparent cursor-pointer flex",
  body:         "text-[12px] sm:text-[13px] text-black text-center leading-[1.6] mb-8 sm:mb-12",
  btnRow:       "flex items-center gap-3 sm:gap-5",
  cancelBtn:    "flex-1 py-[10px] rounded-full bg-[#F0F0F0] hover:bg-[#E5E5E5] text-[12px] font-medium text-[#515355] border-none cursor-pointer font-[inherit] transition-colors duration-150",
  confirmBtn:   "flex-1 py-[10px] rounded-full text-[12px] font-medium text-white border-none cursor-pointer font-[inherit] transition-colors duration-150",
};