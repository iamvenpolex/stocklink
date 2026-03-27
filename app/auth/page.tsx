"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Store } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[160px] rounded-full top-[-120px] left-[-120px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full bottom-[-120px] right-[-120px]" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-xl"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Store className="text-green-400" size={22} />
            Seller <span className="text-green-400">Portal</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Access your dashboard and manage your stock
          </p>
        </div>

        {/* Toggle */}
        <div className="flex mt-6 bg-black/40 border border-gray-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm flex items-center justify-center gap-2 transition ${
              mode === "login" ? "bg-green-500 text-white" : "text-gray-400"
            }`}
          >
            <User size={16} />
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-sm flex items-center justify-center gap-2 transition ${
              mode === "register" ? "bg-green-500 text-white" : "text-gray-400"
            }`}
          >
            <Store size={16} />
            Register
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {mode === "register" && (
            <div className="relative">
              <Store
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Business Name"
                className="w-full pl-10 px-4 py-3 bg-black/40 border border-gray-800 rounded-lg outline-none focus:border-green-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 px-4 py-3 bg-black/40 border border-gray-800 rounded-lg outline-none focus:border-green-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 px-4 py-3 bg-black/40 border border-gray-800 rounded-lg outline-none focus:border-green-500"
            />
          </div>

          {mode === "register" && (
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-10 px-4 py-3 bg-black/40 border border-gray-800 rounded-lg outline-none focus:border-green-500"
              />
            </div>
          )}

          {/* Button */}
          <button className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition">
            {mode === "login" ? "Login to Dashboard" : "Create Seller Account"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to StockLINK terms
        </p>
      </motion.div>
    </main>
  );
}
