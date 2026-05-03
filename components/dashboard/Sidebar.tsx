"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Home,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  TrendingUp,
  Megaphone,
  Star,
  Bell,
  Settings,
  CreditCard,
  Search,
  X,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [business, setBusiness] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBusiness(data.user?.business ?? null))
      .catch(() => null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("stocklink-token");
    router.push("/auth");
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-80 bg-black border-r border-gray-800 z-50
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-800 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {business ? (
                <>
                  {business} <span className="text-green-400">Shop</span>
                </>
              ) : (
                <span className="text-gray-500">Loading...</span>
              )}
            </h2>

            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
        </div>

        {/* NAV */}
        <nav className="p-4 space-y-1 text-gray-300 text-sm overflow-y-auto flex-1">
          <NavItem
            href="/"
            icon={<Home size={18} />}
            label="Home"
            pathname={pathname}
          />
          <NavItem
            href="/marketplace"
            icon={<Search size={18} />}
            label="Marketplace"
            pathname={pathname}
          />

          <div className="my-3 border-t border-gray-800" />

          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/products"
            icon={<Package size={18} />}
            label="Products"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/orders"
            icon={<ShoppingCart size={18} />}
            label="Orders"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/analytics"
            icon={<BarChart3 size={18} />}
            label="Analytics"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/revenue"
            icon={<TrendingUp size={18} />}
            label="Revenue"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/promote"
            icon={<Megaphone size={18} />}
            label="Promote"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/reviews"
            icon={<Star size={18} />}
            label="Reviews"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/notifications"
            icon={<Bell size={18} />}
            label="Notifications"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/settings"
            icon={<Settings size={18} />}
            label="Settings"
            pathname={pathname}
          />
          <NavItem
            href="/dashboard/billing"
            icon={<CreditCard size={18} />}
            label="Billing"
            pathname={pathname}
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  pathname: string;
};

function NavItem({ icon, label, href, pathname }: NavItemProps) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg transition
        ${active ? "bg-green-500 text-white" : "hover:bg-white/5"}
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
