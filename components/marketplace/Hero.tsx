"use client";

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-green-500/10 via-black to-black p-6">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Find Stock to <span className="text-green-400">Resell</span>
        </h1>

        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Browse products from trusted suppliers near you. No login needed.
        </p>
      </div>

      {/* glow */}
      <div className="absolute w-72 h-72 bg-green-500/20 blur-[120px] -top-12.5 -right-12.5" />
    </div>
  );
}
