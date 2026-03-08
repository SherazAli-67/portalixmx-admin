// ─── societies.styles.ts ─────────────────────────────────────────────────────
// All Tailwind className strings for SocietiesPage and its modals

export const page = {
  wrapper:      "font-[Montserrat] flex h-screen bg-[#FAFAFA] overflow-hidden",
  content:      "flex-1 flex flex-col overflow-hidden",
  main:         "flex-1 overflow-y-auto p-4 sm:p-6 sm:px-7",
};

// ─── Header row (title + button) ─────────────────────────────────────────────
export const header = {
  row:          "flex items-center justify-between mb-4 sm:mb-5",
  title:        "font-bold text-[18px] sm:text-[22px] text-[#1C1C1C] tracking-tight m-0",
  newBtn:       "flex items-center gap-2 bg-[#3A2FC0] hover:bg-[#2D24A0] text-white text-[12px] sm:text-sm font-medium px-4 sm:px-7 py-2.5 sm:py-3 rounded-full border-none cursor-pointer transition-colors duration-150",
};

// ─── Search bar ──────────────────────────────────────────────────────────────
export const search = {
  wrapper:      "relative mb-4 sm:mb-5 w-full sm:w-[300px]",
  icon:         "absolute left-[14px] top-1/2 -translate-y-1/2 text-[#383838]",
  input:        "w-full pl-9 pr-5 py-[11px] bg-white rounded-full text-[11px] text-[#111] outline-none font-[inherit] box-border",
};

// ─── Table card ──────────────────────────────────────────────────────────────
export const table = {
  card:         "bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F0F0F0]",
  scroll:       "overflow-x-auto px-3 sm:px-4 pt-3 pb-2",
  table:        "w-full border-separate border-spacing-0",
  theadRow:     "bg-[#F9F9F9]",
  th:           "py-3 px-3 sm:px-5 text-left text-[12px] sm:text-[13px] font-semibold text-[#1C1C1C] whitespace-nowrap",
  thFirst:      "rounded-tl-[10px] rounded-bl-[10px]",
  thLast:       "rounded-tr-[10px] rounded-br-[10px]",
  tr:           "",
  td:           "py-[11px] sm:py-[13px] px-3 sm:px-5 text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap border-b border-[#F0F0F0]",
  tdAdmin:      "py-[11px] sm:py-[13px] px-3 sm:px-5 border-b border-[#F0F0F0]",
  tdAdminWrap:  "flex items-center gap-2 sm:gap-[10px]",
  adminAvatar:  "w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0",
  adminName:    "text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap",
  tdResidents:  "py-[11px] sm:py-[13px] px-3 sm:px-5 text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap min-w-[100px] sm:min-w-[140px] border-b border-[#F0F0F0]",
  tdStatus:     "py-[11px] sm:py-[13px] px-3 sm:px-5 whitespace-nowrap border-b border-[#F0F0F0]",
  statusActive: "text-[12px] sm:text-[13px] font-semibold text-[#0AB024]",
  statusSusp:   "text-[12px] sm:text-[13px] font-semibold text-[#E87A00]",
  tdActions:    "py-[11px] sm:py-[13px] px-3 sm:px-5 text-right whitespace-nowrap border-b border-[#F0F0F0]",
  menuBtn:      "bg-transparent border-none cursor-pointer p-1 rounded-md text-[#374151]",
  emptyCell:    "py-10 px-5 text-center text-[12px] text-[#9CA3AF]",
};

// ─── Dropdown menu ────────────────────────────────────────────────────────────
export const dropdown = {
  menuItem:     "flex items-center w-full px-[10px] py-2 rounded-[9px] border-none bg-transparent text-[#1C1C1C] text-[13px] font-normal cursor-pointer transition-colors duration-[120ms] text-left font-[inherit] hover:bg-[#F5F6FA]",
};

// ─── Modal shared ─────────────────────────────────────────────────────────────
export const modal = {
  overlay:      "fixed inset-0 z-[100] flex items-center justify-center bg-black/35",
  card:         "bg-white rounded-[20px] w-full max-w-[420px] mx-4 px-5 sm:px-7 py-5 sm:py-7 shadow-[0_24px_64px_rgba(0,0,0,0.14)] relative",
  headerRow:    "flex items-center justify-center relative mb-[18px] sm:mb-[22px]",
  title:        "text-[17px] sm:text-[20px] font-semibold text-black tracking-tight text-center m-0",
  closeBtn:     "absolute right-0 bg-transparent border-none cursor-pointer text-[#555] flex items-center justify-center w-[28px] h-[28px] rounded-full",
  bannerWrap:   "flex justify-center mb-[18px] sm:mb-[22px]",
  bannerBtn:    "w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full border-none bg-[#F9F9F9] flex flex-col items-center justify-center cursor-pointer overflow-hidden p-0 transition-opacity hover:opacity-85",
  bannerImg:    "w-full h-full object-cover",
  bannerLabel:  "text-[10px] text-[#AAAAAA] mt-1 font-medium",
  fieldWrap:    "mb-3 sm:mb-4",
  label:        "block text-[12px] font-semibold text-[#1C1C1C] mb-[7px]",
  input:        "w-full px-[14px] py-[10px] sm:py-[11px] rounded-[10px] border-none bg-[#F9F9F9] text-[12px] text-[#A8A9AA] outline-none font-[inherit] box-border placeholder:text-[#BDBDBD] focus:bg-[#F0F0F0] transition-colors",
  selectWrap:   "relative",
  select:       "w-full px-[14px] py-[10px] sm:py-[11px] rounded-[10px] border-none bg-[#F9F9F9] text-[12px] text-[#A8A9AA] outline-none font-[inherit] box-border appearance-none cursor-pointer focus:bg-[#F0F0F0] transition-colors",
  selectIcon:   "absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none",
  btnRow:       "flex gap-3 sm:gap-5 mt-2",
  cancelBtn:    "flex-1 py-[10px] rounded-full border border-[#E8E8E8] bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[12px] font-medium text-[#555] cursor-pointer font-[inherit] transition-colors duration-150",
  submitBtn:    "flex-1 py-[10px] rounded-full border-none text-[12px] font-semibold text-white cursor-pointer font-[inherit] transition-colors duration-150",
  submitActive: "bg-[#E87A00] hover:bg-[#D06A00]",
  submitDisabled:"bg-[#F5C380] cursor-not-allowed",
  saveBtn:      "flex-1 py-[10px] rounded-full border-none bg-[#E87A00] hover:bg-[#D06A00] text-[12px] font-semibold text-white cursor-pointer font-[inherit] transition-colors duration-150",
};

// ─── Confirm modal (Delete / Suspend) ─────────────────────────────────────────
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