import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { PaperAirplane } from "./PaperAirplane";

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const FAQS = [
    {
      q: "How accurate are Validify's synthetic buyer interviews?",
      a: "Our synthetic buyer agents are trained on hundreds of thousands of verified B2B buyer transcripts, G2 review complaints, and Reddit discussions across 40+ verticals. In double-blind tests, synthetic feedback correctly predicted 87% of actual buyer objections encountered during real pre-order sales calls.",
    },
    {
      q: "Is my startup pitch and intellectual property kept confidential?",
      a: "Yes, 100%. Validify operates on enterprise zero-retention data pipelines. Your pitch ideas, business models, and confidential documents are never used to train public LLM models or shared with third parties.",
    },
    {
      q: "How does Validify differ from asking general ChatGPT or Claude?",
      a: "Standard LLM prompts tend to suffer from 'sycophancy'—pleasing the user and telling them every idea is great. Validify uses specialized adversarial cross-examination prompts, live search grounding against G2/Reddit reviews, unit-economic math solvers, and structured risk scoring to give you raw, unsweetened VC-grade feedback.",
    },
    {
      q: "Can Validify help me find a pivot if my initial idea receives a redlight score?",
      a: "Absolutely. Every validation dossier includes a 'Recommended Strategic Pivot' section that highlights adjacent niche markets, unexploited competitor flaws, or alternative pricing models that turn a low-viability pitch into a high-intent opportunity.",
    },
    {
      q: "What format are the validation dossiers delivered in?",
      a: "You get immediate interactive dashboard access, plus 1-click exportable white-label PDF reports that you can share directly with co-founders, advisors, or angel investors.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#D7FF3C]/30 text-xs font-mono text-[#D7FF3C]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Got Questions? We Have Answers.
        </h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <span className="font-bold font-sans text-base sm:text-lg text-white flex items-center gap-3">
                  <PaperAirplane size={14} color="#D7FF3C" rotation={isOpen ? 45 : 0} className="shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#D7FF3C]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-slate-300 text-sm font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
