"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Dynamically import TechNetwork with SSR disabled
const DynamicTechNetwork = dynamic(
  () => import("./TechNetwork").then((mod) => mod.TechNetwork),
  {
    ssr: false,
    loading: () => <TechNetworkFallback />,
  }
);

function TechNetworkFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-md aspect-square rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex flex-col items-center justify-center text-center tech-dot-bg">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
          <div className="w-6 h-6 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="text-sm font-mono text-emerald-400 mb-1">
          &lt;Go / Distributed Systems&gt;
        </div>
        <p className="text-xs text-slate-400 max-w-xs">
          Loading interactive topology (Microservices, MQTT, Redis Geo, PostgreSQL)...
        </p>
      </div>
    </div>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <TechNetworkFallback />;
  }

  return (
    <div className="w-full h-full min-h-[420px] md:min-h-[540px]">
      <DynamicTechNetwork />
    </div>
  );
}
