import React, { useEffect, useState } from 'react'
import AssetCard from '../../components/AssetComponents/AssetCard'
import { useAuth } from '../../context/AuthContext'
import { getUser } from '../../api/userAPI'
import { getAllAssets, getAssetsOfEmployee } from '../../api/assetAPI'

const RequestAsset = () => {
  const [assetList, setAssetList] = useState(null);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
      try {
        const assetResponse = await getAllAssets(user.email)
        if(user) {
          const userResponse = await getUser(user.email);
          setUserRole(userResponse.role);
        }
        setAssetList(assetResponse);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!assetList) return;
    let result = [...assetList];
    // Search
    if (searchTerm) {
      result = result.filter(asset =>
        asset.productName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Filter
    if (filterType !== "all") {
      result = result.filter(asset =>
        asset.productType?.toLowerCase() === filterType.toLowerCase()
      );
    }
    // Sort
    result.sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "name") {
        aValue = a.productName?.toLowerCase() || "";
        bValue = b.productName?.toLowerCase() || "";
      } else if (sortBy === "type") {
        aValue = a.productType?.toLowerCase() || "";
        bValue = b.productType?.toLowerCase() || "";
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredAssets(result);
  }, [assetList, searchTerm, filterType, sortBy, sortOrder]);

  return (
    <>
    {
      <div className='bg-white'>
        <h1 className='text-gray-800 font-semibold text-4xl text-center py-10'>Request a asset</h1>
        {/* Controls for filtering, searching, sorting */}
        <div className="flex flex-wrap gap-4 mb-8 items-center bg-gray-50 p-4 rounded-xl shadow">
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full max-w-xs bg-white text-gray-800"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered bg-white text-gray-800"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="electronic">Electronic</option>
            <option value="mechanical">Mechanical</option>
            <option value="furniture">Furniture</option>
            <option value="vehicle">Vehicle</option>
            <option value="equipment">Equipment</option>
            <option value="software">Software</option>
            <option value="tool">Tool</option>
            <option value="other">Other</option>
          </select>
          <select
            className="select select-bordered bg-white text-gray-800"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
          </select>
          <select
            className="select select-bordered bg-white text-gray-800"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className='max-w-[80vw] grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto'>
          {
            filteredAssets &&
              filteredAssets.map(({ productName, productImage, productType, companyName, _id }, index) => (
                  <AssetCard key={index} assetImage={productImage} assetName={productName} assetType={productType} companyName={companyName}  id={_id} role={userRole}/>
              ))
          }
        </div>
      </div>
      }
    </>
  )
}

export default RequestAsset
