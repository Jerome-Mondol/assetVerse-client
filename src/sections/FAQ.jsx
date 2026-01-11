import React, { useState } from "react";

const faqs = [
  {
    q: "How do I assign an asset to an employee?",
    a: "HR managers can assign assets directly from the Employee List page using the Assign button.",
  },
  {
    q: "Can employees request new assets?",
    a: "Yes, employees can request assets from the Request Asset page, subject to HR approval.",
  },
  {
    q: "Is there a limit to the number of assets per employee?",
    a: "Limits depend on your subscription package. See the Pricing section for details.",
  },
  {
    q: "How do I upgrade my package?",
    a: "HR managers can upgrade from the Upgrade Package page in their dashboard.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <button
                className="w-full text-left font-semibold text-blue-700 focus:outline-none"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                {faq.q}
              </button>
              {open === idx && (
                <div className="mt-2 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
