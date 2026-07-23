import React, { useState, useEffect } from "react";
import { Sparkles,ShieldCheck,CheckCircle2, AlertTriangle, ArrowRight, Share2, Download, RefreshCw, BarChart3, Users, ShieldAlert, Target, Lightbulb, Compass, Zap,  TriangleAlert,TrendingUp } from "lucide-react";

import { ValidationResult } from "../types";
import { PaperAirplane } from "./PaperAirplane";
import { motion, AnimatePresence } from "motion/react";


interface LiveValidationEngineProps {
  initialIdea?: string;
}

const PRESET_IDEAS = [
  {
    title: "AI Legal Clause Auditor for Freelancers",
    market: "B2B / Creator Economy",
    price: "₹2,499/mo",
    desc: "Browser extension that scans client contract PDFs in 3 seconds, flags predatory indemnification clauses, and generates lawyer-approved revision prompts.",
  },
  {
    title: "Ghost Kitchen Demand Optimizer",
    market: "FoodTech / B2B SaaS",
    price: "₹15,999/mo",
    desc: "Predictive AI dashboard for delivery kitchen operators that syncs DoorDash/UberEats order volume with local weather and event data to optimize prep inventory.",
  },
  {
    title: "Autonomous Code Vulnerability Fixer",
    market: "Developer Tools / Security",
    price: "₹40,000/mo",
    desc: "GitHub bot that automatically detects zero-day vulnerabilities in pull requests and submits validated patch PRs before merging.",
  },
  {
    title: "Micro-Warehouse Rental Marketplace",
    market: "Logistics / Marketplace",
    price: "10% Take-rate",
    desc: "Airbnb for urban garage storage where local artisans store e-commerce inventory closer to downtown customers for same-day delivery.",
  },
];

export const LiveValidationEngine: React.FC<LiveValidationEngineProps> = ({ initialIdea = "" }) => {
  const [ideaInput, setIdeaInput] = useState(initialIdea || PRESET_IDEAS[0].desc);
  const [targetMarket, setTargetMarket] = useState("B2B SaaS");
  const [pricePoint, setPricePoint] = useState("₹3,999 - ₹15,999/mo");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialIdea) {
      setIdeaInput(initialIdea);
    }
  }, [initialIdea]);

  const LOADING_STEPS = [
    "Scanning market reviews & feedback...",
    "Simulating customer responses...",
    "Checking online demand signals...",
    "Calculating market size and unit economics...",
    "Generating actionable 7-day roadmap...",
  ];

  const handleRunValidation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!ideaInput.trim()) {
        setErrorMsg("Please enter your startup idea.");
        return;
    }

    if (ideaInput.trim().length < 20) {
        setErrorMsg(
            "Please describe your startup idea in at least 20 characters."
        );
        return;
    }

    setErrorMsg("");

    setIsLoading(true);
    setErrorMsg("");
    setLoadingStep(0);

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 900);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: ideaInput,
          targetMarket,
          pricePoint,
        }),
      });

      if (!res.ok) {
        throw new Error("Validation service returned an error");
      }

      const data: ValidationResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to validation engine. Please try again.");
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="playground" className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#D7FF3C]/30 text-xs font-mono text-[#D7FF3C]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INTERACTIVE AI VALIDATION ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Test Any Pitch in Real-Time
        </h2>
        <p className="text-slate-400 text-base sm:text-lg font-light">
          Configure your business model parameters below and let Validify stress-test your value proposition against real market data.
        </p>
      </div>

      {/* Main Validation Workspace Box */}
      <div className="bg-[#18181B] border border-white/10 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Preset Cards Selection */}
        <div className="mb-8">
          <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 font-semibold">
            Select a Preset Startup Scenario or Type Below:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_IDEAS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIdeaInput(preset.desc);
                  setTargetMarket(preset.market);
                  setPricePoint(preset.price);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  ideaInput === preset.desc
                    ? "bg-[#D7FF3C] border-[#D7FF3C] text-slate-950 font-semibold"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1 opacity-80">
                  <span>{preset.market}</span>
                  <span>{preset.price}</span>
                </div>
                <div className="text-xs font-bold font-sans line-clamp-1">{preset.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Controls */}
        <form onSubmit={handleRunValidation} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate-300 mb-2 font-bold flex items-center justify-between">
              <span>Startup Value Proposition Pitch</span>
              <span className="text-slate-500 text-[11px] font-normal">Min 10 characters</span>
            </label>
            <textarea
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              placeholder="Describe what your startup does, who it is for, and how it makes money..."
              className="w-full h-28 p-4 bg-black/40 border border-white/15 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D7FF3C] focus:ring-1 focus:ring-[#D7FF3C] text-base font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Target Market Category
              </label>
              <select
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D7FF3C] text-sm"
              >
                <option value="B2B SaaS">B2B SaaS / Enterprise Software</option>
                <option value="Creator Economy">Creator Economy & Solopreneurs</option>
                <option value="Consumer App / B2C">Consumer Mobile App / B2C</option>
                <option value="Developer Tools">Developer Tools & Infrastructure</option>
                <option value="E-Commerce & Logistics">E-Commerce, Direct-to-Consumer & Logistics</option>
                <option value="AI Agents & Workflows">AI Agents & Specialized Workflows</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Intended Pricing Strategy
              </label>
              <select
                value={pricePoint}
                onChange={(e) => setPricePoint(e.target.value)}
                className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D7FF3C] text-sm"
              >
                <option value="$29 - $99/mo">$29 - $99/mo (Freemium / Self-Serve)</option>
                <option value="$199 - $499/mo">$199 - $499/mo (Mid-Market B2B)</option>
                <option value="$1,000+/mo">$1,000+/mo (High-Touch Enterprise ACV)</option>
                <option value="Usage-based / Take-rate">Usage-based / % Take-rate</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !ideaInput.trim()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D7FF3C] text-slate-950 font-extrabold text-base hover:bg-[#c9f22c] transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 shadow-lg shadow-[#D7FF3C]/20 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Cross-Examining Market...</span>
                </>
              ) : (
                <>
                  <span>Run Validify AI Inspector</span>
                  <PaperAirplane size={18} color="#000000" rotation={10} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading Animated State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-6 bg-black/60 border border-[#D7FF3C]/30 rounded-2xl text-center space-y-4"
          >
            <div className="flex justify-center">
              <div className="relative">
                <PaperAirplane size={40} color="#D7FF3C" rotation={30} showSparkles />
              </div>
            </div>
            <div className="text-white font-mono text-sm font-semibold animate-pulse">
              {LOADING_STEPS[loadingStep]}
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden max-w-md mx-auto">
              <div
                className="bg-[#D7FF3C] h-full transition-all duration-700 ease-out"
                style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* Error message if any */}
        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Generated Validation Report Output */}
        <AnimatePresence>
          {result && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 pt-8 border-t border-white/10 space-y-8"
            >
              {/* Header Bar of Analysis */}
              <div className="bg-white rounded-[28px] p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 text-white px-3 py-1 rounded-full">
                      VALIDATION DOSSIER
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                        result.overallScore >= 80
                          ? "bg-emerald-100 text-emerald-800"
                          : result.overallScore >= 65
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {result.riskLevel}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
                    Market Feasibility Verdict
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    {result.summary}
                  </p>
                </div>

                {/* Score Dial Gauge */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900">
                      {result.overallScore}
                      <span className="text-xl text-slate-400 font-normal">/100</span>
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                      Validation Index
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-[#111111] flex items-center justify-center font-bold text-xs text-slate-700">
                    {result.overallScore >= 80 ? "STRONG" : result.overallScore >= 65 ? "PIVOT" : "WEAK"}
                  </div>
                </div>
              </div>


{/* Score Breakdown */}
<div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-xl">
<h2 className="text-3xl font-bold text-slate-900">
    AI Validation Score Breakdown
</h2>

  {[
    { label: "Market Demand", value: result.scoreBreakdown.marketDemand },
    { label: "Competition", value: result.scoreBreakdown.competition },
    { label: "Innovation", value: result.scoreBreakdown.innovation },
    { label: "Execution", value: result.scoreBreakdown.execution },
    { label: "Monetization", value: result.scoreBreakdown.monetization },
  ].map((item, index) => (
    <div key={`${item.label}-${result.overallScore}`} className="mb-5">
      <div className="flex justify-between text-sm font-semibold mb-2">
    <span className="text-slate-700">
        {item.label}
    </span>

    <span className="text-slate-600 font-bold">
        {item.value}/20
    </span>
</div>

<div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden">
  <motion.div
    className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-[#D7FF3C] to-lime-400 shadow-[0_0_20px_rgba(215,255,60,0.9)]"
    initial={{ width: 0 }}
    animate={{ width: `${(item.value / 20) * 100}%` }}
    transition={{
      duration: 1,
      delay: index * 0.15,
      ease: "easeOut",
    }}
  />
</div>
    </div>
  ))}
</div>

{/* ================= SWOT ANALYSIS ================= */}
<div className="rounded-[32px] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 mt-8">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-2xl font-black text-slate-900">
        Strategic SWOT Analysis
      </h2>
      <p className="text-slate-500 mt-1">
        AI-generated strategic assessment of your startup idea
      </p>
    </div>

    <div className="px-4 py-2 rounded-full bg-[#D7FF3C]/20 text-[#6B7D00] font-semibold text-sm">
      Strategic Insights
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Strengths */}
    <div className="rounded-3xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-5">
      <div className="h-12 w-12 rounded-2xl bg-green-500 flex items-center justify-center">
    <ShieldCheck className="w-6 h-6 text-white" />
</div>

        <div>
          <h3 className="font-bold text-lg text-green-900">
            Strengths
          </h3>

          <p className="text-sm text-green-700">
            Internal advantages
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {result.swotAnalysis.strengths.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-green-200"
          >
            <div className="flex gap-3">
            <div className="mt-2 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
              <p className="text-sm text-slate-700 leading-relaxed">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Weaknesses */}
    <div className="rounded-3xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-5">
      <div className="h-12 w-12 rounded-2xl bg-red-500 flex items-center justify-center">
    <TriangleAlert className="w-6 h-6 text-white" />
</div>

        <div>
          <h3 className="font-bold text-lg text-red-900">
            Weaknesses
          </h3>

          <p className="text-sm text-red-700">
            Internal limitations
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {result.swotAnalysis.weaknesses.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-red-200"
          >
            <div className="flex gap-3">
            <div className="mt-2 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-sm text-slate-700 leading-relaxed">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Opportunities */}
    <div className="rounded-3xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-5">
      <div className="h-12 w-12 rounded-2xl bg-blue-500 flex items-center justify-center">
    <TrendingUp className="w-6 h-6 text-white" />
</div>
        <div>
          <h3 className="font-bold text-lg text-blue-900">
            Opportunities
          </h3>

          <p className="text-sm text-blue-700">
            External growth potential
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {result.swotAnalysis.opportunities.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-blue-200"
          >
            <div className="flex gap-3">
            <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              <p className="text-sm text-slate-700 leading-relaxed">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Threats */}
    <div className="rounded-3xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-5">
      <div className="h-12 w-12 rounded-2xl bg-orange-500 flex items-center justify-center">
    <Target className="w-6 h-6 text-white" />
</div>

        <div>
          <h3 className="font-bold text-lg text-orange-900">
            Threats
          </h3>

          <p className="text-sm text-orange-700">
            External risks
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {result.swotAnalysis.threats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-orange-200"
          >
            <div className="flex gap-3">
            <div className="mt-2 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
              <p className="text-sm text-slate-700 leading-relaxed">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</div>


              {/* Market Size Bento Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1A1A1E] border border-white/10 p-5 rounded-2xl text-white space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                    Total Addressable Market (TAM)
                  </span>
                  <div className="text-2xl font-black font-mono text-[#D7FF3C]">
                    {result.marketSize.tam}
                  </div>
                </div>
                <div className="bg-[#1A1A1E] border border-white/10 p-5 rounded-2xl text-white space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                    Serviceable Market (SAM)
                  </span>
                  <div className="text-2xl font-black font-mono text-[#F4B8E8]">
                    {result.marketSize.sam}
                  </div>
                </div>
                <div className="bg-[#1A1A1E] border border-white/10 p-5 rounded-2xl text-white space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                    Sector Growth Rate
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    {result.marketSize.growthRate}
                  </div>
                </div>
              </div>

              {/* Synthetic Buyer Persona Quotes */}
              <div className="bg-[#F4B8E8] text-slate-950 p-6 sm:p-8 rounded-[28px] space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <h4 className="text-lg font-black font-sans uppercase tracking-tight">
                    Synthetic Buyer Persona Stress-Test
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.buyerPersonas.map((persona, idx) => (
                    <div
                      key={idx}
                      className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-black/10 space-y-2 text-slate-900"
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="bg-black/10 px-2 py-0.5 rounded">{persona.role}</span>
                        <span className="text-emerald-800 font-bold">{persona.willingnessToPay}</span>
                      </div>
                      <p className="text-xs sm:text-sm italic font-medium text-slate-800">
                        "{persona.quote}"
                      </p>
                      <div className="text-[11px] text-slate-600 font-semibold pt-1 border-t border-black/5">
                        Top Pain Point: {persona.topPain}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Column Grid: Failure Risks & Competitors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Critical Failure Risks */}
                <div className="bg-[#111111] border border-rose-500/20 p-6 rounded-[28px] space-y-4">
                  <div className="flex items-center gap-2 text-rose-400">
                    <ShieldAlert className="w-5 h-5" />
                    <h4 className="text-base font-bold font-mono uppercase tracking-wider text-white">
                      Top Failure Risks & Mitigations
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {result.failureRisks.map((risk, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{risk.riskTitle}</span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                            {risk.severity} Severity
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{risk.description}</p>
                        <div className="text-xs text-[#D7FF3C] font-mono pt-1">
                          💡 Mitigation: {risk.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Competitor Vulnerabilities */}
                <div className="bg-[#111111] border border-white/10 p-6 rounded-[28px] space-y-4">
                  <div className="flex items-center gap-2 text-[#D7FF3C]">
                    <Target className="w-5 h-5" />
                    <h4 className="text-base font-bold font-mono uppercase tracking-wider text-white">
                      Incumbent Vulnerability Matrix
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {result.competitors.map((comp, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1.5">
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span>{comp.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">G2 Review Flaw</span>
                        </div>
                        <p className="text-xs text-rose-300/90 font-medium">❌ Flaw: {comp.flaw}</p>
                        <p className="text-xs text-[#D7FF3C] font-medium">✨ Your Hook: {comp.yourAdvantage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7-Day Smoke Test Plan */}
              <div className="bg-[#D7FF3C] text-slate-950 p-6 sm:p-8 rounded-[28px] space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-slate-950" />
                  <h4 className="text-lg font-black font-sans uppercase tracking-tight">
                    Recommended 7-Day Smoke Test Action Plan
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.smokeTestPlan.map((step, idx) => (
                    <div key={idx} className="bg-slate-950 text-white p-4 rounded-2xl space-y-2 border border-slate-800">
                      <div className="text-xs font-mono font-bold text-[#D7FF3C] uppercase tracking-wider">
                        {step.dayRange}
                      </div>
                      <p className="text-xs font-semibold leading-relaxed text-slate-200">
                        {step.action}
                      </p>
                      <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-white/10">
                        Target Goal: {step.successMetric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Pivot Banner */}
              <div className="bg-[#1A1A1E] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-[#D7FF3C]/10 text-[#D7FF3C] shrink-0">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-[#D7FF3C] font-bold">
                      Recommended Strategic Pivot
                    </h5>
                    <p className="text-sm text-slate-200 font-medium">{result.suggestedPivot}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                  <button
                    onClick={handleShare}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? "Link Copied!" : "Share Report"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
