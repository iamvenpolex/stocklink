"use client";

import Image from "next/image";

type Props = {
  name: string;
  price: string;
  discountedPrice: number | null;
  discount: string;
  images: string[];
  category: string;
};

export default function ProductPreview({
  name,
  price,
  discountedPrice,
  discount,
  images,
  category,
}: Props) {
  return (
    <div className="bg-white/5 border border-gray-800 rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">Live Preview</h2>

      <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
        {/* Main Image */}
        <div className="relative h-56 bg-gray-900 flex items-center justify-center">
          {images.length > 0 ? (
            <Image
              src={images[0]}
              alt="Product preview"
              fill
              className="object-contain p-2" // 👈 shows FULL image
            />
          ) : (
            <span className="text-gray-500 text-sm">No image</span>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-2 overflow-x-auto">
            {images.map((img, i) => (
              <div key={i} className="relative w-14 h-14 shrink-0">
                <Image
                  src={img}
                  alt={`Thumbnail ${i}`}
                  fill
                  className="object-cover rounded-md border border-gray-700"
                />
              </div>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold">{name || "Product Name"}</h3>

          <p className="text-xs text-gray-400">{category || "Category"}</p>

          {/* Price */}
          <div>
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">
                  R{discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-gray-500 text-sm">
                  R{price}
                </span>
                <span className="text-xs text-green-400">-{discount}%</span>
              </div>
            ) : (
              <span className="font-bold">R{price || "0"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
