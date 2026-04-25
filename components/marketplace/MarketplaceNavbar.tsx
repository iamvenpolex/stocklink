"use client";

import { Menu, ShoppingBag, Heart, Bell, ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type NavbarProps = {
  setOpen: (val: boolean) => void;
};

export default function MarketplaceNavbar({ setOpen }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // show back button if not main marketplace page
  const showBack = pathname !== "/marketplace";

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-black/95 backdrop-blur border-b border-gray-800 text-white">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-3 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* MENU */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 border border-gray-700 rounded-lg"
          >
            <Menu size={18} />
          </button>

          {/* BACK BUTTON */}
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-2 border border-gray-700 rounded-lg"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          {/* BRAND */}
          <div
            onClick={() => router.push("/marketplace")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="text-green-400" size={18} />
            <h1 className="font-bold text-sm">
              Stock<span className="text-green-400">LINK</span>
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-700 rounded-lg">
            <Heart size={18} />
          </button>

          <button className="p-2 border border-gray-700 rounded-lg relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-3 pb-3">
        <input
          placeholder="Search products, brands & categories..."
          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-xl outline-none focus:border-green-500"
        />
      </div>
    </header>
  );
}
