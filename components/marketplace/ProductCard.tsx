"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

type Seller = {
  name: string;
  business: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  discounted_price: number;
  discount: number;
  images: string[];
  category: string;
  location: string;
  stock: number;
  is_promoted: boolean;
  sellers?: Seller;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const image = product.images?.[0] ?? null;
  const hasDiscount =
    product.discount > 0 && product.discounted_price < product.price;
  const soldOut = product.stock === 0;

  return (
    <Link href={`/marketplace/${product.id}`}>
      <div className="group bg-white/5 border border-gray-800 rounded-xl overflow-hidden hover:border-green-500 transition cursor-pointer flex flex-col">
        {/* IMAGE */}
        <div className="relative aspect-square bg-gray-900">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className={`object-cover group-hover:scale-105 transition duration-300 ${
                soldOut ? "opacity-50" : ""
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs">
              No image
            </div>
          )}

          {/* Sponsored badge */}
          {product.is_promoted && (
            <span className="absolute top-2 left-2 text-xs bg-green-500 text-white font-semibold px-2 py-0.5 rounded-full">
              🔥 Sponsored
            </span>
          )}

          {/* Sold out badge */}
          {soldOut && (
            <span className="absolute top-2 right-2 text-xs bg-red-500/80 text-white px-2 py-0.5 rounded-full">
              Sold Out
            </span>
          )}

          {/* Discount badge */}
          {hasDiscount && !soldOut && (
            <span className="absolute top-2 right-2 text-xs bg-orange-500/90 text-white font-bold px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* INFO */}
        <div className="p-3 space-y-1.5 flex flex-col flex-1">
          {/* Product name */}
          <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>

          {/* Seller / business */}
          {product.sellers?.business && (
            <p className="text-xs text-gray-500 line-clamp-1">
              {product.sellers.business}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            {hasDiscount ? (
              <>
                <span className="text-green-400 font-bold text-sm">
                  R{product.discounted_price.toFixed(2)}
                </span>
                <span className="line-through text-gray-500 text-xs">
                  R{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-green-400 font-bold text-sm">
                R{product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Location */}
          {product.location && (
            <p className="flex items-center gap-1 text-xs text-gray-500 mt-auto pt-1">
              <MapPin size={11} />
              <span className="line-clamp-1">{product.location}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
