"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

export default function Home() {
  return (
    <main className="min-h-screen text-white relative font-sans">
      <Background />
      <Navbar />

      {/* SPLIT SECTION */}
      <section className="grid md:grid-cols-2 min-h-[85vh]">
        {/* BUYERS */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col justify-center items-center text-center px-8 py-20 hover:bg-white/5 transition"
        >
          {/* subtle SA accent line */}
          <div className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-green-500 via-yellow-400 to-red-500 opacity-70" />

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Stock to <span className="text-green-400">Resell</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-md">
            Browse trusted South African suppliers and discover products you can
            resell for profit — no login required.
          </p>

          <motion.a whileHover={{ scale: 1.05 }} href="/marketplace">
            <button className="mt-8 px-10 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold shadow-lg shadow-green-500/20">
              Browse Products
            </button>
          </motion.a>

          <p className="text-xs text-gray-500 mt-3">Instant access</p>
        </motion.div>

        {/* SUPPLIERS */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col justify-center items-center text-center px-8 py-20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
        >
          {/* subtle SA accent line */}
          <div className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-green-500 via-blue-500 to-yellow-400 opacity-70" />

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-green-400">Sell</span> Your Stock
          </h2>

          <p className="text-gray-400 mt-4 max-w-md">
            List your products, reach resellers across South Africa, and grow
            your business with monthly subscriptions.
          </p>

          <motion.a whileHover={{ scale: 1.05 }} href="/auth">
            <button className="mt-8 px-10 py-3 border border-green-400 text-green-400 hover:bg-green-500 hover:text-white rounded-xl font-semibold shadow-lg shadow-green-500/10">
              Start Selling
            </button>
          </motion.a>

          <p className="text-xs text-gray-500 mt-3">
            Sell across South Africa • Get paid in Rands (ZAR)
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <Features />
      </section>

      <Stats />
      <TopCategories />

      <HowItWorks />

      {/* PRICING */}
      <section id="pricing">{/* pricing component */}</section>

      {/* FAQ */}
      <section id="faq">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
