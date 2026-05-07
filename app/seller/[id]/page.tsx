"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Package, ArrowLeft, ImageOff } from "lucide-react";

type Seller = {
  id: string;
  name: string;
  business: string;
  phone: string;
};

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
};

export default function SellerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSeller = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sellers/${id}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Seller not found.");
        setSeller(data.seller);
        setProducts(data.products);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: seller?.business ? `${seller.business} Shop` : "Seller Profile",
        text: `Check out ${seller?.business} on StockLINK!`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const initials = seller?.name
    ? seller.name
        .trim()
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "??";

  const rawPhone = seller?.phone?.replace(/[\s+]/g, "") ?? "";
  const waPhone = rawPhone.startsWith("0")
    ? "27" + rawPhone.slice(1)
    : rawPhone;
  const waMessage = encodeURIComponent(
    `Hi ${seller?.business ?? seller?.name}, I found your shop on StockLINK and I'd like to enquire about your products.`,
  );
  const whatsappUrl = `https://wa.me/${waPhone}?text=${waMessage}`;

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-4 space-y-4 animate-pulse">
        <div className="h-32 bg-white/5 rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-xl" />
          ))}
        </div>
      </main>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error || !seller) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error ?? "Seller not found."}</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-400 underline"
        >
          Go back
        </button>
      </main>
    );
  }

  const locations = [
    ...new Set(products.map((p) => p.location).filter(Boolean)),
  ];

  return (
    <main className="min-h-screen bg-black text-white pb-32">
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 bg-black/80 backdrop-blur z-10 border-b border-gray-800">
        <button
          onClick={() => router.back()}
          className="p-2 border border-gray-700 rounded-lg"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-semibold">{seller.business} Shop</h1>
        <button
          onClick={handleShare}
          className="p-2 border border-gray-700 rounded-lg text-green-400"
        >
          {/* Share icon SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* ── Seller card ───────────────────────────────────────────────────── */}
        <div className="bg-white/5 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-green-400">{initials}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate">
              {seller.business} Shop
            </h2>
            <p className="text-sm text-gray-400 truncate">{seller.name}</p>

            {locations.length > 0 && (
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <MapPin size={11} />
                <span className="truncate">{locations[0]}</span>
              </div>
            )}

            <div className="flex items-center gap-1 mt-1 text-xs text-green-400">
              <Package size={11} />
              {products.length} product{products.length !== 1 ? "s" : ""} listed
            </div>
          </div>
        </div>

        {/* ── Products grid ─────────────────────────────────────────────────── */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Products
          </h3>

          {products.length === 0 ? (
            <p className="text-center text-gray-600 py-10 text-sm">
              No products listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map((p) => {
                const image = p.images?.[0] ?? null;
                const hasDiscount =
                  p.discount > 0 && p.discounted_price < p.price;
                const soldOut = p.stock === 0;

                return (
                  <Link key={p.id} href={`/marketplace/${p.id}`}>
                    <div className="bg-white/5 border border-gray-800 rounded-xl overflow-hidden hover:border-green-500 transition cursor-pointer">
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
                        {soldOut && (
                          <span className="absolute top-2 left-2 text-xs bg-red-500/80 text-white px-2 py-0.5 rounded-full">
                            Sold Out
                          </span>
                        )}
                        {hasDiscount && !soldOut && (
                          <span className="absolute top-2 right-2 text-xs bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                            -{p.discount}%
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3 space-y-1">
                        <p className="text-sm font-medium text-white line-clamp-1">
                          {p.name}
                        </p>
                        <div className="flex items-center gap-2">
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
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky CTA ────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur border-t border-gray-800 space-y-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-500 active:scale-95 transition"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Contact {seller.business} on WhatsApp
        </a>
        <button
          onClick={handleShare}
          className="w-full py-2.5 border border-gray-700 rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-500 transition"
        >
          Share this profile
        </button>
      </div>
    </main>
  );
}
