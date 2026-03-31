"use client";

import Image from "next/image";
import { Menu, ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type NavbarProps = {
  setOpen: (val: boolean) => void;
};

export default function Navbar({ setOpen }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const showBack = pathname !== "/dashboard";

  // 🔥 PAGE TITLE MAP
  const getTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Overview";
      case "/dashboard/products":
        return "Products";
      case "/dashboard/products/new":
        return "Add Product";
      case "/dashboard/orders":
        return "Orders";
      case "/dashboard/categories":
        return "Categories";
      case "/dashboard/analytics":
        return "Analytics";
      case "/dashboard/revenue":
        return "Revenue";
      case "/dashboard/settings":
        return "Settings";
      case "/dashboard/billing":
        return "Billing";
      default:
        return "Dashboard";
    }
  };

  const title = getTitle();

  return (
    <header className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 py-4 border-b border-gray-800 bg-black text-white">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/dashboard");
              }
            }}
            className="p-2 border border-gray-700 rounded-lg"
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <button
          onClick={() => setOpen(true)}
          className="p-2 border border-gray-700 rounded-lg"
        >
          <Menu size={18} />
        </button>

        {/* 🔥 PAGE TITLE */}
        <h1 className="text-lg font-bold">{title}</h1>
      </div>

      {/* RIGHT */}
      <div className="relative w-9 h-9">
        <Image
          src="https://i.pravatar.cc/40"
          alt="User profile"
          fill
          className="rounded-full border border-gray-700 object-cover"
        />
      </div>
    </header>
  );
}
