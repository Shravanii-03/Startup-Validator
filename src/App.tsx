/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { LiveValidationEngine } from "./components/LiveValidationEngine";
import { BentoGrid } from "./components/BentoGrid";
import { DashboardShowcase } from "./components/DashboardShowcase";
import { HowItWorks } from "./components/HowItWorks";
import { FAQ } from "./components/FAQ";
import { FooterCTA } from "./components/FooterCTA";

export default function App() {
  const [selectedIdea, setSelectedIdea] = useState("");

  const handleStartValidation = (idea: string) => {
    setSelectedIdea(idea);
    const playground = document.getElementById("playground");
    if (playground) {
      playground.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenPlayground = () => {
    const playground = document.getElementById("playground");
    if (playground) {
      playground.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-slate-100 font-sans selection:bg-[#D7FF3C] selection:text-slate-950 antialiased overflow-x-hidden">
      {/* Floating Background Subtle Glow Accents */}
      <div className="fixed top-20 left-1/4 w-[500px] h-[500px] bg-[#D7FF3C]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-40 right-1/4 w-[500px] h-[500px] bg-[#F4B8E8]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Content Sections */}
      <div className="relative z-10 space-y-12">
        <Navbar onOpenLiveValidation={handleOpenPlayground} />

        <main>
          <HeroSection onStartValidation={handleStartValidation} />

          <div id="features">
            <BentoGrid />
          </div>

          <DashboardShowcase />

          <div id="how-it-works">
            <HowItWorks />
          </div>

          <LiveValidationEngine initialIdea={selectedIdea} />

          <FAQ />

          <FooterCTA onStartValidation={handleOpenPlayground} />
        </main>
      </div>
    </div>
  );
}
