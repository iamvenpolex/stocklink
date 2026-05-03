"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";
import CategorySelector from "@/components/dashboard/CategorySelector";
import ProductPreview from "@/components/dashboard/ProductPreview";

const SA_LOCATIONS = [
  // Gauteng
  "Johannesburg, Gauteng",
  "Pretoria, Gauteng",
  "Soweto, Gauteng",
  "Ekurhuleni, Gauteng",
  "Sandton, Gauteng",
  // Western Cape
  "Cape Town, Western Cape",
  "Stellenbosch, Western Cape",
  "George, Western Cape",
  "Paarl, Western Cape",
  // KwaZulu-Natal
  "Durban, KwaZulu-Natal",
  "Pietermaritzburg, KwaZulu-Natal",
  "Richards Bay, KwaZulu-Natal",
  // Eastern Cape
  "Port Elizabeth (Gqeberha), Eastern Cape",
  "East London, Eastern Cape",
  "Mthatha, Eastern Cape",
  // Limpopo
  "Polokwane, Limpopo",
  "Tzaneen, Limpopo",
  // Mpumalanga
  "Nelspruit (Mbombela), Mpumalanga",
  "Witbank (eMalahleni), Mpumalanga",
  // North West
  "Rustenburg, North West",
  "Mahikeng, North West",
  // Free State
  "Bloemfontein, Free State",
  "Welkom, Free State",
  // Northern Cape
  "Kimberley, Northern Cape",
  "Upington, Northern Cape",
];

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImages = (files: FileList) => {
    const imgs: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imgs.push(reader.result as string);
        if (imgs.length === files.length) setImages(imgs);
      };
      reader.readAsDataURL(file);
    });
  };

  const discountedPrice =
    price && discount
      ? Number(price) - (Number(price) * Number(discount)) / 100
      : null;

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    // ── Validation ──────────────────────────────────────────────────────────
    if (!name.trim()) return setError("Product name is required.");
    if (!category) return setError("Please select a category.");
    if (!location) return setError("Please select a location.");
    if (!price || Number(price) <= 0) return setError("Enter a valid price.");
    if (!stock || Number(stock) < 0)
      return setError("Enter a valid stock quantity.");
    if (
      hasDiscount &&
      (!discount || Number(discount) <= 0 || Number(discount) >= 100)
    )
      return setError("Discount must be between 1 and 99.");

    const token = localStorage.getItem("stocklink-token");
    if (!token) {
      router.push("/auth");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            category,
            location,
            price: Number(price),
            discount: hasDiscount ? Number(discount) : 0,
            discounted_price: discountedPrice ?? Number(price),
            stock: Number(stock),
            description: description.trim(),
            images,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product.");

      setSuccess("Product added successfully!");
      setTimeout(() => router.push("/dashboard/products"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-3 space-y-6">
      <CategorySelector selected={category} setSelected={setCategory} />

      {/* Feedback */}
      {error && (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400">
          {success}
        </div>
      )}

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
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg outline-none focus:border-green-500 transition-colors"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-400">Price (R):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg outline-none focus:border-green-500 transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-400">Category:</label>
            <input
              value={category}
              readOnly
              className="w-full mt-1 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg cursor-not-allowed"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-400">Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg outline-none focus:border-green-500 transition-colors text-white cursor-pointer"
            >
              <option value="" disabled>
                Select a city / province
              </option>
              {SA_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
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
                  placeholder="e.g. 10"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-lg outline-none focus:border-green-500 transition-colors"
                />
                {discountedPrice && (
                  <p className="text-green-400 text-sm mt-2">
                    Final Price: R{discountedPrice.toFixed(2)} ({discount}% off)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm text-gray-400">Stock Quantity:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg outline-none focus:border-green-500 transition-colors"
            />
            <p className="text-yellow-400 text-xs mt-2">
              ⚠️ If stock is 0, your product appears as &quot;sold out&quot;.
              Set to at least 1.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400">
              Product Description / Remarks:
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Available in red, blue. Sizes: M, L, XL"
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg outline-none focus:border-green-500 transition-colors"
            />
          </div>

          {/* Image Upload */}
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
            {images.length > 0 && (
              <p className="text-xs text-green-400 mt-2">
                ✓ {images.length} image{images.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>

        {/* PREVIEW — desktop */}
        <div className="hidden lg:block sticky top-24">
          <ProductPreview
            name={name}
            price={price}
            discountedPrice={discountedPrice}
            discount={discount}
            images={images}
            category={category}
            location={location}
            stock={stock}
            description={description}
          />
        </div>
      </div>

      {/* PREVIEW — mobile */}
      <div className="lg:hidden">
        <ProductPreview
          name={name}
          price={price}
          discountedPrice={discountedPrice}
          discount={discount}
          images={images}
          category={category}
          location={location}
          stock={stock}
          description={description}
        />
      </div>
    </main>
  );
}
