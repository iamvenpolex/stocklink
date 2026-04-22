export default function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-white/5 border border-gray-800 rounded-xl p-3 space-y-3">
      {/* Image */}
      <div className="w-full h-32 bg-gray-800 rounded-lg" />

      {/* Text */}
      <div className="h-4 bg-gray-800 rounded w-3/4" />
      <div className="h-4 bg-gray-800 rounded w-1/2" />

      {/* Button */}
      <div className="h-8 bg-gray-800 rounded w-full mt-2" />
    </div>
  );
}
