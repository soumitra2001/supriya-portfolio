"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/animation/FadeIn";
import { RevealText } from "@/components/animation/RevealText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ENGINEERING_TABS, EngineeringTab } from "./engineering/data";
import { CategoryNav } from "./engineering/CategoryNav";
import { ArchitectureDiagram } from "./engineering/ArchitectureDiagram";
import { PrinciplesPanel } from "./engineering/PrinciplesPanel";

export function EngineeringPlayground() {
  const prefersReducedMotion = useReducedMotion();

  // Selected Tab State (Defaults to Backend as specified in implementation spec)
  const [selectedTabId, setSelectedTabId] = useState<string>("backend");

  // Read deep link (?tab=... or ?topic=...) on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") || params.get("topic");

      if (tabParam) {
        const found = ENGINEERING_TABS.find(
          (t) => t.id === tabParam || (tabParam === "backend-go" && t.id === "backend")
        );
        if (found) {
          setSelectedTabId(found.id);
        }
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const currentTab =
    ENGINEERING_TABS.find((t) => t.id === selectedTabId) ||
    ENGINEERING_TABS[0];

  const handleSelectTab = (tabId: string) => {
    setSelectedTabId(tabId);
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("tab", tabId);
        window.history.replaceState({}, "", url.toString());
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <section
      id="engineering"
      className="scroll-mt-24 pt-28 pb-20 sm:pt-36 sm:pb-28 relative border-t border-slate-800/80 tech-grid-bg text-slate-100 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-blue-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-purple-950/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================ */}
        {/* 1. SECTION HEADER (Exactly matching implementation spec)         */}
        {/* ================================================================ */}
        <div className="mb-10 sm:mb-12">
          <FadeIn distance={10} delay={0.1}>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              <span className="w-3.5 h-3.5 rounded-full border border-blue-400/70 flex items-center justify-center bg-blue-950/50">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </span>
              HOW I BUILD
            </div>
          </FadeIn>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white mb-2.5">
            <RevealText
              text="Engineering systems that solve real problems."
              as="span"
            />
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Backend engineering, data, real-time systems, infrastructure, and the tools I use to build reliable software.
          </p>
        </div>

        {/* ================================================================ */}
        {/* 2. MAIN 3-COLUMN COMPACT LAYOUT (~20% | ~50% | ~30%)             */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Column 1: Topic Navigation (Left ~18-20%) */}
          <div className="lg:col-span-3 xl:col-span-2 w-full flex">
            <CategoryNav
              selectedTabId={selectedTabId}
              onSelectTab={handleSelectTab}
            />
          </div>

          {/* Column 2: Interactive Technical Visualization (Center ~50%) */}
          <div className="lg:col-span-5 xl:col-span-6 w-full flex">
            <ArchitectureDiagram tab={currentTab} />
          </div>

          {/* Column 3: Explanation / Details (Right ~30%) */}
          <div className="lg:col-span-4 xl:col-span-4 w-full flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 6,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : -6,
                }}
                transition={{ duration: 0.18 }}
                className="w-full h-full flex"
              >
                <PrinciplesPanel tab={currentTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
