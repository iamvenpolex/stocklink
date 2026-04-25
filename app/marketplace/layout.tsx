"use client";

import Navbar from "./Navbar";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* push content below navbar */}
      <div className="pt-[70px]">{children}</div>
    </div>
  );
}
