export default function ProductSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-white/5 p-3 space-y-3">
      {/* shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* image */}
      <div className="h-32 w-full rounded-lg bg-gray-800" />

      {/* title */}
      <div className="h-4 w-3/4 rounded bg-gray-800" />

      {/* price */}
      <div className="h-4 w-1/2 rounded bg-gray-800" />

      {/* button */}
      <div className="h-9 w-full rounded bg-gray-800 mt-2" />
    </div>
  );
}
