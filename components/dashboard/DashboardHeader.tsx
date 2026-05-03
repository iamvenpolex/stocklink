"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";

type Seller = {
  name: string;
  business: string;
};

export default function DashboardHeader() {
  const [user, setUser] = useState<Seller | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => null);
  }, []);

  return (
    <div className="flex items-center justify-between bg-white/5 border border-gray-800 p-5 rounded-xl">
      <div>
        <h2 className="text-xl font-bold">
          {user?.business ? `${user.business} Shop` : "Loading..."}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Welcome back,{" "}
          <span className="text-white font-medium">{user?.name ?? ""}</span>
        </p>
        <p className="text-sm text-green-400 mt-1">● Active</p>
      </div>

      <button className="p-3 rounded-lg border border-gray-700 hover:bg-white/5">
        <Share2 size={18} />
      </button>
    </div>
  );
}
