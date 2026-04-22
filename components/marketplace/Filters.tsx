"use client";

import { useState } from "react";

type Props = {
  category: string;
  setCategory: (val: string) => void;
};

const categories = [
  { name: "All", emoji: "🌍", example: "All products" },
  { name: "Clothing", emoji: "👗", example: "e.g. Dresses" },
  { name: "Clothing Bales", emoji: "📦", example: "Bulk clothes" },
  { name: "Shoes", emoji: "👟", example: "e.g. Sneakers" },
  { name: "Bags", emoji: "👜", example: "e.g. Handbags" },
  { name: "Bedding", emoji: "🛏️", example: "e.g. Bedsheets" },
  { name: "Beauty", emoji: "💄", example: "e.g. Wigs" },
  { name: "Baby", emoji: "🧸", example: "e.g. Toys" },
  { name: "Food", emoji: "🛒", example: "e.g. Snacks" },
  { name: "Household", emoji: "🧹", example: "e.g. Buckets" },
  { name: "Electronics", emoji: "📱", example: "e.g. Phones" },
  { name: "Fabric", emoji: "🧵", example: "e.g. Ankara" },
];

export default function Filters({ category, setCategory }: Props) {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Browse Categories</h2>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-green-400 hover:underline"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </div>

      {/* ACTIVE CATEGORY */}
      <p className="text-sm text-gray-400 mb-3">
        Showing: <span className="text-green-400">{category}</span>
      </p>

      {/* GRID */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {visibleCategories.map((c) => (
          <button
            key={c.name}
            onClick={() => setCategory(c.name)}
            className={`
              p-3 rounded-xl border text-xs flex flex-col items-center text-center transition
              ${
                category === c.name
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white/5 border-gray-800 hover:border-green-500"
              }
            `}
          >
            <span className="text-lg">{c.emoji}</span>
            <span className="mt-1 font-medium">{c.name}</span>
            <span className="text-[10px] text-gray-400">{c.example}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
