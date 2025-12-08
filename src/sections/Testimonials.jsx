import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Shield, Users, CheckCircle } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Cut our asset management costs by 40% in the first quarter.",
            author: "Alex Turner, FinTech Inc."
        },
        {
            quote: "Implementation was seamless and support has been outstanding.",
            author: "Maria Garcia, HealthCorp"
        },
        {
            quote: "The analytics dashboard alone justifies the investment.",
            author: "James Wilson, EduTech Solutions"
        }
    ];

    const tags = ["GDPR Compliant", "SOC 2 Certified", "ISO 27001", "HIPAA Ready"];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Customer Feedback</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border-l-4 border-blue-500 pl-6 py-4"
                            >
                                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                                <div className="text-gray-900 font-medium">{testimonial.author}</div>
                                <div className="flex mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100 rounded-xl p-8">
                    <div className="text-center mb-8">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 ">Enterprise Standards</h4>
                        <p className="text-gray-600">Built with security and compliance at the core</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {tags.map((badge, index) => (
                            <div key={index} className="flex items-center bg-white px-4 py-2 rounded-lg border">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-sm font-medium text-gray-600">{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;