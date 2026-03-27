"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Store, Home, Tag, LogIn, HelpCircle } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="relative z-50 border-b border-gray-800 bg-black/40 backdrop-blur-md text-white">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          Stock<span className="text-green-400">LINK</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <button
            onClick={() => scrollTo("features")}
            className="hover:text-white flex items-center gap-1"
          >
            <Home size={16} /> Features
          </button>

          <a
            href="/marketplace"
            className="hover:text-white flex items-center gap-1"
          >
            <Store size={16} /> Marketplace
          </a>

          <button
            onClick={() => scrollTo("pricing")}
            className="hover:text-white flex items-center gap-1"
          >
            <Tag size={16} /> Pricing
          </button>

          <button
            onClick={() => scrollTo("faq")}
            className="hover:text-white flex items-center gap-1"
          >
            <HelpCircle size={16} /> FAQ
          </button>

          <a href="/auth" className="hover:text-white flex items-center gap-1">
            <LogIn size={16} /> Sign In
          </a>
        </nav>

        {/* Desktop CTA */}
        <a href="/auth">
          <button className="hidden md:block px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium">
            Get Started
          </button>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border border-gray-700"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-800 bg-black/80 backdrop-blur-md"
          >
            <div className="flex flex-col px-6 py-4 gap-4 text-gray-300">
              <button
                onClick={() => scrollTo("features")}
                className="flex items-center gap-2 hover:text-white"
              >
                <Home size={18} /> Features
              </button>

              <a
                href="/marketplace"
                className="flex items-center gap-2 hover:text-white"
              >
                <Store size={18} /> Marketplace
              </a>

              <button
                onClick={() => scrollTo("pricing")}
                className="flex items-center gap-2 hover:text-white"
              >
                <Tag size={18} /> Pricing
              </button>

              <button
                onClick={() => scrollTo("faq")}
                className="flex items-center gap-2 hover:text-white"
              >
                <HelpCircle size={18} /> FAQ
              </button>

              <a href="/auth">
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium">
                  Get Started
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
