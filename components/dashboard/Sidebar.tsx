"use client";

import {
  Home,
  Store,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Grid,
  BarChart3,
  TrendingUp,
  Megaphone,
  Star,
  Bell,
  Settings,
  CreditCard,
  Search,
  X,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
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
        {/* Header (fixed) */}
        <div className="p-5 border-b border-gray-800 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              My Business <span className="text-green-400">Shop</span>
            </h2>

            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
        </div>

        {/* NAV (scrollable area) */}
        <nav className="p-4 space-y-1 text-gray-300 text-sm overflow-y-auto flex-1">
          <NavItem icon={<Home size={18} />} label="Home" />
          <NavItem icon={<Search size={18} />} label="Marketplace" />

          <div className="my-3 border-t border-gray-800" />

          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavItem icon={<Package size={18} />} label="Products" />
          <NavItem icon={<ShoppingCart size={18} />} label="Orders" />
          <NavItem icon={<Grid size={18} />} label="Categories" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
          <NavItem icon={<TrendingUp size={18} />} label="Revenue" />
          <NavItem icon={<Store size={18} />} label="Marketplace" />
          <NavItem icon={<Megaphone size={18} />} label="Promote" />
          <NavItem icon={<Star size={18} />} label="Reviews" />
          <NavItem icon={<Bell size={18} />} label="Notifications" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
          <NavItem icon={<CreditCard size={18} />} label="Billing" />
        </nav>
      </aside>
    </>
  );
}

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
};

function NavItem({ icon, label }: NavItemProps) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
      {icon}
      <span>{label}</span>
    </button>
  );
}
