"use client";

import { useEffect, useState } from "react";
import { Menu, ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type NavbarProps = {
  setOpen: (val: boolean) => void;
};

export default function Navbar({ setOpen }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [initials, setInitials] = useState("SL");

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const name: string = data.user?.name || data.user?.business || "";
        const parts = name.trim().split(" ");
        const computed =
          parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
        setInitials(computed.toUpperCase());
      })
      .catch(() => null);
  }, []);

  const showBack = pathname !== "/dashboard";

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

        <h1 className="text-lg font-bold">{getTitle()}</h1>
      </div>

      {/* RIGHT — initials avatar */}
      <div className="w-9 h-9 rounded-full border border-gray-700 bg-green-500/20 flex items-center justify-center">
        <span className="text-xs font-bold text-green-400">{initials}</span>
      </div>
    </header>
  );
}
