// ─── Spinner.tsx ─────────────────────────────────────────────────────────────

export default function Spinner() {
  return (
    <>
      <style>{`
        @keyframes orbit {
          0%   { transform: rotate(0deg)   translateX(10px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0%   { transform: rotate(120deg) translateX(10px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(10px) rotate(-480deg); }
        }
        @keyframes orbit3 {
          0%   { transform: rotate(240deg) translateX(10px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(10px) rotate(-600deg); }
        }
        @keyframes corePulse {
          0%, 100% { transform: scale(1);    opacity: 0.9; }
          50%       { transform: scale(1.35); opacity: 1;   }
        }
        .orb1 { animation: orbit     1.1s linear       infinite; }
        .orb2 { animation: orbit2    1.1s linear       infinite; }
        .orb3 { animation: orbit3    1.1s linear       infinite; }
        .core { animation: corePulse 1.1s ease-in-out  infinite; }
      `}</style>
      <span className="relative flex items-center justify-center w-6 h-6">
        <span className="core absolute w-2 h-2 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.7)]" />
        <span className="orb1 absolute w-1.5 h-1.5 bg-white/90 rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.5)]" />
        <span className="orb2 absolute w-1.5 h-1.5 bg-white/70 rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.4)]" />
        <span className="orb3 absolute w-1.5 h-1.5 bg-white/50 rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.3)]" />
      </span>
    </>
  );
}