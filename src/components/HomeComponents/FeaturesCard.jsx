import React from 'react'

const FeaturesCard = ({ icon, title, description }) => {
    return (
        <>
            <div className="flex-shrink-0">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm">
                    {description}
                </p>
            </div>
        </>
    )
}

export default FeaturesCard
