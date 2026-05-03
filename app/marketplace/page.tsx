"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/marketplace/Hero";
import Filters from "@/components/marketplace/Filters";
import ProductCard from "@/components/marketplace/ProductCard";
import ProductSkeleton from "@/components/marketplace/ProductSkeleton";

type Product = {
  id: string;
  name: string;
  price: number;
  discounted_price: number;
  discount: number;
  category: string;
  location: string;
  images: string[];
  stock: number;
  description: string;
  is_promoted: boolean;
  seller_id: string;
};

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/all`,
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to load products.");
        setProducts(data.products);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ── Filter by category + search ──────────────────────────────────────────
  const filtered = products.filter((p) => {
    return (
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ── Promoted products always appear first ────────────────────────────────
  const sorted = [
    ...filtered.filter((p) => p.is_promoted),
    ...filtered.filter((p) => !p.is_promoted),
  ];

  return (
    <main className="px-3 pb-10 space-y-6">
      <Hero />

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-xl outline-none focus:border-green-500 transition-colors"
      />

      {/* FILTERS */}
      <Filters category={category} setCategory={setCategory} />

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-400 text-sm py-4">{error}</p>
      )}

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {!loading && !error && sorted.length === 0 && (
        <p className="text-center text-gray-400 py-10">No products found</p>
      )}
    </main>
  );
}
