export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />

      {/* glowing blobs */}
      <div className="absolute w-[600px] h-[600px] bg-green-500/30 blur-[180px] rounded-full top-[-150px] left-[-150px] animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-blue-500/30 blur-[180px] rounded-full bottom-[-150px] right-[-150px] animate-pulse" />

      {/* subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
    </div>
  );
}
