import React from "react";

const Contact = () => (
  <div className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h1>
    <p className="mb-4 text-gray-700">Have questions or need support? Reach out to our team!</p>
    <ul className="mb-4 text-gray-700">
      <li>Email: <a href="mailto:support@assetverse.com" className="text-blue-600 underline">support@assetverse.com</a></li>
      <li>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+1 (234) 567-890</a></li>
      <li>Address: 123 Business Street, New York, NY 10001</li>
    </ul>
    <div className="flex gap-4 mt-6">
      <a href="https://twitter.com/assetverse" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Twitter</a>
      <a href="https://linkedin.com/company/assetverse" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
      <a href="https://facebook.com/assetverse" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
    </div>
  </div>
);

export default Contact;
