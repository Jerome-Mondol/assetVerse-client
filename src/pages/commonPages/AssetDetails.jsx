import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getSpecificAsset } from '../../api/assetAPI'
import { useParams, useNavigate } from 'react-router'
import { sendRequest } from '../../api/requestAPI'

const AssetDetails = () => {
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const [asset, setAsset] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reviews, setReviews] = useState([
        {
            user: 'Jane Doe',
            rating: 5,
            comment: 'Excellent asset, very useful!',
            date: '2025-12-01'
        },
        {
            user: 'John Smith',
            rating: 4,
            comment: 'Works as expected, good support.',
            date: '2025-11-20'
        }
    ]);
    const [relatedAssets, setRelatedAssets] = useState([
        {
            id: 'rel1',
            name: 'Dell Laptop',
            image: '/assets/laptop.png',
            type: 'Electronic'
        },
        {
            id: 'rel2',
            name: 'Office Chair',
            image: '/assets/chair.png',
            type: 'Furniture'
        }
    ]);

    useEffect(() => {
        const fetchAsset = async () => {
            try {
                setLoading(true)
                const requestedAsset = await getSpecificAsset(id)
                if (requestedAsset) {
                    setAsset(requestedAsset)
                } else {
                    setError("Asset not found")
                }
            } catch (err) {
                console.error("Error fetching asset:", err)
                setError("Failed to load asset details")
            } finally {
                setLoading(false)
            }
        }
        fetchAsset()
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!asset) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-700 text-xl">{error || "Asset not found"}</p>
            </div>
        )
    }

    // Extract values here safely
    const {
        productName,
        productImage,
        productType,
        productQuantity,
        availableQuantity,
        dateAdded,
        hrEmail,
        companyName,
        productDescription,
        productGallery
    } = asset

    const isAvailable = availableQuantity > 0
    const formattedDate = new Date(dateAdded).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return (
        <div className="min-h-screen bg-white p-6 text-gray-800">
            <div className="max-w-6xl mx-auto">
                {/* Removed search/filter/sort controls for details page */}

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-8"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Assets
                </button>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-start gap-8">
                            {/* Gallery: show multiple images if available */}
                            <div className="shrink-0">
                                <div className="w-64 h-64 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-4">
                                    {productGallery && productGallery.length > 1 ? (
                                        <div className="flex gap-2 overflow-x-auto w-full h-full">
                                            {productGallery.map((img, idx) => (
                                                <img key={idx} src={img} alt={productName + ' ' + (idx+1)} className="object-cover w-40 h-64 rounded-lg" />
                                            ))}
                                        </div>
                                    ) : productImage && productImage !== "N/A" ? (
                                        <img
                                            src={productImage}
                                            alt={productName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-gray-400">
                                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <h1 className="text-3xl font-bold text-gray-900">{productName}</h1>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                {isAvailable ? "Available" : "Unavailable"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                {productType}
                                            </span>
                                            <span className="text-gray-600">• {companyName}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description/Overview */}
                                {productDescription && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                        <p className="text-gray-700">{productDescription}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Total Quantity</p>
                                        <p className="text-2xl font-bold text-gray-900">{productQuantity}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Available Now</p>
                                        <p className="text-2xl font-bold text-gray-900">{availableQuantity}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">In Use</p>
                                        <p className="text-2xl font-bold text-gray-900">{productQuantity - availableQuantity}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Utilization</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {productQuantity > 0 ? Math.round(((productQuantity - availableQuantity) / productQuantity) * 100) : 0}%
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Asset Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-600">Added Date</span>
                                                <span className="font-medium">{formattedDate}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-600">Asset ID</span>
                                                <span className="font-medium text-sm">{id}</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Asset Type</span>
                                                <span className="font-medium">{productType}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-600">Company</span>
                                                <span className="font-medium">{companyName}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-600">HR Contact</span>
                                                <span className="font-medium">{hrEmail}</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-gray-600">Status</span>
                                                <span className={`font-medium ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                                                    {isAvailable ? "Ready to Assign" : "Fully Assigned"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {user && (
                                    <div className="mt-8 flex gap-4">
                                        <button
                                            onClick={async (e) => {
                                                e.preventDefault()
                                                const request = await sendRequest(id)
                                                console.log(request)
                                            }}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                                        >
                                            Request This Asset
                                        </button>
                                        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                                            Add to Watchlist
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews/Ratings */}
                <div className="mt-10 bg-white rounded-xl shadow p-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Reviews & Ratings</h3>
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review, idx) => (
                                <div key={idx} className="border-b pb-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-gray-800">{review.user}</span>
                                        <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                        <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Related Items */}
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Related Items</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedAssets.map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mb-2" />
                                <div className="font-semibold text-gray-800 mb-1">{item.name}</div>
                                <div className="text-xs text-blue-600 mb-2">{item.type}</div>
                                <button className="btn btn-primary btn-sm">View Details</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? Contact {hrEmail} for assistance with this asset.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AssetDetails
