// ─── termsOfService.styles.ts ─────────────────────────────────────────────────

export const page = {
  wrapper: "font-[Montserrat] flex h-screen bg-[#FAFAFA] overflow-hidden",
  content: "flex-1 flex flex-col overflow-hidden",
  main:    "flex-1 overflow-y-auto p-4 sm:p-6 sm:px-7 pb-10",
  title:   "font-bold text-[18px] sm:text-[22px] text-[#1C1C1C] tracking-tight mb-5",
};

export const editor = {
  sectionTitle: "text-[13px] font-bold text-[#1C1C1C] mb-3",
  card:         "bg-[#F9F9F9] rounded-[14px] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden",

  toolbar:      "flex items-center bg-[#3A2FC01A] gap-0.5 px-3 py-2 border-b border-[#F0F0F0] flex-wrap",
  toolBtn:      "w-7 h-7 flex items-center justify-center rounded-md text-[#3A2FC0] hover:bg-[#F5F5F5] border-none bg-transparent cursor-pointer transition-colors text-[13px] font-medium",
  toolBtnActive:"w-7 h-7 flex items-center justify-center rounded-md text-black bg-[#F0F0F0] border-none cursor-pointer transition-colors text-[13px] font-medium",
  divider:      "w-px h-5 bg-[#E8E8E8] mx-1",

  content: [
    "min-h-[400px] p-5 text-[13px] text-[#1C1C1C] leading-[1.8] outline-none",
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2",
    "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2",
    "[&_li]:mb-1",
    "[&_p]:mb-2",
    "[&_strong]:font-semibold",
  ].join(" "),
};

export const saveRow = {
  wrapper: "flex justify-end mt-6",
  btn:     "px-8 py-3 bg-[#E87A00] hover:bg-[#D06A00] text-white text-[13px]  rounded-full border-none cursor-pointer transition-colors duration-150",
};