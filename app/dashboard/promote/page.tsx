"use client";

import { useState } from "react";

export default function PromotePage() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [days, setDays] = useState(3);

  // Dummy products (replace with real data later)
  const products = ["Ankara Gown", "Sneakers", "Hair Bundles", "Bedding Set"];

  const pricePerDay = 20; // R20/day
  const total = days * pricePerDay;

  return (
    <main className="p-3 text-white space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Promote Product</h1>
        <p className="text-gray-400 text-sm">
          Boost your product visibility in the marketplace
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-5 space-y-4">
        {/* Select Product */}
        <div>
          <label className="text-sm text-gray-400">Select Product</label>

          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full mt-1 px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
          >
            <option value="">Choose product</option>
            {products.map((p, i) => (
              <option key={i}>{p}</option>
            ))}
          </select>
        </div>

        {/* Days */}
        <div>
          <label className="text-sm text-gray-400">
            Promotion Duration (Days)
          </label>

          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full mt-1 px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
          />
        </div>

        {/* Pricing Info */}
        <div className="bg-black/40 border border-gray-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price per day</span>
            <span>R{pricePerDay}</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-green-400">R{total}</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          disabled={!selectedProduct}
          className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold disabled:opacity-50"
        >
          Pay & Promote
        </button>
      </div>

      {/* INFO */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-4 text-sm text-gray-400">
        🚀 Promoted products appear at the top of search results and marketplace
        listings.
      </div>
    </main>
  );
}
