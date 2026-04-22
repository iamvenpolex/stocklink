"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Store, Eye, EyeOff } from "lucide-react";

type Mode = "login" | "register";

type FormState = {
  name: string;
  email: string;
  phone: string;
  business: string;
  password: string;
};

const STORAGE_KEY = "stocklink-auth";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    business: "",
    password: "",
  });

  // ✅ SAFE HYDRATION (NO MULTIPLE SETSTATE ISSUE)
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setMode(parsed.mode ?? "login");
      setStep(parsed.step ?? 1);
      setForm(parsed.form ?? form);
    } catch (err) {
      console.log("Invalid storage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ SAVE STATE
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, step, form }));
  }, [mode, step, form]);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 🇿🇦 SA validation
  const isValidSA = (phone: string) =>
    /^(\+27|0)[6-8][0-9]{8}$/.test(phone.replace(/\s/g, ""));

  // 🔐 Password rules
  const passwordChecks = {
    length: form.password.length >= 6,
    number: /\d/.test(form.password),
    letter: /[a-zA-Z]/.test(form.password),
  };

  const progress = (step / 3) * 100;

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[160px] rounded-full -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full -bottom-40 -right-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-8"
      >
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-xl font-bold flex justify-center gap-2">
            <Store className="text-green-400" size={20} />
            Seller <span className="text-green-400">Portal</span>
          </h1>
        </div>

        {/* TOGGLE */}
        <div className="flex mt-6 bg-black/40 border border-gray-800 rounded-xl overflow-hidden">
          <button
            onClick={() => {
              setMode("login");
              setStep(1);
            }}
            className={`flex-1 py-2 ${
              mode === "login" ? "bg-green-500" : "text-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setMode("register");
              setStep(1);
            }}
            className={`flex-1 py-2 ${
              mode === "register" ? "bg-green-500" : "text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <div className="mt-6 space-y-4">
            <Input
              icon={<Mail size={16} />}
              placeholder="Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />

            <div className="relative">
              <Input
                icon={<Lock size={16} />}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="btn">Login</button>
          </div>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <div className="mt-6 space-y-5">
            {/* progress */}
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-center text-gray-400">
              Step {step} of 3
            </p>

            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Input
                    icon={<User size={16} />}
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />

                  <Input
                    icon={<Mail size={16} />}
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />

                  <button className="btn" onClick={() => setStep(2)}>
                    Next
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Input
                    icon={<Store size={16} />}
                    placeholder="Business Name"
                    value={form.business}
                    onChange={(e) => update("business", e.target.value)}
                  />

                  {/* 🇿🇦 PHONE */}
                  <div className="flex items-center bg-black/40 border border-gray-800 rounded-lg px-3">
                    <span className="flex items-center gap-2 pr-3 border-r border-gray-700">
                      🇿🇦 +27
                    </span>

                    <input
                      type="tel"
                      placeholder="812345678"
                      value={form.phone.replace("+27", "")}
                      className="w-full bg-transparent px-3 py-3 outline-none"
                      onChange={(e) => update("phone", "+27" + e.target.value)}
                    />
                  </div>

                  {!isValidSA(form.phone) && form.phone && (
                    <p className="text-xs text-red-400">
                      ⚠ Enter valid South African number
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      className="btn-secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>

                    <button
                      className="btn"
                      disabled={!isValidSA(form.phone)}
                      onClick={() => setStep(3)}
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      icon={<Lock size={16} />}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="text-xs space-y-1">
                    <p
                      className={
                        passwordChecks.length
                          ? "text-green-400"
                          : "text-gray-400"
                      }
                    >
                      • At least 6 characters
                    </p>
                    <p
                      className={
                        passwordChecks.number
                          ? "text-green-400"
                          : "text-gray-400"
                      }
                    >
                      • Contains number
                    </p>
                    <p
                      className={
                        passwordChecks.letter
                          ? "text-green-400"
                          : "text-gray-400"
                      }
                    >
                      • Contains letter
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="btn-secondary"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>

                    <button
                      className="btn"
                      disabled={
                        !passwordChecks.length ||
                        !passwordChecks.number ||
                        !passwordChecks.letter
                      }
                    >
                      Create Account
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing you agree to StockLINK terms
        </p>
      </motion.div>

      <style jsx>{`
        .btn {
          width: 100%;
          padding: 12px;
          background: #22c55e;
          border-radius: 10px;
          font-weight: 600;
        }

        .btn-secondary {
          flex: 1;
          padding: 12px;
          border: 1px solid #333;
          border-radius: 10px;
          color: #aaa;
        }
      `}</style>
    </main>
  );
}

function Input({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center bg-black/40 border border-gray-800 rounded-lg px-3">
      <span className="text-gray-500 pr-2">{icon}</span>
      <input {...props} className="w-full bg-transparent py-3 outline-none" />
    </div>
  );
}
