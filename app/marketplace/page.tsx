"use client";

import { useState } from "react";
import Hero from "@/components/marketplace/Hero";
import Filters from "@/components/marketplace/Filters";
import ProductCard from "@/components/marketplace/ProductCard";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const products = [
    {
      id: "1",
      name: "Ankara Gown",
      price: 350,
      category: "Clothing",
      image: "https://picsum.photos/400",
      isPromoted: true,
    },
    {
      id: "2",
      name: "Sneakers",
      price: 500,
      category: "Shoes",
      image: "https://picsum.photos/401",
    },
  ];

  const filtered = products.filter((p) => {
    return (
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-black text-white p-3 space-y-6">
      <Hero />

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-lg"
      />

      <Filters category={category} setCategory={setCategory} />

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-20">No products found</p>
      )}
    </main>
  );
}
