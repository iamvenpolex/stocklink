"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import ProductTable from "@/components/dashboard/ProductTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import FloatingAddButton from "@/components/dashboard/FloatingAddButton";

type Seller = {
  id: string;
  name: string;
  email: string;
  business: string;
  phone: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Seller | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");

    // No token → kick to auth page
    if (!token) {
      router.push("/auth");
      return;
    }

    // Verify token with backend and load user profile
    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorised");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        // Token expired or invalid → clear and redirect
        localStorage.removeItem("stocklink-token");
        router.push("/auth");
      });
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar setOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="pt-8 p-3 space-y-6">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <DashboardHeader user={user} />
            <StatsCards />
            <ProductTable />
          </>
        )}
      </div>

      <FloatingAddButton />
    </main>
  );
}
