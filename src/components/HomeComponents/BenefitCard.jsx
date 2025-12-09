import React from 'react'

const BenefitCard = ({ index, title, description }) => {
    return (
        <>
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {title}
                </h3>
                <p className="text-gray-600">
                    {description}
                </p>
            </div>
        </>
    )
}

export default BenefitCard
