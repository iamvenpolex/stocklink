"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discounted_price: number;
  discount: number;
  stock: number;
  images: string[];
  is_promoted: boolean;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const StatusBadge = ({ p }: { p: Product }) => {
    const soldOut = p.stock === 0;
    return (
      <span
        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          soldOut
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : p.is_promoted
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-white/5 text-gray-400 border border-gray-700"
        }`}
      >
        {soldOut ? "Sold Out" : p.is_promoted ? "🔥 Sponsored" : "Active"}
      </span>
    );
  };

  const Thumbnail = ({ p }: { p: Product }) => {
    const image = p.images?.[0] ?? null;
    return (
      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-900 shrink-0">
        {image ? (
          <Image src={image} alt={p.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700">
            <ImageOff size={14} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white/5 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Products</h3>
        <Link
          href="/dashboard/products"
          className="text-xs text-green-400 hover:underline"
        >
          View all →
        </Link>
      </div>

      {/* ── Loading skeleton ─────────────────────────────────────────────── */}
      {loading && (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-gray-800"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-white/5 rounded w-3/4" />
                <div className="h-2.5 bg-white/5 rounded w-1/2" />
              </div>
              <div className="h-3 bg-white/5 rounded w-14" />
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-600 py-8 text-sm">
          No products yet.{" "}
          <Link
            href="/dashboard/products/new"
            className="text-green-400 hover:underline"
          >
            Add one
          </Link>
        </p>
      )}

      {!loading && products.length > 0 && (
        <>
          {/* ── MOBILE — card list (no horizontal scroll) ─────────────────── */}
          <div className="md:hidden space-y-3">
            {products.slice(0, 5).map((p) => {
              const hasDiscount =
                p.discount > 0 && p.discounted_price < p.price;
              const soldOut = p.stock === 0;

              return (
                <div
                  key={p.id}
                  className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0"
                >
                  <Thumbnail p={p} />

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {p.name}
                    </p>
                    <p className="text-gray-500 text-xs truncate">
                      {p.category}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`text-sm font-semibold ${hasDiscount ? "text-green-400" : "text-white"}`}
                    >
                      R
                      {hasDiscount
                        ? p.discounted_price.toFixed(2)
                        : p.price.toFixed(2)}
                    </span>
                    <StatusBadge p={p} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── DESKTOP — full table ──────────────────────────────────────── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-gray-500 border-b border-gray-800 text-xs uppercase">
                <tr>
                  <th className="py-2 pr-4">Product</th>
                  <th className="pr-4">Category</th>
                  <th className="pr-4">Price</th>
                  <th className="pr-4">Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((p) => {
                  const hasDiscount =
                    p.discount > 0 && p.discounted_price < p.price;
                  const soldOut = p.stock === 0;

                  return (
                    <tr
                      key={p.id}
                      className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <Thumbnail p={p} />
                          <span className="text-white line-clamp-1 max-w-[140px]">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="pr-4">{p.category}</td>
                      <td className="pr-4 whitespace-nowrap">
                        {hasDiscount ? (
                          <span className="text-green-400 font-semibold">
                            R{p.discounted_price.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-white">
                            R{p.price.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="pr-4">
                        <span
                          className={soldOut ? "text-red-400" : "text-gray-300"}
                        >
                          {p.stock}
                        </span>
                      </td>
                      <td>
                        <StatusBadge p={p} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
