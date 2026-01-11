import React from "react";

const posts = [
  {
    title: "5 Tips for Efficient Asset Management",
    excerpt: "Discover best practices to keep your company's assets organized and maximize ROI.",
    date: "2026-01-01",
    author: "AssetVerse Team",
  },
  {
    title: "How to Onboard Employees with the Right Tools",
    excerpt: "A smooth onboarding process starts with the right assets. Learn how to set your team up for success.",
    date: "2025-12-15",
    author: "AssetVerse Team",
  },
  {
    title: "The Future of Digital Asset Tracking",
    excerpt: "Explore the latest trends and technologies shaping asset management in 2026 and beyond.",
    date: "2025-11-30",
    author: "AssetVerse Insights",
  },
];

const Blog = () => (
  <section className="py-16 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">From Our Blog</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-blue-50 rounded-lg shadow p-6 flex flex-col">
            <div className="text-lg font-semibold mb-2 text-blue-700">{post.title}</div>
            <div className="text-gray-600 mb-4 flex-1">{post.excerpt}</div>
            <div className="text-xs text-gray-500 mt-auto">{post.date} &middot; {post.author}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
