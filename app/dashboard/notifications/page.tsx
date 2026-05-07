"use client";

import { useState } from "react";
import {
  Bell,
  ShoppingCart,
  Star,
  Megaphone,
  Package,
  CheckCheck,
  Trash2,
} from "lucide-react";

type NotificationType = "order" | "review" | "promotion" | "stock" | "general";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const iconMap: Record<NotificationType, React.ReactNode> = {
  order: <ShoppingCart size={16} className="text-blue-400" />,
  review: <Star size={16} className="text-yellow-400" />,
  promotion: <Megaphone size={16} className="text-purple-400" />,
  stock: <Package size={16} className="text-red-400" />,
  general: <Bell size={16} className="text-gray-400" />,
};

const bgMap: Record<NotificationType, string> = {
  order: "bg-blue-500/10 border-blue-500/20",
  review: "bg-yellow-500/10 border-yellow-500/20",
  promotion: "bg-purple-500/10 border-purple-500/20",
  stock: "bg-red-500/10 border-red-500/20",
  general: "bg-white/5 border-gray-800",
};

const dotMap: Record<NotificationType, string> = {
  order: "bg-blue-400",
  review: "bg-yellow-400",
  promotion: "bg-purple-400",
  stock: "bg-red-400",
  general: "bg-gray-400",
};

const iconBgMap: Record<NotificationType, string> = {
  order: "bg-blue-500/15 border-blue-500/20",
  review: "bg-yellow-500/15 border-yellow-500/20",
  promotion: "bg-purple-500/15 border-purple-500/20",
  stock: "bg-red-500/15 border-red-500/20",
  general: "bg-white/10 border-gray-700",
};

const INITIAL: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message:
      "You received a new order (ORD-001). A buyer is interested in your Ankara Gown.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    type: "review",
    title: "New 5★ Review",
    message:
      "Someone left a 5-star review on your Sneakers listing. Keep it up!",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "promotion",
    title: "Promotion Expired",
    message:
      "Your sponsored listing for Smart Watch has expired. Renew to stay at the top.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "4",
    type: "stock",
    title: "Low Stock Alert",
    message:
      "Your Leather Bag only has 2 units left. Consider restocking soon.",
    time: "2 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const filtered =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <main className="min-h-screen bg-black text-white p-4 space-y-5 max-w-2xl mx-auto pb-16">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between pb-2 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="text-xs bg-green-500 text-white font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Stay updated with your business activity
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 border border-green-500/20 bg-green-500/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <CheckCheck size={13} />
            Mark all read
          </button>
        )}
      </div>

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <div className="flex bg-white/5 border border-gray-800 rounded-xl p-1 w-fit">
        {(["all", "unread"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === tab
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
            {tab === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── List ──────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-600">
            <Bell size={36} />
            <p className="text-sm">
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications yet"}
            </p>
          </div>
        )}

        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`group relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
              n.read ? "bg-white/5 border-gray-800" : bgMap[n.type]
            }`}
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                n.read ? "bg-white/5 border-gray-700" : iconBgMap[n.type]
              }`}
            >
              {iconMap[n.type]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center justify-between gap-2">
                <h3
                  className={`text-sm font-semibold ${n.read ? "text-gray-300" : "text-white"}`}
                >
                  {n.title}
                </h3>
                {!n.read && (
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${dotMap[n.type]}`}
                  />
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {n.message}
              </p>
              <p className="text-xs text-gray-600 mt-2">{n.time}</p>
            </div>

            {/* Dismiss */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss(n.id);
              }}
              className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
