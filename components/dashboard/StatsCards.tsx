"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, CheckCircle, XCircle, DollarSign } from "lucide-react";

type Stats = {
  totalProducts: number;
  activeListings: number;
  outOfStock: number;
  totalStockValue: number;
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const products = data.products ?? [];

        const totalProducts = products.length;
        const activeListings = products.filter(
          (p: { stock: number }) => p.stock > 0,
        ).length;
        const outOfStock = products.filter(
          (p: { stock: number }) => p.stock === 0,
        ).length;
        const totalStockValue = products.reduce(
          (sum: number, p: { price: number; stock: number }) =>
            sum + p.price * p.stock,
          0,
        );

        setStats({
          totalProducts,
          activeListings,
          outOfStock,
          totalStockValue,
        });
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: stats ? String(stats.totalProducts) : "—",
      icon: <Package size={18} className="text-blue-400" />,
      color: "text-blue-400",
    },
    {
      title: "Active Listings",
      value: stats ? String(stats.activeListings) : "—",
      icon: <CheckCircle size={18} className="text-green-400" />,
      color: "text-green-400",
    },
    {
      title: "Out of Stock",
      value: stats ? String(stats.outOfStock) : "—",
      icon: <XCircle size={18} className="text-red-400" />,
      color: "text-red-400",
    },
    {
      title: "Stock Value",
      value: stats
        ? `R${stats.totalStockValue.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "—",
      icon: <DollarSign size={18} className="text-yellow-400" />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {cards.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-gray-800 p-5 rounded-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">{item.title}</p>
            {item.icon}
          </div>

          {loading ? (
            <div className="h-7 bg-white/5 rounded animate-pulse w-2/3" />
          ) : (
            <h3 className={`text-2xl font-bold ${item.color}`}>{item.value}</h3>
          )}
        </motion.div>
      ))}
    </div>
  );
}
