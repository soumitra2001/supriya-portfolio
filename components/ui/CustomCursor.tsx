"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor for precision pointer devices (desktops/laptops with mouse/trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.dataset.cursor === "pointer";

      setIsPointer(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Trailing Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.8 : 1,
          borderColor: isPointer ? "rgba(16, 185, 129, 0.7)" : "rgba(148, 163, 184, 0.3)",
          backgroundColor: isPointer ? "rgba(16, 185, 129, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
        className="w-8 h-8 rounded-full border border-slate-400/40 pointer-events-none"
      />

      {/* Core Center Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
          backgroundColor: isPointer ? "#34d399" : "#10b981",
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full pointer-events-none fixed"
      />
    </div>
  );
}
