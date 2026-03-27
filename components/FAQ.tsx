"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is StockLINK?",
    answer:
      "StockLINK is a B2B marketplace that connects suppliers and resellers to buy and sell products easily.",
  },
  {
    question: "How do I become a seller?",
    answer:
      "Click on Get Started, create a seller account, and access your dashboard to list your products.",
  },
  {
    question: "Is there a subscription fee?",
    answer:
      "Yes, sellers can choose from monthly subscription plans depending on their business needs.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are securely processed and released after successful transactions between buyers and sellers.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 px-6 bg-black text-white">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[140px] rounded-full top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full bottom-[-120px] right-[-120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Frequently Asked <span className="text-green-400">Questions</span>
        </h2>

        <p className="text-gray-400 text-center mt-3">
          Everything you need to know about StockLINK
        </p>

        {/* FAQ Items */}
        <div className="mt-12 space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-xl overflow-hidden bg-white/5"
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium">{item.question}</span>

                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-4 text-gray-400 text-sm"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
