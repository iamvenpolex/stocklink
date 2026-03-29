"use client";

import { Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/50 backdrop-blur">
      <h2 className="text-lg font-semibold">Seller Dashboard</h2>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-400 cursor-pointer" />
        <User className="text-gray-400 cursor-pointer" />
      </div>
    </header>
  );
}
