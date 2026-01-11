import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../api/userAPI.js';
import { getAssetsOfEmployee } from '../../api/assetAPI.js';

const MyAssets = () => {
  const [assetList, setAssetList] = useState([]);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
          console.log(err);
        } finally {
          setLoading(false);
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

    // Sorting
    result = [...result].sort((a, b) => {
      let aValue, bValue;
      if (sortBy === 'name') {
        aValue = a.assetName?.toLowerCase() || '';
        bValue = b.assetName?.toLowerCase() || '';
      } else if (sortBy === 'type') {
        aValue = a.assetType?.toLowerCase() || '';
        bValue = b.assetType?.toLowerCase() || '';
      } else if (sortBy === 'date') {
        aValue = new Date(a.requestDate || a.assignmentDate);
        bValue = new Date(b.requestDate || b.assignmentDate);
      }
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredAssets(result);
  }, [searchTerm, filterType, sortBy, sortOrder, assetList]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-700">
      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Assets</h1>
        
        <div className="flex gap-4 mb-6">
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
          <select
            className="select select-bordered bg-gray-200"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
            <option value="date">Sort by Date</option>
          </select>
          <select
            className="select select-bordered bg-gray-200"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse mb-4" />
            ))}
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="bg-white p-8 rounded text-center text-gray-500">
            <p>
              {assetList.length === 0 ? 'No assets found' : 'No matching assets'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-gray-100">
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
                          <button className="btn btn-error btn-sm">
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