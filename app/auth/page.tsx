"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

type ApiError = {
  message: string;
};

const STORAGE_KEY = "stocklink-auth";

const defaultForm: FormState = {
  name: "",
  email: "",
  phone: "",
  business: "",
  password: "",
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isValidSA = (phone: string) =>
  /^(\+27|0)[6-8][0-9]{8}$/.test(phone.replace(/\s/g, ""));

const getPasswordChecks = (password: string) => ({
  length: password.length >= 6,
  number: /\d/.test(password),
  letter: /[a-zA-Z]/.test(password),
});

export default function AuthPage() {
  const router = useRouter(); // ✅ Next.js router

  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setMode(parsed.mode ?? "login");
      setStep(parsed.step ?? 1);
      setForm({ ...(parsed.form ?? defaultForm), password: "" });
    } catch {
      // corrupted storage — ignore
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ mode, step, form: { ...form, password: "" } }),
    );
  }, [mode, step, form]);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setStep(1);
    setError(null);
    setSuccess(null);
  };

  const passwordChecks = getPasswordChecks(form.password);
  const passwordValid =
    passwordChecks.length && passwordChecks.number && passwordChecks.letter;
  const progress = (step / 3) * 100;

  // ─── LOGIN ─────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    setError(null);
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        },
      );

      const data: { token?: string; user?: object } & ApiError =
        await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed.");

      // ✅ Store token
      if (data.token) {
        localStorage.setItem("stocklink-token", data.token);
      }

      setSuccess("Welcome back! Redirecting…");

      // ✅ Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ─── REGISTER ──────────────────────────────────────────────────────────────
  const handleRegister = async () => {
    setError(null);
    if (!passwordValid) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone,
            business: form.business.trim(),
            password: form.password,
          }),
        },
      );

      const data: { token?: string; message?: string } & ApiError =
        await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed.");

      // ✅ Backend returns token on register — log them in directly
      if (data.token) {
        localStorage.setItem("stocklink-token", data.token);
        setSuccess("Account created! Redirecting…");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        // fallback: switch to login
        setSuccess("Account created! Please log in.");
        setForm(defaultForm);
        setStep(1);
        setTimeout(() => switchMode("login"), 1500);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[160px] rounded-full -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full -bottom-40 -right-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold flex justify-center items-center gap-2">
            <Store className="text-green-400" size={20} />
            Seller <span className="text-green-400">Portal</span>
          </h1>
        </div>

        <div className="flex bg-black/40 border border-gray-800 rounded-xl overflow-hidden">
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 text-sm font-medium capitalize transition-colors duration-200 ${
                mode === m
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-center"
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── LOGIN FORM ── */}
        {mode === "login" && (
          <div className="mt-6 space-y-4">
            <Input
              icon={<Mail size={16} />}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />

            <PasswordInput
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              show={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
            />

            <div className="text-right">
              <button className="text-xs text-gray-400 hover:text-green-400 transition-colors">
                Forgot password?
              </button>
            </div>

            <Btn
              onClick={handleLogin}
              loading={loading}
              disabled={!form.email || !form.password}
            >
              Login
            </Btn>
          </div>
        )}

        {/* ── REGISTER FORM ── */}
        {mode === "register" && (
          <div className="mt-6 space-y-5">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-center text-gray-400">
              Step {step} of 3
            </p>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
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
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  <Btn
                    onClick={() => {
                      if (!form.name.trim()) {
                        setError("Full name is required.");
                        return;
                      }
                      if (!isValidEmail(form.email)) {
                        setError("Enter a valid email address.");
                        return;
                      }
                      setError(null);
                      setStep(2);
                    }}
                    disabled={!form.name || !form.email}
                  >
                    Next
                  </Btn>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Input
                    icon={<Store size={16} />}
                    placeholder="Business Name"
                    value={form.business}
                    onChange={(e) => update("business", e.target.value)}
                  />

                  <div className="flex items-center bg-black/40 border border-gray-800 rounded-lg px-3 focus-within:border-green-500 transition-colors">
                    <span className="flex items-center gap-1 pr-3 border-r border-gray-700 text-sm">
                      🇿🇦 <span className="text-gray-400">+27</span>
                    </span>
                    <input
                      type="tel"
                      placeholder="812 345 678"
                      value={form.phone.replace(/^\+27/, "")}
                      className="w-full bg-transparent px-3 py-3 outline-none text-sm"
                      onChange={(e) =>
                        update(
                          "phone",
                          "+27" + e.target.value.replace(/\D/g, ""),
                        )
                      }
                    />
                  </div>
                  {form.phone && !isValidSA(form.phone) && (
                    <p className="text-xs text-red-400">
                      ⚠ Enter a valid South African number (e.g. 081 234 5678)
                    </p>
                  )}

                  <div className="flex gap-2">
                    <SecondaryBtn onClick={() => setStep(1)}>Back</SecondaryBtn>
                    <Btn
                      onClick={() => {
                        if (!form.business.trim()) {
                          setError("Business name is required.");
                          return;
                        }
                        if (!isValidSA(form.phone)) {
                          setError("Enter a valid SA phone number.");
                          return;
                        }
                        setError(null);
                        setStep(3);
                      }}
                      disabled={!form.business || !isValidSA(form.phone)}
                    >
                      Next
                    </Btn>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <PasswordInput
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    show={showPassword}
                    onToggle={() => setShowPassword((p) => !p)}
                  />

                  <div className="text-xs space-y-1">
                    {[
                      { key: "length", label: "At least 6 characters" },
                      { key: "number", label: "Contains a number" },
                      { key: "letter", label: "Contains a letter" },
                    ].map(({ key, label }) => (
                      <p
                        key={key}
                        className={`transition-colors ${
                          passwordChecks[key as keyof typeof passwordChecks]
                            ? "text-green-400"
                            : "text-gray-500"
                        }`}
                      >
                        {passwordChecks[key as keyof typeof passwordChecks]
                          ? "✓"
                          : "•"}{" "}
                        {label}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <SecondaryBtn onClick={() => setStep(2)}>Back</SecondaryBtn>
                    <Btn
                      onClick={handleRegister}
                      loading={loading}
                      disabled={!passwordValid}
                    >
                      Create Account
                    </Btn>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing you agree to StockLINK&apos;s terms of service
        </p>
      </motion.div>
    </main>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Input({
  icon,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <div className="flex items-center bg-black/40 border border-gray-800 rounded-lg px-3 focus-within:border-green-500 transition-colors">
      <span className="text-gray-500 pr-2 shrink-0">{icon}</span>
      <input
        {...props}
        className={`w-full bg-transparent py-3 outline-none text-sm placeholder-gray-600 ${className}`}
      />
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  show,
  onToggle,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center bg-black/40 border border-gray-800 rounded-lg px-3 focus-within:border-green-500 transition-colors">
      <span className="text-gray-500 pr-2 shrink-0">
        <Lock size={16} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent py-3 outline-none text-sm placeholder-gray-600"
      />
      <button
        type="button"
        onClick={onToggle}
        className="text-gray-400 hover:text-white transition-colors shrink-0"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function Btn({
  children,
  loading = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex-1 w-full py-3 bg-green-500 hover:bg-green-400 active:scale-95 rounded-xl font-semibold text-sm transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

function SecondaryBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-3 border border-gray-700 hover:border-gray-500 rounded-xl text-gray-400 hover:text-white text-sm transition-colors duration-150"
    >
      {children}
    </button>
  );
}
