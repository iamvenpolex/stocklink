"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Users, ShieldCheck, BarChart3 } from "lucide-react";

const features = [
  {
    title: "B2B Marketplace",
    desc: "Connect suppliers and resellers in one powerful platform.",
    icon: ShoppingBag,
  },
  {
    title: "Seller Dashboard",
    desc: "Manage products, stock, and sales from a simple dashboard.",
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
    <section className="relative py-20 px-6 bg-black text-white">
      {/* Glow background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Powerful <span className="text-green-400">Features</span>
        </h2>
        <p className="text-gray-400 mt-3">
          Everything you need to run a modern B2B marketplace
        </p>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-gray-800 rounded-xl p-6 text-left hover:border-green-500 transition"
            >
              <item.icon className="text-green-400 mb-4" size={26} />

              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
