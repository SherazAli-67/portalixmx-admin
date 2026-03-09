// ─── header.styles.ts ────────────────────────────────────────────────────────
// All Tailwind className strings for Header component and Logout modal

export const header = {
  wrapper:        "h-[56px] min-h-[56px] bg-white border-b border-[#F0F0F0] flex items-center px-3 sm:px-6 gap-2 sm:gap-4",
  searchWrap:     "flex-1 max-w-[200px] sm:max-w-[350px] relative",
  searchIcon:     "absolute left-4 top-1/2 -translate-y-1/2 text-black",
  searchInput:    "w-full pl-9 pr-3 sm:pr-5 py-[8px] bg-[#FAFAFA] border border-[#FAFAFA] rounded-full text-[11px] text-black placeholder:text-[#999999] outline-none focus:border-[#D1D5DB] transition-all duration-200",
  avatarWrap:     "ml-auto flex items-center relative",
  avatar:         "w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover cursor-pointer ring-2 ring-[#F0F0F0] select-none",
};

export const dropdown = {
  wrapper:        "absolute -left-24 top-[calc(100%+2px)] z-50",
  inner:          "relative py-2 px-2 min-w-[148px]",
  logoutBtn:      "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#F8483A] hover:bg-[#FFF4F3] transition-colors duration-150 group",
  logoutIcon:     "text-[#F8483A] flex-shrink-0",
  logoutLabel:    "underline underline-offset-2",
};

export const logoutModal = {
  overlay:        "fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm",
  card:           "bg-white rounded-2xl shadow-2xl w-full max-w-[360px] mx-4 px-6 sm:px-8 py-4 relative",
  headerRow:      "flex items-center justify-between mb-7 sm:mb-10",
  spacer:         "w-[18px]",
  title:          "text-[16px] sm:text-[18px] font-semibold text-black",
  closeBtn:       "text-black hover:text-black transition-colors",
  body:           "text-[12px] sm:text-[13px] text-black text-center leading-[1.6] mb-8 sm:mb-12",
  btnRow:         "flex items-center gap-3",
  cancelBtn:      "flex-1 py-[10px] rounded-full bg-[#F0F0F0] text-[12px] text-[#515355] hover:bg-[#E5E5E5] transition-colors duration-150",
  confirmBtn:     "flex-1 py-[10px] rounded-full bg-[#E87A00] text-[12px] text-white hover:bg-[#EA6C0E] transition-colors duration-150",
};