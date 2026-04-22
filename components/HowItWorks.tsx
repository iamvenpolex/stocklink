"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Browse Products",
    desc: "Explore thousands of products from trusted suppliers near you.",
  },
  {
    step: "02",
    title: "Contact Supplier",
    desc: "Chat directly via WhatsApp or phone to negotiate and order.",
  },
  {
    step: "03",
    title: "Resell & Profit",
    desc: "Sell to your customers and grow your business.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-8 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It <span className="text-green-400">Works</span>
        </h2>

        <p className="text-gray-400 mt-3">Start selling in 3 simple steps</p>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-gray-800 rounded-xl p-6 text-left hover:border-green-500 transition"
            >
              <span className="text-green-400 text-sm font-bold">
                {item.step}
              </span>

              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>

              <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
