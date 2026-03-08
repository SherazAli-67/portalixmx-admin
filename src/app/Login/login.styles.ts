// ─── login.styles.ts ─────────────────────────────────────────────────────────
// All Tailwind className strings for LoginPage and ForgotPassword modal

export const page = {
  wrapper:        "min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat",
  overlay:        "absolute inset-0 bg-black/25",
};

// ─── Login Card ───────────────────────────────────────────────────────────────
export const card = {
  wrapper:        "relative z-10 w-full max-w-[450px] mx-4 backdrop-blur-2xl rounded-2xl px-6 sm:px-11 pt-6 pb-5 shadow-[0_20px_60px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.4)] animate-cardIn",
  logoWrap:       "flex flex-col items-center mb-0",
  logo:           "w-[160px] sm:w-[220px] h-auto object-contain",
  title:          "font-semibold text-[16px] sm:text-[18px] text-black text-center -mt-8 sm:-mt-10 mb-1.5 leading-[24px] tracking-[0px]",
  subtitle:       "font-light text-[11.5px] sm:text-[12.5px] text-black text-center mb-3.5 leading-[20px] tracking-[0px]",
  copyright:      "font-normal text-[12px] text-[#383838] text-center mt-3.5 leading-[132%] tracking-[0px]",
};

// ─── Form ─────────────────────────────────────────────────────────────────────
export const form = {
  wrapper:        "flex flex-col gap-2.5",
  errorBox:       "bg-[#fff0f0] border border-[#ffcccc] text-[#cc3333] text-[13px] px-3.5 py-2.5 rounded-lg",
  fieldWrap:      "flex flex-col gap-1.5",
  label:          "font-medium text-[12px] text-[#1C1C1C] leading-[16px] tracking-[0px]",
  inputWrap:      "relative",
  inputIcon:      "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 object-contain",
  input:          "w-full pl-9 pr-3.5 py-[11px] border border-[#e0e0e0] rounded-[13px] text-[11px] text-[#A8A9AA] bg-white/90 outline-none transition-all duration-200 focus:border-[#E8890C] focus:ring-[3px] focus:ring-[#E8890C]/10 placeholder:text-[#bbb]",
  inputPassword:  "w-full pl-9 pr-3.5 py-[11px] border border-[#e0e0e0] rounded-[13px] text-[11px] text-black bg-white/90 outline-none transition-all duration-200 focus:border-[#E8890C] focus:ring-[3px] focus:ring-[#E8890C]/10 placeholder:text-[#bbb]",
  forgotWrap:     "text-left -mt-2",
  forgotBtn:      "text-[11px] text-[#E87A00] font-medium hover:underline bg-transparent border-none cursor-pointer p-0",
  submitBtn:      "mt-1.5 w-full min-h-[42px] bg-[#E87A00] text-white text-[13px] font-semibold rounded-4xl cursor-pointer tracking-[0px] transition-all duration-200 flex items-center justify-center hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(232,137,12,0.5)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed",
  spinner:        "w-[18px] h-[18px] border-[2.5px] border-white/40 border-t-white rounded-full animate-spin inline-block",
};

// ─── Forgot Password Modal ────────────────────────────────────────────────────
export const forgotModal = {
  overlay:        "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm",
  card:           "relative w-full max-w-[360px] mx-4 bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.22)] animate-modalIn overflow-hidden",
  headerRow:      "flex items-center justify-between px-6 sm:px-8 pt-4 pb-2",
  spacer:         "w-8",
  title:          "font-semibold text-[14px] text-[#1C1C1C] text-center flex-1",
  closeBtn:       "w-5 h-5 flex -mr-4 ml-4 items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-150 text-black hover:text-gray-600",
  divider:        "h-px bg-white mx-0 mt-2 mb-6",
  body:           "px-6 sm:px-8 pb-8",

  // Success state
  successWrap:    "flex flex-col items-center gap-4 py-4",
  successIcon:    "w-14 h-14 bg-[#fff4e6] rounded-full flex items-center justify-center",
  successText:    "text-[13px] text-[#383838] text-center leading-[1.6]",
  successEmail:   "font-semibold text-[#1C1C1C]",
  successBtn:     "mt-2 px-8 py-2.5 bg-[#E87A00] text-white text-[13px] font-semibold rounded-full hover:shadow-[0_6px_20px_rgba(232,137,12,0.4)] transition-all duration-200",

  // Form state
  formWrap:       "flex flex-col gap-4",
  fieldWrap:      "flex flex-col gap-1.5",
  label:          "font-medium text-[11px] text-[#1C1C1C]",
  input:          "w-full px-4 py-[11px] border border-[#F9F9F9] rounded-[13px] text-[10px] text-black bg-[#F9F9F9] outline-none transition-all duration-200 focus:border-[#E8890C] focus:ring-[3px] focus:ring-[#E8890C]/10 placeholder:text-[#bbb]",
  spacerBlock:    "h-16",
  submitBtn:      "w-full py-3 bg-[#E87A00] text-white text-[13px] font-semibold rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(232,137,12,0.45)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed",
  spinner:        "w-[18px] h-[18px] border-[2.5px] border-white/40 border-t-white rounded-full animate-spin inline-block",
};