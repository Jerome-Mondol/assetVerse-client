import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setEmail("");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Subscribe to our Newsletter</h2>
        <p className="mb-6 text-gray-600">Get the latest updates, tips, and exclusive offers from AssetVerse.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            placeholder="Your email address"
            className="input input-bordered w-full sm:w-auto"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-6">Subscribe</button>
        </form>
        {submitted && <div className="mt-3 text-green-600 font-medium">Thank you for subscribing!</div>}
      </div>
    </section>
  );
};

export default Newsletter;
