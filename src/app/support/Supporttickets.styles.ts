// ─── Supporttickets.styles.ts ─────────────────────────────────────────────────

export const page = {
  wrapper:      "font-[Montserrat] flex h-screen bg-[#FAFAFA]",
  content:      "flex-1 flex flex-col min-h-0",
  main:         "flex-1 overflow-y-auto p-4 sm:p-6 sm:px-7",
};

export const header = {
  row:          "flex items-center justify-between mb-4 sm:mb-5",
  title:        "font-bold text-[18px] sm:text-[22px] text-[#1C1C1C] tracking-tight m-0",
};

export const search = {
  row:          "flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3",
  wrapper:      "relative w-full sm:w-[300px]",
  icon:         "absolute left-[14px] top-1/2 -translate-y-1/2 text-[#383838]",
  input:        "w-full pl-9 pr-5 py-[11px] bg-white rounded-full text-[11px] text-[#111] outline-none font-[inherit] box-border border border-[#F0F0F0]",
};

export const filter = {
  wrapper:      "relative",
  btn:          "flex items-center gap-2 px-4 py-[10px] bg-white rounded-full border border-[#F0F0F0] text-[12px] text-[#555] font-medium cursor-pointer font-[inherit] outline-none",
  btnValue:     "text-[#999]",
  dropdown:     "absolute top-[calc(100%+6px)] right-0 z-50 bg-white rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#F0F0F0] py-1.5 min-w-[130px]",
  itemActive:   "w-full text-left px-4 py-[8px] text-[12px] font-[inherit] border-none cursor-pointer transition-colors duration-100 bg-[#F5F6FA] text-[#1C1C1C] font-semibold",
  item:         "w-full text-left px-4 py-[8px] text-[12px] font-[inherit] border-none cursor-pointer transition-colors duration-100 bg-transparent text-[#555] hover:bg-[#F5F6FA]",
};

export const table = {
  card:         "bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F0F0F0]",
  scroll:       "overflow-x-auto px-3 sm:px-4 pt-3 pb-2",
  table:        "w-full border-separate border-spacing-0",
  theadRow:     "bg-[#F9F9F9]",
  th:           "py-3 px-3 sm:px-5 text-left text-[12px] sm:text-[13px] font-semibold text-[#1C1C1C] whitespace-nowrap",
  thFirst:      "rounded-tl-[10px] rounded-bl-[10px]",
  thLast:       "rounded-tr-[10px] rounded-br-[10px]",
  tr:           "cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-100",
  td:           "py-[11px] sm:py-[13px] px-3 sm:px-5 text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap border-b border-[#F0F0F0]",
  tdAdmin:      "py-[11px] sm:py-[13px] px-3 sm:px-5 border-b border-[#F0F0F0]",
  tdAdminWrap:  "flex items-center gap-2 sm:gap-[10px]",
  adminAvatar:  "w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0",
  adminName:    "text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap",
  tdMsg:        "py-[11px] sm:py-[13px] px-3 sm:px-5 text-[12px] sm:text-[13px] text-[#1C1C1C] max-w-[180px] border-b border-[#F0F0F0] truncate",
  tdStatus:     "py-[11px] sm:py-[13px] px-3 sm:px-5 whitespace-nowrap border-b border-[#F0F0F0]",
  statusOpen:   "text-[12px] sm:text-[13px]  text-[#E87A00]",
  statusClosed: "text-[12px] sm:text-[13px]  text-[#0AB024]",
  tdActions:    "py-[11px] sm:py-[13px] px-3 sm:px-5 text-right whitespace-nowrap border-b border-[#F0F0F0]",
  menuBtn:      "bg-transparent border-none cursor-pointer p-1 rounded-md text-[#374151]",
  emptyCell:    "py-10 px-5 text-center text-[12px] text-[#9CA3AF]",
};

export const dropdown = {
  menuItem:     "flex items-center w-full px-[10px] py-2 rounded-[9px] border-none bg-transparent text-[#1C1C1C] text-[13px] font-normal cursor-pointer transition-colors duration-[120ms] text-left font-[inherit] hover:bg-[#F5F6FA]",
};

export const closeTicket = {
  overlay:    "fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm",
  card:       "bg-white rounded-2xl shadow-2xl w-full max-w-[360px] mx-4 px-6 sm:px-8 py-4 relative",
  headerRow:  "flex items-center justify-between mb-7 sm:mb-10",
  spacer:     "w-[18px]",
  title:      "text-[16px] sm:text-[18px] font-semibold text-black",
  closeBtn:   "text-black hover:text-black transition-colors",
  body:       "text-[12px] sm:text-[13px] text-black text-center leading-[1.6] mb-8 sm:mb-12",
  btnRow:     "flex items-center gap-3",
  cancelBtn:  "flex-1 py-[10px] rounded-full bg-[#F0F0F0] text-[12px] font-medium text-[#515355] hover:bg-[#E5E5E5] transition-colors duration-150",
  confirmBtn: "flex-1 py-[10px] rounded-full bg-[#E87A00] text-[12px] font-medium text-white hover:bg-[#EA6C0E] transition-colors duration-150",
};

export const modal = {
  overlay:        "fixed inset-0 z-[100] flex items-center justify-center bg-black/35",
  card:           "bg-white rounded-[20px] w-full max-w-[420px] mx-4 px-5 sm:px-7 py-4 sm:py-5 shadow-[0_24px_64px_rgba(0,0,0,0.14)] relative",
  headerRow:      "flex items-center justify-center relative mb-2 sm:mb-3",
  title:          "text-[17px] sm:text-[20px] font-semibold text-black tracking-tight text-center m-0",
  closeBtn:       "absolute right-0 bg-transparent border-none cursor-pointer text-[#555] flex items-center justify-center w-[28px] h-[28px] rounded-full",
  fieldWrap:      "mb-1.5",
  label:          "block text-[12px] font-semibold text-[#1C1C1C] mb-1",
  fieldBox:       "w-full px-[14px] py-[8px] rounded-[10px] border-none bg-[#F9F9F9] text-[12px] text-[#A8A9AA] outline-none font-[inherit] box-border",
  adminWrap:      "w-full flex items-center gap-2 px-[14px] py-[7px] rounded-[10px] bg-[#F9F9F9]",
  adminAvatar:    "w-6 h-6 rounded-full object-cover shrink-0",
  adminName:      "text-[12px] text-[#1C1C1C]",
  replySection:   "mt-1 mb-2",
  replyTitle:     "text-[14px] font-semibold text-[#1C1C1C] mb-2",
  textarea:       "w-full px-[14px] py-[8px] rounded-[10px] border-none bg-[#F9F9F9] text-[12px] text-[#A8A9AA] outline-none font-[inherit] box-border resize-none min-h-[70px] placeholder:text-[#BDBDBD]",
  btnRow:         "flex items-center gap-5 mt-3",
  cancelBtn:      "flex-1 py-[10px] rounded-full border-none bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[12px] font-medium text-[#555] cursor-pointer font-[inherit] transition-colors duration-150",

  closeTicketBtn: "flex-1 py-[10px] rounded-full border-none bg-[#FF4444] hover:bg-[#E03030] text-[12px] font-semibold text-white cursor-pointer font-[inherit] transition-colors duration-150",
  sendBtn:        "flex-1 py-[10px] rounded-full border-none bg-[#E87A00] hover:bg-[#D06A00] text-[12px] font-semibold text-white cursor-pointer font-[inherit] transition-colors duration-150",
};