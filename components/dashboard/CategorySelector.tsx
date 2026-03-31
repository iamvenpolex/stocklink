"use client";

type Props = {
  selected: string;
  setSelected: (val: string) => void;
};

const categories = [
  { name: "Clothing", example: "e.g. Dresses", emoji: "👗" },
  { name: "Clothing Bales", example: "e.g. Bulk clothes", emoji: "📦" },
  { name: "Shoes", example: "e.g. Sneakers", emoji: "👟" },
  { name: "Bags", example: "e.g. Handbags", emoji: "👜" },
  { name: "Bedding", example: "e.g. Bedsheets", emoji: "🛏️" },
  { name: "Beauty", example: "e.g. Wigs", emoji: "💄" },
  { name: "Baby", example: "e.g. Toys", emoji: "🧸" },
  { name: "Food", example: "e.g. Snacks", emoji: "🛒" },
  { name: "Household", example: "e.g. Buckets", emoji: "🧹" },
  { name: "Electronics", example: "e.g. Phones", emoji: "📱" },
  { name: "Fabric", example: "e.g. Ankara", emoji: "🧵" },
];

export default function CategorySelector({ selected, setSelected }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Categories</h2>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelected(cat.name)}
            className={`
              p-3 rounded-xl border text-xs flex flex-col items-center text-center transition
              ${
                selected === cat.name
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white/5 border-gray-800 hover:border-green-500"
              }
            `}
          >
            <span className="text-lg">{cat.emoji}</span>
            <span className="mt-1 font-medium">{cat.name}</span>
            <span className="text-[10px] text-gray-400">{cat.example}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
