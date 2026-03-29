"use client";

import { Share2 } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-gray-800 p-5 rounded-xl">
      <div>
        <h2 className="text-xl font-bold">My Business Shop</h2>
        <p className="text-sm text-green-400 mt-1">● Active</p>
      </div>

      <button className="p-3 rounded-lg border border-gray-700 hover:bg-white/5">
        <Share2 size={18} />
      </button>
    </div>
  );
}
