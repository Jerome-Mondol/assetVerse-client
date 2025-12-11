import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../api/userAPI.js';
import { getAssetsOfEmployee } from '../../api/assetAPI.js';
import Swal from 'sweetalert2';

const MyAssets = () => {
  const [assetList, setAssetList] = useState([]);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const assetResponse = await getAssetsOfEmployee(user.email);
          if (user) {
            const userResponse = await getUser(user.email);
            setUserRole(userResponse.role);
          }
          setAssetList(assetResponse || []);
          setFilteredAssets(assetResponse || []);
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'Failed to load assets', 'error');
        }
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    let result = assetList;

    if (searchTerm) {
      result = result.filter(item => 
        item.assetName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      result = result.filter(item => 
        item.assetType?.toLowerCase() === filterType.toLowerCase()
      );
    }

    setFilteredAssets(result);
  }, [searchTerm, filterType, assetList]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-700">
      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Assets</h1>
        
        <div className="flex gap-4 mb-6 ">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search asset name..."
              className="input input-bordered w-full bg-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="select select-bordered bg-gray-200"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>
        
        {filteredAssets.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg">
            <p className="text-gray-500">
              {assetList.length === 0 ? 'No assets found' : 'No matching assets'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full mx-auto">
                <thead>
                  <tr className="bg-gray-50 text-gray-900">
                    <th className="py-3 px-4 text-left">Asset</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Company</th>
                    <th className="py-3 px-4 text-left">Request Date</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {asset.assetImage ? (
                            <div className="avatar">
                              <div className="rounded-lg w-12 h-12">
                                <img src={asset.assetImage} alt={asset.assetName} />
                              </div>
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-bold">
                                {asset.assetName?.charAt(0) || 'A'}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{asset.assetName}</div>
                            <div className="text-sm text-gray-500">
                              ID: {asset._id?.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge ${
                          asset.assetType?.toLowerCase() === 'returnable' 
                            ? 'badge-success' 
                            : 'badge-warning'
                        }`}>
                          {asset.assetType || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{asset.companyName}</div>
                      </td>
                      <td className="py-4 px-4">
                        {formatDate(asset.requestDate || asset.assignmentDate)}
                      </td>
                      <td className="py-4 px-4">
                        {asset.assetType?.toLowerCase() === 'returnable' && 
                         asset.status?.toLowerCase() === 'assigned' ? (
                          <button
                            className="btn btn-error btn-sm"
                            onClick={async () => {
                              const should = window.confirm('Return this item?');
                              if (!should) return;
                              try {
                                // call return endpoint
                                await (await import('../../api/assignedAPI')).returnAssignedAsset(asset._id);
                                // update local state
                                setAssetList(prev => prev.map(a => a._id === asset._id ? { ...a, status: 'returned', returnDate: new Date().toISOString() } : a));
                                setFilteredAssets(prev => prev.map(a => a._id === asset._id ? { ...a, status: 'returned', returnDate: new Date().toISOString() } : a));
                              } catch (err) {
                                console.error(err);
                                Swal.fire('Error', 'Failed to process return', 'error');
                              }
                            }}
                          >
                            Return
                          </button>
                        ) : (
                          <span className="badge badge-info">
                            {asset.status || 'Assigned'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-sm text-gray-600">
                Showing {filteredAssets.length} of {assetList.length} assets
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssets;