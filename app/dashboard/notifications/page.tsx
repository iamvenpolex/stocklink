"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCheck, Trash2, Loader2 } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  sent_at: string;
  read: boolean;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) {
          // Mark all as unread initially — read state is local
          setNotifications(
            data.notifications.map((n: Omit<Notification, "read">) => ({
              ...n,
              read: false,
            })),
          );
        }
      })
      .catch(() => setError("Failed to load notifications."))
      .finally(() => setLoading(false));
  }, []);

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

      {/* ── Loading ───────────────────────────────────────────────────────── */}
      {loading && (
        <div className="flex items-center justify-center py-20 gap-2 text-gray-500">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Loading notifications...</span>
        </div>
      )}

      {/* ── Error ─────────────────────────────────────────────────────────── */}
      {error && (
        <p className="text-center text-red-400 text-sm py-8">{error}</p>
      )}

      {/* ── List ──────────────────────────────────────────────────────────── */}
      {!loading && !error && (
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
                n.read
                  ? "bg-white/5 border-gray-800"
                  : "bg-green-500/10 border-green-500/20"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                  n.read
                    ? "bg-white/5 border-gray-700"
                    : "bg-green-500/15 border-green-500/20"
                }`}
              >
                <Bell
                  size={16}
                  className={n.read ? "text-gray-400" : "text-green-400"}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`text-sm font-semibold ${
                      n.read ? "text-gray-300" : "text-white"
                    }`}
                  >
                    {n.title}
                  </h3>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full shrink-0 bg-green-400" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {n.message}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  {timeAgo(n.sent_at)}
                </p>
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
      )}
    </main>
  );
}
