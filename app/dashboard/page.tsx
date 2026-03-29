"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import ProductTable from "@/components/dashboard/ProductTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import FloatingAddButton from "@/components/dashboard/FloatingAddButton";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // simulate loading (replace with API later)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className=" min-h-screen bg-black text-white">
      <Navbar setOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="pt-20 p-3 space-y-6">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <DashboardHeader />
            <StatsCards />
            <ProductTable />
          </>
        )}
      </div>

      {/* Floating Add Product */}
      <FloatingAddButton />
    </main>
  );
}
