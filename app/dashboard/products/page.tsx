"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, ImageOff, AlertTriangle } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  discounted_price: number;
  discount: number;
  stock: number;
  images: string[];
  category: string;
  location: string;
  is_promoted: boolean;
};

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null); // product to confirm delete
  const [deleting, setDeleting] = useState(false);

  // ── Fetch seller's products ──────────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("stocklink-token");
      if (!token) {
        router.push("/auth");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
          { headers: { Authorization: `Bearer ${token}` } },
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
  }, [router]);

  // ── Delete product ───────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${deleteId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed.");
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeleting(false);
    }
  };

  const productToDelete = products.find((p) => p.id === deleteId);

  return (
    <main className="p-3 space-y-6 text-white min-h-screen bg-black">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">My Products</h1>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* ── Error ──────────────────────────────────────────────────────────── */}
      {error && (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}

      {/* ── Loading skeleton ───────────────────────────────────────────────── */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/5 border border-gray-800 rounded-xl p-4 space-y-3"
            >
              <div className="h-32 bg-white/5 rounded-lg" />
              <div className="h-4 bg-white/5 rounded w-3/4" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ────────────────────────────────────────────────────── */}
      {!loading && products.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
          <ImageOff size={40} />
          <p className="text-sm">No products yet</p>
          <Link
            href="/dashboard/products/new"
            className="text-green-400 text-sm underline"
          >
            Add your first product
          </Link>
        </div>
      )}

      {/* ── Products grid ──────────────────────────────────────────────────── */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => {
            const image = p.images?.[0] ?? null;
            const soldOut = p.stock === 0;
            const hasDiscount = p.discount > 0 && p.discounted_price < p.price;

            return (
              <div
                key={p.id}
                className="bg-white/5 border border-gray-800 rounded-xl overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-900">
                  {image ? (
                    <Image
                      src={image}
                      alt={p.name}
                      fill
                      className={`object-cover ${soldOut ? "opacity-50" : ""}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <ImageOff size={24} />
                    </div>
                  )}

                  {/* Badges */}
                  {soldOut && (
                    <span className="absolute top-2 left-2 text-xs bg-red-500/80 text-white px-2 py-0.5 rounded-full">
                      Sold Out
                    </span>
                  )}
                  {p.is_promoted && (
                    <span className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                      🔥
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1 gap-1">
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {p.name}
                  </h3>

                  <p className="text-xs text-gray-400">{p.category}</p>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {hasDiscount ? (
                      <>
                        <span className="text-green-400 font-bold text-sm">
                          R{p.discounted_price.toFixed(2)}
                        </span>
                        <span className="line-through text-gray-600 text-xs">
                          R{p.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-green-400 font-bold text-sm">
                        R{p.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs ${soldOut ? "text-red-400" : "text-gray-400"}`}
                  >
                    {soldOut ? "Out of stock" : `${p.stock} in stock`}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-2">
                    <Link
                      href={`/dashboard/products/${p.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs border border-gray-700 hover:border-green-500 hover:text-green-400 rounded-lg transition-colors"
                    >
                      <Pencil size={12} />
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs border border-gray-700 hover:border-red-500 hover:text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Delete confirmation modal ───────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle size={22} />
              <h2 className="font-bold text-lg">Delete Product?</h2>
            </div>

            <p className="text-sm text-gray-400">
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">
                {productToDelete?.name}
              </span>
              ? This action cannot be undone and will also remove all uploaded
              images.
            </p>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 py-2.5 border border-gray-700 hover:border-gray-500 rounded-xl text-sm text-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 size={14} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
