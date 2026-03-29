"use client";

import { useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import ProductTable from "@/components/dashboard/ProductTable";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <Navbar setOpen={setSidebarOpen} />

      {/* SIDEBAR DRAWER */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* CONTENT */}
      <div className="p-6 space-y-6">
        <StatsCards />
        <ProductTable />
      </div>
    </main>
  );
}
