import React, { useState } from "react";
import { Sparkles, ArrowRight, Menu, X, CheckCircle2 } from "lucide-react";
import { PaperAirplane } from "./PaperAirplane";

interface NavbarProps {
  onOpenLiveValidation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLiveValidation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <nav className="relative bg-[#18181B]/90 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 sm:px-6 flex items-center justify-between shadow-2xl shadow-black/80">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-9 h-9 rounded-full bg-[#111111] border border-[#D7FF3C]/40 flex items-center justify-center relative shadow-inner">
            <PaperAirplane size={18} color="#D7FF3C" rotation={15} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              Validify
              <span className="w-2 h-2 rounded-full bg-[#D7FF3C] inline-block animate-pulse" />
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase -mt-1 hidden sm:inline-block">
              AI Startup Inspector
            </span>
          </div>
        </a>


        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-[#D7FF3C] transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("playground")}
            className="hover:text-[#D7FF3C] transition-colors cursor-pointer flex items-center gap-1 text-[#F4B8E8]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Live AI Test
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-[#D7FF3C] transition-colors cursor-pointer"
          >
            Process
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLiveValidation}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D7FF3C] text-slate-950 font-semibold text-sm hover:bg-[#c9f22c] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#D7FF3C]/20 cursor-pointer"
          >
            <span>Validate Idea</span>
            <PaperAirplane size={14} color="#000000" rotation={0} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-[#18181B] border border-white/10 rounded-2xl p-6 shadow-2xl z-50 flex flex-col gap-4">
          <button
            onClick={() => scrollToSection("features")}
            className="text-left text-slate-200 py-2 border-b border-white/5 hover:text-[#D7FF3C]"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("playground")}
            className="text-left text-[#F4B8E8] py-2 border-b border-white/5 font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Live AI Validation Playground
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-left text-slate-200 py-2 border-b border-white/5 hover:text-[#D7FF3C]"
          >
            How it Works
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLiveValidation();
            }}
            className="w-full py-3 rounded-xl bg-[#D7FF3C] text-slate-950 font-bold text-center mt-2 flex items-center justify-center gap-2"
          >
            <span>Launch AI Inspector</span>
            <PaperAirplane size={16} color="#000000" />
          </button>
        </div>
      )}
    </header>
  );
};
