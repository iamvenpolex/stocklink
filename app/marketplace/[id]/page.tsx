"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Tag,
  Package,
  Store,
  ArrowLeft,
  ImageOff,
  Share2,
} from "lucide-react";

type Seller = {
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
  description: string;
  category: string;
  location: string;
  stock: number;
  images: string[];
  is_promoted: boolean;
  created_at: string;
  sellers: Seller;
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Product not found.");
        setProduct(data.product);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-4 space-y-4 animate-pulse">
        <div className="h-72 bg-white/5 rounded-xl" />
        <div className="h-6 bg-white/5 rounded w-2/3" />
        <div className="h-4 bg-white/5 rounded w-1/3" />
        <div className="h-20 bg-white/5 rounded" />
        <div className="h-12 bg-white/5 rounded-xl" />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error ?? "Product not found."}</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-400 underline"
        >
          Go back
        </button>
      </main>
    );
  }

  const seller = product.sellers;
  const hasDiscount =
    product.discount > 0 && product.discounted_price < product.price;
  const soldOut = product.stock === 0;
  const currentImage = product.images?.[activeImg] ?? null;

  // Clean phone number for WhatsApp (remove spaces, +, leading 0)
  const rawPhone = seller?.phone?.replace(/[\s+]/g, "") ?? "";
  const waPhone = rawPhone.startsWith("0")
    ? "27" + rawPhone.slice(1)
    : rawPhone;

  const waMessage = encodeURIComponent(
    `Hi ${seller?.business ?? seller?.name}, I'm interested in *${product.name}* (R${hasDiscount ? product.discounted_price.toFixed(2) : product.price.toFixed(2)}). Is it still available?`,
  );
  const whatsappUrl = `https://wa.me/${waPhone}?text=${waMessage}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} on StockLINK for R${product.price}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

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
        <h1 className="text-sm font-semibold line-clamp-1 max-w-[60%]">
          {product.name}
        </h1>
        <button
          onClick={handleShare}
          className="p-2 border border-gray-700 rounded-lg"
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* ── Main image ────────────────────────────────────────────────────── */}
        <div className="relative w-full aspect-square bg-gray-950 rounded-xl overflow-hidden">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-700 gap-2">
              <ImageOff size={40} />
              <span className="text-xs">No image</span>
            </div>
          )}

          {/* Badges */}
          {product.is_promoted && (
            <span className="absolute top-3 left-3 text-xs bg-green-500 text-white font-semibold px-2 py-1 rounded-full">
              🔥 Sponsored
            </span>
          )}
          {soldOut && (
            <span className="absolute top-3 right-3 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              Sold Out
            </span>
          )}
          {hasDiscount && !soldOut && (
            <span className="absolute top-3 right-3 text-xs bg-orange-500 text-white font-bold px-2 py-1 rounded-full">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* ── Thumbnails ────────────────────────────────────────────────────── */}
        {product.images?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImg === i
                    ? "border-green-500"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <Image
                  src={img}
                  alt={`Image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Product info ──────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{product.name}</h2>

          {/* Price */}
          <div className="flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-green-400 font-bold text-2xl">
                  R{product.discounted_price.toFixed(2)}
                </span>
                <span className="line-through text-gray-500">
                  R{product.price.toFixed(2)}
                </span>
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
                  Save R{(product.price - product.discounted_price).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-green-400 font-bold text-2xl">
                R{product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Meta tags */}
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 border border-gray-800 px-3 py-1.5 rounded-full">
              <Tag size={12} />
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 border border-gray-800 px-3 py-1.5 rounded-full">
              <MapPin size={12} />
              {product.location}
            </span>
            <span
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border ${
                soldOut
                  ? "text-red-400 bg-red-500/10 border-red-500/20"
                  : "text-gray-400 bg-white/5 border-gray-800"
              }`}
            >
              <Package size={12} />
              {soldOut ? "Out of stock" : `${product.stock} available`}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>

        {/* ── Seller profile ────────────────────────────────────────────────── */}
        {seller && (
          <div className="bg-white/5 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Initials avatar */}
              <div className="w-11 h-11 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-green-400">
                  {seller.name
                    .trim()
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold">{seller.business} Shop</p>
                <p className="text-xs text-gray-400">{seller.name}</p>
              </div>
            </div>
            <Store size={18} className="text-gray-500" />
          </div>
        )}
      </div>

      {/* ── Sticky CTA ────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur border-t border-gray-800 space-y-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white transition ${
            soldOut
              ? "bg-gray-700 cursor-not-allowed pointer-events-none"
              : "bg-green-600 hover:bg-green-500 active:scale-95"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {soldOut ? "Out of Stock" : "Order via WhatsApp"}
        </a>

        <Link
          href="/marketplace"
          className="block text-center text-xs text-gray-500 hover:text-gray-300 transition"
        >
          ← Back to Marketplace
        </Link>
      </div>
    </main>
  );
}
