import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { EngineeringPlayground } from "@/components/sections/EngineeringPlayground";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-[#050816] text-slate-100 overflow-hidden">
      {/* 1. Hero Section with 3D Tech Network & Focused Primary Preview */}
      <Hero />

      {/* 2. Dedicated Tech Stack Section (Tools I use to build and ship) */}
      <TechStack />

      {/* 3. Featured Engineering Projects (Hermes, TR GlowCare, URL Shortener) */}
      <FeaturedProjects />

      {/* 4. Under-the-Hood Engineering Playground */}
      <EngineeringPlayground />

      {/* 5. About & Core Principles */}
      <About />

      {/* 6. Contact & Opportunities */}
      <Contact />
    </main>
  );
}
