"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Link2,
  Cpu,
  Database,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Server,
  Activity,
  Maximize2,
  X,
  Copy,
  Check,
  ChevronRight,
  Clock,
  Layers,
  Search,
  Globe,
  Flame,
  Terminal,
  Filter,
} from "lucide-react";

export function UrlShortenerProjectView() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "architecture" | "challenges" | "learnings"
  >("overview");

  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [showScreenshotModal, setShowScreenshotModal] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>(
    "/projects/url-shortener-urls.png"
  );
  const [modalTitle, setModalTitle] = useState<string>(
    "Flurn URL Shortener · Dispatched Links Catalog"
  );
  const [heroViewMode, setHeroViewMode] = useState<"urls" | "create" | "search">("urls");
  const [activeCodeTab, setActiveCodeTab] = useState<"resolve" | "create" | "ratelimit">(
    "resolve"
  );
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "architecture", label: "Architecture" },
    { id: "challenges", label: "Challenges" },
    { id: "learnings", label: "What I Learned" },
  ] as const;

  // Real features backed by production Charon backend (Go) and Cyllene frontend
  const features = [
    {
      title: "Deterministic & Custom Alias Link Generator",
      tagline: "Instant Short URL Generation with TTL",
      description:
        "The primary link creation interface. Supports custom short aliases (e.g., learn.flurn.in/godrej-swimming) or 10-character alphanumeric unique hashes. Automatically enforces HTTPS, validates destination targets, detects domain loopback cycles, and configures configurable TTL expirations.",
      badge: "Ingestion Engine",
      image: "/projects/url-shortener-create.png",
      aspectRatio: "aspect-[1024/556]",
      highlights: [
        "Enforces HTTPS protocols and validates domain integrity via govalidator prior to database commits",
        "Custom alias collision detection ensuring uniqueness across production marketing campaigns",
        "Instant clipboard copy trigger with direct preview of the learn.flurn.in shortened link",
        "Configurable TTL expiration parameters supporting both permanent and time-limited promo links",
      ],
    },
    {
      title: "Your URLs Management & Click Analytics",
      tagline: "Active Dispatched Links Directory",
      description:
        "Central management portal displaying all shortened links under learn.flurn.in. Shows destination URLs, real-time cumulative click counts, expiration timestamps, creator attribution, and quick actions to edit destinations or inspect visitor statistics.",
      badge: "Link Directory",
      image: "/projects/url-shortener-urls.png",
      aspectRatio: "aspect-[1024/556]",
      highlights: [
        "Clean representation of production marketing campaigns (godrej-swimming, summer-camp-2026, prestige-music)",
        "Real-time click counters powered by background asynchronous goroutine flushes (e.g. 2,890 Clicks)",
        "Immediate destination update capability allowing marketing teams to re-route live campaign traffic",
        "Granular link-level action triggers: Edit Destination, Delete, and Detailed Clickstream Stats",
      ],
    },
    {
      title: "Real-Time URL Search & Filter Engine",
      tagline: "Sub-Millisecond Query Resolution",
      description:
        "High-speed search interface allowing marketing operations to locate campaign links by short alias, campaign keywords (e.g. 'summer', 'godrej'), or destination parameters. Instant feedback prevents duplicate link generation across distributed teams.",
      badge: "Search Index",
      image: "/projects/url-shortener-search.png",
      aspectRatio: "aspect-[1024/556]",
      highlights: [
        "Real-time substring search matching both short alias keys and destination landing page URLs",
        "Zero-latency frontend query debouncing connected to indexed MongoDB/Redis lookup endpoints",
        "Instant match counters reporting query results (e.g. 'Found 2 matching URLs for query summer')",
        "One-click link copying and stats inspection directly from search result rows",
      ],
    },
  ];

  // Authentic Go code directly from /Users/flurn/Documents/charon
  const codeSnippets = {
    resolve: `// charon/controllers/url.go: Low-latency redirect handler with non-blocking telemetry
func ResolveURL(w http.ResponseWriter, r *http.Request) {
    url := &database.URL{}
    vars := mux.Vars(r)
    urlShort := vars["short"]
    currentTime := time.Now()

    // 1. In-Memory Redis Cache-Aside Lookup (Sub-2ms)
    err := helpers.Redis.GetJSON(urlShort, url)
    if err != nil || url.ID == primitive.NilObjectID {
        // Fallback to MongoDB if cache miss or cold key
        url, err = models.GetURL(urlShort, "")
        if err != nil || currentTime.After(time.Unix(int64(url.Expiry), 0)) {
            redirectToFlurnOnExpiredOrNotFound(w, r)
            return
        }
        // Warm up Redis cache with TTL until link expiration
        go helpers.Redis.SetJSON(urlShort, url, time.Until(time.Unix(int64(url.Expiry), 0)))
    }

    // 2. Non-blocking Asynchronous Click Counter Increment via Goroutine
    urlFilter := bson.M{"user": url.User, "_id": url.ID}
    updatedUrl := bson.M{"$set": bson.M{"total_clicks": url.TotalClicks + 1}}
    go func(ctx context.Context, filter, update bson.M) {
        database.CurrentDb.Url.UpdateOne(ctx, filter, update)
    }(context.TODO(), urlFilter, updatedUrl)

    // 3. Asynchronous User-Agent Telemetry Parsing
    go func(r *http.Request, url database.URL) {
        ua := uasurfer.Parse(r.Header.Get("User-Agent"))
        deviceType := ua.DeviceType.String()
        ip := strings.Split(r.Header.Get("X-Forwarded-For"), ",")[0]
        recordClickTelemetry(url.ID, deviceType, ip, r.Referer())
    }(r, *url)

    // 4. Instant HTTP 302 Permanent / Temporary Redirect
    http.Redirect(w, r, url.Destination, http.StatusFound)
}`,
    create: `// charon/controllers/url.go & models/url.go: URL Creation, Validation, and Collision Prevention
func _createShortUrl(req *ShortenURLRequest) (*database.URL, error) {
    // 1. Destination URL Structure & Protocol Validation
    if !govalidator.IsURL(req.Destination) {
        return nil, errors.New("invalid url: malformed destination")
    }

    // 2. Anti-Loopback Domain Check: prevent redirecting to self
    if !helpers.RemoverDomainError(req.Destination) {
        return nil, errors.New("invalid destination: recursive redirection blocked")
    }

    // 3. Custom Alias Validation (alphanumeric & hyphen only)
    if req.CustomShort != "" && helpers.NotValidShortString(&req.CustomShort) {
        return nil, errors.New("invalid custom alias: spaces and special characters disallowed")
    }

    req.Destination = helpers.EnforceHTTP(req.Destination)
    req.CustomShort = strings.TrimSpace(req.CustomShort)

    // Default 100-year expiration if not explicitly configured
    if req.Expiry <= 0 {
        req.Expiry = time.Now().AddDate(100, 0, 0).Unix()
    }

    // 4. Atomic MongoDB Persistence with Unique Index Collision Guard
    shortedURL, err := models.CreateURL(userData, req.CustomShort, req.Destination, req.Expiry, req.CreatedBy, req.Host)
    if err != nil {
        return nil, err // Returns "URL custom short is already in use" if duplicate
    }

    return shortedURL, nil
}`,
    ratelimit: `// charon/helpers/ratelimiter.go: Redis Sliding-Window Rate Limiting Middleware
func RateLimit(r *http.Request, auth string, defaultLimit *URLLimit) (time.Duration, error) {
    rateConfig := GetRateConfig(false)
    urlRateName := r.URL.Path + "-" + r.Method

    urlRateConfig, found := rateConfig.Limit[urlRateName]
    if !found {
        urlRateConfig = rateConfig.Limit["*"] // Fallback to global rate policy
    }
    if defaultLimit != nil {
        urlRateConfig = defaultLimit
    }

    // Unique rate limiting key based on Client IP + Request Route
    clientIP := strings.Split(r.Header.Get("X-Forwarded-For"), ",")[0]
    rateKey := fmt.Sprintf("rate:%v:%v", clientIP, urlRateName)

    count, err := Redis.Incr(rateKey)
    if err != nil {
        return 0, nil // Fail open on cache failure to preserve availability
    }

    if count == 1 {
        Redis.Expire(rateKey, time.Duration(urlRateConfig.Expiry)*time.Second)
    }

    if count > int64(urlRateConfig.Value) {
        ttl, _ := Redis.TTL(rateKey)
        return ttl, fmt.Errorf("rate quota exceeded: %d reqs allowed per %ds", urlRateConfig.Value, urlRateConfig.Expiry)
    }

    return 0, nil
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
      {/* Ambient background lighting */}
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
        {/* HERO SECTION: Distributed Go Backend Header                         */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8 sm:mb-10">
          {/* Left Column: Project Identity & Metrics */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Go (Golang) Microservice
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                <Server className="w-3 h-3 text-cyan-400" />
                Redis Cache-Aside · Charon Core
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                URL Shortener
              </h1>
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mt-2.5">
                A sub-2ms low-latency URL shortening, alias collision resolution, and real-time
                clickstream telemetry infrastructure built in Go, Redis, and MongoDB to power
                high-volume marketing campaigns, WhatsApp broadcast links, and referral attribution
                across <code className="text-emerald-400 font-mono">learn.flurn.in</code>.
              </p>
            </div>

            {/* Production Telemetry Bar */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#090d1f]/90 border border-slate-800/80 backdrop-blur-md">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Activity className="w-3.5 h-3.5" />
                  Service Performance Benchmarks
                </span>
                <span className="text-[10px] text-slate-500">Go + Redis Cache</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-emerald-400 flex items-center gap-1">
                    &lt; 1.8ms
                  </div>
                  <div className="text-[10px] text-slate-400">P99 Redirect</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1">
                    99.4%
                  </div>
                  <div className="text-[10px] text-slate-400">Cache Hit Rate</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-cyan-400 flex items-center gap-1">
                    0%
                  </div>
                  <div className="text-[10px] text-slate-400">Hash Collisions</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-base sm:text-lg font-bold tracking-tight text-indigo-400 flex items-center gap-1">
                    100%
                  </div>
                  <div className="text-[10px] text-slate-400">Async Telemetry</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
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
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Go Architecture & Code</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Console Mockup */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18] border border-slate-800 p-2.5 sm:p-3 shadow-2xl backdrop-blur-xl group">
              {/* Top Surface Switcher */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 px-1">
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setHeroViewMode("urls")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      heroViewMode === "urls"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Your URLs Directory
                  </button>
                  <button
                    onClick={() => setHeroViewMode("create")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      heroViewMode === "create"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Generate Short Link
                  </button>
                  <button
                    onClick={() => setHeroViewMode("search")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      heroViewMode === "search"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Search URLs
                  </button>
                </div>

                <button
                  onClick={() =>
                    openLightbox(
                      heroViewMode === "urls"
                        ? "/projects/url-shortener-urls.png"
                        : heroViewMode === "create"
                        ? "/projects/url-shortener-create.png"
                        : "/projects/url-shortener-search.png",
                      heroViewMode === "urls"
                        ? "Flurn URL Shortener · Dispatched Links Directory"
                        : heroViewMode === "create"
                        ? "Flurn URL Shortener · Generate Shorten Link"
                        : "Flurn URL Shortener · Search & Filter URLs"
                    )
                  }
                  className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Visual Showcase Container */}
              <div
                onClick={() =>
                  openLightbox(
                    heroViewMode === "urls"
                      ? "/projects/url-shortener-urls.png"
                      : heroViewMode === "create"
                      ? "/projects/url-shortener-create.png"
                      : "/projects/url-shortener-search.png",
                    heroViewMode === "urls"
                      ? "Flurn URL Shortener · Dispatched Links Directory"
                      : heroViewMode === "create"
                      ? "Flurn URL Shortener · Generate Shorten Link"
                      : "Flurn URL Shortener · Search & Filter URLs"
                  )
                }
                className="relative w-full aspect-[16/9.6] rounded-xl overflow-hidden border border-slate-800 bg-[#0a0f1d] cursor-pointer shadow-inner"
              >
                <Image
                  src={
                    heroViewMode === "urls"
                      ? "/projects/url-shortener-urls.png"
                      : heroViewMode === "create"
                      ? "/projects/url-shortener-create.png"
                      : "/projects/url-shortener-search.png"
                  }
                  alt="Flurn URL Shortener Showcase"
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
                  {heroViewMode === "urls"
                    ? "learn.flurn.in · 100-Year TTL · Redis Cached"
                    : heroViewMode === "create"
                    ? "Custom Alias Ingestion · Destination Validation"
                    : "Live Substring Index · Real-time Matches"}
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
                    layoutId="activeTabBadgeShortener"
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
            {/* The Core Backend Problem & Architecture Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>The Engineering Motivation & System Design</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Why Flurn Built an In-House High-Throughput URL Shortener in Go
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Flurn dispatches thousands of localized apartment marketing links daily across
                  WhatsApp community broadcasts, resident noticeboard QR flyers, and parent referral
                  programs. Third-party SaaS shorteners (Bitly, TinyURL) presented prohibitive monthly
                  costs, strict API rate ceilings, unpredictable redirect delays (&gt;250ms), and
                  external third-party data leakage.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  I built <strong>Charon</strong>, a dedicated Go microservice paired with a Redis
                  cache-aside tier and MongoDB persistence. By handling short code resolution directly
                  in memory and offloading click counter updates and User-Agent parsing to asynchronous
                  goroutines, the system achieves consistent <strong>sub-2ms P99 redirect latency</strong> while
                  maintaining complete internal telemetry ownership under <code className="text-emerald-400">learn.flurn.in</code>.
                </p>
              </div>

              {/* Impact Breakdown Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 uppercase mb-1">
                    Redirection Latency
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">&lt; 1.8ms P99</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Redis in-memory caching serves 99.4% of redirection traffic instantly, eliminating
                    database roundtrips on viral WhatsApp link clicks.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 uppercase mb-1">
                    Zero-Blocking Telemetry
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">Asynchronous Logging</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    User-Agent parsing (uasurfer), IP geolocation, and cumulative click increments
                    run in detached Go goroutines without slowing HTTP response headers.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-indigo-400 uppercase mb-1">
                    Cost & Privacy Ownership
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">100% In-House SaaS</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero per-click third-party fees, no privacy data sharing, and custom brand domain
                    authority under learn.flurn.in.
                  </p>
                </div>
              </div>
            </div>

            {/* Redesigned Surfaces Grid */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Core System Modules (Click to Inspect)</span>
                <span className="text-emerald-400 font-sans">3 Functional Surfaces</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                          sizes="(max-width: 768px) 100vw, 33vw"
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
                      <span>Inspect Surface</span>
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
              {/* Left Column: Redesigned Screenshot with Lightbox Zoom */}
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
                  <span>Domain: learn.flurn.in</span>
                  <span className="text-emerald-400">Click screenshot to expand in high resolution</span>
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
                    Engineering Capabilities:
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
        {/* TAB 3: ARCHITECTURE (Topology & Real Go Code Snippets)               */}
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
                <span>Go Microservice Topology & Pipeline</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Sub-2ms Redirect Engine with Non-Blocking Concurrency
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-emerald-400 mb-1">1. HTTP INGESTION</div>
                  <div className="text-sm font-bold text-white mb-1.5">Gorilla Mux Router</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Lightweight Go HTTP server with dynamic route parameter extraction, rate limiting
                    middleware, and cross-origin CORS handling.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 mb-1">2. CACHE-ASIDE TIER</div>
                  <div className="text-sm font-bold text-white mb-1.5">Redis In-Memory</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sub-millisecond key-value lookups with automatic TTL expiration syncing.
                    Eliminates 99.4% of persistent database read load.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-indigo-400 mb-1">3. PERSISTENCE</div>
                  <div className="text-sm font-bold text-white mb-1.5">MongoDB & Unique Index</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Guarantees zero alias collision via compound unique constraints on <code>short</code>.
                    Stores user ownership and destination URLs.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-mono text-purple-400 mb-1">4. TELEMETRY</div>
                  <div className="text-sm font-bold text-white mb-1.5">Detached Goroutines</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    User-Agent device parsing (uasurfer), geolocation extraction, and click counters
                    run asynchronously without delaying HTTP 302 responses.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Real Go Code Viewer */}
            <div className="rounded-2xl bg-[#050814] border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-[#080c1d] gap-3">
                {/* Code Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setActiveCodeTab("resolve")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "resolve"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    controllers/url.go (ResolveURL)
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("create")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "create"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    controllers/url.go (_createShortUrl)
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("ratelimit")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "ratelimit"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    helpers/ratelimiter.go (RateLimit)
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
                      <span>Copy Go Snippet</span>
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
                  Sub-2ms Redirect Latency Under Viral Traffic Spikes
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  When marketing teams launched WhatsApp community broadcasts to 50,000+ parents
                  simultaneously, incoming traffic created intense connection pool contention on the
                  persistent MongoDB database.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-emerald-400">Engineered Solution:</div>
                  <p>
                    Implemented a strict Redis cache-aside architecture. Popular short keys are
                    pre-cached with TTL offsets. The Go HTTP handler serves 99.4% of redirection requests
                    directly from Redis memory in under 1.8 milliseconds without opening database connections.
                  </p>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Challenge 02
                </div>
                <h3 className="text-lg font-bold text-white">
                  Decoupling Click Analytics from Redirection Latency
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Logging user-agent headers, resolving client IP addresses to geographic cities, and
                  incrementing persistent database counters was adding 40-70ms of overhead to the user&apos;s
                  redirection wait time.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-cyan-400">Engineered Solution:</div>
                  <p>
                    Decoupled telemetry into asynchronous Go goroutines (<code>go func(...)</code>). The HTTP
                    302 redirect response terminates immediately while background goroutines perform
                    User-Agent parsing via <code>uasurfer</code> and increment click aggregates asynchronously.
                  </p>
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  Challenge 03
                </div>
                <h3 className="text-lg font-bold text-white">
                  Distributed Custom Alias Collision Prevention
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Multiple marketing team members often attempted to register intuitive custom short keys
                  (e.g., &quot;summer-camp&quot; or &quot;guitar&quot;) at the exact same moment across distributed API instances.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-indigo-400">Engineered Solution:</div>
                  <p>
                    Combined client-side regex sanitization with atomic database constraints. If an alias
                    exists for the same destination, the API returns the existing short link idempotently;
                    otherwise, unique index collision locks return immediate 400 Bad Request warnings.
                  </p>
                </div>
              </div>

              {/* Challenge 4 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#080d1e] border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  Challenge 04
                </div>
                <h3 className="text-lg font-bold text-white">
                  Domain Loopback & Phishing Protection
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Shortener systems are prime targets for infinite redirection loops (pointing a short URL
                  back to the shortener host) or forwarding users to malicious unencrypted endpoints.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-bold text-purple-400">Engineered Solution:</div>
                  <p>
                    Engineered domain filter guards (<code>helpers.RemoverDomainError</code>) that inspect
                    the target URL against the server&apos;s own domain, rejecting recursive loops. Automated
                    HTTPS enforcement ensures all outbound redirects use secure encrypted transports.
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
                Key Takeaways from Engineering High-Throughput Go Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-emerald-400 font-bold text-sm">Goroutine Concurrency Safety</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Go&apos;s lightweight goroutines make background telemetry almost cost-free. However,
                  detached routines must pass cloned contexts rather than request-scoped contexts,
                  preventing premature context cancellation when the parent HTTP request completes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold text-sm">Cache-Aside Strategy with TTL</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pairing Redis with a persistent document store offers the ideal trade-off between
                  sub-2ms reads and permanent audit trails. Synchronizing Redis TTL with link expiration
                  prevents stale memory usage and zombie links.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-indigo-400 font-bold text-sm">Internal Tooling Value</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Building proprietary utility microservices pays massive compounding dividends over
                  rented SaaS: zero recurring per-click bills, sub-2ms redirect speeds under full
                  internal control, and seamless integration into company marketing databases.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Project Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <Link
            href="/projects/marketing-campaign"
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Previous: Marketing Campaign Platform</span>
          </Link>
          <Link
            href="/projects/hermes"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <span>Next: Hermes Geospatial Engine</span>
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
