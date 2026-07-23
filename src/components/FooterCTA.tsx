import React from "react";
import { PaperAirplane, DottedTrail } from "./PaperAirplane";
import { Sparkles, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface FooterCTAProps {
  onStartValidation: () => void;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ onStartValidation }) => {
  return (
    <footer className="relative pt-20 pb-12 overflow-hidden bg-gradient-to-b from-[#18181B] via-[#1c2311] to-[#2b3a0e] text-white border-t border-white/10">
      {/* Background Neon Lime Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D7FF3C]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Editorial CTA Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto space-y-8 pt-8 pb-16 relative"
        >
          {/* Animated Upward Flying Paper Airplane with Dotted Trail */}
          <div className="relative w-full h-32 flex justify-center items-center mb-2 pointer-events-none">
            {/* Curved Vertical Dotted Trail */}
            <svg
              className="absolute w-40 h-32 text-[#D7FF3C] opacity-60"
              viewBox="0 0 160 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 80 110 C 20 80, 140 40, 80 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>

            {/* Paper Airplane Flying Upward */}
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              whileInView={{ y: -10, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                y: [-12, -22, -12],
                rotate: [-20, -12, -20],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-20"
            >
              <PaperAirplane size={52} color="#D7FF3C" rotation={-20} showSparkles />
            </motion.div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B]/80 border border-[#D7FF3C]/40 text-xs font-mono font-bold text-[#D7FF3C] backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>LAUNCH WITH 100% CONFIDENCE</span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-sans tracking-tight leading-[1.02] text-white">
            Ready to Validate Your <br className="hidden sm:inline" />
            <span className="text-[#D7FF3C] italic font-serif font-normal underline decoration-[#D7FF3C]/40 decoration-2 underline-offset-8">
              Next Big Idea?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Stop guessing. Generate institutional VC-grade market validation dossiers, ICP simulations, and revenue projections in under 60 seconds.
          </p>

          {/* Button: Start Free */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onStartValidation}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#D7FF3C] text-slate-950 font-black text-base hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(215,255,60,0.4)] flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Start Free</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Micro Guarantee */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D7FF3C]" />
              No credit card required
            </span>
            <span>•</span>
            <span>60-second instant reports</span>
          </div>
        </motion.div>

        {/* Minimal Footer Beneath */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-[#D7FF3C] text-slate-950 font-black flex items-center justify-center font-mono text-sm shadow-sm">
              V
            </div>
            <span className="text-white font-black font-sans text-base tracking-tight">Validify AI</span>
            <span className="text-slate-500">© 2026 Validify Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-slate-300">
            <a href="#playground" className="hover:text-[#D7FF3C] transition-colors">Playground</a>
            <a href="#features" className="hover:text-[#D7FF3C] transition-colors">Features</a>
            <a href="#comparison" className="hover:text-[#D7FF3C] transition-colors">Comparison</a>
            <a href="#how-it-works" className="hover:text-[#D7FF3C] transition-colors">Process</a>
          </div>

          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 text-[11px]">System Status: Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

