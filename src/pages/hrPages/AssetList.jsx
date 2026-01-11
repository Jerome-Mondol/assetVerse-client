import React, { useEffect, useState } from 'react'
import AssetCard from '../../components/AssetComponents/AssetCard'
import { useAuth } from '../../context/AuthContext'
import { getUser } from '../../api/userAPI'
import { getAssets } from '../../api/assetAPI'

const AssetList = () => {
  const [assetList, setAssetList] = useState(null);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetResponse = await getAssets(user.email)
        if(user) {
          const userResponse = await getUser(user.email);
          setUserRole(userResponse.role);
        }
        setAssetList(assetResponse);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
      } else if (sortBy === "quantity") {
        aValue = a.productQuantity || 0;
        bValue = b.productQuantity || 0;
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredAssets(result);
    setCurrentPage(1); // Reset to first page on filter/sort/search change
  }, [assetList, searchTerm, filterType, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAssets.length / pageSize);
  const paginatedAssets = filteredAssets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  console.log(assetList)

  return (
    <div className="container mx-auto py-8">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered"
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
          className="select select-bordered"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="type">Sort by Type</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 w-full bg-gray-100 rounded-xl animate-pulse" />
            ))
          : paginatedAssets && paginatedAssets.length > 0 && paginatedAssets.map(({ productName, productImage, productType, productQuantity, _id }) => (
              <AssetCard key={_id} assetImage={productImage} assetName={productName} assetType={productType} assetQuantity={productQuantity} id={_id} role={userRole}/>
            ))}
      </div>
      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary text-white' : 'btn-outline'}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {/* Empty state for no assets */}
      {!loading && paginatedAssets && paginatedAssets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="text-2xl font-bold text-primary mb-2">No assets found</h2>
          <p className="text-gray-500 text-base">There are currently no assets to display. Please check back later or add new assets.</p>
        </div>
      )}
    </div>
  );
}

export default AssetList
