import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Users,
  Target,
  DollarSign,
  Star,
  X,
} from "lucide-react";
import { PaperAirplane, DottedTrail } from "./PaperAirplane";
import { motion } from "motion/react";

interface HeroSectionProps {
  onStartValidation: (idea: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartValidation }) => {
  const [pitchInput, setPitchInput] = useState("");
  const [isInputExpanded, setIsInputExpanded] = useState(false);

  const handleStartFree = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pitchInput.trim()) {
      onStartValidation(pitchInput.trim());
    } else {
      // Scroll to live playground or focus input
      const el = document.getElementById("playground");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        setIsInputExpanded(true);
      }
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Flight Paths */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M -50 200 Q 300 80 600 280 T 1250 180"
            stroke="rgba(215, 255, 60, 0.25)"
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="none"
          />
          <path
            d="M 200 -50 Q 500 400 1100 250"
            stroke="rgba(244, 184, 232, 0.25)"
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Eyebrow Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1E] border border-[#D7FF3C]/30 text-xs font-mono text-[#D7FF3C]"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#D7FF3C] animate-pulse" />
          <span className="uppercase tracking-wider font-bold text-white/90">
            Paper plane your way to Series A
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.98] font-sans"
        >
          Validate Your Startup{" "}
          <span className="relative inline-block text-[#D7FF3C]">
            Before You Build.
            <span className="absolute -top-4 -right-8 sm:-top-6 sm:-right-10 hidden sm:inline-block">
              <PaperAirplane size={32} color="#F4B8E8" rotation={20} showSparkles />
            </span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
        >
          Use AI to analyze competitors, market demand, customer pain points, pricing strategy, risks, and opportunities before writing a single line of code.
        </motion.p>

        {/* Quick Pitch Input / Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 pt-2 max-w-2xl mx-auto"
        >
          {/* Direct Quick Input Field for immediate action */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-2 sm:p-2.5 backdrop-blur-md shadow-2xl focus-within:border-[#D7FF3C]/60 transition-colors">
            <form onSubmit={handleStartFree} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={pitchInput}
                onChange={(e) => setPitchInput(e.target.value)}
                placeholder="e.g. 'AI compliance auditor for SaaS apps'..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#D7FF3C] text-slate-950 font-extrabold text-sm hover:bg-[#cbf52b] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0 font-sans"
              >
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

