"use client";

import { useState } from "react";

type Review = {
  id: string;
  product: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      product: "Ankara Gown",
      customer: "Sarah M.",
      rating: 5,
      comment: "Very high quality, I love it!",
      date: "2026-04-01",
    },
    {
      id: "2",
      product: "Sneakers",
      customer: "John D.",
      rating: 4,
      comment: "Good but size runs small.",
      date: "2026-04-02",
    },
  ]);

  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleReply = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, reply: replyText[id] } : r)),
    );
  };

  return (
    <main className="p-3 text-white space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-gray-400 text-sm">
          See what buyers are saying about your products
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white/5 border border-gray-800 rounded-xl p-4 space-y-3"
          >
            {/* Top */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{review.product}</p>
                <p className="text-xs text-gray-400">
                  {review.customer} • {review.date}
                </p>
              </div>

              {/* Stars */}
              <div className="text-yellow-400 text-sm">
                {"⭐".repeat(review.rating)}
              </div>
            </div>

            {/* Comment */}
            <p className="text-sm text-gray-300">{review.comment}</p>

            {/* Reply Section */}
            {review.reply ? (
              <div className="bg-black/40 border border-gray-800 rounded-lg p-3 text-sm">
                <span className="text-green-400 font-medium">Your reply:</span>{" "}
                {review.reply}
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  placeholder="Reply to customer..."
                  value={replyText[review.id] || ""}
                  onChange={(e) =>
                    setReplyText({
                      ...replyText,
                      [review.id]: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-black/40 border border-gray-800 rounded-lg text-sm"
                />

                <button
                  onClick={() => handleReply(review.id)}
                  className="px-4 py-2 bg-green-500 rounded-lg text-sm"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="text-center text-gray-400 py-20">No reviews yet</div>
      )}
    </main>
  );
}
