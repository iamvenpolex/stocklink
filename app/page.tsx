"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const buyerY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const sellerY = useTransform(scrollYProgress, [0, 0.3], [0, 40]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen text-white relative font-sans overflow-x-hidden"
      style={{ fontFamily: "'Syne', 'Space Grotesk', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

        :root {
          --green: #22c55e;
          --green-dim: rgba(34,197,94,0.15);
          --gold: #f59e0b;
          --ink: #080c0a;
        }

        .text-stroke {
          -webkit-text-stroke: 1.5px rgba(34,197,94,0.5);
          color: transparent;
        }

        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .marquee-track {
          display: flex;
          gap: 2rem;
          animation: marquee 20s linear infinite;
          width: max-content;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <Background />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col grain">
        {/* Diagonal split bg */}
        <div className="absolute inset-0 grid md:grid-cols-2 pointer-events-none">
          <div className="bg-transparent" />
          <div className="bg-white/2 border-l border-white/5" />
        </div>

        {/* Large decorative ghost text */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 text-stroke text-[22vw] font-black leading-none select-none pointer-events-none opacity-20 whitespace-nowrap">
          STOCK
        </div>

        <div className="relative z-10 grid md:grid-cols-2 min-h-[92vh] items-center">
          {/* LEFT — BUYERS */}
          <motion.div
            style={{ y: buyerY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col justify-center px-8 md:px-16 py-24 md:py-0"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="overflow-hidden mb-6"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-green-400 border border-green-500/30 bg-green-500/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                For Buyers & Resellers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Find Stock
              <br />
              to{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
                  Resell
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M0 4 Q25 0 50 4 Q75 8 100 4 Q125 0 150 4 Q175 8 200 4"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 text-gray-400 max-w-sm leading-relaxed text-base"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Browse trusted South African suppliers and discover products you
              can resell for profit — no login required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 flex items-center gap-4"
            >
              <Link href="/marketplace">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-4 bg-green-500 rounded-2xl font-bold text-sm tracking-wide overflow-hidden"
                >
                  <span className="relative z-10">Browse Products →</span>
                  <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
              <span className="text-xs text-gray-600 font-light italic">
                Instant access, no account needed
              </span>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-1/4 h-1/2 w-px bg-linear-to-b from-transparent via-green-500/30 to-transparent" />

          {/* RIGHT — SELLERS */}
          <motion.div
            style={{ y: sellerY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-0 border-t border-white/5 md:border-t-0"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="overflow-hidden mb-6"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                For Suppliers & Sellers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="text-stroke">Sell</span> Your
              <br />
              Stock
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 text-gray-400 max-w-sm leading-relaxed text-base"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              List your products, reach resellers across South Africa, and grow
              your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-10 flex items-center gap-4"
            >
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-4 border border-green-500/50 rounded-2xl font-bold text-sm tracking-wide text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300"
                >
                  Start Selling →
                </motion.button>
              </Link>
              <span className="text-xs text-gray-600 font-light italic">
                Get paid in Rands (ZAR)
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-600 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-linear-to-b from-green-500/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── MARQUEE TICKER ───────────────────────────────────────────────────── */}
      <div className="relative py-4 bg-green-500/5 border-y border-green-500/10 overflow-hidden">
        <div className="marquee-track text-xs font-semibold tracking-widest uppercase text-green-500/50">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span>Find Stock</span>
              <span className="text-green-500">✦</span>
              <span>Sell Faster</span>
              <span className="text-green-500">✦</span>
              <span>South Africa</span>
              <span className="text-green-500">✦</span>
              <span>B2B Marketplace</span>
              <span className="text-green-500">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SECTIONS ─────────────────────────────────────────────────────────── */}
      <section id="features">
        <Features />
      </section>
      <Stats />
      <TopCategories />
      <HowItWorks />
      <section id="faq">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
