import React from "react";
import { PaperAirplane, DottedTrail } from "./PaperAirplane";
import { Sparkles, FileText, Cpu, CheckCircle2, ArrowRight, ShieldAlert, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

export const HowItWorks: React.FC = () => {
  const STEPS = [
    {
      num: "01",
      badge: "STEP 01",
      title: "Describe Your Startup",
      desc: "Enter your raw concept, target customer, or pitch summary. No complex formatting or prompt engineering needed.",
      icon: <FileText className="w-8 h-8 text-slate-950" />,
      accentBg: "bg-[#D7FF3C]",
      illustration: (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 font-mono text-xs text-slate-700 shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
            <span>Concept Input</span>
            <span className="text-[#111111] bg-[#D7FF3C] px-2 py-0.5 rounded-full">Ready</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-900 font-sans font-medium text-xs shadow-sm flex items-center justify-between">
            <span className="truncate">"AI vulnerability patch bot for DevSecOps"</span>
            <span className="w-2 h-4 bg-slate-900 animate-pulse shrink-0 ml-1" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-sans">
            <Sparkles className="w-3 h-3 text-[#111111]" />
            <span>Scanning 40+ industry databases...</span>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      badge: "STEP 02",
      title: "AI Market Analysis",
      desc: "Our AI checks real market trends, customer feedback, and competitor gaps to see if people actually want your product.",
      icon: <Cpu className="w-8 h-8 text-slate-950" />,
      accentBg: "bg-[#F4B8E8]",
      illustration: (
        <div className="bg-slate-950 text-white rounded-2xl p-4 space-y-2.5 font-mono text-xs shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
            <span>Market Analysis</span>
            <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">Processing</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-white/10 p-2 rounded-lg border border-white/10">
              <span className="text-slate-400 block">G2 Reviews</span>
              <span className="text-[#D7FF3C] font-bold">14,200 Scanned</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg border border-white/10">
              <span className="text-slate-400 block">Buyer Personas</span>
              <span className="text-[#F4B8E8] font-bold">100 Simulated</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: "03",
      badge: "STEP 03",
      title: "Receive Actionable Insights",
      desc: "Get a comprehensive validation dossier complete with risk scores, competitor flaws, unit economics, and a 7-day smoke test roadmap.",
      icon: <CheckCircle2 className="w-8 h-8 text-slate-950" />,
      accentBg: "bg-[#D7FF3C]",
      illustration: (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">Dossier Score</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              92/100 GREENLIGHT
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-600 font-sans text-xs font-bold">TAM Estimate:</span>
            <span className="text-slate-900 font-black text-sm">$6.8 Billion</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#111111] h-full w-[92%]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#D7FF3C]/30 text-xs font-mono text-[#D7FF3C]">
          <PaperAirplane size={14} color="#D7FF3C" rotation={15} />
          <span>EFFORTLESS THREE-STEP PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-sans">
          From Idea to Validation in Minutes
        </h2>
        <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Follow the paper airplane flight path from a raw concept pitch to a 20-page executive validation report.
        </p>
      </div>

      {/* Dotted Trail SVG Connector overlay for Desktop */}
      <div className="hidden lg:block absolute top-[52%] left-10 right-10 pointer-events-none -translate-y-12 opacity-30 z-0">
        <DottedTrail
          pathD="M 120 40 Q 450 -30, 750 60 T 1100 40"
          width={1100}
          height={120}
          color="#D7FF3C"
        />
      </div>

      {/* Editorial Cards Grid: Desktop 3-col, Tablet 2-col, Mobile 1-col */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 items-stretch">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className={`bg-white text-slate-900 rounded-[36px] p-7 sm:p-9 shadow-2xl border border-slate-100 flex flex-col justify-between relative group hover:-translate-y-2 transition-all duration-300 ${
              idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            {/* Top Badge & Airplane Graphic Accent */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  {step.badge}
                </span>

                <div className="flex items-center gap-2">
                  <PaperAirplane
                    size={22}
                    color="#111111"
                    rotation={15 + idx * 15}
                    floatDelay={idx * 0.3}
                  />
                </div>
              </div>

              {/* Large Icon & Title */}
              <div className="space-y-3">
                <div className={`w-14 h-14 rounded-2xl ${step.accentBg} flex items-center justify-center shadow-md`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900">
                  {step.title}
                </h3>
              </div>

              {/* Short Explanation */}
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {step.desc}
              </p>

              {/* Minimal Illustration Widget */}
              <div className="pt-2">
                {step.illustration}
              </div>
            </div>

            {/* Bottom Step Identifier Bar */}
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase tracking-widest">
                Phase {step.num}
              </span>
              <span className="text-slate-900 font-bold flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
                <span>Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

