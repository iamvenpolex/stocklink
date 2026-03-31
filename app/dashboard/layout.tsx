"use client";

import { useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar (fixed) */}
        <Navbar setOpen={setSidebarOpen} />

        {/* Content (push down because navbar is fixed) */}
        <div className="pt-20 p-6">{children}</div>
      </div>
    </div>
  );
}
