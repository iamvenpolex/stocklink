"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Users, ShieldCheck, BarChart3 } from "lucide-react";

const features = [
  {
    title: "B2B Marketplace",
    desc: "Connect suppliers and resellers across South Africa in one powerful platform.",
    icon: ShoppingBag,
  },
  {
    title: "Seller Dashboard",
    desc: "Manage products, stock, and orders with a clean, easy-to-use dashboard.",
    icon: BarChart3,
  },
  {
    title: "Verified Suppliers",
    desc: "Trade safely with trusted and verified business owners.",
    icon: ShieldCheck,
  },
  {
    title: "Grow Your Network",
    desc: "Reach more buyers and scale your business faster.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <section className="relative py-24 px-6 bg-black text-white overflow-hidden">
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[140px] rounded-full -top-32 -left-32" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full -bottom-32 -right-32" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold leading-tight"
        >
          Powerful{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Features
          </span>
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Everything you need to run a modern B2B marketplace and grow your
          resale business.
        </p>

        {/* GRID */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 border border-gray-800 rounded-2xl p-6 text-left backdrop-blur-md hover:border-green-500 transition-all duration-300"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-green-500/10 to-transparent" />

              {/* ICON */}
              <div className="relative z-10 mb-4 inline-flex p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <item.icon className="text-green-400" size={24} />
              </div>

              {/* TEXT */}
              <h3 className="relative z-10 text-lg font-semibold">
                {item.title}
              </h3>

              <p className="relative z-10 text-gray-400 text-sm mt-2 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* OPTIONAL CTA */}
        <div className="mt-16">
          <button className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-medium shadow-lg shadow-green-500/20 transition">
            Explore Marketplace
          </button>
        </div>
      </div>
    </section>
  );
}
