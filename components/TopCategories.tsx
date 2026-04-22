"use client";

import { motion } from "framer-motion";

const categories = [
  { name: "Clothing", emoji: "👗" },
  { name: "Shoes", emoji: "👟" },
  { name: "Beauty", emoji: "💄" },
  { name: "Bags", emoji: "👜" },
  { name: "Electronics", emoji: "📱" },
  { name: "Food", emoji: "🛒" },
  { name: "Baby", emoji: "🧸" },
  { name: "Fabric", emoji: "🧵" },
];

export default function TopCategories() {
  return (
    <section className="py-20 px-6 bg-black text-white border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Top <span className="text-green-400">Categories</span>
        </h2>

        <p className="text-gray-400 mt-3">
          Explore popular products trending right now
        </p>

        <div className="mt-12 grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="bg-white/5 border border-gray-800 rounded-xl p-4 flex flex-col items-center text-center hover:border-green-500 transition cursor-pointer"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs mt-2 font-medium">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
