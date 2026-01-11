import React from "react";

const highlights = [
  {
    icon: "📦",
    title: "Instant Asset Assignment",
    desc: "Assign assets to employees in seconds with our streamlined workflow.",
  },
  {
    icon: "🔒",
    title: "Secure & Reliable",
    desc: "Your data is protected with enterprise-grade security and 99.99% uptime.",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    desc: "Track asset usage and generate insightful reports instantly.",
  },
];

const Highlights = () => (
  <section className="py-16 bg-blue-50">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Why Choose AssetVerse?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {highlights.map((h, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-4xl mb-3">{h.icon}</div>
            <div className="text-lg font-semibold mb-2 text-blue-700">{h.title}</div>
            <div className="text-gray-600 text-center">{h.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Highlights;
