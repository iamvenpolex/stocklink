"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { value: 10000, suffix: "+", label: "Products Listed" },
  { value: 500, suffix: "+", label: "Active Sellers" },
  { value: 24, suffix: "/7", label: "Marketplace Access" },
];

function formatNumber(num: number) {
  if (num >= 1000) return Math.floor(num / 1000) + "K";
  return num.toString();
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
    let startTime: number | null = null;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOut(progress);

      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <h3
      ref={ref}
      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
    >
      {formatNumber(count)}
      {suffix}
    </h3>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 px-6 bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full -top-20 -left-20" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full -bottom-20 -right-20" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Trusted by{" "}
            <span className="text-green-400">Growing Businesses</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Real numbers from our marketplace ecosystem
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative bg-white/5 border border-gray-800 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:border-green-500"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-green-500/10 to-transparent" />

              <div className="relative z-10">
                <Counter value={item.value} suffix={item.suffix} />
                <p className="text-gray-400 text-sm mt-2">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
