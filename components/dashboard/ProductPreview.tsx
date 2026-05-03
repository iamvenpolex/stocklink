"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Package, Tag, ImageOff } from "lucide-react";

type Props = {
  name: string;
  price: string;
  discountedPrice: number | null;
  discount: string;
  images: string[];
  category: string;
  location?: string;
  stock?: string;
  description?: string;
};

export default function ProductPreview({
  name,
  price,
  discountedPrice,
  discount,
  images,
  category,
  location,
  stock,
  description,
}: Props) {
  const [activeImg, setActiveImg] = useState(0);

  const currentImage = images[activeImg] ?? images[0];

  return (
    <div className="bg-white/5 border border-gray-800 rounded-xl p-5 space-y-4">
      <h2 className="text-lg font-semibold">Live Preview</h2>

      <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
        {/* ── Main Image ─────────────────────────────────────────────────── */}
        <div className="relative w-full aspect-square bg-gray-950 flex items-center justify-center">
          {currentImage ? (
            <Image
              src={currentImage}
              alt="Product preview"
              fill
              className="object-contain p-3"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-600">
              <ImageOff size={36} />
              <span className="text-xs">No image uploaded</span>
            </div>
          )}

          {/* Discount badge */}
          {discount && discountedPrice && (
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discount}% OFF
            </span>
          )}

          {/* Stock badge */}
          {stock !== undefined && stock !== "" && (
            <span
              className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${
                Number(stock) === 0
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-white/10 text-gray-300 border border-gray-700"
              }`}
            >
              {Number(stock) === 0 ? "Sold Out" : `${stock} in stock`}
            </span>
          )}
        </div>

        {/* ── Thumbnails ─────────────────────────────────────────────────── */}
        {images.length > 1 && (
          <div className="flex gap-2 px-3 py-2 overflow-x-auto">
            {images.map((img, i) => (
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
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Product Info ───────────────────────────────────────────────── */}
        <div className="p-4 space-y-3">
          {/* Name */}
          <h3 className="font-bold text-lg leading-tight">
            {name || <span className="text-gray-500">Product Name</span>}
          </h3>

          {/* Category & Location */}
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Tag size={12} />
              {category || "Category"}
            </span>
            {location && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={12} />
                {location}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            {discountedPrice ? (
              <>
                <span className="text-green-400 font-bold text-xl">
                  R{discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-gray-500 text-sm">
                  R{Number(price).toFixed(2)}
                </span>
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
                  {discount}% off
                </span>
              </>
            ) : (
              <span className="text-white font-bold text-xl">
                {price ? (
                  `R${Number(price).toFixed(2)}`
                ) : (
                  <span className="text-gray-500 text-base">R0.00</span>
                )}
              </span>
            )}
          </div>

          {/* Stock info */}
          {stock !== undefined && stock !== "" && Number(stock) > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Package size={12} />
              {Number(stock)} unit{Number(stock) !== 1 ? "s" : ""} available
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-xs text-gray-400 border-t border-gray-800 pt-3 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center">
        This is how your product will appear to buyers
      </p>
    </div>
  );
}
