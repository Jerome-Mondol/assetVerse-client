import React from "react";

const stats = [
  { label: "Assets Managed", value: "1,200+" },
  { label: "Active Companies", value: "85" },
  { label: "Employees Served", value: "3,400+" },
  { label: "Uptime", value: "99.99%" },
];

const Statistics = () => (
  <section className="py-16 bg-blue-50">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Platform Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Statistics;
