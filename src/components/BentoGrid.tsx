import React from "react";
import {
  Users,
  Target,
  BarChart3,
  Sparkles,
  ShieldAlert,
  TrendingUp,
  Compass,
  Award,
  Grid2X2,
} from "lucide-react";
import { PaperAirplane } from "./PaperAirplane";
import { motion } from "motion/react";

export const BentoGrid: React.FC = () => {
  const FEATURES = [
    {
      badge: "01. Market Size",
      title: "Market Opportunity & Growth",
      desc: "Find out how big the market is, how many potential buyers exist, and how fast the industry is growing.",
      icon: <BarChart3 className="w-4 h-4" />,
      colSpan: "md:col-span-7",
      bgClass: "bg-[#18181B] text-white border border-white/10",
      badgeClass: "bg-[#D7FF3C] text-slate-950",
      accentColor: "#D7FF3C",
    },
    {
      badge: "02. Competitor Gaps",
      title: "Find What Competitors Are Missing",
      desc: "Learn what customers dislike about current products so you can build a better solution that wins users easily.",
      icon: <Target className="w-4 h-4" />,
      colSpan: "md:col-span-5",
      bgClass: "bg-[#D7FF3C] text-slate-950",
      badgeClass: "bg-slate-950 text-[#D7FF3C]",
      accentColor: "#000000",
    },
    {
      badge: "03. Target Customers",
      title: "Customer Feedback & Needs",
      desc: "Understand what your ideal customers care about most, their main pain points, and how much budget they have available.",
      icon: <Users className="w-4 h-4" />,
      colSpan: "md:col-span-7",
      bgClass: "bg-white text-slate-900 border border-slate-100",
      badgeClass: "bg-slate-100 text-slate-800",
      accentColor: "#111111",
    },
    {
      badge: "04. Pricing Strategy",
      title: "Simple Pricing & Profit Guide",
      desc: "Find the right price point for your app so that you make good profit while keeping prices attractive to buyers.",
      icon: <BarChart3 className="w-4 h-4" />,
      colSpan: "md:col-span-5",
      bgClass: "bg-[#F4B8E8] text-slate-950",
      badgeClass: "bg-slate-950 text-white",
      accentColor: "#000000",
    },
    {
      badge: "05. Pros & Cons",
      title: "Strengths & Opportunities",
      desc: "Clearly see what makes your idea strong, what weaknesses to fix, and where your best growth lies.",
      icon: <Grid2X2 className="w-4 h-4" />,
      colSpan: "md:col-span-4",
      bgClass: "bg-[#18181B] text-white border border-white/10",
      badgeClass: "bg-white/10 text-[#D7FF3C]",
      accentColor: "#D7FF3C",
    },
    {
      badge: "06. Risk Warning",
      title: "Early Risk Warning",
      desc: "Spot potential sales, technical, or competition hurdles before spending time or money building.",
      icon: <ShieldAlert className="w-4 h-4" />,
      colSpan: "md:col-span-4",
      bgClass: "bg-[#18181B] text-white border border-white/10",
      badgeClass: "bg-rose-500/20 text-rose-300",
      accentColor: "#F43F5E",
    },
    {
      badge: "07. Customer Demand",
      title: "Customer Demand Trend",
      desc: "See if people are actively searching online for a solution like yours and how eager they are to buy.",
      icon: <TrendingUp className="w-4 h-4" />,
      colSpan: "md:col-span-4",
      bgClass: "bg-[#18181B] text-white border border-white/10",
      badgeClass: "bg-emerald-500/20 text-emerald-300",
      accentColor: "#10B981",
    },
    {
      badge: "08. Launch Checklist",
      title: "7-Day Simple Launch Plan",
      desc: "Get ready-to-use headline ideas, waitlist text, and simple daily steps to test your idea with real users in one week.",
      icon: <Compass className="w-4 h-4" />,
      colSpan: "md:col-span-7",
      bgClass: "bg-[#1A1A1E] text-white border border-white/10",
      badgeClass: "bg-[#D7FF3C] text-slate-950",
      accentColor: "#D7FF3C",
    },
    {
      badge: "09. Success Rating",
      title: "Overall Startup Readiness Score",
      desc: "Get an overall 1 to 100 score that combines market size, customer demand, pricing, and execution risk into one simple number.",
      icon: <Award className="w-4 h-4" />,
      colSpan: "md:col-span-5",
      bgClass: "bg-white text-slate-900 border border-slate-100",
      badgeClass: "bg-slate-900 text-[#D7FF3C]",
      accentColor: "#111111",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#D7FF3C]/30 text-xs font-mono text-[#D7FF3C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIMPLE AI STARTUP ANALYSIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-sans">
            Test Your Startup Idea From Every Angle
          </h2>
        </div>
        <p className="text-slate-400 text-sm sm:text-base font-light max-w-md leading-relaxed">
          Validify gives you clear, simple answers on market size, competitors, customer interest, pricing, and key risks in under 60 seconds.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {FEATURES.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className={`${item.colSpan} ${item.bgClass} p-6 sm:p-8 rounded-[36px] shadow-xl flex flex-col justify-between transition-all`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 ${item.badgeClass}`}>
                  {item.icon}
                  <span>{item.badge}</span>
                </span>
                <PaperAirplane size={20} color={item.accentColor} rotation={15} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight leading-tight">
                {item.title}
              </h3>
              <p className="opacity-80 text-sm sm:text-base font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
