"use client";

import { useState } from "react";

type Props = {
  category: string;
  setCategory: (val: string) => void;
};

const categoryRows = [
  [
    { name: "Clothing & Fashion", emoji: "👗" },
    { name: "Beauty & Hair", emoji: "💄" },
    { name: "Cellphone Accessories", emoji: "📱" },
    { name: "Bulk Foods", emoji: "🛒" },
  ],
  [
    { name: "Home & Kitchen", emoji: "🏠" },
    { name: "Footwear", emoji: "👟" },
    { name: "Baby Products", emoji: "🧸" },
    { name: "Electronics", emoji: "📺" },
  ],
  [
    { name: "Cleaning Products", emoji: "🧼" },
    { name: "Hardware & DIY", emoji: "🔧" },
    { name: "Car Accessories", emoji: "🚗" },
    { name: "Fabric & Tesxtiles", emoji: "🧵" },
  ],
];

export default function Filters({ category, setCategory }: Props) {
  const [showMore, setShowMore] = useState(false);

  const isAll = category === "All";

  const visibleRows = showMore ? categoryRows : categoryRows.slice(0, 1); // 👈 ONLY FIRST ROW

  return (
    <div className="space-y-3">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Categories</h2>

        <button
          onClick={() => setShowMore(!showMore)}
          className="text-xs text-green-400"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>

      {/* ALL BUTTON */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setCategory("All")}
          className={`
            px-4 py-2 rounded-full text-xs border whitespace-nowrap shrink-0
            transition
            ${
              isAll
                ? "bg-green-500 text-white border-green-500"
                : "bg-white/5 text-gray-300 border-gray-800"
            }
          `}
        >
          🌍 All
        </button>
      </div>

      {/* FIRST ROW + OPTIONAL MORE ROWS */}
      <div className="space-y-2">
        {visibleRows.map((row, i) => (
          <div key={i} className="flex gap-2 overflow-x-auto scrollbar-hide">
            {row.map((c) => {
              const active = category === c.name;

              return (
                <button
                  key={c.name}
                  onClick={() => setCategory(c.name)}
                  className={`
                    flex items-center gap-2
                    px-3 py-2 rounded-full
                    border text-xs whitespace-nowrap
                    transition shrink-0
                    ${
                      active
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white/5 text-gray-300 border-gray-800"
                    }
                  `}
                >
                  <span>{c.emoji}</span>
                  {c.name}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
