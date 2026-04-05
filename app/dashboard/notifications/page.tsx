"use client";

import { useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Order",
      message: "You received a new order (ORD-001)",
      time: "2 mins ago",
      read: false,
    },
    {
      id: "2",
      title: "New Review",
      message: "Someone reviewed your product (5⭐)",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Promotion Expired",
      message: "Your promoted product has expired",
      time: "Yesterday",
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <main className="p-3 text-white space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-400 text-sm">
            Stay updated with your business activity
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="text-sm text-green-400 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`cursor-pointer p-4 rounded-xl border transition ${
              n.read
                ? "bg-white/5 border-gray-800"
                : "bg-green-500/10 border-green-500/30"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{n.title}</h2>

              {!n.read && (
                <span className="w-2 h-2 bg-green-400 rounded-full" />
              )}
            </div>

            <p className="text-sm text-gray-300 mt-1">{n.message}</p>

            <p className="text-xs text-gray-500 mt-2">{n.time}</p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No notifications yet
        </div>
      )}
    </main>
  );
}
