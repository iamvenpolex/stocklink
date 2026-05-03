"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import ProductTable from "@/components/dashboard/ProductTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import FloatingAddButton from "@/components/dashboard/FloatingAddButton";

export default function Dashboard() {
  const router = useRouter();
  const hasFetched = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Guard: only run once on the client
    if (hasFetched.current) return;
    hasFetched.current = true;

    const token = localStorage.getItem("stocklink-token");

    if (!token) {
      router.push("/auth");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorised");
        return res.json();
      })
      .then(() => {
        setReady(true);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("stocklink-token");
        router.push("/auth");
      });
  }, [router]);

  if (!ready && loading) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar setOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="pt-8 p-3 space-y-6">
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

      <FloatingAddButton />
    </main>
  );
}
