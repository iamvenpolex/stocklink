"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const showBack = pathname !== "/marketplace";

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center gap-3 px-4 py-4 border-b border-gray-800 bg-black/90 backdrop-blur">
      {/* BACK BUTTON (always visible except homepage) */}
      {showBack && (
        <button
          onClick={() => router.back()}
          className="p-2 border border-gray-700 rounded-lg hover:border-green-500 transition"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      {/* TITLE */}
      <h1 className="font-bold text-lg">
        Marketplace <span className="text-green-400">Hub</span>
      </h1>
    </header>
  );
}
