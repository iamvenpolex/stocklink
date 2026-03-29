"use client";

import { Menu } from "lucide-react";

type NavbarProps = {
  setOpen: (val: boolean) => void;
};

export default function Navbar({ setOpen }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b border-gray-800 bg-black text-white">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="p-2 border border-gray-700 rounded-lg"
        >
          <Menu size={18} />
        </button>

        <h1 className="text-lg font-bold">
          Stock<span className="text-green-400">Link</span>
        </h1>
      </div>

      {/* RIGHT */}
      <div>
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full border border-gray-700"
        />
      </div>
    </header>
  );
}
