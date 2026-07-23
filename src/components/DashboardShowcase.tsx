import React from "react";
import {
  BarChart3,
  Target,
  Users,
  Grid2X2,
  ShieldAlert,
  TrendingUp,
  Compass,
  Award,
  Zap,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { PaperAirplane } from "./PaperAirplane";
import { motion } from "motion/react";

export const DashboardShowcase: React.FC = () => {
  const STEPS = [
    {
      num: "01",
      title: "Market Size",
      desc: "Estimates total industry size and market growth.",
      icon: <BarChart3 className="w-5 h-5 text-[#D7FF3C]" />,
      accent: "#D7FF3C",
    },
    {
      num: "02",
      title: "Competitor Gaps",
      desc: "Finds weaknesses in current products to beat.",
      icon: <Target className="w-5 h-5 text-[#F4B8E8]" />,
      accent: "#F4B8E8",
    },
    {
      num: "03",
      title: "Target Customers",
      desc: "Identifies ideal buyers, needs, and budgets.",
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      accent: "#10B981",
    },
    {
      num: "04",
      title: "Pricing Strategy",
      desc: "Recommends optimal pricing and profit margins.",
      icon: <BarChart3 className="w-5 h-5 text-[#D7FF3C]" />,
      accent: "#D7FF3C",
    },
    {
      num: "05",
      title: "Pros & Cons",
      desc: "Outlines core strengths, flaws, and opportunities.",
      icon: <Grid2X2 className="w-5 h-5 text-sky-400" />,
      accent: "#38BDF8",
    },
    {
      num: "06",
      title: "Risk Warning",
      desc: "Detects potential sales and execution hurdles.",
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      accent: "#F43F5E",
    },
    {
      num: "07",
      title: "Customer Demand",
      desc: "Measures online search trends and buying interest.",
      icon: <TrendingUp className="w-5 h-5 text-[#D7FF3C]" />,
      accent: "#D7FF3C",
    },
    {
      num: "08",
      title: "Launch Checklist",
      desc: "Includes headlines and a 7-day action roadmap.",
      icon: <Compass className="w-5 h-5 text-[#F4B8E8]" />,
      accent: "#F4B8E8",
    },
    {
      num: "09",
      title: "Success Rating",
      desc: "Calculates an overall 1–100 startup score.",
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      accent: "#10B981",
    },
  ];

  return (
    <section id="dashboard" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Soft Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D7FF3C]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#D7FF3C]/30 text-xs font-mono text-[#D7FF3C]">
          <Zap className="w-3.5 h-3.5" />
          <span>VALIDATION PROCESS FLOWCHART</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-sans">
          Everything You Need to Validate Your Startup
        </h2>

        <p className="text-slate-400 text-base sm:text-lg font-light max-w-xl mx-auto">
          A clean step-by-step flowchart connecting every critical stage of startup validation.
        </p>
      </div>

      {/* Flowchart Layout */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {STEPS.map((step, idx) => {
            const isLastInRow = (idx + 1) % 3 === 0;
            const isLastOverall = idx === STEPS.length - 1;

            return (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#18181B] border border-white/10 rounded-2xl p-5 shadow-xl relative flex flex-col justify-between space-y-3 group hover:border-[#D7FF3C]/50 transition-all cursor-default min-h-[120px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold bg-slate-900 text-[#D7FF3C] px-2.5 py-1 rounded-full border border-white/10 shrink-0">
                        {step.num}
                      </span>
                      <h3 className="text-base font-extrabold text-white font-sans tracking-tight">
                        {step.title}
                      </h3>
                    </div>

                    <div className="shrink-0 p-1.5 rounded-xl bg-white/5 border border-white/10">
                      {step.icon}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Arrow connector for small/mobile view */}
                {!isLastOverall && (
                  <div className="flex md:hidden justify-center my-[-8px]">
                    <ArrowDown className="w-5 h-5 text-[#D7FF3C] animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Flowchart Summary Footer */}
        <div className="mt-12 text-center pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
          <PaperAirplane size={16} color="#D7FF3C" rotation={15} />
          <span>Simple 9-Step Sequence to Validate Any Startup Idea</span>
        </div>
      </div>
    </section>
  );
};
