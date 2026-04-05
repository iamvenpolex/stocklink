"use client";

import Link from "next/link";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      total: 1200,
      status: "Pending",
      date: "2026-04-01",
    },
    {
      id: "ORD-002",
      customer: "Sarah Smith",
      total: 850,
      status: "Completed",
      date: "2026-04-02",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "Cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <main className="p-3 text-white space-y-6">
      {/* MOBILE VIEW (CARDS) */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/dashboard/orders/${order.id}`}
            className="block bg-white/5 border border-gray-800 rounded-xl p-4 space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{order.id}</span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-sm text-gray-400">{order.customer}</p>
            <p className="text-sm">R{order.total}</p>
            <p className="text-xs text-gray-500">{order.date}</p>
          </Link>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-800 hover:bg-white/5"
              >
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">R{order.total}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-green-400 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
