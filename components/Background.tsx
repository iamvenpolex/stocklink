export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-950 to-black" />

      {/* glowing blobs */}
      <div className="absolute w-150 h-150 bg-green-500/30 blur-[180px] rounded-full -top-37.5 -left-37.5 animate-pulse" />
      <div className="absolute w-150 h-150 bg-blue-500/30 blur-[180px] rounded-full -bottom-37.5 -right-37.5 animate-pulse" />

      {/* subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />
    </div>
  );
}
