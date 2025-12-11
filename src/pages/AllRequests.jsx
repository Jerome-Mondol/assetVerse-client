import React, { useEffect, useState } from 'react';
import { acceptRequest, getAllRequestOfAHR } from '../api/requestAPI';
import { useAuth } from '../context/AuthContext';

const AllRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRequests = async () => {
            if(user) {
                setLoading(true);
                try {
                    const requestData = await getAllRequestOfAHR(user.email);
                    if(requestData) setRequests(requestData);
                } catch (error) {
                    console.error("Error fetching requests:", error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchRequests();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>All Requests</h1>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">No requests found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Asset</th>
                                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Requested By</th>
                                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Date</th>
                                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Status</th>
                                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {requests.map((request, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-blue-600 font-semibold">
                                                            {request.assetType?.charAt(0) || 'A'}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {request.assetName || 'Unnamed Asset'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {request.assetType || 'No type specified'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-gray-900">{user?.name || user?.email}</div>
                                                <div className="text-sm text-gray-500">Employee</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-gray-900">
                                                    {new Date().toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                    {request.requestStatus}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex space-x-2">
                                                    {
                                                        request.requestStatus !== "approved" ?
                                                        <>
                                                        <button 
                                                    onClick={async (e) => {
                                                        // e.preventDefault();
                                                        const response = await acceptRequest(request._id);
                                                        if(response) console.log(response) 
                                                    }}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button 
                                                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                                                    >
                                                        Reject
                                                    </button>
                                                    </>
                                                    :
                                                    <>
                                                    <h1 className='text-gray-800 font-medium text-sm' >Decision Already Given</h1>
                                                    </>
                                                    }
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                    Showing {requests.length} request{requests.length !== 1 ? 's' : ''}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllRequests;