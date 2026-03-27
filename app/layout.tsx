import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StockLINK - B2B Marketplace for Resellers",
  description:
    "StockLINK connects suppliers and resellers. Browse products, list stock, and grow your business with monthly subscriptions.",
  keywords: [
    "B2B marketplace",
    "wholesale products",
    "resellers platform",
    "supplier marketplace",
    "StockLINK",
  ],
  openGraph: {
    title: "StockLINK",
    description: "A modern B2B marketplace for suppliers and resellers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
