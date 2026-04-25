"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/marketplace/Hero";
import Filters from "@/components/marketplace/Filters";
import ProductCard from "@/components/marketplace/ProductCard";
import ProductSkeleton from "@/components/marketplace/ProductSkeleton";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const products = [
    {
      id: "1",
      name: "Ankara Gown",
      price: 350,
      category: "Clothing & Fashion",
      image: "https://picsum.photos/400",
      isPromoted: true,
    },
    {
      id: "2",
      name: "Sneakers",
      price: 500,
      category: "Footwear",
      image: "https://picsum.photos/401",
    },
    {
      id: "3",
      name: "Smart Watch",
      price: 1200,
      category: "Electronics",
      image: "https://picsum.photos/402",
      isPromoted: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filtered = products.filter((p) => {
    return (
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <main className="px-3 pb-10 space-y-6">
      <Hero />

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-xl"
      />

      {/* FILTERS */}
      <Filters category={category} setCategory={setCategory} />

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-400 py-10">No products found</p>
      )}
    </main>
  );
}
