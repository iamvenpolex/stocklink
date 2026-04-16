"use client";

import Image from "next/image";

export default function ProductDetails() {
  const product = {
    name: "Ankara Gown",
    price: 350,
    description: "High quality Ankara dress for resellers.",
    image: "https://picsum.photos/500",
    phone: "27712345678",
  };

  const whatsapp = `https://wa.me/${product.phone}?text=Hi, I'm interested in ${product.name}`;

  return (
    <main className="min-h-screen bg-black text-white p-3 space-y-6">
      {/* IMAGE */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-green-400 text-xl mt-2">R{product.price}</p>
      </div>

      <p className="text-gray-300">{product.description}</p>

      {/* CTA */}
      <a
        href={whatsapp}
        target="_blank"
        className="block text-center py-3 bg-green-600 rounded-lg font-semibold"
      >
        💬 Contact on WhatsApp
      </a>
    </main>
  );
}
