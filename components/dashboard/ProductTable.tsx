"use client";

const products = [
  {
    name: "Ankara Dress",
    category: "Clothing",
    price: "R300",
    status: "Active",
  },
  {
    name: "Leather Bag",
    category: "Accessories",
    price: "R200",
    status: "Active",
  },
];

export default function ProductTable() {
  return (
    <div className="bg-white/5 border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Your Products</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-gray-500 border-b border-gray-800">
            <tr>
              <th className="py-2">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="py-3 text-white">{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td className="text-green-400">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
