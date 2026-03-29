"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="h-20 bg-white/5 rounded-xl border border-gray-800" />

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white/5 rounded-xl border border-gray-800"
          />
        ))}
      </div>

      {/* Table */}
      <div className="h-64 bg-white/5 rounded-xl border border-gray-800" />
    </div>
  );
}
