import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  HeartPulse,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Lock,
  Calendar,
  Layers,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TR GlowCare Case Study | Supriya Ghorai — Senior Software Engineer",
  description:
    "Engineering deep dive into TR GlowCare: Building a full-stack production at-home clinical skincare and wellness platform with distributed slot reservation in Bangalore.",
};

export default function TRGlowCareCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-400">
              <HeartPulse className="w-3.5 h-3.5" />
              Live Consumer Healthcare Platform
            </span>
            <a
              href="https://trglowcare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <span>Visit trglowcare.com</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            TR GlowCare: Architecting a Production At-Home Clinical Platform
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
            How I engineered the complete end-to-end digital infrastructure powering at-home dermatologist-designed skincare services across Bangalore—from distributed slot locking and appointment state machines to seamless e-commerce booking flows.
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div>
              <div className="text-2xl font-bold font-mono text-rose-400">4.9 ★</div>
              <div className="text-xs text-slate-400 mt-1">500+ Verified Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400">0%</div>
              <div className="text-xs text-slate-400 mt-1">Double-Booking Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-cyan-400">Bangalore</div>
              <div className="text-xs text-slate-400 mt-1">Primary Market Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-indigo-400">6+</div>
              <div className="text-xs text-slate-400 mt-1">Clinical Treatment Lines</div>
            </div>
          </div>
        </div>

        {/* System Architecture Diagram */}
        <div className="my-12 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            System Architecture Overview
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            Full-Stack Booking, Slot Reservation & Fulfillment Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-slate-500 mb-1">CLIENT LAYER</div>
                <div className="font-semibold text-white text-sm">Next.js & Mobile Web</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">
                  Dermatologist consultation flow, treatment categorization, cart & real-time address validation in Bangalore pin codes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-emerald-400">
                &lt;SSR & Static Pre-rendering&gt;
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-slate-500 mb-1">CONCURRENCY LAYER</div>
                <div className="font-semibold text-white text-sm">Redis Distributed Locks</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">
                  Atomic SETNX slot reservations with 5-minute lease windows preventing concurrent users from booking the same therapist.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-rose-400">
                &lt;Zero Race Conditions&gt;
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-slate-500 mb-1">TRANSACTIONAL CORE</div>
                <div className="font-semibold text-white text-sm">PostgreSQL Store</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">
                  ACID order state machine, therapist availability matrices, treatment histories, and automated payment reconciliations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-cyan-400">
                &lt;ACID Ledger & Audits&gt;
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-slate-500 mb-1">OPERATIONS ENGINE</div>
                <div className="font-semibold text-white text-sm">Therapist Dispatch</div>
                <p className="text-[11px] text-slate-400 font-sans mt-2">
                  Automated WhatsApp notifications, kit preparation checklists, and clinic-grade protocol verification pipelines.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-indigo-400">
                &lt;Real-Time Ops Alerts&gt;
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Deep Dives */}
        <div className="max-w-4xl space-y-12 mt-16">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              1. The Slot Contention Challenge: Preventing Double-Bookings
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              In at-home clinical skincare, physical dermatological technicians must travel between customer homes. Unlike pure digital bookings, travel buffer times, traffic unpredictability in Bangalore, and simultaneous user checkouts can easily trigger catastrophic double-bookings if not strictly guarded.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              To solve this, I designed a two-phase reservation pattern: when a visitor selects a time slot during checkout, an atomic Redis lease (<code>{"SETNX slot:{id}:{date} {userId} EX 300"}</code>) is acquired. If checkout succeeds within the 5-minute window, the slot transitions to committed in PostgreSQL within a serializable transaction. If abandoned, the lease expires silently with zero database lock contention.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              2. End-to-End Product Craft & Conversion
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              A high-performing backend is only valuable when the user experience converts. I architected TR GlowCare with clear clinical categorization (Hydra Facials, Tan Removal & Pigmentation, Laser Hair Removal, Acne Care, Anti-Ageing), trust indicators (dermatologist consultation at ₹99), and transparent post-care tracking.
            </p>
          </div>

          {/* External Callout */}
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-white text-base">
                Explore the Live TR GlowCare Platform
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Experience the live customer experience and booking engine operating in Bangalore.
              </div>
            </div>
            <a
              href="https://trglowcare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shrink-0"
            >
              <span>Launch Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
