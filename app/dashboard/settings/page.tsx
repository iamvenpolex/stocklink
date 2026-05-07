"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  Store,
} from "lucide-react";

type Seller = {
  id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
};

export default function SettingsPage() {
  const router = useRouter();

  const [seller, setSeller] = useState<Seller | null>(null);
  const [fetching, setFetching] = useState(true);

  // Profile form
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  // ── Fetch current user ─────────────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("stocklink-token");
    if (!token) {
      router.push("/auth");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const u = data.user;
        setSeller(u);
        setName(u.name ?? "");
        setBusiness(u.business ?? "");
        setPhone(u.phone ?? "");
      })
      .catch(() => router.push("/auth"))
      .finally(() => setFetching(false));
  }, [router]);

  // ── Save profile ───────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    setProfileMsg(null);
    if (!name.trim())
      return setProfileMsg({ type: "error", text: "Name is required." });
    if (!business.trim())
      return setProfileMsg({
        type: "error",
        text: "Business name is required.",
      });

    const token = localStorage.getItem("stocklink-token");
    setProfileLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            business: business.trim(),
            phone,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err: unknown) {
      setProfileMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Update failed.",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // ── Change password ────────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    setPasswordMsg(null);
    if (!currentPassword)
      return setPasswordMsg({
        type: "error",
        text: "Enter your current password.",
      });
    if (newPassword.length < 6)
      return setPasswordMsg({
        type: "error",
        text: "New password must be at least 6 characters.",
      });
    if (!/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword))
      return setPasswordMsg({
        type: "error",
        text: "Password must contain a letter and a number.",
      });

    const token = localStorage.getItem("stocklink-token");
    setPasswordLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPasswordMsg({
        type: "success",
        text: "Password updated successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: unknown) {
      setPasswordMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Password update failed.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (fetching) {
    return (
      <main className="min-h-screen bg-black p-4 space-y-4 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 bg-white/5 rounded-xl" />
        ))}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 space-y-5 max-w-2xl mx-auto pb-16">
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="pb-2 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account and business preferences
        </p>
      </div>

      {/* ── Profile section ───────────────────────────────────────────────── */}
      <section className="bg-white/5 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
          <User size={16} className="text-green-400" />
          <h2 className="font-semibold text-sm">Business Profile</h2>
        </div>

        {/* Avatar row */}
        <div className="px-5 py-4 flex items-center gap-4 border-b border-gray-800">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-green-400">
              {name
                .trim()
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "??"}
            </span>
          </div>
          <div>
            <p className="font-semibold">{business || "Your Business"}</p>
            <p className="text-sm text-gray-400">{seller?.email}</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">
              Full Name
            </label>
            <div className="flex items-center bg-black/40 border border-gray-800 rounded-xl px-4 focus-within:border-green-500 transition-colors">
              <User size={15} className="text-gray-500 shrink-0" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-transparent py-3 px-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* Business name */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">
              Business Name
            </label>
            <div className="flex items-center bg-black/40 border border-gray-800 rounded-xl px-4 focus-within:border-green-500 transition-colors">
              <Store size={15} className="text-gray-500 shrink-0" />
              <input
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="Business Name"
                className="w-full bg-transparent py-3 px-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* Email — read only */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">
              Email
            </label>
            <div className="flex items-center bg-black/20 border border-gray-800 rounded-xl px-4 opacity-60 cursor-not-allowed">
              <Mail size={15} className="text-gray-500 shrink-0" />
              <input
                value={seller?.email ?? ""}
                readOnly
                className="w-full bg-transparent py-3 px-3 outline-none text-sm cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Email cannot be changed
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">
              Phone Number
            </label>
            <div className="flex items-center bg-black/40 border border-gray-800 rounded-xl px-4 focus-within:border-green-500 transition-colors">
              <Phone size={15} className="text-gray-500 shrink-0" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+27 81 234 5678"
                className="w-full bg-transparent py-3 px-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* Feedback */}
          {profileMsg && (
            <div
              className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border ${
                profileMsg.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {profileMsg.type === "success" && <CheckCircle size={15} />}
              {profileMsg.text}
            </div>
          )}

          <button
            onClick={handleSaveProfile}
            disabled={profileLoading}
            className="w-full py-3 bg-green-500 hover:bg-green-400 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {profileLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </section>

      {/* ── Password section ──────────────────────────────────────────────── */}
      <section className="bg-white/5 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
          <Lock size={16} className="text-green-400" />
          <h2 className="font-semibold text-sm">Change Password</h2>
        </div>

        <div className="p-5 space-y-4">
          {/* Current password */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">
              Current Password
            </label>
            <div className="flex items-center bg-black/40 border border-gray-800 rounded-xl px-4 focus-within:border-green-500 transition-colors">
              <Lock size={15} className="text-gray-500 shrink-0" />
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full bg-transparent py-3 px-3 outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="text-gray-500 hover:text-white shrink-0"
              >
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">
              New Password
            </label>
            <div className="flex items-center bg-black/40 border border-gray-800 rounded-xl px-4 focus-within:border-green-500 transition-colors">
              <Lock size={15} className="text-gray-500 shrink-0" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6 chars)"
                className="w-full bg-transparent py-3 px-3 outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="text-gray-500 hover:text-white shrink-0"
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Feedback */}
          {passwordMsg && (
            <div
              className={`flex items-center gap-2 text-sm px-4 py-3 rounded-xl border ${
                passwordMsg.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {passwordMsg.type === "success" && <CheckCircle size={15} />}
              {passwordMsg.text}
            </div>
          )}

          <button
            onClick={handleChangePassword}
            disabled={passwordLoading}
            className="w-full py-3 bg-white/10 hover:bg-white/15 border border-gray-700 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {passwordLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </section>

      {/* ── Notifications section ─────────────────────────────────────────── */}
      <section className="bg-white/5 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
          <Bell size={16} className="text-green-400" />
          <h2 className="font-semibold text-sm">Notifications</h2>
        </div>

        <div className="divide-y divide-gray-800">
          {[
            {
              label: "Email Notifications",
              sub: "Receive order and product updates via email",
              value: emailNotifs,
              set: setEmailNotifs,
            },
            {
              label: "SMS Alerts",
              sub: "Get text alerts for new orders",
              value: smsNotifs,
              set: setSmsNotifs,
            },
          ].map(({ label, sub, value, set }) => (
            <div
              key={label}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </div>
              <button
                onClick={() => set(!value)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? "bg-green-500" : "bg-gray-700"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Danger zone ───────────────────────────────────────────────────── */}
      <section className="bg-red-500/5 border border-red-500/20 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-red-500/20 flex items-center gap-2">
          <Trash2 size={16} className="text-red-400" />
          <h2 className="font-semibold text-sm text-red-400">Danger Zone</h2>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-400">
            Permanently delete your account and all associated products. This
            action
            <span className="text-white font-semibold"> cannot be undone</span>.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-semibold transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-400">
                Type <span className="font-bold">DELETE</span> to confirm:
              </p>
              <input
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-4 py-3 bg-black/40 border border-red-500/30 rounded-xl outline-none text-sm focus:border-red-500 transition-colors"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteInput("");
                  }}
                  className="flex-1 py-2.5 border border-gray-700 rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteInput !== "DELETE"}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
