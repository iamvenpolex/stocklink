"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Upload, Loader2, X } from "lucide-react";
import CategorySelector from "@/components/dashboard/CategorySelector";
import ProductPreview from "@/components/dashboard/ProductPreview";

const SA_LOCATIONS = [
  "Johannesburg, Gauteng",
  "Pretoria, Gauteng",
  "Soweto, Gauteng",
  "Ekurhuleni, Gauteng",
  "Sandton, Gauteng",
  "Cape Town, Western Cape",
  "Stellenbosch, Western Cape",
  "George, Western Cape",
  "Paarl, Western Cape",
  "Durban, KwaZulu-Natal",
  "Pietermaritzburg, KwaZulu-Natal",
  "Richards Bay, KwaZulu-Natal",
  "Port Elizabeth (Gqeberha), Eastern Cape",
  "East London, Eastern Cape",
  "Mthatha, Eastern Cape",
  "Polokwane, Limpopo",
  "Tzaneen, Limpopo",
  "Nelspruit (Mbombela), Mpumalanga",
  "Witbank (eMalahleni), Mpumalanga",
  "Rustenburg, North West",
  "Mahikeng, North West",
  "Bloemfontein, Free State",
  "Welkom, Free State",
  "Kimberley, Northern Cape",
  "Upington, Northern Cape",
];

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // Images — existing URLs from DB + new base64 uploads
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  // Combined preview (existing kept + new)
  const previewImages = [
    ...existingImages.filter((img) => !removedImages.includes(img)),
    ...newImages,
  ];

  const discountedPrice =
    price && discount
      ? Number(price) - (Number(price) * Number(discount)) / 100
      : null;

  // ── Fetch existing product ─────────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const token = localStorage.getItem("stocklink-token");
      if (!token) {
        router.push("/auth");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Product not found.");

        const p = data.product;
        setName(p.name ?? "");
        setCategory(p.category ?? "");
        setLocation(p.location ?? "");
        setPrice(String(p.price ?? ""));
        setStock(String(p.stock ?? ""));
        setDescription(p.description ?? "");
        setExistingImages(p.images ?? []);

        if (p.discount > 0) {
          setHasDiscount(true);
          setDiscount(String(p.discount));
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load product.",
        );
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  // ── Handle new image files ─────────────────────────────────────────────────
  const handleImages = (files: FileList) => {
    const imgs: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imgs.push(reader.result as string);
        if (imgs.length === files.length)
          setNewImages((prev) => [...prev, ...imgs]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExisting = (url: string) =>
    setRemovedImages((prev) => [...prev, url]);

  const removeNew = (index: number) =>
    setNewImages((prev) => prev.filter((_, i) => i !== index));

  // ── Submit update ──────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        {
          method: "PATCH",
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
            existingImages: existingImages.filter(
              (img) => !removedImages.includes(img),
            ),
            removedImages,
            newImages, // base64 — backend uploads these
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product.");

      setSuccess("Product updated successfully!");
      setTimeout(() => router.push("/dashboard/products"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <main className="min-h-screen bg-black text-white p-4 space-y-4 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-1/3" />
        <div className="h-12 bg-white/5 rounded-lg" />
        <div className="h-12 bg-white/5 rounded-lg" />
        <div className="h-12 bg-white/5 rounded-lg" />
        <div className="h-32 bg-white/5 rounded-lg" />
      </main>
    );
  }

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

          {/* Existing images */}
          {existingImages.filter((img) => !removedImages.includes(img)).length >
            0 && (
            <div>
              <label className="text-sm text-gray-400">Current Images:</label>
              <div className="flex gap-2 flex-wrap mt-2">
                {existingImages
                  .filter((img) => !removedImages.includes(img))
                  .map((img, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-700"
                    >
                      <Image
                        src={img}
                        alt={`Image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => removeExisting(img)}
                        className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 hover:bg-red-500 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* New image upload */}
          <div>
            <label className="text-sm text-gray-400">
              {existingImages.length > 0
                ? "Add More Images:"
                : "Product Images:"}
            </label>
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

            {/* New image previews */}
            {newImages.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {newImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 rounded-lg overflow-hidden border border-green-500/50"
                  >
                    <Image
                      src={img}
                      alt={`New ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeNew(i)}
                      className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 hover:bg-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
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
              "Save Changes"
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
            images={previewImages}
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
          images={previewImages}
          category={category}
          location={location}
          stock={stock}
          description={description}
        />
      </div>
    </main>
  );
}
