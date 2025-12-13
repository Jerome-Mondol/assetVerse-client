import React, { useEffect, useState } from 'react'
import { fetchPricingPackages } from '../api/pricingAPI'
import { FaCheck, FaCrown } from 'react-icons/fa'

const Pricing = () => {
    const [packages, setPackages] = useState([])

    useEffect(() => {
        fetchPricingPackages().then(data => data && setPackages(data))
    }, [])

    return (
        <div className="h-auto bg-gray-50 py-12 px-4 text-gray-700">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">Pricing Plans</h1>
                <p className="text-gray-600">Choose the right plan for your team</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
                {packages.map((plan) => (
                    <div key={plan._id} className="bg-white rounded-xl shadow p-6">
                        {plan.name === 'Standard' && (
                            <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                                Most Popular
                            </div>
                        )}
                        
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold mb-2">${plan.price}<span className="text-gray-500 text-lg">/month</span></div>
                        <p className="text-gray-500 mb-4">Up to {plan.employeeLimit} employees</p>
                        
                        <button className={`w-full py-2 rounded-lg mb-6 ${plan.name === 'Standard' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                            {plan.name === 'Basic' ? 'Get Started' : 'Start Trial'}
                        </button>
                        
                        <div className="space-y-2">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center">
                                    <FaCheck className="text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pricing