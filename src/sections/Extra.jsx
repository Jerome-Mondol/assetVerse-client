import React, { useState } from 'react';
import { ChevronDown, ChevronUp} from 'lucide-react';

const Extra = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const steps = [
        {
            number: "1",
            title: "Setup",
            description: "HR registers company, employees create accounts"
        },
        {
            number: "2",
            title: "Configure",
            description: "Add assets and set up assignment workflows"
        },
        {
            number: "3",
            title: "Manage",
            description: "Track assets and generate reports"
        }
    ];

    const faqs = [
        { 
            q: "Is there a free trial?", 
            a: "Yes, 30-day free trial with all features." 
        },
        { 
            q: "Can we cancel anytime?", 
            a: "Yes, no long-term contracts." 
        },
        { 
            q: "Do you offer training?", 
            a: "Free onboarding and documentation included." 
        }
    ];

    return (
        <div className="py-20 bg-white text-gray-800">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-6">{step.number}</div>
                                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b pb-4">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center"
                                >
                                    <span className="font-semibold text-left">{faq.q}</span>
                                    {openFaq === i ? <ChevronUp /> : <ChevronDown />}
                                </button>
                                {openFaq === i && (
                                    <p className="mt-2 text-gray-600">{faq.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                    <p className="mb-8">Schedule a demo or start your free trial today</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">Start Free Trial</button>
                        <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold">Contact Sales</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Extra;