import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../api/userAPI';
import { getAssetsOfEmployee } from '../../api/assetAPI';
import { returnAssignedAsset } from '../../api/assignedAPI';
import Swal from 'sweetalert2';

const MyAssets = () => {
  const { user } = useAuth();

  const [assetList, setAssetList] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // fetch assets
  useEffect(() => {
    if (!user) return;

    const fetchAssets = async () => {
      try {
        const assets = await getAssetsOfEmployee(user.email);
        setAssetList(assets || []);
        setFilteredAssets(assets || []);
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to load assets', 'error');
      }
    };

    fetchAssets();
  }, [user]);

  // return handler
  const handleReturn = async (assignedId) => {
    const confirm = await Swal.fire({
      title: 'Return asset?',
      text: 'This will return the asset to HR',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, return it',
    });

    if (!confirm.isConfirmed) return;

    try {
      await returnAssignedAsset(assignedId);

      setAssetList(prev =>
        prev.map(a =>
          a._id === assignedId
            ? { ...a, status: 'returned', returnDate: new Date().toISOString() }
            : a
        )
      );

      setFilteredAssets(prev =>
        prev.map(a =>
          a._id === assignedId
            ? { ...a, status: 'returned', returnDate: new Date().toISOString() }
            : a
        )
      );

      Swal.fire('Success', 'Asset returned to HR', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to return asset', 'error');
    }
  };

  // filtering
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

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-700">
      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Assets</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search asset name..."
            className="input input-bordered w-full bg-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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

        {/* Table */}
        {filteredAssets.length === 0 ? (
          <div className="bg-white p-8 rounded text-center text-gray-500">
            No assets found
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th>Asset</th>
                  <th>Type</th>
                  <th>Company</th>
                  <th>Assigned</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {asset.assetImage ? (
                          <img
                            src={asset.assetImage}
                            alt={asset.assetName}
                            className="w-12 h-12 rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center font-bold">
                            {asset.assetName?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{asset.assetName}</div>
                          <div className="text-xs text-gray-500">
                            {asset._id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`badge ${
                        asset.assetType === 'returnable'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}>
                        {asset.assetType}
                      </span>
                    </td>

                    <td>{asset.companyName}</td>

                    <td>{formatDate(asset.assignmentDate)}</td>

                    <td>
                      {asset.assetType === 'returnable' ||
                      asset.status === 'assigned' ? (
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleReturn(asset._id)}
                        >
                          Return
                        </button>
                      ) : (
                        <span className="badge badge-info">
                          {asset.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 text-sm text-gray-500">
              Showing {filteredAssets.length} of {assetList.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssets;
