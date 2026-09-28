"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface RotatingWordItem {
  text: string;
  gradient: string;
  glow?: string;
}

interface FlipWordsProps {
  words: (string | RotatingWordItem)[];
  duration?: number;
  className?: string;
}

export function FlipWords({
  words,
  duration = 3000,
  className = "",
}: FlipWordsProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [duration, prefersReduced, words.length]);

  const rawItem = words[currentWordIndex];
  const item: RotatingWordItem =
    typeof rawItem === "string"
      ? {
          text: rawItem,
          gradient: "from-[#38bdf8] via-[#c084fc] via-[#818cf8] to-[#38bdf8]",
          glow: "drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]",
        }
      : rawItem;

  if (prefersReduced) {
    const firstItem = typeof words[0] === "string" ? { text: words[0], gradient: "", glow: "" } : words[0];
    return <span className={className}>{firstItem.text}</span>;
  }

  return (
    <span className="relative inline-flex items-baseline overflow-hidden align-baseline">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={item.text}
          initial={{ opacity: 0, y: "85%", filter: "blur(4px)" }}
          animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-85%", filter: "blur(4px)" }}
          transition={{
            y: { type: "spring", stiffness: 220, damping: 24, mass: 0.8 },
            opacity: { duration: 0.32, ease: "easeInOut" },
            filter: { duration: 0.32 },
          }}
          className={`inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} ${item.glow || ""} ${className}`}
        >
          {item.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
