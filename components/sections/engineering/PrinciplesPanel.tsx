"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { EngineeringTab } from "./data";

interface Props {
  tab: EngineeringTab;
}

export function PrinciplesPanel({ tab }: Props) {
  return (
    <div className="w-full h-full rounded-2xl bg-[#070b1a]/95 border border-slate-800/90 p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between min-h-[460px]">
      <div className="space-y-6">
        {/* Right Card Header & Summary Text */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            {tab.rightCardHeading}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {tab.rightCardText}
          </p>
        </div>

        {/* Technologies Badges */}
        <div className="pt-4 border-t border-slate-800/70">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2.5">
            Technologies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tab.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-blue-950/40 border border-blue-500/30 text-blue-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Concepts / Capabilities */}
        <div className="pt-4 border-t border-slate-800/70">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2.5">
            Key Concepts
          </div>
          <ul className="space-y-2.5">
            {tab.keyConcepts.map((concept, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Subtle Bottom Domain Indicator */}
      <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Engineering Pattern</span>
        <span className="text-blue-400">{tab.label}</span>
      </div>
    </div>
  );
}
