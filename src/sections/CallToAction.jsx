import React from "react";
import { Link } from "react-router";

const CallToAction = () => (
  <section className="py-16 text-center">
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to streamline your asset management?</h2>
      <p className="mb-6 text-lg text-gray-700">Join AssetVerse today and empower your team with seamless asset tracking, assignment, and reporting.</p>
      <Link to="/join-as-hr-manager" className="btn btn-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-100 transition">Get Started</Link>
    </div>
  </section>
);

export default CallToAction;
