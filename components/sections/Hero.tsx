"use client";

import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/animation/FadeIn";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { HeroScene } from "@/components/3d/HeroScene";
import { FlipWords } from "@/components/ui/FlipWords";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { GridBeam } from "@/components/ui/GridBeam";
import { ArrowRight, Download, Mail, Briefcase, Code, Cloud, Box, Zap, Share2 } from "lucide-react";

const ROTATING_HEADLINES = [
  {
    text: "high concurrency.",
    gradient: "from-[#34d399] via-[#2dd4bf] to-[#38bdf8]",
    glow: "drop-shadow-[0_0_25px_rgba(45,212,191,0.45)]",
  },
  {
    text: "scaling bottlenecks.",
    gradient: "from-[#f472b6] via-[#c084fc] to-[#818cf8]",
    glow: "drop-shadow-[0_0_25px_rgba(192,132,252,0.45)]",
  },
  {
    text: "distributed scale.",
    gradient: "from-[#818cf8] via-[#6366f1] to-[#38bdf8]",
    glow: "drop-shadow-[0_0_25px_rgba(99,102,241,0.45)]",
  },
  {
    text: "real-world challenges.",
    gradient: "from-[#38bdf8] via-[#0ea5e9] to-[#60a5fa]",
    glow: "drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]",
  },
  {
    text: "system latency.",
    gradient: "from-[#c084fc] via-[#a855f7] to-[#818cf8]",
    glow: "drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]",
  },
];

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.4 9.74v-8.37H5.06v8.37z" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Tech Stack Brand Logos matching reference screenshot
function GoLogo() {
  return (
    <span className="font-black text-cyan-400 font-sans tracking-tight text-sm flex items-center gap-0.5">
      <span className="text-cyan-400 font-bold">~</span>GO
    </span>
  );
}

function PostgresLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-sky-400" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.06 14.88c-.68.22-1.4.34-2.12.34-2.31 0-4.18-1.44-4.18-3.22 0-.25.04-.5.11-.74.45.69 1.25 1.15 2.16 1.15.54 0 1.04-.16 1.46-.44-.24.59-.44 1.22-.58 1.86.38-.1.76-.23 1.15-.39v1.44zm3.92-3.13c-.45 1.2-1.42 2.12-2.61 2.52.17-.67.4-1.34.69-1.99.64-.17 1.2-.5 1.63-.94.1.48.19.96.29 1.41z" />
    </svg>
  );
}

function RedisLogo() {
  return (
    <div className="w-3.5 h-3.5 rounded-sm bg-red-500 flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]">
      R
    </div>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-sky-400" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185" />
    </svg>
  );
}

function K8sLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400" fill="currentColor">
      <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm0 2.3l6.5 3.8v7.8L12 19.7 5.5 15.9V8.1L12 4.3z" />
    </svg>
  );
}

function AwsLogo() {
  return (
    <div className="w-3.5 h-3.5 rounded-sm bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-[7px] font-black text-amber-400">
      AWS
    </div>
  );
}

function TsLogo() {
  return (
    <div className="w-3.5 h-3.5 rounded-sm bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">
      TS
    </div>
  );
}

function ReactLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 pb-8 sm:pb-10 overflow-hidden bg-[#03050a]">
      {/* ============================================================ */}
      {/* DEEP OBSIDIAN AMBIENT COSMIC LIGHTING                        */}
      {/* ============================================================ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-15%,rgba(120,119,198,0.10),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-0 w-[720px] h-[640px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,rgba(56,189,248,0.04)_40%,transparent_75%)] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-8 w-[480px] h-[440px] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.06)_0%,transparent_65%)] blur-[90px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        {/* ============================================================ */}
        {/* UPPER ROW: Left Headline & Right Visual (Balanced Hero Grid) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-center mb-6 lg:mb-8">
          {/* Left Column: Headline, Bio, Focus Badges & Action Buttons (lg:col-span-6 xl:col-span-6) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col z-10 pt-2 lg:pt-0 lg:pr-4">
            {/* Aceternity Grid Beam (Laser Pulse along grid lines) */}
            <GridBeam />

            {/* Ambient Left-side Nebula Glow */}
            <div className="absolute top-0 -left-16 w-[440px] h-[440px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,rgba(99,102,241,0.08)_45%,transparent_70%)] blur-[85px] pointer-events-none -z-10" />

            {/* Twinkling Cosmic Sparks on Left Side */}
            <div className="absolute -top-4 left-6 pointer-events-none select-none text-sky-400/70 animate-spark-1 text-xs">✦</div>
            <div className="absolute top-28 -left-3 pointer-events-none select-none text-indigo-400/60 animate-spark-2 text-sm">✦</div>
            <div className="absolute top-64 right-12 pointer-events-none select-none text-cyan-300/60 animate-spark-3 text-xs">✦</div>
            <div className="absolute bottom-24 left-10 pointer-events-none select-none text-purple-400/50 animate-spark-2 text-xs">+</div>

            {/* Status Pill Badge with live beacon */}
            <FadeIn direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-300 font-mono text-xs mb-6 w-fit backdrop-blur-xl shadow-inner hover:border-cyan-500/40 transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>Backend Engineer</span>
                <span className="text-slate-500">•</span>
                <span>Golang</span>
                <span className="text-slate-500">•</span>
                <span>Distributed Systems</span>
              </div>
            </FadeIn>

            {/* Main Headline with ultra-smooth rotating words with distinct relatable colors */}
            <FadeIn delay={0.2} direction="up" distance={20}>
              <h1 className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-white leading-[1.08] mb-5">
                I build software
                <br />
                that solves
                <br />
                <FlipWords words={ROTATING_HEADLINES} duration={3200} />
              </h1>
            </FadeIn>

            {/* Bio Description - spacious & authoritative */}
            <FadeIn delay={0.35} direction="up" distance={20}>
              <p className="text-sm sm:text-[15px] xl:text-base text-slate-300/90 leading-relaxed max-w-xl mb-5">
                Backend engineer with 3+ years of experience engineering scalable systems, high-throughput APIs, and real-time distributed pipelines. Focused on clean architecture, resiliency, and performance.
              </p>
            </FadeIn>

            {/* Key Technical Focus Badges (All on Same Single Line) */}
            <FadeIn delay={0.4} direction="up" distance={15}>
              <div className="flex flex-nowrap items-center gap-2 sm:gap-2.5 mb-7 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                {/* High-Throughput APIs */}
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[11px] sm:text-xs font-semibold whitespace-nowrap shadow-[0_0_12px_rgba(14,165,233,0.12)] hover:border-sky-400/50 hover:bg-sky-500/15 transition-all shrink-0">
                  <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>High-Throughput APIs</span>
                </span>

                {/* Distributed Systems */}
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-semibold whitespace-nowrap shadow-[0_0_12px_rgba(168,85,247,0.12)] hover:border-purple-400/50 hover:bg-purple-500/15 transition-all shrink-0">
                  <Share2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Distributed Systems</span>
                </span>

                {/* Event-Driven Architecture */}
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] sm:text-xs font-semibold whitespace-nowrap shadow-[0_0_12px_rgba(20,184,166,0.12)] hover:border-teal-400/50 hover:bg-teal-500/15 transition-all shrink-0">
                  <Box className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Event-Driven Architecture</span>
                </span>
              </div>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.45} direction="up" distance={15}>
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <MagneticButton strength={0.25} className="relative">
                  <Link
                    href="#projects"
                    className="glass-cta-btn group relative inline-flex items-center gap-4 rounded-full select-none"
                  >
                    {/* Animated moving spark travelling around the button border */}
                    <BorderBeam
                      size={60}
                      duration={3.5}
                      borderWidth={1.5}
                      colorFrom="#ffffff"
                      colorTo="#38bdf8"
                    />

                    {/* Subtle diagonal glass refraction */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />

                    {/* Button text */}
                    <span className="relative z-10 text-sm font-semibold tracking-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      View My Work
                    </span>

                    {/* Luminous purple-cyan glass arrow badge */}
                    <div className="glass-cta-arrow relative z-10">
                      <ArrowRight className="w-4 h-4 text-white stroke-[2.4] group-hover:translate-x-0.5 transition-transform duration-200" />
                    </div>
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.2}>
                  <a
                    href="/Supriya_Ghorai_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Supriya_Ghorai_Resume.pdf"
                    className="inline-flex items-center h-12 gap-2 px-6 rounded-xl sm:rounded-2xl font-medium text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-xl transition-all shadow-sm group"
                  >
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-all" />
                    <span>Download Resume</span>
                  </a>
                </MagneticButton>
              </div>
            </FadeIn>

            {/* Social Icons Row with Brand Colored Glows */}
            <FadeIn delay={0.55} direction="up" distance={15}>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/soumitra2001"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-500 hover:bg-slate-800 text-slate-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.18)] flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/itsmesupriya"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500 hover:bg-slate-800 text-slate-400 hover:text-sky-400 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://x.com/SUPRIYAGHORAI01"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter) Profile"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-500 hover:bg-slate-800 text-slate-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-sm"
                >
                  <XIcon className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    const el = document.getElementById("contact");
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  aria-label="Send Email / Contact"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Hero Scene with Balanced Proportions (lg:col-span-6 xl:col-span-6) */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full flex items-center justify-center lg:justify-end">
            <FadeIn delay={0.3} direction="up" distance={20} className="w-full flex items-center justify-center lg:justify-end">
              <HeroScene />
            </FadeIn>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STATS HIGHLIGHT STRIP (FULL-WIDTH GLASS PILL WITH DIVIDERS)  */}
        {/* ============================================================ */}
        <FadeIn delay={0.6} direction="up" distance={15}>
          <div className="relative overflow-hidden rounded-2xl bg-[#03050a]/40 border border-slate-800/40 backdrop-blur-md py-3.5 px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/40 items-center shadow-lg shadow-black/30 mb-0 group">
            {/* Dual Continuous Traveling Border Beams for animated perimeter */}
            <BorderBeam size={240} duration={7} borderWidth={1.5} colorFrom="#38bdf8" colorTo="#c084fc" />
            <BorderBeam size={240} duration={7} delay={3.5} borderWidth={1.5} colorFrom="#c084fc" colorTo="#38bdf8" />

            {/* 1. Years of Experience */}
            <div className="flex items-center gap-3.5 px-4 py-2 md:py-0">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white leading-tight">3+</div>
                <div className="text-[11px] text-slate-400 font-medium">Years of Experience</div>
              </div>
            </div>

            {/* 2. Projects Built */}
            <div className="flex items-center gap-3.5 px-4 py-2 md:py-0">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white leading-tight">10+</div>
                <div className="text-[11px] text-slate-400 font-medium">Projects Built</div>
              </div>
            </div>

            {/* 3. API Requests Handled */}
            <div className="flex items-center gap-3.5 px-4 py-2 md:py-0">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white leading-tight">100K+</div>
                <div className="text-[11px] text-slate-400 font-medium">API Requests Handled</div>
              </div>
            </div>

            {/* 4. Products / Systems */}
            <div className="flex items-center gap-3.5 px-4 py-2 md:py-0">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white leading-tight">3+</div>
                <div className="text-[11px] text-slate-400 font-medium">Products / Systems</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
