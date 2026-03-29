"use client";

import { motion } from "framer-motion";

const stats = [
  { title: "Total Products", value: "120" },
  { title: "Active Listings", value: "85" },
  { title: "Monthly Sales", value: "R6,000" },
  { title: "Views", value: "3,200" },
];

export default function StatsCards() {
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-6">
      {stats.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-gray-800 p-6 rounded-xl"
        >
          <p className="text-gray-400 text-sm">{item.title}</p>
          <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
