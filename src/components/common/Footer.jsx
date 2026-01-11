import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 text-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">AssetVerse</h3>
                        <p className="text-gray-400 text-sm">
                            Enterprise asset management for modern organizations.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="https://twitter.com/assetverse" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-blue-500 hover:underline">Twitter</a>
                            <a href="https://linkedin.com/company/assetverse" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-700 hover:underline">LinkedIn</a>
                            <a href="https://facebook.com/assetverse" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-blue-600 hover:underline">Facebook</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/features">Features</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                            <li><Link to="/security">Security</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/privacy">Privacy</Link></li>
                            <li><Link to="/terms">Terms</Link></li>
                            <li><Link to="/cookies">Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {currentYear} AssetVerse Inc.
                        </div>
                        <div className="text-gray-500 text-sm">
                            <a href="mailto:support@assetverse.com" className="hover:underline">support@assetverse.com</a> &bull; <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a> &bull; 123 Business Street, New York, NY 10001
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;