"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingAddButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard/products/new")}
      className="
        fixed bottom-6 left-6 
        w-14 h-14 
        bg-green-500 hover:bg-green-600
        rounded-full 
        flex items-center justify-center
        shadow-lg
        z-50
      "
    >
      <Plus size={24} />
    </button>
  );
}
