"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GridBeam() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Laser line traveling horizontally (very subtle) */}
      <motion.div
        initial={{ x: "-20%", opacity: 0 }}
        animate={{
          x: ["0%", "120%"],
          opacity: [0, 0.2, 0.2, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
        className="absolute top-[28%] left-0 w-[240px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[0.5px]"
      />

      {/* Laser line traveling vertically near left margin */}
      <motion.div
        initial={{ y: "-20%", opacity: 0 }}
        animate={{
          y: ["0%", "120%"],
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
          repeatDelay: 3,
        }}
        className="absolute top-0 left-[6%] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-indigo-400 to-transparent blur-[0.5px]"
      />

      {/* Glowing intersection node (very subtle) */}
      <motion.div
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[28%] left-[6%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/80 blur-[1px] shadow-[0_0_8px_#38bdf8]"
      />
    </div>
  );
}
