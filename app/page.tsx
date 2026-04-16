"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";

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
          className="flex flex-col justify-center items-center text-center px-8 py-20 hover:bg-white/5 transition"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Find Stock to <span className="text-green-400">Resell</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-md">
            Browse verified suppliers and discover products you can resell for
            profit — no login required.
          </p>

          <motion.a whileHover={{ scale: 1.05 }} href="/browse">
            <button className="mt-8 px-10 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold shadow-lg shadow-green-500/20">
              Browse Products
            </button>
          </motion.a>

          <p className="text-xs text-gray-500 mt-3">
            Instant access • No registration required
          </p>
        </motion.div>

        {/* SUPPLIERS */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-center text-center px-8 py-20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-green-400">Sell</span> Your Stock
          </h2>

          <p className="text-gray-400 mt-4 max-w-md">
            List your products, get buyers, and grow your business with monthly
            subscriptions.
          </p>

          <motion.a whileHover={{ scale: 1.05 }} href="/auth">
            <button className="mt-8 px-10 py-3 border border-green-400 text-green-400 hover:bg-green-500 hover:text-white rounded-xl font-semibold shadow-lg shadow-green-500/10">
              Start Selling
            </button>
          </motion.a>

          <p className="text-xs text-gray-500 mt-3">Subscription required</p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <Features />
      </section>

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
