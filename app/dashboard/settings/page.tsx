"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    businessName: "My Business Shop",
    email: "example@email.com",
    phone: "27712345678",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="p-3 text-white space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 text-sm">
          Manage your business and account settings
        </p>
      </div>

      {/* BUSINESS INFO */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Business Information</h2>

        <input
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          placeholder="Business Name"
          className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Business Address"
          className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
        />

        <button className="px-4 py-2 bg-green-500 rounded-lg">
          Save Changes
        </button>
      </div>

      {/* PASSWORD */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg"
        />

        <button className="px-4 py-2 bg-green-500 rounded-lg">
          Update Password
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white/5 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Notifications</h2>

        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <input type="checkbox" className="accent-green-500" />
        </div>

        <div className="flex items-center justify-between">
          <span>SMS Alerts</span>
          <input type="checkbox" className="accent-green-500" />
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-red-400">Danger Zone</h2>

        <p className="text-sm text-gray-400">
          Deleting your account will remove all your products and data
          permanently.
        </p>

        <button className="px-4 py-2 bg-red-500 rounded-lg">
          Delete Account
        </button>
      </div>
    </main>
  );
}
