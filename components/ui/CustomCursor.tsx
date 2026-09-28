"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  isStar: boolean;
}

const SPARKLE_COLORS = [
  "#38bdf8", // Sky cyan
  "#22d3ee", // Cyan
  "#818cf8", // Indigo
  "#c084fc", // Purple
  "#e879f9", // Magenta
  "#ffffff", // White core
];

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (prefersReducedMotion || typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let lastMouseX = -100;
    let lastMouseY = -100;
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;
    let isHoveringInteractive = false;

    const createParticle = (x: number, y: number, burst = false) => {
      if (particles.length > 25) {
        particles.shift();
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? Math.random() * 3 + 1 : Math.random() * 1.2 + 0.3;
      const isStar = Math.random() > 0.35;
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];

      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? 0.5 : 0.2), // gentle float upward
        size: isStar ? Math.random() * 4 + 3 : Math.random() * 2 + 1.5,
        maxLife: burst ? Math.random() * 25 + 25 : Math.random() * 20 + 20,
        life: 0,
        color,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        isStar,
      });
    };

    const draw4PointStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      rotation: number
    ) => {
      context.save();
      context.translate(cx, cy);
      context.rotate(rotation);
      context.beginPath();
      // Draw 4-point sparkle star
      const inner = size * 0.22;
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        const b = a + Math.PI / 4;
        if (i === 0) {
          context.moveTo(Math.cos(a) * size, Math.sin(a) * size);
        } else {
          context.lineTo(Math.cos(a) * size, Math.sin(a) * size);
        }
        context.lineTo(Math.cos(b) * inner, Math.sin(b) * inner);
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dist = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);
      if (dist > 6) {
        const count = isHoveringInteractive ? 2 : 1;
        for (let i = 0; i < count; i++) {
          createParticle(mouseX, mouseY);
        }
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }

      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const onMouseDown = (e: MouseEvent) => {
      // Little burst of sparkles on click
      for (let i = 0; i < 8; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      isHoveringInteractive = !!(
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      );
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Sparkle Particles with high-performance alpha blending (zero shadowBlur)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        const progress = p.life / p.maxLife;
        const alpha = Math.sin((1 - progress) * Math.PI * 0.5);
        const currentSize = p.size * (1 - progress * 0.4);

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = p.color;

        if (p.isStar) {
          draw4PointStar(ctx, p.x, p.y, currentSize, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block"
    />
  );
}
