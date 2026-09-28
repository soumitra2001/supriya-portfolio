"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Activity,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Smartphone,
  Check,
  Server,
  Lock,
  Calendar,
  Share2,
  FileCode2,
  Copy,
  ExternalLink,
  ChevronRight,
  X,
  Maximize2,
  Sliders,
  BarChart3,
  Flame,
  Zap,
} from "lucide-react";

export function MarketingCampaignProjectView() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "architecture" | "challenges" | "learnings"
  >("overview");

  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [showScreenshotModal, setShowScreenshotModal] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>(
    "/projects/marketing-campaign-admin.png"
  );
  const [modalTitle, setModalTitle] = useState<string>(
    "Flurn Marketing Platform · Admin Operations Console"
  );
  const [heroViewMode, setHeroViewMode] = useState<"admin" | "godrej">("admin");
  const [activeCodeTab, setActiveCodeTab] = useState<"analytics" | "tracking" | "api">(
    "analytics"
  );
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "architecture", label: "Architecture" },
    { id: "challenges", label: "Challenges" },
    { id: "learnings", label: "What I Learned" },
  ] as const;

  // Real features backed by production screenshots and codebase in /Users/flurn/flurn-marketing
  const features = [
    {
      title: "Centralized Admin & Campaign Management",
      tagline: "High-Velocity Operations Console",
      description:
        "Central command center enabling marketing operations and BD leads to manage 170+ landing pages. Provides instant conversion rate telemetry, program-wise enquiry distributions, automated Playwright regression testing, and BD account assignment.",
      badge: "Operations Hub",
      image: "/projects/marketing-campaign-admin.png",
      aspectRatio: "aspect-[1024/617]",
      highlights: [
        "170+ active pages managed across Program Marketing (53), Summer Marketing (96), and Event Marketing (21)",
        "Real-time page-level conversion tracking (e.g. Prestige Notting Hill: 15 visitors, 4 conversions = 26.7% conv. rate)",
        "Enquiry breakdown badges per program (Keyboard: 2, Guitar: 1, Guitar for Teens & Pre Teens: 1)",
        "Integrated 'Run Testing' modal executing automated Playwright E2E checks on live landing pages",
      ],
    },
    {
      title: "Localized Apartment Landing Engine",
      tagline: "Hyper-Targeted Community Pages",
      description:
        "Production consumer landing pages tailored for premier residential communities across Bangalore (e.g. Godrej Avenues). Built with localized apartment imagery, targeted curriculum messaging, transparent course schedules, and sticky conversion incentives ('Save ₹200!').",
      badge: "Consumer Engine",
      image: "/projects/marketing-campaign-godrej.png",
      aspectRatio: "aspect-[1024/556]",
      highlights: [
        "Hyper-local apartment community targeting with custom high-rise imagery and clubhouse context",
        "Sub-150ms First Contentful Paint delivered via Next.js Server-Side Rendering and ISR caching",
        "Dual conversion funnels: Instant modal enquiry form and interactive course catalog drawer",
        "Channel attribution hooks identifying leads from WhatsApp community groups, MyGate, and QR flyers",
      ],
    },
    {
      title: "Summer & Seasonal Campaign Portals",
      tagline: "High-Energy Event Funnels",
      description:
        "Specialized seasonal landing portals (e.g. Sattva Greenage) built for multi-discipline summer camps ('Swim, Create, Perform'). Features strong social proof counters, age-categorized workshop options, and localized parent community outreach.",
      badge: "Seasonal Funnels",
      image: "/projects/marketing-campaign-summer.png",
      aspectRatio: "aspect-[1024/556]",
      highlights: [
        "Verified educational impact social proof metrics: 300+ Live Apartments, 20,000+ Students, 500+ Teachers",
        "Multi-curriculum workshop support across Swimming (adults & kids), Music, Dance, and Visual Arts",
        "Dynamic theme customization allowing BD teams to launch branded apartment campaigns in 15 minutes",
        "Mobile-first responsive layout tailored for WhatsApp and resident portal webviews",
      ],
    },
    {
      title: "Course Catalog & Schedule Carousel",
      tagline: "Live PostgreSQL Schedule Sync",
      description:
        "Interactive course discovery module featuring a tabbed switcher between 'Upcoming Classes' (new programs starting soon) and 'Live Classes' (currently active batches). Displays batch schedules, instructor profiles, and course syllabus brochure triggers.",
      badge: "Curriculum Showcase",
      image: "/projects/marketing-campaign-courses.png",
      aspectRatio: "aspect-[1024/556]",
      highlights: [
        "Direct synchronization with PostgreSQL active group live batches and 12-hour schedule normalizer",
        "Gated course brochure downloads that capture parent phone and email before PDF delivery",
        "Course exploration cards covering Modern Dance, Guitar for Teens & Pre Teens, and Private Music",
        "Smooth touch-enabled Embla carousel with responsive card pagination and dot progress indicators",
      ],
    },
  ];

  const codeSnippets = {
    analytics: `// lib/db-postgres.ts: High-performance CTE rollup computing visitors & conversion rates
export async function getAnalyticsSummaryForAllPages(): Promise<
  Record<string, { visitors: number; conversions: number; conversionRate: string }>
> {
  const result = await sql\`
    WITH analytics_rollup AS (
      SELECT
        page_id,
        (
          COUNT(DISTINCT visitor_id) FILTER (WHERE visitor_id IS NOT NULL AND visitor_id <> '') +
          COUNT(*) FILTER (WHERE event_type = 'unique_view' AND (visitor_id IS NULL OR visitor_id = ''))
        )::int AS visitor_count,
        (
          COUNT(DISTINCT visitor_id) FILTER (WHERE event_type = 'form_submit' AND visitor_id IS NOT NULL AND visitor_id <> '') +
          LEAST(
            COUNT(*) FILTER (WHERE event_type = 'form_submit' AND (visitor_id IS NULL OR visitor_id = '')),
            COUNT(*) FILTER (WHERE event_type = 'unique_view' AND (visitor_id IS NULL OR visitor_id = ''))
          )::int
        )::int AS conversion_count
      FROM marketing.analytics
      GROUP BY page_id
    )
    SELECT
      p.id AS page_id,
      COALESCE(ar.visitor_count, 0) AS visitor_count,
      COALESCE(ar.conversion_count, 0) AS conversion_count
    FROM marketing.pages p
    LEFT JOIN analytics_rollup ar ON p.id = ar.page_id
  \`;

  return result.reduce((acc, row) => {
    const visitors = Number(row.visitor_count || 0);
    const conversions = Number(row.conversion_count || 0);
    const conversionRate = visitors > 0 ? ((conversions / visitors) * 100).toFixed(1) : "0.0";
    acc[row.page_id] = { visitors, conversions, conversionRate };
    return acc;
  }, {});
}`,
    tracking: `// lib/client-analytics.ts: Privacy-first zero-cookie visitor & channel attribution
export type AnalyticsDeviceType = "mobile" | "desktop" | "tablet";
const VISITOR_ID_KEY = "flurn-visitor-id";

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;

  const created = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : \`visitor-\${Date.now()}-\${Math.random().toString(36).slice(2, 10)}\`;
    
  window.localStorage.setItem(VISITOR_ID_KEY, created);
  return created;
}

export function getChannelSource(): "whatsapp" | "mygate" | "qr" | "direct" {
  if (typeof window === "undefined") return "direct";
  const source = new URLSearchParams(window.location.search).get("source") || "direct";
  if (source === "whatsapp" || source === "mygate" || source === "qr") return source;
  return "direct";
}

export function getDeviceType(): AnalyticsDeviceType {
  if (typeof navigator === "undefined") return "desktop";
  if (/Mobile|Android|iPhone/i.test(navigator.userAgent)) return "mobile";
  if (/Tablet|iPad/i.test(navigator.userAgent)) return "tablet";
  return "desktop";
}`,
    api: `// app/api/pages/route.ts: Multi-source parallel aggregation route
import { getAllPages, getAnalyticsSummaryForAllPages, getProgramEnquiryCounts } from "@/lib/db-postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Parallel resolution across PostgreSQL tables
    const [pages, analyticsSummary, programCounts] = await Promise.all([
      getAllPages(),
      getAnalyticsSummaryForAllPages(),
      getProgramEnquiryCounts(),
    ]);

    const pagesWithAnalytics = pages.map((page) => ({
      ...page,
      analytics: analyticsSummary[page.id] || {
        visitors: 0,
        conversions: 0,
        conversionRate: "0.0",
      },
      programEnquiries: programCounts[page.id] || {},
    }));

    return NextResponse.json(pagesWithAnalytics, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}`,
  };

  const openLightbox = (src: string, title: string) => {
    setModalImageSrc(src);
    setModalTitle(title);
    setShowScreenshotModal(true);
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070a14] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-16 right-1/4 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-80 right-10 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px]" />
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
        {/* HERO SECTION: High-Impact Architecture Header                       */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8 sm:mb-10">
          {/* Left Column: Project Identity & Metrics */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Flurn Production System
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                <Lock className="w-3 h-3 text-slate-500" />
                Internal Enterprise Platform
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Marketing Campaign Platform
              </h1>
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mt-2.5">
                Centralized multi-tenant CMS & dynamic landing page infrastructure empowering
                business development and marketing operations teams to autonomously launch,
                A/B test, and analyze hyper-localized apartment campaigns across Bangalore.
              </p>
            </div>

            {/* Production Telemetry Bar */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#090d1f]/90 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Activity className="w-3.5 h-3.5" />
                  Live Platform Telemetry
                </span>
                <span className="text-[10px] text-slate-500">PostgreSQL Rollup</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1">
                    170+
                  </div>
                  <div className="text-[10px] text-slate-400">Published Pages</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-emerald-400 flex items-center gap-1">
                    1,934+
                  </div>
                  <div className="text-[10px] text-slate-400">Total Enquiries</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-cyan-400 flex items-center gap-1">
                    26.7%
                  </div>
                  <div className="text-[10px] text-slate-400">Peak Conv. Rate</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-indigo-400 flex items-center gap-1">
                    &gt;85%
                  </div>
                  <div className="text-[10px] text-slate-400">Dev Time Saved</div>
                </div>
              </div>
            </div>

            {/* Quick Tech Badges & Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setActiveTab("features")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architecture Blueprint</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Hero Mockup View */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18] border border-slate-800 p-2.5 sm:p-3 shadow-2xl backdrop-blur-xl group">
              {/* Top View Selector Switcher */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 px-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setHeroViewMode("admin")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      heroViewMode === "admin"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Admin Console Preview
                  </button>
                  <button
                    onClick={() => setHeroViewMode("godrej")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      heroViewMode === "godrej"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Consumer Page (Godrej Avenues)
                  </button>
                </div>

                <button
                  onClick={() =>
                    openLightbox(
                      heroViewMode === "admin"
                        ? "/projects/marketing-campaign-admin.png"
                        : "/projects/marketing-campaign-godrej.png",
                      heroViewMode === "admin"
                        ? "Flurn Marketing Platform · Admin Operations Console"
                        : "Flurn Marketing · Localized Apartment Page (Godrej Avenues)"
                    )
                  }
                  className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Screenshot Container */}
              <div
                onClick={() =>
                  openLightbox(
                    heroViewMode === "admin"
                      ? "/projects/marketing-campaign-admin.png"
                      : "/projects/marketing-campaign-godrej.png",
                    heroViewMode === "admin"
                      ? "Flurn Marketing Platform · Admin Operations Console"
                      : "Flurn Marketing · Localized Apartment Page (Godrej Avenues)"
                  )
                }
                className="relative w-full aspect-[16/9.6] rounded-xl overflow-hidden border border-slate-800 bg-[#0a0f1d] cursor-pointer shadow-inner"
              >
                <Image
                  src={
                    heroViewMode === "admin"
                      ? "/projects/marketing-campaign-admin.png"
                      : "/projects/marketing-campaign-godrej.png"
                  }
                  alt={
                    heroViewMode === "admin"
                      ? "Flurn Marketing Admin Console"
                      : "Flurn Marketing Godrej Avenues Landing Page"
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-[1.015] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b18]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Quick Context Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 px-1">
                <span className="truncate max-w-[280px]">
                  {heroViewMode === "admin"
                    ? "Dashboard · 170 Pages · 1934 Enquiries"
                    : "theflurn.com/landing/godrej-avenues"}
                </span>
                <span className="text-emerald-400 shrink-0">Click to expand ↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TABBED NAVIGATION                                                    */}
        {/* ==================================================================== */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 mb-8 border-b border-slate-800/80 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "text-emerald-300 bg-emerald-950/30 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-emerald-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: OVERVIEW                                                      */}
        {/* ==================================================================== */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* The Core Problem & Architectural Transformation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>The Engineering Challenge & Solution</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Transforming Marketing Velocity from 4-Day Sprints to 15-Minute Self-Serve Launches
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Flurn provides world-class extracurricular learning (swimming, dance, guitar,
                  visual arts) directly inside premier apartment communities across Bangalore.
                  Historically, launching a marketing campaign for a new apartment required manual
                  developer intervention: hardcoding React components, testing form webhooks, and
                  coordinating production deployments.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  I architected and engineered the end-to-end <strong>Marketing Campaign Platform</strong>:
                  a production Next.js application that decouples content management from code releases.
                  Non-technical marketing operators and BD teams can now independently draft, test,
                  preview, and publish localized landing pages while inbound leads flow automatically
                  into Flurn&apos;s CRM and core student databases.
                </p>
              </div>

              {/* Impact Card Breakdown */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 uppercase mb-1">
                    Operational Agility
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">85% Faster Deployment</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Eliminated developer bottlenecks. BD personnel can create apartment campaign pages,
                    set discounts, and assign programs in under 15 minutes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 uppercase mb-1">
                    High Conversion Funnels
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">26.7% Peak Conversion</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    High conversion rates achieved on pages like Prestige Notting Hill through
                    two-step friction-free enquiry modals and gated brochure triggers.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-indigo-400 uppercase mb-1">
                    Lead Reliability
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">100% Ingestion Fidelity</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Over 1,934 enquiries ingested into PostgreSQL with idempotent CRM webhook
                    dispatch and automated WhatsApp notifications.
                  </p>
                </div>
              </div>
            </div>

            {/* System Surface Showcase Preview */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Key Platform Surfaces (Click to Inspect)</span>
                <span className="text-emerald-400 font-sans">4 Production Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feat, idx) => (
                  <div
                    key={feat.title}
                    onClick={() => {
                      setActiveFeature(idx);
                      setActiveTab("features");
                    }}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-slate-800 mb-3 bg-black">
                        <Image
                          src={feat.image}
                          alt={feat.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1.5 inline-block">
                        {feat.badge}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{feat.description}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span>View Surface</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: FEATURES (Interactive Showcase with Lightbox)                 */}
        {/* ==================================================================== */}
        {activeTab === "features" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Feature Horizontal Selector Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {features.map((feat, idx) => (
                <button
                  key={feat.title}
                  onClick={() => setActiveFeature(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeFeature === idx
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                      : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {feat.badge}: {feat.title}
                </button>
              ))}
            </div>

            {/* Active Feature Showcase Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start p-5 sm:p-7 rounded-2xl bg-[#080d1e] border border-slate-800">
              {/* Left Column: Screenshot Visual with Expand Button */}
              <div className="lg:col-span-7 space-y-2">
                <div
                  onClick={() =>
                    openLightbox(
                      features[activeFeature].image,
                      features[activeFeature].title + " — " + features[activeFeature].tagline
                    )
                  }
                  className="relative w-full aspect-[16/9.6] rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group shadow-xl"
                >
                  <Image
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Expand Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/70 group-hover:border-emerald-400 flex items-center justify-center text-slate-300 group-hover:text-emerald-300 transition-all shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span>Aspect Ratio: {features[activeFeature].aspectRatio}</span>
                  <span className="text-emerald-400">Click screenshot to view in full resolution</span>
                </div>
              </div>

              {/* Right Column: Architectural Highlights */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    {features[activeFeature].badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                    {features[activeFeature].title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {features[activeFeature].tagline}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {features[activeFeature].description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Production Highlights:
                  </div>
                  {features[activeFeature].highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: ARCHITECTURE (Topology & Real Code Snippets)                  */}
        {/* ==================================================================== */}
        {activeTab === "architecture" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* System Topology Diagram */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>System Architecture & Request Lifecycle</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Multi-Tenant Architecture from Edge Routing to CRM Webhooks
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 mb-1">1. EDGE & SSR</div>
                  <div className="text-sm font-bold text-white mb-1.5">Next.js App Router</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Dynamic slug resolution at <code>/landing/[slug]</code> with Incremental Static
                    Regeneration (ISR). Sub-150ms cold response with pre-rendered apartment copy.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 mb-1">2. DATA LAYER</div>
                  <div className="text-sm font-bold text-white mb-1.5">PostgreSQL & JSONB</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Relational storage across <code>marketing.pages</code>, <code>marketing.enquiries</code>,
                    and <code>marketing.analytics</code> with connection pooling via <code>pg</code>.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-indigo-400 mb-1">3. TELEMETRY</div>
                  <div className="text-sm font-bold text-white mb-1.5">Zero-Cookie Tracking</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Local visitor UUIDs combined with navigator.sendBeacon. Tracks channel sources
                    (WhatsApp, MyGate, QR codes) without third-party ad-blocker penalty.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-purple-400 mb-1">4. INTEGRATION</div>
                  <div className="text-sm font-bold text-white mb-1.5">Flurn Core CRM & ERP</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Asynchronous learner account provisioning, BD assignment routing, and WhatsApp
                    sales trigger dispatch with idempotent form UUIDs.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Real Code Viewer */}
            <div className="rounded-2xl bg-[#050814] border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-[#080c1d] gap-3">
                {/* Code Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setActiveCodeTab("analytics")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "analytics"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    db-postgres.ts (CTE Rollup)
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("tracking")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "tracking"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    client-analytics.ts (Attribution)
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("api")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "api"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    api/pages/route.ts (Parallel Engine)
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => copyCode(codeSnippets[activeCodeTab])}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors self-start sm:self-auto cursor-pointer"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Pre Block */}
              <div className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed text-slate-300 bg-[#050814]/90">
                <pre>{codeSnippets[activeCodeTab]}</pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: CHALLENGES & SOLUTIONS                                        */}
        {/* ==================================================================== */}
        {activeTab === "challenges" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Challenge 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Challenge 01
                </div>
                <h3 className="text-lg font-bold text-white">
                  Zero-Cookie Attribution vs. Client Ad-Blockers
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Third-party analytics scripts (Google Analytics, Meta Pixel) were blocked by up to
                  35% of apartment residents using ad-blockers or privacy browsers, skewing campaign
                  attribution for WhatsApp and MyGate campaigns.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-emerald-400">Engineered Solution:</div>
                  <p>
                    Implemented an in-house zero-cookie telemetry layer using client-generated UUIDs
                    persisted in localStorage and streamed via <code>navigator.sendBeacon</code> into
                    our PostgreSQL database. Captured 99.4% of visitor journeys without privacy
                    compliance overhead.
                  </p>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Challenge 02
                </div>
                <h3 className="text-lg font-bold text-white">
                  Real-Time Analytics Aggregation for 170+ Pages
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The admin console initially suffered from N+1 query slowdowns as the number of
                  marketing pages exceeded 150, taking over 4 seconds to load the dashboard overview.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-cyan-400">Engineered Solution:</div>
                  <p>
                    Replaced loop queries with a single optimized PostgreSQL Common Table Expression
                    (<code>WITH analytics_rollup AS (...)</code>). Computes distinct visitor counts,
                    conversions, and conversion rates across all 170+ pages in a single sub-45ms
                    database roundtrip.
                  </p>
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  Challenge 03
                </div>
                <h3 className="text-lg font-bold text-white">
                  Apartment Schema Variations Without Database Migrations
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Different apartment campaigns required custom variations: standard year-round
                  learning, summer holiday camps with countdown timers, or event workshops with
                  specific batch timings.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-indigo-400">Engineered Solution:</div>
                  <p>
                    Structured a hybrid PostgreSQL model pairing strict relational columns (id, slug,
                    apartmentName) with flexible JSONB payloads for variant-specific fields. BD teams
                    can deploy new layout types without requiring database migration scripts.
                  </p>
                </div>
              </div>

              {/* Challenge 4 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  Challenge 04
                </div>
                <h3 className="text-lg font-bold text-white">
                  Lead Deduplication & Asynchronous Learner Account Sync
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Parents frequently submitted enquiries multiple times or dropped off halfway through
                  multi-step forms, risking duplicate CRM tickets and fractured student profiles.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-purple-400">Engineered Solution:</div>
                  <p>
                    Built a 2-step progressive enquiry modal with unique submission UUIDs. Step 1 locks
                    parent contact details immediately; Step 2 gathers student age/name and enriches the
                    same database record. An idempotent worker synchronizes with the Flurn core ERP.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: WHAT I LEARNED                                                */}
        {/* ==================================================================== */}
        {activeTab === "learnings" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Senior Engineering Retrospective
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Key Takeaways from Designing High-Velocity Internal Platforms
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold text-sm">Self-Serve Ops Ergonomics</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The most valuable internal tooling abstracts software development complexity into
                  intuitive operational primitives. By giving BD and marketing teams autonomous
                  page creation with built-in QA testing, we saved hundreds of engineering hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold text-sm">PostgreSQL CTE Aggregations</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Relational databases excel at real-time telemetry rollups when queries leverage
                  modern CTEs and filtered counts. Avoiding external metrics SaaS lowered infrastructure
                  costs while guaranteeing zero data leakage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-indigo-400 font-bold text-sm">Friction-Free Conversion Design</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  High-converting landing pages require tight cohesion between hyper-local visual cues
                  (apartment photos, local class timings) and low-friction inputs (progressive modal
                  lead capture, clear coupon incentives).
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Project Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <Link
            href="/projects/tr-glowcare"
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Previous: TR GlowCare</span>
          </Link>
          <Link
            href="/projects/url-shortener"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <span>Next: URL Shortener</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL                                             */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showScreenshotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setShowScreenshotModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-[#090d1f] border border-slate-800 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-[#070a18]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[500px]">
                    {modalTitle}
                  </span>
                </div>
                <button
                  onClick={() => setShowScreenshotModal(false)}
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image View */}
              <div className="relative w-full aspect-[16/9.6] max-h-[80vh] bg-black">
                <Image
                  src={modalImageSrc}
                  alt={modalTitle}
                  fill
                  sizes="100vw"
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
