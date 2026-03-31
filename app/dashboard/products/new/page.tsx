"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import CategorySelector from "@/components/dashboard/CategorySelector";
import ProductPreview from "@/components/dashboard/ProductPreview";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const handleImages = (files: FileList) => {
    const imgs: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imgs.push(reader.result as string);
        if (imgs.length === files.length) {
          setImages(imgs);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const discountedPrice =
    price && discount
      ? Number(price) - (Number(price) * Number(discount)) / 100
      : null;

  return (
    <main className="min-h-screen bg-black text-white p-3 space-y-6">
      <CategorySelector selected={category} setSelected={setCategory} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* FORM */}
        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="text-sm text-gray-400">Product Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ankara Gown"
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-400">Price (R):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-400">Category:</label>
            <input
              value={category}
              readOnly
              className="w-full mt-1 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="text-sm text-gray-400">Discount:</label>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                checked={hasDiscount}
                onChange={() => setHasDiscount(!hasDiscount)}
              />
              <span>Enable discount</span>
            </div>

            {hasDiscount && (
              <div className="mt-3">
                <input
                  type="number"
                  placeholder="e.g. 10%"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-lg"
                />

                {discountedPrice && (
                  <p className="text-green-400 text-sm mt-2">
                    Final Price: R{discountedPrice.toFixed(2)} ({discount}% off)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* STOCK */}
          <div>
            <label className="text-sm text-gray-400">Stock Quantity:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg"
            />

            <p className="text-yellow-400 text-xs mt-2">
              ⚠️ If stock is 0, your product appears as &quot;sold out&quot;.
              Set to at least 1.
            </p>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-400">
              Product Description / Remarks:
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Available in red, blue. Sizes: M, L, XL"
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg"
            />
          </div>

          {/* IMAGE UPLOAD (VISIBLE DROPZONE) */}
          <div>
            <label className="text-sm text-gray-400">Product Images:</label>

            <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-6 cursor-pointer hover:border-green-500 transition">
              <Upload size={28} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-400">
                Click to upload or drag images
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleImages(e.target.files)}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit */}
          <button className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold">
            Add Product
          </button>
        </div>

        {/* PREVIEW */}
        <div className="hidden lg:block sticky top-24">
          <ProductPreview
            name={name}
            price={price}
            discountedPrice={discountedPrice}
            discount={discount}
            images={images}
            category={category}
          />
        </div>
      </div>

      {/* MOBILE PREVIEW */}
      <div className="lg:hidden">
        <ProductPreview
          name={name}
          price={price}
          discountedPrice={discountedPrice}
          discount={discount}
          images={images}
          category={category}
        />
      </div>
    </main>
  );
}
