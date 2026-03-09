// ─── PaymentsFinance.styles.ts ────────────────────────────────────────────────

export const page = {
  wrapper:        "font-[Montserrat] flex h-screen bg-[#FAFAFA] overflow-hidden",
  content:        "flex-1 flex flex-col overflow-hidden",
  main:           "flex-1 overflow-y-auto p-4 sm:p-6 sm:px-7",
};

export const header = {
  row:            "flex items-center justify-between mb-4 sm:mb-5",
  title:          "font-bold text-[18px] sm:text-[22px] text-[#1C1C1C] tracking-tight m-0",
  exportBtn:      "flex items-center gap-2 px-4 py-[10px] rounded-full text-white text-[12px] sm:text-[13px] font-semibold border-none cursor-pointer font-[inherit] transition-opacity duration-150 hover:opacity-90 bg-[#3A2FC0]",
};

export const search = {
  row:            "flex items-center gap-3 mb-4 sm:mb-5 flex-wrap",
  wrapper:        "relative w-full sm:w-[300px]",
  icon:           "absolute left-[14px] top-1/2 -translate-y-1/2 text-[#383838]",
  input:          "w-full pl-9 pr-5 py-[11px] bg-white rounded-full text-[11px] text-[#111] outline-none font-[inherit] box-border ",
};

export const filter = {
  wrapper:        "relative",
  btn:            "flex items-center gap-2 px-4 py-[10px] bg-white rounded-full  text-[12px] text-[#555] font-medium cursor-pointer font-[inherit] outline-none",
  btnMonth:       "text-[#999]",
  dropdown:       "absolute top-[calc(100%+6px)] left-0 z-50 bg-white rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#F0F0F0] py-1.5 min-w-[160px]",
  itemActive:     "w-full text-left px-4 py-[8px] text-[12px] font-[inherit] border-none cursor-pointer transition-colors duration-100 bg-[#F5F6FA] text-[#1C1C1C] font-semibold",
  item:           "w-full text-left px-4 py-[8px] text-[12px] font-[inherit] border-none cursor-pointer transition-colors duration-100 bg-transparent text-[#555] hover:bg-[#F5F6FA]",
};

export const table = {
  card:           "bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F0F0F0]",
  scroll:         "overflow-x-auto px-3 sm:px-4 pt-3 pb-2",
  table:          "w-full border-separate border-spacing-0",
  theadRow:       "bg-[#F9F9F9]",
  th:             "py-3 px-3 sm:px-5 text-left text-[12px] sm:text-[13px] font-semibold text-[#1C1C1C] whitespace-nowrap",
  thFirst:        "rounded-tl-[10px] rounded-bl-[10px]",
  thLast:         "rounded-tr-[10px] rounded-br-[10px]",
  tr:             "",
  td:             "py-[11px] sm:py-[13px] px-3 sm:px-5 text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap border-b border-[#F0F0F0]",
  tdAmount:       "py-[11px] sm:py-[13px] px-3 sm:px-5 text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap border-b border-[#F0F0F0] font-semibold",
  tdAdmin:        "py-[11px] sm:py-[13px] px-3 sm:px-5 border-b border-[#F0F0F0]",
  tdAdminWrap:    "flex items-center gap-2 sm:gap-[10px]",
  adminAvatar:    "w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0",
  adminName:      "text-[12px] sm:text-[13px] text-[#1C1C1C] whitespace-nowrap",
  emptyCell:      "py-10 px-5 text-center text-[12px] text-[#9CA3AF]",
};

export const modal = {
  overlay:        "fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm",
  card:           "bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 px-6 py-5",
  headerRow:      "flex items-center justify-between mb-5",
  title:          "text-[16px] font-semibold text-[#1C1C1C] text-center flex-1",
  closeBtn:       "text-[#1C1C1C] bg-transparent border-none cursor-pointer flex p-0 w-fit shrink-0",
  fieldLabel:     "text-[12px] font-semibold text-[#1C1C1C] mb-1",
  fieldBox:       "w-full px-3 py-[10px] rounded-[10px] bg-[#FAFAFA] text-[12px] text-[#A8A9AA] font-[inherit] mb-3 box-border",
  selectWrapper:  "relative flex items-center mb-3",
  selectBox:      "w-full px-3 py-[10px] rounded-[10px] bg-[#FAFAFA]  text-[12px] text-[#A8A9AA] font-[inherit] box-border appearance-none cursor-pointer outline-none",
  selectIcon:     "absolute right-3 pointer-events-none text-[#999]",
  adminWrap:      "w-full flex items-center gap-2 px-3 py-[8px] rounded-[10px] bg-[#FAFAFA]  mb-3",
  adminAvatar:    "w-6 h-6 rounded-full object-cover shrink-0",
  adminName:      "text-[12px] text-[#1C1C1C]",
  footerRow:      "flex items-center gap-5 mt-4",
  cancelBtn:      "flex-1 py-[11px] rounded-full text-[#555] text-[13px]  border-none cursor-pointer font-[inherit] bg-[#F0F0F0] hover:opacity-80 transition-opacity duration-150",
  closeActionBtn: "block mx-auto px-10 py-[11px] rounded-full text-white text-[13px]  border-none cursor-pointer font-[inherit] mt-2 bg-[#E87A00] hover:opacity-90 transition-opacity duration-150",
  exportBtn:      "flex-1 py-[11px] rounded-full text-white text-[13px]  border-none cursor-pointer font-[inherit] bg-[#E87A00] hover:opacity-90 transition-opacity duration-150",
};