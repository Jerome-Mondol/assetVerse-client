import React from 'react';
import { Link } from 'react-router';

const AssetCard = ({ assetImage, assetName, assetType, assetQuantity, id, role, assetDescription, assetPrice, assetDate, assetLocation, assetRating }) => {
  return (
    <div className="w-full sm:w-[90%]">
      <div className="card bg-white w-full shadow-md mb-5 hover:shadow-lg transition-shadow border border-gray-200 rounded-xl flex flex-col h-full">
        {assetImage && (
          <div className="w-full h-48 sm:h-52 rounded-t-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={assetImage}
              alt={assetName}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="card-body w-full p-4 sm:p-6 flex flex-col gap-2 flex-1">
          <h2 className="card-title text-gray-800 text-lg sm:text-xl font-bold mb-1 truncate">{assetName}</h2>
          {assetDescription && (
            <p className="text-gray-500 text-sm mb-1 line-clamp-2">{assetDescription}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mb-1 text-xs">
            <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">{assetType}</span>
            <span className={`inline-block px-2 py-1 rounded font-semibold ${assetQuantity <= 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{assetQuantity <= 0 ? 'Unavailable' : 'Available'}</span>
            {assetPrice && <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-semibold">${assetPrice}</span>}
            {assetDate && <span className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-600 font-semibold">{assetDate}</span>}
            {assetLocation && <span className="inline-block px-2 py-1 rounded bg-purple-100 text-purple-700 font-semibold">{assetLocation}</span>}
            {assetRating && <span className="inline-block px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-semibold">⭐ {assetRating}</span>}
          </div>
          <div className="flex justify-end w-full mt-3">
            <Link to={role === 'hr' ? `/edit-asset/${id}` : `/asset-details/${id}`} className="w-full">
              <button className="btn btn-primary w-full text-sm sm:text-base font-semibold rounded-lg">
                {role === 'hr' ? 'Edit' : 'View Details'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;