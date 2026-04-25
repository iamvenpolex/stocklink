"use client";

type Props = {
  selected: string;
  setSelected: (val: string) => void;
};

const categoryRows = [
  [
    { name: "Clothing & Fashion", emoji: "👗" },
    { name: "Beauty & Hair", emoji: "💄" },
    { name: "Cellphone Accessories", emoji: "📱" },
    { name: "Bulk Foods", emoji: "🛒" },
  ],
  [
    { name: "Home & Kitchen", emoji: "🏠" },
    { name: "Footwear", emoji: "👟" },
    { name: "Baby Products", emoji: "🧸" },
    { name: "Electronics", emoji: "📺" },
  ],
  [
    { name: "Cleaning Products", emoji: "🧼" },
    { name: "Hardware & DIY", emoji: "🔧" },
    { name: "Car Accessories", emoji: "🚗" },
    { name: "Fabric & Tesxtiles", emoji: "🧵" },
  ],
];

export default function CategorySelector({ selected, setSelected }: Props) {
  const isAll = selected === "All";

  return (
    <div className="w-full space-y-3">
      {/* TITLE */}
      <h2 className="text-sm font-semibold text-white">Categories</h2>

      {/* ALL BUTTON */}
      <button
        onClick={() => setSelected("All")}
        className={`
          w-full flex items-center justify-center gap-2
          py-2 rounded-lg border text-xs transition

          ${
            isAll
              ? "bg-green-500 text-white border-green-500"
              : "bg-white/5 text-gray-300 border-gray-800"
          }
        `}
      >
        🌍 All Categories
      </button>

      {/* CATEGORY ROWS (NO SCROLL - WRAPS LIKE GRID) */}
      <div className="space-y-3">
        {categoryRows.map((row, i) => (
          <div
            key={i}
            className="
              grid grid-cols-2 sm:grid-cols-4 gap-2
            "
          >
            {row.map((cat) => {
              const active = selected === cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => setSelected(cat.name)}
                  className={`
                    flex items-center justify-center gap-2
                    py-2 px-2 rounded-lg border text-xs
                    transition-all duration-200 text-center

                    ${
                      active
                        ? "bg-green-500 text-white border-green-500 shadow-md"
                        : "bg-white/5 text-gray-300 border-gray-800 hover:border-green-500"
                    }
                  `}
                >
                  <span>{cat.emoji}</span>
                  <span className="truncate">{cat.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
