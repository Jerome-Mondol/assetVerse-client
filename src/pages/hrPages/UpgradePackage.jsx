import React, { useEffect, useState } from 'react';
import { FaCrown, FaCheck, FaArrowRight, FaUsers, FaChartLine, FaStar } from 'react-icons/fa';
import { fetchPricingPackages } from '../../api/pricingAPI.js';
import { secureAxios } from '../../config/axios.js';

const UpgradePackage = () => {
    const [packages, setPackages] = useState([]);
    const [currentPlan] = useState('Basic');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await fetchPricingPackages();
                if (data) setPackages(data);
            } catch (err) {
                console.error('Failed to fetch packages:', err);
            }
        };
        fetchPackages();
    }, []);

    const handleUpgrade = async (packageId) => {
        try {
            const res = await secureAxios.post('/stripe/create-checkout-session', { packageId });
            if (res?.data?.url) {
                window.location.href = res.data.url; // redirect to Stripe checkout
            } else {
                console.log('No checkout URL returned:', res);
            }
        } catch (err) {
            console.error('Upgrade failed:', err);
        }
    };

    if (packages.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 text-gray-700">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade Package</h1>
                <p className="text-gray-600">Upgrade your plan to add more employees and access premium features</p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 border border-blue-200">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Current Plan: <span className="text-blue-600">{currentPlan}</span>
                        </h2>
                        <p className="text-gray-600">You're on the free plan</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">$0/month</div>
                        <div className="text-gray-600">Free forever</div>
                    </div>
                </div>
            </div>

            {/* Upgrade Plans */}
            <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {packages.map((plan) => (
                    <div
                        key={plan._id}
                        className={`bg-white rounded-xl shadow p-6 border-2 ${
                            plan.name === 'Standard' ? 'border-green-500' : 'border-gray-200'
                        } ${plan.name === currentPlan ? 'opacity-80' : ''}`}
                    >
                        {plan.name === 'Standard' && (
                            <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full inline-flex items-center mb-4">
                                <FaStar className="mr-1" /> Most Popular
                            </div>
                        )}
                        {plan.name === currentPlan && (
                            <div className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                                Current Plan
                            </div>
                        )}

                        <div className="flex items-center mb-4">
                            {plan.name === 'Standard' && <FaChartLine className="text-green-500 text-2xl mr-3" />}
                            {plan.name === 'Premium' && <FaCrown className="text-purple-500 text-2xl mr-3" />}
                            {plan.name === 'Basic' && <FaUsers className="text-blue-500 text-2xl mr-3" />}
                            <h3 className="text-xl font-bold">{plan.name}</h3>
                        </div>

                        <div className="mb-4">
                            <div className="text-3xl font-bold mb-1">
                                ${plan.price}
                                <span className="text-gray-500 text-lg">/month</span>
                            </div>
                            <p className="text-gray-600">Up to {plan.employeeLimit} employees</p>
                        </div>

                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center">
                                    <FaCheck className="text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => 
                                {
                                    handleUpgrade(plan._id);
                                    console.log(plan._id)
                                }
                            }
                            className={`w-full py-3 rounded-lg font-semibold ${
                                plan.name === currentPlan
                                    ? 'bg-gray-300 text-gray-600'
                                    : plan.name === 'Standard'
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white transition-colors`}
                            disabled={plan.name === currentPlan}
                        >
                            {plan.name === currentPlan
                                ? 'Current Plan'
                                : plan.name === 'Basic'
                                ? 'Downgrade'
                                : 'Upgrade Now'}
                            {plan.name !== currentPlan && <FaArrowRight className="inline ml-2" />}
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment History (Placeholder) */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Payment History</h2>
                <div className="text-center py-8 text-gray-500">
                    <p>No payment history yet</p>
                    <p className="text-sm mt-2">Your payment records will appear here after upgrading</p>
                </div>
            </div>
        </div>
    );
};

export default UpgradePackage;
