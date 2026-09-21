"use client";

import React from "react";
import { FadeIn } from "@/components/animation/FadeIn";
import { RevealText } from "@/components/animation/RevealText";
import {
  Code,
  Terminal,
  Shield,
  Lightbulb,
  CheckCircle,
  Compass,
  ArrowRight,
  Workflow,
} from "lucide-react";
import Link from "next/link";

export function About() {
  const principles = [
    {
      title: "Correctness & Resiliency First",
      desc: "Performance is useless if data is corrupt. I design systems with idempotent interfaces, transactional boundaries, and graceful failure recovery before chasing micro-benchmarks.",
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
    },
    {
      title: "Simple Architecture Over Clever Code",
      desc: "Clear data structures and straightforward control flow outlast clever abstractions. I prefer explicit error handling, predictable goroutine lifecycles, and traceable RPC paths.",
      icon: <Workflow className="w-4 h-4 text-cyan-400" />,
    },
    {
      title: "End-to-End Product Empathy",
      desc: "Backend services exist to power real user experiences and business goals. Building production platforms like TR GlowCare sharpens my intuition for how infrastructure directly impacts customer trust.",
      icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
    },
    {
      title: "Under-The-Hood Curiosity",
      desc: "Constantly digging into runtime internals, database lock contention, Linux syscalls, and network protocols to know exactly what is happening when code executes.",
      icon: <Compass className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-slate-800/60 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Biography & Story */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Engineering Background
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
              <RevealText text="Supriya Ghorai — Building for reliability and scale." as="span" />
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                I’m a software engineer focused on building reliable backend systems and practical products that solve real business problems. I work primarily with <strong className="text-emerald-400 font-semibold">Go</strong> and enjoy designing APIs, databases, business workflows, and scalable services from the ground up.
              </p>
              <p>
                Alongside professional enterprise systems, I build and operate independent production platforms like <span className="text-slate-100 font-medium">TR GlowCare</span> to explore ideas, emerging technologies, and complete end-to-end product development—from database schemas and distributed locks to high-converting user interfaces.
              </p>
              <p className="text-slate-400">
                I’m always curious about how systems behave under the hood, how distributed components fail, and how thoughtful engineering turns complex operational requirements into seamless digital products.
              </p>
            </div>

            {/* Quick Experience Badge */}
            <div className="mt-8 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-mono font-bold text-lg">
                Go
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Senior Software Engineer
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Distributed Systems • Real-Time Pipelines • Full Product Lifecycle
                </p>
              </div>
            </div>
          </div>

          {/* Right: Engineering Principles Grid */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Core Engineering Tenets
            </h3>
            {principles.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="left" distance={20}>
                <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      {p.icon}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-100">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
