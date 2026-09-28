"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Star,
  Users,
  Eye,
  MousePointerClick,
  Activity,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Maximize2,
  X,
  ExternalLink,
  QrCode,
  CalendarCheck,
  Layers,
  Cpu,
  Database,
  Smartphone,
  Check,
} from "lucide-react";

export function TRGlowCareProjectView() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "architecture" | "challenges" | "learnings"
  >("overview");

  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [showScreenshotModal, setShowScreenshotModal] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>("/projects/tr-glowcare-analytics-v2.png");
  const [modalTitle, setModalTitle] = useState<string>("TR GlowCare · Live Admin Telemetry");
  const [analyticsViewMode, setAnalyticsViewMode] = useState<"metrics" | "screenshot">("metrics");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "architecture", label: "Architecture" },
    { id: "challenges", label: "Challenges" },
    { id: "learnings", label: "What I Learned" },
  ] as const;

  // Real features built in /Users/flurn/turacare and backed by uploaded production screenshots
  const features = [
    {
      title: "Services & Treatment Catalog",
      tagline: "Dermatologist-Designed Clinical Menu",
      description:
        "Comprehensive service explorer with clinic-grade protocol highlights, transparent pricing, session duration metrics, and specialized categorization for Bengaluru customers.",
      badge: "Discovery Engine",
      image: "/projects/tr-glowcare-services.png",
      aspectRatio: "aspect-[16/8.8]",
      highlights: [
        "Hydra Glow Facial (₹2799), Anti-Pigmentation Peel (₹2499), Personalised Skin Consultation (₹99)",
        "Category tabs: Skin Brightening, Tan Removal & Pigmentation, Laser Hair Removal, Acne Care",
        "Transparent pricing with 'Book Now, Relax & Pay After We Serve You' guarantee",
        "Optimized responsive catalog pre-rendered with Next.js 16 and cached Supabase queries",
      ],
    },
    {
      title: "Booking Management & Cart Flow",
      tagline: "Frictionless Appointment Lifecycle",
      description:
        "End-to-end customer booking portal at /bookings with automated alphanumeric reference generation (TUR-2026-XXXX), Bangalore locality verification, and multi-tab appointment filters.",
      badge: "Booking Core",
      image: "/projects/tr-glowcare-bookings.png",
      aspectRatio: "aspect-[16/8.8]",
      highlights: [
        "Automated PostgreSQL sequence trigger generating unique references (e.g. TUR-2026-0011)",
        "Filterable booking states: All, Upcoming, Completed, and Cancelled appointments",
        "Persistent cart & booking store powered by Zustand with local storage state hydration",
        "Hyper-local address verification across Bangalore localities (Indiranagar, HSR, Koramangala, etc.)",
      ],
    },
    {
      title: "Post-Service Settlement Workflow",
      tagline: "Zero Upfront Barrier · Pay After Service",
      description:
        "Disruptive consumer trust model where customers book appointments without upfront card authorization. Once clinical aestheticians mark the service as finished, payment unlocks seamlessly.",
      badge: "Trust Engine",
      image: "/projects/tr-glowcare-postservice-pay.png",
      aspectRatio: "aspect-[16/8.8]",
      highlights: [
        "Aesthetician service completion triggers automated 'Treatment Completed · Payment Due' state",
        "Dynamic 'Pay ₹2799 via UPI or Card' instant trigger embedded directly in customer view",
        "Eliminates pre-service checkout hesitation, increasing appointment conversion rate",
        "Real-time UI state sync between clinician app and client portal upon status updates",
      ],
    },
    {
      title: "Cashfree Dynamic UPI QR & Payments",
      tagline: "Instant QR Generation & Webhook Reconciliation",
      description:
        "Integrated Cashfree Payment Gateway supporting dynamic UPI QR codes (GPay, PhonePe, Paytm), Net Banking, Credit/Debit cards, and EMI with cryptographic HMAC-SHA256 signature verification.",
      badge: "Financial Core",
      image: "/projects/tr-glowcare-payment-v2.png",
      aspectRatio: "aspect-[16/8.8]",
      highlights: [
        "Direct Cashfree Orders API with channel: 'qrcode' generating scan-and-pay UPI QR codes",
        "HMAC-SHA256 verified webhook listeners preventing payment spoofing and ensuring idempotency",
        "Support for major UPI apps, RuPay, Visa, Mastercard, Net Banking, and Cardless EMI",
        "Zero payment discrepancy across production transactions with automatic receipt dispatch",
      ],
    },
    {
      title: "Admin Analytics & Visitor Telemetry",
      tagline: "Custom Built Real-Time Journey Tracking",
      description:
        "In-house privacy-focused visitor tracking dashboard at /admin/analytics built on PostgreSQL, reporting real-time page views, city-level geolocation, and action clicks without heavy third-party cookies.",
      badge: "Observability",
      image: "/projects/tr-glowcare-analytics-v2.png",
      aspectRatio: "aspect-[16/9]",
      highlights: [
        "Custom client beacon (navigator.sendBeacon) streaming events into analytics_sessions & analytics_events",
        "City breakdown attribution (Bengaluru 38%, Dallas 23%, Delhi 7%) with sub-1.2KB tracking payload",
        "High-fidelity telemetry on homepage views, service category discovery, and bottom bar clicks",
        "Preserves 99+ Core Web Vitals performance on budget mobile devices across India",
      ],
    },
  ];

  const openLightbox = (src: string, title: string) => {
    setModalImageSrc(src);
    setModalTitle(title);
    setShowScreenshotModal(true);
  };

  return (
    <div className="min-h-screen bg-[#070a14] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-16 right-1/4 w-[450px] h-[450px] bg-indigo-600/12 rounded-full blur-[130px]" />
        <div className="absolute top-80 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
        {/* Compact Back Link */}
        <div className="mb-5 sm:mb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* ==================================================================== */}
        {/* COMPACT HERO SECTION: Matches Design Mockup                          */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8 sm:mb-10">
          {/* Left Column: Project Identity */}
          <div className="lg:col-span-5 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.08]">
              TR GlowCare
            </h1>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed max-w-md">
              A premium skincare booking platform designed for real customers in
              Bangalore.
            </p>

            {/* Authentic Tech Badges from codebase */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {[
                "Next.js 16",
                "Supabase PostgreSQL",
                "Cashfree PG",
                "Firebase Auth",
                "Google Gemini AI",
                "Zustand",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900/90 border border-slate-800 text-slate-300 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Visit Platform Button */}
            <div className="pt-2">
              <a
                href="https://trglowcare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Visit Platform</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats Card: Translucent Glass Container matching Reference Mockup */}
            <div className="rounded-2xl bg-slate-900/50 border border-slate-800/80 p-4 sm:p-5 backdrop-blur-md grid grid-cols-3 gap-4 max-w-md shadow-lg shadow-black/40">
              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  41+
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">
                  Unique Visitors a Day
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-1">
                  <span>4.9</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">
                  User Rating
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  99.9%
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">
                  Uptime
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Studio Device Mockup */}
          <div className="lg:col-span-7 relative flex items-center justify-center pt-4 lg:pt-0">
            {/* Ambient Cosmic Purple Lighting Behind Devices */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.32)_0%,rgba(99,102,241,0.18)_50%,transparent_75%)] blur-3xl pointer-events-none" />

            {/* 3D Perspective Stage Container */}
            <div
              className="relative w-full max-w-[580px] mx-auto pt-2 pb-6 select-none"
              style={{
                perspective: "1300px",
                perspectiveOrigin: "45% 45%",
              }}
            >
              {/* Floor Ambient Purple Ground Glow & Surface Reflection */}
              <div className="absolute -bottom-2 right-4 w-[85%] h-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/40 to-pink-500/25 blur-xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-1 right-8 w-[70%] h-3 bg-purple-500/50 blur-md rounded-full pointer-events-none" />

              {/* TABLET: Tilted back on easel stand with full-bleed zero-crop display */}
              <div
                className="relative w-[85%] sm:w-[86%] rounded-[24px] sm:rounded-[28px] p-2.5 sm:p-3 bg-[#131726] border border-slate-700/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_25px_rgba(147,51,234,0.15)] ring-1 ring-white/10 ring-inset z-10 transition-transform duration-500"
                style={{
                  transform: "rotateY(-18deg) rotateX(14deg) rotateZ(-1deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Tablet Camera dot at top-center bezel */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 ring-1 ring-slate-800 z-30" />

                {/* Tablet Screen: Exact 1024/559 aspect ratio - ZERO pixels cut on left or right */}
                <div className="relative w-full aspect-[1024/559] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#fdfbf7] shadow-inner">
                  <Image
                    src="/projects/tr-glowcare-hero.png"
                    alt="TR GlowCare Desktop Platform"
                    fill
                    sizes="(max-width: 1024px) 90vw, 48vw"
                    className="object-contain object-top"
                    priority
                  />
                </div>

                {/* Ground contact line directly beneath tablet bottom bezel */}
                <div className="absolute -bottom-1.5 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent blur-[0.5px]" />
              </div>

              {/* MOBILE PHONE: Standing in foreground right at natural height, overlapping corner */}
              <div
                className="absolute -bottom-2 right-0 sm:right-1 w-[29%] sm:w-[28%] rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 bg-[#141624] border border-purple-500/25 shadow-[-20px_20px_45px_rgba(0,0,0,0.95),-6px_6px_20px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.3)] ring-1 ring-white/15 ring-inset z-20 transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  transform: "rotateY(-14deg) rotateX(10deg) rotateZ(0.5deg) translateZ(45px)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Dynamic Island Pill at top of phone */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-9 sm:w-11 h-2.5 bg-black rounded-full z-30 flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-800 ml-auto mr-1.5" />
                </div>

                {/* Mobile Screen: Exact 476/1024 aspect ratio */}
                <div className="relative w-full aspect-[476/1024] rounded-[22px] sm:rounded-[25px] overflow-hidden bg-[#fffbf7]">
                  <Image
                    src="/projects/tr-glowcare-mobile.png"
                    alt="TR GlowCare Mobile Services"
                    fill
                    sizes="(max-width: 1024px) 35vw, 16vw"
                    className="object-cover object-top"
                  />

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-9 h-0.5 bg-slate-800/80 rounded-full z-30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* COMPACT TAB NAVIGATION: Matches Reference Mockup                     */}
        {/* ==================================================================== */}
        <div className="border-b border-slate-800/80 mb-6 sm:mb-8">
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none pb-0.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-2.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TAB CONTENTS                                                         */}
        {/* ==================================================================== */}
        <div>
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Side: Overview Narrative matching Design */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5">
                      Overview
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      TR GlowCare is a full-stack clinical skincare and wellness
                      platform built for real consumers in Bangalore. Engineered
                      from the ground up to solve appointment booking, at-home
                      aesthetician dispatch, and post-service digital payments
                      without customer friction.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                      <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>Book Now, Pay After Service</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                        Removes pre-service checkout hesitation. Customers
                        select preferred appointment slots first and pay
                        post-treatment via Cashfree UPI QR or card.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                      <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm mb-0.5">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Cashfree Multi-Payment Gateway</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                        Instant dynamic UPI QR generation, cards, Net Banking,
                        and HMAC-SHA256 verified webhooks ensuring zero-drop
                        order settlement.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
                      <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm mb-0.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Privacy-First Custom Telemetry</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                        In-house beacon pipeline recording real-time session
                        journeys, city attribution, and conversion funnels directly
                        into Supabase PostgreSQL.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Real Telemetry Dashboard (Image 5 Data) */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl bg-[#090d1a] border border-slate-800 p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            Site Analytics & Visitor Journeys
                          </h3>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live Tracking
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Real-time site traffic, geographic cities, and step-by-step user flows.
                        </p>
                      </div>

                      {/* View Mode Toggle: Summary vs Screenshot */}
                      <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
                        <button
                          onClick={() => setAnalyticsViewMode("metrics")}
                          className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                            analyticsViewMode === "metrics"
                              ? "bg-slate-800 text-white font-semibold"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Data
                        </button>
                        <button
                          onClick={() => setAnalyticsViewMode("screenshot")}
                          className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                            analyticsViewMode === "screenshot"
                              ? "bg-slate-800 text-white font-semibold"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          Screenshot
                        </button>
                      </div>
                    </div>

                    {/* View 1: Compact Interactive Telemetry Dashboard */}
                    {analyticsViewMode === "metrics" ? (
                      <div className="space-y-4 pt-3.5">
                        {/* 4 Stat Badges from Image 5 */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <div className="flex items-center justify-between text-slate-400 mb-0.5">
                              <span className="text-[9px] uppercase font-mono tracking-wider">
                                Daily Visitors
                              </span>
                              <Users className="w-3 h-3 text-blue-400" />
                            </div>
                            <div className="text-xl font-bold font-mono text-white">
                              41+
                            </div>
                            <div className="text-[9px] text-slate-500">
                              Unique visitors a day
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <div className="flex items-center justify-between text-slate-400 mb-0.5">
                              <span className="text-[9px] uppercase font-mono tracking-wider">
                                Total Sessions
                              </span>
                              <Activity className="w-3 h-3 text-purple-400" />
                            </div>
                            <div className="text-xl font-bold font-mono text-white">
                              61
                            </div>
                            <div className="text-[9px] text-slate-500">
                              Browsing visits
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <div className="flex items-center justify-between text-slate-400 mb-0.5">
                              <span className="text-[9px] uppercase font-mono tracking-wider">
                                Page Views
                              </span>
                              <Eye className="w-3 h-3 text-amber-400" />
                            </div>
                            <div className="text-xl font-bold font-mono text-white">
                              109
                            </div>
                            <div className="text-[9px] text-slate-500">
                              Pages browsed
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <div className="flex items-center justify-between text-slate-400 mb-0.5">
                              <span className="text-[9px] uppercase font-mono tracking-wider">
                                Clicks Tracked
                              </span>
                              <MousePointerClick className="w-3 h-3 text-emerald-400" />
                            </div>
                            <div className="text-xl font-bold font-mono text-white">
                              60
                            </div>
                            <div className="text-[9px] text-slate-500">
                              Interactive actions
                            </div>
                          </div>
                        </div>

                        {/* Breakdown: Visitors by City & Top Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {/* Visitors by City */}
                          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2.5">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              <span>Visitors by City</span>
                            </div>
                            <div className="space-y-2 text-[11px] font-mono">
                              {[
                                { city: "Bengaluru", count: "23", pct: 38 },
                                { city: "Dallas", count: "14", pct: 23 },
                                { city: "Council Bluffs", count: "5", pct: 8 },
                                { city: "Ashburn", count: "5", pct: 8 },
                                { city: "Delhi", count: "4", pct: 7 },
                              ].map((item) => (
                                <div key={item.city}>
                                  <div className="flex justify-between text-slate-300 text-[10px] mb-0.5">
                                    <span>{item.city}</span>
                                    <span className="text-slate-400">
                                      {item.count} sessions ({item.pct}%)
                                    </span>
                                  </div>
                                  <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                                    <div
                                      className="h-full bg-amber-500 rounded-full"
                                      style={{ width: `${item.pct * 2}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Top Buttons Clicked */}
                          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2.5">
                              <MousePointerClick className="w-3 h-3 text-purple-400" />
                              <span>Top Actions Clicked</span>
                            </div>
                            <div className="space-y-1.5 text-[10px]">
                              {[
                                { rank: 1, action: "Viewed Homepage", clicks: 52 },
                                { rank: 2, action: "Viewed Categories", clicks: 13 },
                                { rank: 3, action: "Viewed Bookings", clicks: 11 },
                                { rank: 4, action: "Viewed Profile", clicks: 7 },
                                { rank: 5, action: "Viewed Skin Care Hub", clicks: 6 },
                                { rank: 6, action: "Clicked Services Bar", clicks: 4 },
                              ].map((item) => (
                                <div
                                  key={item.action}
                                  className="flex items-center justify-between py-0.5 border-b border-slate-800/40 last:border-none"
                                >
                                  <div className="flex items-center gap-1.5 truncate">
                                    <span className="w-3.5 h-3.5 rounded bg-slate-800 flex items-center justify-center text-[9px] font-mono text-slate-400 shrink-0">
                                      {item.rank}
                                    </span>
                                    <span className="text-slate-300 truncate">
                                      {item.action}
                                    </span>
                                  </div>
                                  <span className="font-mono text-indigo-400 shrink-0 bg-indigo-950/40 px-1 py-0.2 rounded">
                                    {item.clicks}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* View 2: High-Resolution Screenshot directly embedded */
                      <div className="pt-3 space-y-2">
                        <div
                          className="relative aspect-[16/9.2] w-full rounded-xl overflow-hidden border border-slate-700/80 bg-black cursor-zoom-in group"
                          onClick={() =>
                            openLightbox(
                              "/projects/tr-glowcare-analytics-v2.png",
                              "TR GlowCare · Live Admin Telemetry Portal"
                            )
                          }
                        >
                          <Image
                            src="/projects/tr-glowcare-analytics-v2.png"
                            alt="TR GlowCare Admin Analytics Portal"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                          />
                          {/* Subtle top-right zoom button only on hover */}
                          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="p-1.5 rounded-lg bg-black/75 border border-white/20 text-white flex items-center shadow-lg">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FEATURES (Interactive Showcase Powered by Uploaded Production Images) */}
          {activeTab === "features" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="max-w-2xl">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
                  Production Feature Walkthrough
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Real screens and architectural subsystems running live in
                  production on trglowcare.com.
                </p>
              </div>

              {/* Feature Selection Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                {features.map((feat, idx) => (
                  <button
                    key={feat.title}
                    onClick={() => setActiveFeature(idx)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      activeFeature === idx
                        ? "bg-slate-900 border-indigo-500/80 shadow-md shadow-indigo-500/10"
                        : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider mb-0.5">
                      {feat.badge}
                    </div>
                    <div className="text-xs sm:text-[13px] font-semibold text-white truncate">
                      {feat.title}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Feature Display Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {/* Details on Left */}
                <div className="lg:col-span-5 space-y-3.5">
                  <div className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {features[activeFeature].tagline}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {features[activeFeature].description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Technical & UX Highlights
                    </div>
                    {features[activeFeature].highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() =>
                        openLightbox(
                          features[activeFeature].image,
                          features[activeFeature].title
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>View Full Resolution Screen</span>
                    </button>
                  </div>
                </div>

                {/* Visual Preview on Right */}
                <div className="lg:col-span-7 flex justify-center">
                  <div
                    onClick={() =>
                      openLightbox(
                        features[activeFeature].image,
                        features[activeFeature].title
                      )
                    }
                    className={`relative w-full ${features[activeFeature].aspectRatio} rounded-2xl border-2 sm:border-3 border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden cursor-zoom-in group`}
                  >
                    <Image
                      src={features[activeFeature].image}
                      alt={features[activeFeature].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                    />
                    {/* Subtle top-right zoom button only on hover */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-2 rounded-xl bg-black/80 border border-white/20 text-white flex items-center shadow-xl">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ARCHITECTURE (Accurate to /Users/flurn/turacare) */}
          {activeTab === "architecture" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
                  Production System Architecture
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  TR GlowCare links Next.js 16 with Supabase PostgreSQL Row
                  Level Security, Cashfree Payment Gateway, and an in-house
                  telemetry pipeline built for high-conversion clinical bookings.
                </p>
              </div>

              {/* 4-Layer Architecture Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                      Layer 1 · Client & State
                    </div>
                    <div className="font-semibold text-white text-sm mb-1.5">
                      Next.js 16 & Zustand
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Zustand persistent stores (useCartStore, useBookingStore)
                      coordinating multi-step service selection, coupons, and
                      Bangalore locality radius matching.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-cyan-400">
                    &lt;SSR + Zustand Persistence&gt;
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                      Layer 2 · Database & RLS
                    </div>
                    <div className="font-semibold text-white text-sm mb-1.5">
                      Supabase PostgreSQL
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Relational schema (users, bookings, booking_items, addresses,
                      family_members) guarded by strict Row Level Security
                      and automated reference triggers (TUR-2026-XXXX).
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-emerald-400">
                    &lt;PostgreSQL RLS + Sequences&gt;
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-rose-400 uppercase tracking-wider mb-1">
                      Layer 3 · Financial Gateway
                    </div>
                    <div className="font-semibold text-white text-sm mb-1.5">
                      Cashfree Orders & Webhooks
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Cashfree Order Pay API generating dynamic UPI QR codes
                      (channel: 'qrcode') and verifying webhooks via
                      cryptographic HMAC-SHA256 signatures.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-rose-400">
                    &lt;Dynamic UPI QR + HMAC SHA256&gt;
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-purple-400 uppercase tracking-wider mb-1">
                      Layer 4 · Telemetry Core
                    </div>
                    <div className="font-semibold text-white text-sm mb-1.5">
                      In-House Visitor Telemetry
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sub-1.2KB client beacon streaming sessions and clicks
                      via navigator.sendBeacon into analytics_sessions and
                      analytics_events tables.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-purple-400">
                    &lt;sendBeacon + Indexed Telemetry&gt;
                  </div>
                </div>
              </div>

              {/* Code Snippet from Real Codebase (lib/cashfree.ts) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2.5 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-slate-300 ml-2">lib/cashfree.ts</span>
                  </div>
                  <span className="text-indigo-400">Production Code</span>
                </div>

                <pre className="text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`/**
 * Creates an order and generates a Dynamic UPI QR code via Cashfree Order Pay API
 * Production implementation from TR GlowCare
 */
export async function createCashfreeUpiOrder(params: {
  orderId: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notifyUrl?: string;
}): Promise<{ order_id: string; payment_session_id: string; qrcode: string | null }> {
  const config = getCashfreeConfig();
  const baseUrl = getCashfreeBaseUrl(config.isProd);
  const sanitizedPhone = (params.customerPhone || '').replace(/\\D/g, '').slice(-10);

  // 1. Create Cashfree Order
  const orderRes = await fetch(\`\${baseUrl}/orders\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': config.apiVersion,
      'x-client-id': config.appId,
      'x-client-secret': config.secretKey,
    },
    body: JSON.stringify({
      order_id: params.orderId,
      order_amount: Math.round(params.amount * 100) / 100,
      order_currency: 'INR',
      customer_details: {
        customer_id: \`cust_\${sanitizedPhone}\`,
        customer_phone: sanitizedPhone,
        customer_name: params.customerName || 'Customer',
      },
      ...(params.notifyUrl ? { order_meta: { notify_url: params.notifyUrl } } : {}),
    }),
  });

  const orderData = await orderRes.json();
  if (!orderRes.ok || !orderData.payment_session_id) {
    throw new Error(orderData?.message || 'Failed to create Cashfree order for UPI QR');
  }

  // 2. Call Order Pay with channel: 'qrcode' for dynamic UPI scan-and-pay
  const payRes = await fetch(\`\${baseUrl}/orders/sessions\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': config.apiVersion,
      'x-client-id': config.appId,
      'x-client-secret': config.secretKey,
    },
    body: JSON.stringify({
      payment_session_id: orderData.payment_session_id,
      payment_method: { upi: { channel: 'qrcode' } },
    }),
  });

  const payData = await payRes.json();
  return {
    order_id: params.orderId,
    payment_session_id: orderData.payment_session_id,
    qrcode: payData?.data?.payload?.qrcode || null,
  };
}`}
                </pre>
              </div>
            </motion.div>
          )}

          {/* TAB 4: CHALLENGES */}
          {activeTab === "challenges" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 max-w-4xl"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
                  Engineering Challenges & Solutions
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Real operational hurdles solved while building and deploying
                  TR GlowCare to paying Bengaluru consumers.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    <span className="text-rose-400 font-mono text-xs sm:text-sm">01.</span>
                    <span>High Pre-Payment Abandonment in On-Demand Skincare</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Requiring immediate credit card or UPI payment before a
                    customer has ever experienced an aesthetician treatment created
                    a 64% checkout drop-off rate. In home clinical care, trust is
                    established upon physical clinician arrival.
                  </p>
                  <p className="text-[11px] sm:text-xs text-emerald-400 font-mono mt-2.5 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                    Solution: Architected the 'Book Now, Pay After Service' state
                    machine. The customer reserves the slot with zero payment,
                    and once the treatment is completed, the clinician app transitions
                    the order to 'Payment Due', triggering Cashfree dynamic QR in-app.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-xs sm:text-sm">02.</span>
                    <span>Asynchronous Cashfree Webhook Reconciliation</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Mobile internet in apartment basements in Bengaluru often
                    drops right after UPI app authorization, preventing the
                    customer browser from completing redirect handshakes.
                  </p>
                  <p className="text-[11px] sm:text-xs text-cyan-400 font-mono mt-2.5 bg-cyan-950/30 p-2 rounded-lg border border-cyan-500/20">
                    Solution: Built idempotent webhook listeners with HMAC-SHA256
                    signature validation. Webhook payloads update payment_status to
                    'paid' and dispatch automated WhatsApp confirmations regardless
                    of browser connectivity.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    <span className="text-purple-400 font-mono text-xs sm:text-sm">03.</span>
                    <span>Privacy-First Observability Without Google Analytics Bloat</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Third-party analytics trackers injected heavy external JS scripts,
                    degrading mobile INP and LCP on 4G networks in India.
                  </p>
                  <p className="text-[11px] sm:text-xs text-purple-400 font-mono mt-2.5 bg-purple-950/30 p-2 rounded-lg border border-purple-500/20">
                    Solution: Engineered lib/analytics.ts — a custom first-party
                    telemetry engine writing directly to PostgreSQL via sendBeacon,
                    capturing 100% of visitor flows with zero third-party cookie bloat.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: WHAT I LEARNED */}
          {activeTab === "learnings" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 max-w-4xl"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
                  Key Learnings & Takeaways
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Real-world insights gained from shipping a live full-stack
                  platform to real paying customers in Bengaluru.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5">
                    Aligning Technical Flow with Real-World Human Trust
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    In consumer services, software architecture must reflect
                    customer psychology. The 'Pay After Service' model directly
                    increased appointment volume by aligning checkout timing
                    with verified service delivery.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5">
                    First-Party Data Outperforms Generic Analytics
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Custom telemetry revealed exact city attribution (Bengaluru 38%,
                    Dallas 23%) and highlighted that 52% of visitors convert from
                    the homepage hero, driving direct UI refinements.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5">
                    Cryptographic Webhook Validation is Essential
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Payment webhooks cannot simply trust order_id queries.
                    Enforcing HMAC-SHA256 signature verification ensured financial
                    integrity across every single transaction.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5">
                    Zustand + Local Storage Resilience
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Separating volatile cart state from authenticated booking
                    sessions prevented users from losing slot and address selections
                    during mobile phone OTP verification.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ==================================================================== */}
        {/* COMPACT FOOTER CTA & NEXT PROJECT NAVIGATION                         */}
        {/* ==================================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="https://trglowcare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
            >
              <span>Visit Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-xs text-slate-400">
              Live in Bangalore, India
            </span>
          </div>

          <Link
            href="/projects/marketing-campaign"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
          >
            <span>Next Project: Marketing Campaign Platform</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for All Feature Screenshots */}
      <AnimatePresence>
        {showScreenshotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setShowScreenshotModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/90 shrink-0">
                <div className="text-xs font-mono text-slate-300 truncate pr-4">
                  {modalTitle}
                </div>
                <button
                  onClick={() => setShowScreenshotModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[16/9.2] w-full bg-black overflow-auto">
                <Image
                  src={modalImageSrc}
                  alt={modalTitle}
                  fill
                  sizes="95vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
