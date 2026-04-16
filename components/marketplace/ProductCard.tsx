"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    isPromoted?: boolean;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/marketplace/${product.id}`}>
      <div className="group bg-white/5 border border-gray-800 rounded-xl overflow-hidden hover:border-green-500 transition cursor-pointer">
        {/* IMAGE */}
        <div className="relative h-44 bg-gray-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition"
          />

          {/* PROMOTED BADGE */}
          {product.isPromoted && (
            <span className="absolute top-2 left-2 text-xs bg-green-500 px-2 py-1 rounded">
              🔥 Sponsored
            </span>
          )}
        </div>

        {/* INFO */}
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>

          <p className="text-green-400 font-bold">R{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
