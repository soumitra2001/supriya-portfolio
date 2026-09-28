"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className = "",
  size = 60,
  duration = 5,
  borderWidth = 1.5,
  delay = 0,
  colorFrom = "#38bdf8",
  colorTo = "#6366f1",
}: BorderBeamProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--delay": `-${delay}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] ${className}`}
    >
      <div
        className="absolute aspect-square w-[var(--size)] [animation:border-beam_var(--duration)_infinite_linear] [animation-delay:var(--delay)] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] [offset-anchor:calc(var(--size)/2)_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)))]"
      />
    </div>
  );
}
