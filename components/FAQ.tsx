"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is StockLINK?",
    answer:
      "StockLINK is a B2B marketplace that connects suppliers and resellers. You can browse products, contact sellers, and grow your business easily.",
  },
  {
    question: "Do I need to pay to use StockLINK?",
    answer:
      "No. You can browse and use the platform for free. Sellers only pay when they choose to promote their products for more visibility.",
  },
  {
    question: "How do I become a seller?",
    answer:
      "Click on Get Started, create a seller account, and access your dashboard to upload and manage your products.",
  },
  {
    question: "How do buyers contact sellers?",
    answer:
      "Buyers can view product details and directly contact sellers using the contact options provided on each listing.",
  },
  {
    question: "How does product promotion work?",
    answer:
      "Sellers can promote their products for a selected number of days. Promoted products appear higher in the marketplace, increasing visibility and sales chances.",
  },
  {
    question: "Are the suppliers verified?",
    answer:
      "We encourage transparency and trust. While suppliers manage their own listings, buyers can review profiles, ratings, and product history before making decisions.",
  },
  {
    question: "Can I sell any type of product?",
    answer:
      "You can sell a wide range of products including clothing, electronics, food items, and more — as long as they comply with marketplace guidelines.",
  },
  {
    question: "How do I get more customers?",
    answer:
      "You can boost your visibility by promoting your products, uploading clear images, adding detailed descriptions, and maintaining good customer reviews.",
  },
  {
    question: "Is StockLINK available 24/7?",
    answer:
      "Yes. You can access the marketplace anytime, browse products, and manage your business whenever you want.",
  },
  {
    question: "What happens if my product is out of stock?",
    answer:
      "If your stock reaches 0, your product will be marked as 'Sold Out'. To keep it visible, ensure your stock quantity is updated.",
  },
  {
    question: "Can I edit my product after posting?",
    answer:
      "Yes. You can update product details, prices, images, and stock anytime from your seller dashboard.",
  },
  {
    question: "How do I build trust as a seller?",
    answer:
      "Use clear product images, accurate descriptions, fast response times, and maintain good reviews from buyers.",
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
              className="border border-gray-800 rounded-xl overflow-hidden bg-white/5 hover:border-green-500 transition"
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium">{item.question}</span>

                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180 text-green-400" : ""
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
