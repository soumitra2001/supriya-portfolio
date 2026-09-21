import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Supriya Ghorai | Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in Go (Golang), distributed backend systems, real-time telemetry (Hermes), and full-stack production platforms like TR GlowCare.",
  keywords: [
    "Supriya Ghorai",
    "Senior Software Engineer",
    "Go Engineer",
    "Golang Backend",
    "Distributed Systems",
    "Redis Geospatial",
    "MQTT Telemetry",
    "TR GlowCare",
    "System Design",
  ],
  authors: [{ name: "Supriya Ghorai" }],
  openGraph: {
    title: "Supriya Ghorai | Senior Software Engineer",
    description:
      "Architecting resilient distributed systems, high-throughput Go services, and end-to-end digital products.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07090e] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        <SmoothScroll>
          {/* Custom Trailing Spring Cursor (Desktop only) */}
          <CustomCursor />

          {/* Navigation Bar */}
          <Navbar />

          {/* Page Contents */}
          <div className="flex-grow">{children}</div>

          {/* Site Footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
