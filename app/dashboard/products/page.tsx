"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  // Dummy data (replace with DB later)
  const products = [
    {
      id: 1,
      name: "Ankara Gown",
      price: "350",
      stock: 12,
    },
    {
      id: 2,
      name: "Sneakers",
      price: "500",
      stock: 0,
    },
  ];

  return (
    <main className="p-3 space-y-6 text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* PRODUCTS GRID */}
      {products.length === 0 ? (
        <div className="text-center text-gray-400 py-20">No products yet</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white/5 border border-gray-800 rounded-xl p-4"
            >
              <div className="h-32 bg-gray-900 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-sm">
                Image
              </div>

              <h3 className="font-semibold">{p.name}</h3>

              <p className="text-sm text-gray-400">R{p.price}</p>

              <p
                className={`text-xs mt-2 ${
                  p.stock === 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {p.stock === 0 ? "Sold Out" : `${p.stock} in stock`}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
