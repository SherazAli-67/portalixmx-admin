// ─── settings.styles.ts ──────────────────────────────────────────────────────

export const page = {
  wrapper:      "font-[Montserrat] flex h-screen bg-[#FAFAFA] overflow-hidden",
  content:      "flex-1 flex flex-col overflow-hidden",
  main:         "flex-1 overflow-y-auto p-4 sm:p-6 sm:px-7 pb-10",
  title:        "font-bold text-[18px] sm:text-[22px] text-[#1C1C1C] tracking-tight mb-5 sm:mb-7",
};

// ─── Form Grid ────────────────────────────────────────────────────────────────
export const form = {
  grid:         "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6",
  fieldWrap:    "flex flex-col gap-1.5",
  label:        "text-[12px] font-medium text-[#1C1C1C]",
  input:        "w-full px-4 py-[11px] rounded-[10px] bg-[#F5F5F5] border border-[#F5F5F5] text-[12px] text-[#A8A9AA] outline-none placeholder:text-[#BDBDBD] focus:border-[#D1D5DB] focus:bg-white transition-all duration-200 font-[inherit]",
  selectWrap:   "relative",
  select:       "w-full px-4 py-[11px] rounded-[10px] bg-[#F5F5F5] border border-[#F5F5F5] text-[12px] text-[#A8A9AA] outline-none appearance-none cursor-pointer focus:border-[#D1D5DB] focus:bg-white transition-all duration-200 font-[inherit]",
  selectIcon:   "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black",
  fileWrap:     "flex items-center rounded-[10px] bg-[#F5F5F5] px-2 py-[5px]",
  fileBtn:      "px-4 py-[6px] text-[12px] text-[#555] bg-white rounded-[10px] shadow-sm whitespace-nowrap font-[inherit] cursor-pointer hover:bg-[#F9F9F9] transition-colors border-none flex-shrink-0",
  fileName:     "px-3 text-[12px] text-[#BDBDBD] flex-1",
};

// ─── Section ──────────────────────────────────────────────────────────────────
export const section = {
  title:        "font-bold text-[15px] sm:text-[17px] text-[#1C1C1C] mb-4 mt-2",
  divider:      "border-none border-t border-[#F0F0F0] my-5",
};

// ─── FAQs ─────────────────────────────────────────────────────────────────────
export const faq = {
  wrapper:      "flex flex-col gap-4 mb-5",
  item:         "flex items-start justify-between gap-4 pb-4 border-b border-[#F0F0F0]",
  textWrap:     "flex-1",
  question:     "text-[13px] font-semibold text-[#1C1C1C] mb-0.5",
  answer:       "text-[12px] text-[#555] leading-[1.6]",
  actions:      "flex items-center gap-2 flex-shrink-0 mt-0.5",
  editBtn:      "bg-transparent border-none cursor-pointer text-[#E87A00] hover:opacity-70 transition-opacity p-1",
  deleteBtn:    "bg-transparent border-none cursor-pointer text-[#E53E3E] hover:opacity-70 transition-opacity p-1",
  addBtn:       "flex items-center gap-1.5 text-[12px] font-medium text-[#E87A00] bg-transparent border border-[#E87A00] rounded-full px-4 py-2 cursor-pointer hover:bg-[#FFF4E6] transition-colors duration-150",
};

// ─── Save Button ──────────────────────────────────────────────────────────────
export const saveRow = {
  wrapper:      "flex justify-end mt-6",
  btn:          "px-8 py-3 bg-[#E87A00] hover:bg-[#D06A00] text-white text-[13px]  rounded-full border-none cursor-pointer transition-colors duration-150",
};

// ─── Delete FAQ Modal ─────────────────────────────────────────────────────────
export const deleteModal = {
  overlay:      "fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/25",
  card:         "bg-white rounded-2xl shadow-2xl w-full max-w-[380px] mx-4 px-8 py-6 relative font-[Montserrat]",
  headerRow:    "flex items-center justify-between mb-8",
  spacer:       "w-[18px]",
  title:        "text-[17px] font-semibold text-black text-center flex-1",
  closeBtn:     "text-black border-none bg-transparent cursor-pointer flex",
  body:         "text-[12px] sm:text-[13px] text-black text-center leading-[1.6] mb-8",
  btnRow:       "flex items-center gap-3",
  cancelBtn:    "flex-1 py-[10px] rounded-full bg-[#F0F0F0] hover:bg-[#E5E5E5] text-[12px]  text-[#515355] border-none cursor-pointer font-[inherit] transition-colors duration-150",
  confirmBtn:   "flex-1 py-[10px] rounded-full bg-[#E87A00] hover:bg-[#D06A00] text-[12px]  text-white border-none cursor-pointer font-[inherit] transition-colors duration-150",
};
export const faqModal = {
  overlay:      "fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/25",
  card:         "bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 px-6 sm:px-8 py-5 relative font-[Montserrat]",
  headerRow:    "flex items-center justify-between mb-6",
  spacer:       "w-[18px]",
  title:        "text-[17px] font-semibold text-black text-center flex-1",
  closeBtn:     "text-black border-none bg-transparent cursor-pointer flex",
  fieldWrap:    "flex flex-col gap-1.5 mb-4",
  label:        "text-[12px] font-medium text-[#1C1C1C]",
  input:        "w-full px-4 py-[11px] rounded-[10px] bg-[#F5F5F5] border border-[#F5F5F5] text-[12px] text-[#1C1C1C] outline-none placeholder:text-[#BDBDBD] focus:border-[#D1D5DB] transition-all font-[inherit]",
  textarea:     "w-full px-4 py-[11px] rounded-[10px] bg-[#F5F5F5] border border-[#F5F5F5] text-[12px] text-[#1C1C1C] outline-none placeholder:text-[#BDBDBD] focus:border-[#D1D5DB] transition-all font-[inherit] resize-none h-[90px]",
  btnRow:       "flex gap-3 mt-2",
  cancelBtn:    "flex-1 py-[10px] rounded-full bg-[#F0F0F0] hover:bg-[#E5E5E5] text-[12px]  text-[#515355] border-none cursor-pointer font-[inherit] transition-colors",
  saveBtn:      "flex-1 py-[10px] rounded-full bg-[#E87A00] hover:bg-[#D06A00] text-[12px]  text-white border-none cursor-pointer font-[inherit] transition-colors",
};