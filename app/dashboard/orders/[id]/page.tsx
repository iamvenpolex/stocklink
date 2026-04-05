"use client";

import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const { id } = useParams();

  // Dummy data (replace later)
  const order = {
    id,
    customer: "John Doe",
    phone: "27712345678", // ⚠️ IMPORTANT: no +, no spaces
    items: [
      { name: "Ankara Gown", qty: 2, price: 350 },
      { name: "Sneakers", qty: 1, price: 500 },
    ],
    total: 1200,
    status: "Pending",
    date: "2026-04-01",
  };

  // 🔥 Generate WhatsApp message
  const message = encodeURIComponent(
    `Hello ${order.customer}, your order (${order.id}) is being processed.\n\nTotal: R${order.total}\n\nWe will contact you shortly.`,
  );

  const whatsappLink = `https://wa.me/${order.phone}?text=${message}`;

  return (
    <main className="p-3 text-white space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Order {order.id}</h1>
        <p className="text-gray-400 text-sm">{order.date}</p>
      </div>

      {/* Customer */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
        <h2 className="font-semibold mb-2">Customer</h2>
        <p>{order.customer}</p>
        <p className="text-sm text-gray-400">+{order.phone}</p>
      </div>

      {/* Items */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
        <h2 className="font-semibold mb-3">Items</h2>

        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-gray-800 pb-2"
            >
              <div>
                <p>{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.qty}</p>
              </div>

              <p>R{item.price * item.qty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">R{order.total}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-center font-semibold"
        >
          💬 Contact on WhatsApp
        </a>

        <button className="px-4 py-3 bg-green-500 rounded-lg">
          Mark as Completed
        </button>

        <button className="px-4 py-3 bg-red-500 rounded-lg">
          Cancel Order
        </button>
      </div>
    </main>
  );
}
