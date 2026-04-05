"use client";

export default function AnalyticsPage() {
  const stats = [
    {
      label: "Revenue",
      value: "R12,450",
      change: "+12%",
      positive: true,
    },
    {
      label: "Orders",
      value: "58",
      change: "+8%",
      positive: true,
    },
    {
      label: "Customers",
      value: "32",
      change: "-3%",
      positive: false,
    },
    {
      label: "Conversion",
      value: "4.5%",
      change: "+1.2%",
      positive: true,
    },
  ];

  const weeklyOrders = [5, 8, 6, 10, 7, 12, 9];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const topProducts = [
    { name: "Ankara Gown", sales: 1200, percent: 80 },
    { name: "Sneakers", sales: 850, percent: 60 },
    { name: "Hair Bundles", sales: 640, percent: 45 },
  ];

  return (
    <main className="p-3 text-white space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-nowrap font-bold">
          Track Your Business Performance
        </h1>
        <p className="text-gray-400 text-sm"></p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 border border-gray-800 rounded-xl p-4"
          >
            <p className="text-gray-400 text-sm">{stat.label}</p>

            <h2 className="text-xl font-bold mt-1">{stat.value}</h2>

            <p
              className={`text-xs mt-1 ${
                stat.positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {stat.change} this week
            </p>
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* CHART */}
        <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Weekly Orders</h2>

          <div className="flex items-end justify-between h-44 gap-2">
            {weeklyOrders.map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full">
                <div
                  className="w-full bg-green-500 rounded-t-md transition-all duration-300"
                  style={{ height: `${value * 10}px` }}
                />

                <span className="text-xs text-gray-400">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Top Products</h2>

          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm">
                  <span>{product.name}</span>
                  <span className="text-green-400">R{product.sales}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-800 rounded mt-2">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: `${product.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXTRA INSIGHTS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Best Day</p>
          <h2 className="text-lg font-bold mt-1">Saturday</h2>
        </div>

        <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Avg Order Value</p>
          <h2 className="text-lg font-bold mt-1">R215</h2>
        </div>

        <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Returning Customers</p>
          <h2 className="text-lg font-bold mt-1">42%</h2>
        </div>
      </div>
    </main>
  );
}
