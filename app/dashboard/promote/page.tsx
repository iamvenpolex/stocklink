"use client";

import { useEffect, useState } from "react";
import {
  Zap,
  Star,
  Clock,
  TrendingUp,
  CheckCircle,
  Loader2,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  images: string[];
  is_promoted: boolean;
};

const PLANS = [
  {
    days: 3,
    label: "Starter",
    price: 20,
    color: "border-gray-700",
    activeColor: "border-green-500 bg-green-500/10",
    badge: null,
    perks: ["Appear above regular listings", "3 days visibility boost"],
  },
  {
    days: 7,
    label: "Popular",
    price: 40,
    color: "border-gray-700",
    activeColor: "border-yellow-500 bg-yellow-500/10",
    badge: "Most Popular",
    perks: [
      "Top marketplace placement",
      "7 days visibility boost",
      "🔥 Sponsored badge",
    ],
  },
  {
    days: 14,
    label: "Pro",
    price: 70,
    color: "border-gray-700",
    activeColor: "border-purple-500 bg-purple-500/10",
    badge: "Best Value",
    perks: [
      "Priority search placement",
      "14 days visibility boost",
      "🔥 Sponsored badge",
      "Featured in hero section",
    ],
  },
];

export default function PromotePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const selectedProductData = products.find((p) => p.id === selectedProduct);

  const handleSubmit = async () => {
    setError(null);
    if (!selectedProduct) return setError("Please select a product.");

    setSubmitting(true);
    // TODO: integrate payment gateway (e.g. PayFast, Yoco)
    // For now simulate a request
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold">Promotion Active!</h2>
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">
              {selectedProductData?.name}
            </span>{" "}
            is now promoted for{" "}
            <span className="text-green-400">{selectedPlan.days} days</span>. It
            will appear at the top of the marketplace.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setSelectedProduct("");
            }}
            className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold text-sm transition-colors"
          >
            Promote Another Product
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 space-y-6 max-w-2xl mx-auto pb-16">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Zap size={22} className="text-yellow-400" />
          <h1 className="text-2xl font-bold">Promote Product</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Boost your product to the top of the marketplace and get more buyers
        </p>
      </div>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            icon: <Star size={16} className="text-yellow-400" />,
            label: "Get Sponsored Badge",
            sub: "Stand out instantly",
          },
          {
            icon: <TrendingUp size={16} className="text-green-400" />,
            label: "Top Placement",
            sub: "Appear above all",
          },
          {
            icon: <Clock size={16} className="text-blue-400" />,
            label: "Time-Based",
            sub: "Choose your duration",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/5 border border-gray-800 rounded-xl p-3 text-center space-y-1.5"
          >
            <div className="flex justify-center">{item.icon}</div>
            <p className="text-xs font-semibold text-white">{item.label}</p>
            <p className="text-xs text-gray-500">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Select product ─────────────────────────────────────────────────── */}
      <div className="bg-white/5 border border-gray-800 rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <span className="w-5 h-5 bg-green-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
            1
          </span>
          Select a Product
        </h2>

        {loading ? (
          <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
        ) : (
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-xl text-white outline-none focus:border-green-500 transition-colors text-sm cursor-pointer"
          >
            <option value="" disabled>
              Choose a product to promote
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id} className="bg-black">
                {p.name} {p.is_promoted ? "🔥 (already promoted)" : ""}
              </option>
            ))}
          </select>
        )}

        {selectedProductData?.is_promoted && (
          <p className="text-xs text-yellow-400 flex items-center gap-1">
            🔥 This product is already promoted. Promoting again will extend its
            duration.
          </p>
        )}
      </div>

      {/* ── Choose plan ────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <span className="w-5 h-5 bg-green-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
            2
          </span>
          Choose a Plan
        </h2>

        <div className="space-y-3">
          {PLANS.map((plan) => {
            const isActive = selectedPlan.days === plan.days;
            return (
              <button
                key={plan.days}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isActive
                    ? plan.activeColor
                    : "bg-white/5 border-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isActive ? "border-green-400" : "border-gray-600"
                      }`}
                    >
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      )}
                    </div>
                    <span className="font-semibold text-sm">{plan.label}</span>
                    {plan.badge && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          plan.badge === "Most Popular"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">R{plan.price}</p>
                    <p className="text-xs text-gray-500">{plan.days} days</p>
                  </div>
                </div>

                <div className="space-y-1 pl-6">
                  {plan.perks.map((perk) => (
                    <p
                      key={perk}
                      className="text-xs text-gray-400 flex items-center gap-1.5"
                    >
                      <CheckCircle
                        size={11}
                        className="text-green-500 shrink-0"
                      />
                      {perk}
                    </p>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Summary ────────────────────────────────────────────────────────── */}
      <div className="bg-white/5 border border-gray-800 rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <span className="w-5 h-5 bg-green-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
            3
          </span>
          Order Summary
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Product</span>
            <span className="text-white font-medium">
              {selectedProductData?.name ?? "—"}
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Plan</span>
            <span className="text-white">
              {selectedPlan.label} ({selectedPlan.days} days)
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Rate</span>
            <span className="text-white">
              R{(selectedPlan.price / selectedPlan.days).toFixed(2)}/day
            </span>
          </div>
          <div className="border-t border-gray-800 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-green-400 text-lg">
              R{selectedPlan.price}
            </span>
          </div>
        </div>
      </div>

      {/* ── Error ──────────────────────────────────────────────────────────── */}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <button
        onClick={handleSubmit}
        disabled={submitting || !selectedProduct}
        className="w-full py-4 bg-green-500 hover:bg-green-400 active:scale-95 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Processing...
          </>
        ) : (
          <>
            <Zap size={18} /> Pay R{selectedPlan.price} & Promote
          </>
        )}
      </button>

      <p className="text-xs text-gray-600 text-center">
        Payment integration coming soon. Contact admin to manually activate
        promotions.
      </p>
    </main>
  );
}
