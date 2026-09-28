"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TechNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const prefersReduced = useReducedMotion();

  // Ultra-smooth 120fps physics-based 3D tilt with zero React re-renders on mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.1 });
  const rotateX = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.1 });

  // Cache rect on mouse enter to avoid triggering forced browser reflow during mousemove
  const handleMouseEnter = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      rectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !rectRef.current) return;
      const rect = rectRef.current;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 6);
      mouseY.set(-y * 6);
    },
    [prefersReduced, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[690px] xl:max-w-[730px] aspect-[3/2] flex items-center justify-center select-none perspective-[1100px]"
    >
      {/* ============================================================ */}
      {/* 1. COMPLEMENTARY DUAL-TONE ATMOSPHERIC LIGHTING             */}
      {/* ============================================================ */}
      {/* Left Cool Indigo/Violet Bloom (Blends with page dark-blue palette) */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.7 }
            : {
                opacity: [0.6, 0.85, 0.6],
                scale: [0.96, 1.04, 0.96],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[38%] left-[6%] -translate-y-1/2 w-[340px] sm:w-[420px] h-[300px] sm:h-[380px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.13)_0%,rgba(79,70,229,0.07)_50%,transparent_75%)] blur-[90px] pointer-events-none z-0"
      />

      {/* Right Cyber Indigo & Violet Monitor Backlight Spill (Soft, matches photo tones) */}
      <motion.div
        animate={
          prefersReduced
            ? { opacity: 0.7 }
            : {
                opacity: [0.6, 0.85, 0.6],
                scale: [0.98, 1.05, 0.98],
              }
        }
        transition={{
          duration: 6.5,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[36%] right-[0%] -translate-y-1/2 w-[360px] sm:w-[440px] h-[320px] sm:h-[400px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.09)_0%,rgba(139,92,246,0.05)_45%,transparent_75%)] blur-[95px] pointer-events-none z-0"
      />

      {/* ============================================================ */}
      {/* 2. MAIN 3D TILT WORKSPACE COMPOSITION                        */}
      {/* ============================================================ */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* ============================================================ */}
        {/* 3. PRIMARY VISUAL ASSET: ULTRA-SHARP 2X RETINA HD PHOTO     */}
        {/* ============================================================ */}
        <motion.div
          animate={
            prefersReduced
              ? { y: 0 }
              : {
                  y: [-3.5, 3.5, -3.5],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* 3A. Ambient Tone Blend Layer (Matches photo edge colors and eliminates harsh dark-blue border) */}
          <div className="absolute -inset-3 sm:-inset-5 pointer-events-none z-0 rounded-3xl opacity-75 blur-2xl">
            {/* Left Indigo/Violet Gradient Bloom (Cool, matches page dark-blue palette) */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-indigo-600/15 via-violet-700/06 to-transparent" />
            {/* Top Purple / Indigo Ambient Bloom (Matches studio wall lights) */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-purple-500/20 via-indigo-600/10 to-transparent" />
            {/* Right Neon Cyan & Indigo Bloom (Matches code monitors) */}
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-sky-400/20 via-indigo-500/10 to-transparent" />
            {/* Bottom Dark Shadow Blend */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#03050a]/60 to-transparent" />
          </div>

          {/* 3B. Rectangular Form 3:2 Photo with Soft Dissolving Edges (Zero Solid Dark-Blue Line) */}
          <div
            className="relative w-full h-full z-10"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 75% at 62% 42%, black 30%, transparent 100%), " +
                "linear-gradient(to right, transparent 0%, black 28%, black 100%), " +
                "linear-gradient(to top, transparent 0%, black 28%, black 100%)",
              WebkitMaskComposite: "destination-in, destination-in",
              maskImage:
                "radial-gradient(ellipse 80% 75% at 62% 42%, black 30%, transparent 100%), " +
                "linear-gradient(to right, transparent 0%, black 28%, black 100%), " +
                "linear-gradient(to top, transparent 0%, black 28%, black 100%)",
              maskComposite: "intersect",
            }}
          >
            <Image
              src="/images/supriya-workspace-ambient.png?v=2"
              alt="Supriya Ghorai - Backend Developer Workspace"
              fill
              priority
              unoptimized
              className="object-contain object-center select-none pointer-events-none"
            />
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 4. GLOWING ARCHITECTURE CIRCUITS (SVG Overlay, Image 3 Inspired) */}
        {/* ============================================================ */}
        <svg
          viewBox="0 0 680 453"
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          fill="none"
          style={{ transform: "translateZ(25px)" }}
        >
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.75" />
            </linearGradient>

            <g id="sparkRef">
              <path d="M 0,-8 Q 0,0 8,0 Q 0,0 0,8 Q 0,0 -8,0 Q 0,0 0,-8 Z" />
            </g>
          </defs>

          {/* Circuit Trace 1: From Golang Core -> Toward Workspace Laptop */}
          <path
            d="M 175 60 C 230 60, 240 140, 275 180 C 300 210, 320 270, 360 310"
            fill="none"
            stroke="url(#circuitGrad)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.55"
          />

          {/* Circuit Trace 2: From Terminal -> Workspace Center */}
          <path
            d="M 210 365 C 260 365, 290 340, 350 330"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* Circuit Trace 3: From Laptop -> Up to Distributed Systems Node */}
          <path
            d="M 400 300 C 440 250, 460 160, 500 65"
            fill="none"
            stroke="url(#circuitGrad)"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            opacity="0.55"
          />

          {/* Animated Data Packets Traveling Along Circuits */}
          {!prefersReduced && (
            <>
              <motion.circle
                cx={175}
                cy={60}
                r="3"
                fill="#38bdf8"
                initial={{ cx: 175, cy: 60, opacity: 0 }}
                animate={{
                  cx: [175, 230, 275, 360],
                  cy: [60, 100, 180, 310],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ filter: "drop-shadow(0 0 5px #38bdf8)" }}
              />

              <motion.circle
                cx={400}
                cy={300}
                r="2.8"
                fill="#818cf8"
                initial={{ cx: 400, cy: 300, opacity: 0 }}
                animate={{
                  cx: [400, 445, 500],
                  cy: [300, 200, 65],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4.2,
                  delay: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ filter: "drop-shadow(0 0 5px #818cf8)" }}
              />
            </>
          )}

          {/* Floating Subtle Micro Sparks */}
          <motion.g
            transform="translate(140, 120)"
            animate={prefersReduced ? {} : { scale: [0.75, 1.25, 0.75], opacity: [0.25, 0.85, 0.25], rotate: [0, 45, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <use href="#sparkRef" fill="#fbbf24" />
          </motion.g>

          <motion.g
            transform="translate(380, 40)"
            animate={prefersReduced ? {} : { scale: [0.8, 1.3, 0.8], opacity: [0.2, 0.8, 0.2], rotate: [0, -45, 0] }}
            transition={{ duration: 4.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <use href="#sparkRef" fill="#38bdf8" />
          </motion.g>

          <motion.g
            transform="translate(630, 140)"
            animate={prefersReduced ? {} : { scale: [0.8, 1.25, 0.8], opacity: [0.25, 0.8, 0.25], rotate: [0, 60, 0] }}
            transition={{ duration: 4.5, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <use href="#sparkRef" fill="#818cf8" />
          </motion.g>
        </svg>

        {/* ============================================================ */}
        {/* 5. FLOATING GLASS ARCHITECTURE CARDS & TELEMETRY NODES      */}
        {/* ============================================================ */}

        {/* CARD 1: GOLANG SYSTEM CORE (Top-Left) */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  y: [-4, 4, -4],
                  rotate: [-0.5, 0.5, -0.5],
                }
          }
          transition={{
            duration: 5.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(40px)" }}
          className="absolute top-2 sm:top-3 left-1 sm:left-2 z-30 group cursor-pointer"
        >
          <div className="relative flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#060b1e]/85 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_25px_rgba(56,189,248,0.22)] transition-all duration-300">
            {/* Cute Gopher Container */}
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <circle cx="10" cy="9" r="2.8" fill="#38bdf8" />
                <circle cx="22" cy="9" r="2.8" fill="#38bdf8" />
                <rect x="8" y="8" width="16" height="18" rx="7" fill="#38bdf8" />
                <circle cx="12" cy="14" r="2.6" fill="#ffffff" />
                <circle cx="12.5" cy="14" r="1.1" fill="#0f172a" />
                <circle cx="20" cy="14" r="2.6" fill="#ffffff" />
                <circle cx="19.5" cy="14" r="1.1" fill="#0f172a" />
                <ellipse cx="16" cy="18" rx="2" ry="1.2" fill="#fde047" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">Golang Backend</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              </div>
              <div className="text-[9.5px] text-slate-400 font-medium">Building scalable systems</div>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: IDEAS TO IMPACT TERMINAL (Bottom-Left) */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  y: [3.5, -3.5, 3.5],
                  rotate: [0.4, -0.4, 0.4],
                }
          }
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(38px)" }}
          className="absolute bottom-2 sm:bottom-3 left-1 sm:left-2 z-30 group cursor-pointer"
        >
          <div className="relative p-3 rounded-2xl bg-[#060b1e]/90 backdrop-blur-xl border border-amber-500/30 hover:border-amber-400/60 shadow-[0_8px_25px_rgba(0,0,0,0.65)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.2)] transition-all duration-300">
            {/* macOS Window Controls */}
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-[8.5px] font-mono text-slate-500">~/distributed-system.go</span>
            </div>

            {/* Syntax Code */}
            <div className="font-mono text-[9.5px] leading-relaxed">
              <div className="text-teal-400 font-medium">{"// Ideas to Impact"}</div>
              <div>
                <span className="text-pink-400 font-semibold">const</span>{" "}
                <span className="text-sky-300">build</span>{" "}
                <span className="text-slate-400">=</span>{" "}
                <span className="text-slate-300">(ideas)</span>{" "}
                <span className="text-pink-400 font-semibold">=&gt;</span>
              </div>
              <div className="pl-2 flex items-center">
                <span className="text-sky-400 font-medium">realWorldSolutions</span>
                <span className="text-slate-300">(ideas);</span>
                <motion.span
                  animate={prefersReduced ? {} : { opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                  className="inline-block w-1 h-2.5 ml-0.5 bg-cyan-400"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: DISTRIBUTED SYSTEMS & APIS (Top-Right) */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  y: [-3.5, 4, -3.5],
                  rotate: [0.4, -0.4, 0.4],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(40px)" }}
          className="absolute top-2 sm:top-3 right-1 sm:right-2 z-30 group cursor-pointer"
        >
          <div className="relative flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#060b1e]/85 backdrop-blur-xl border border-sky-500/30 hover:border-sky-400/60 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_25px_rgba(56,189,248,0.22)] transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-sky-400" fill="currentColor">
                <circle cx="12" cy="5" r="2.5" />
                <circle cx="5" cy="18" r="2.5" />
                <circle cx="19" cy="18" r="2.5" />
                <line x1="12" y1="5" x2="5" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <line x1="12" y1="5" x2="19" y2="18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">Distributed Systems</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping shadow-[0_0_6px_#38bdf8]" />
              </div>
              <div className="text-[9.5px] text-slate-400 font-medium">Scalable • Resilient • Secure</div>
            </div>
          </div>
        </motion.div>


      </motion.div>
    </div>
  );
}
