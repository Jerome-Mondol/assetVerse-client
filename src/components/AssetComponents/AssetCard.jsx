import React from 'react';
import { Link } from 'react-router';

const AssetCard = ({ assetImage, assetName, assetType, assetQuantity, id, role }) => {
  return (
    <div className="w-full sm:w-[90%]">
      <div className="card bg-gray-100 w-full shadow-sm mb-5 hover:shadow-md transition-shadow">
        <figure>
          <img
            src={assetImage}
            alt={assetName}
            className="h-48 sm:h-52 w-full object-cover"
          />
        </figure>
        <div className="card-body bg-gray-200 w-full p-4 sm:p-6">
          <h2 className="card-title text-gray-700 text-lg sm:text-xl">{assetName}</h2>
          <p className="text-gray-500 text-sm sm:text-base">Category: {assetType}</p>
          <p 
            className={`w-fit px-2 py-1 rounded-lg text-sm sm:text-base ${
              assetQuantity <= 0 
                ? "text-gray-500 bg-red-500/50" 
                : "text-gray-500 bg-green-500/50"
            }`}
          >
            {assetQuantity <= 0 ? "Unavailable" : "Available"}
          </p>
          <div className="card-actions justify-end w-full mt-3">
            <Link 
              to={ role === 'hr' ? `/edit-asset/${id}` : `/asset-details/${id}`} 
              className="w-full"
            >
              <button className="btn btn-primary w-full text-sm sm:text-base">
                {role === 'hr' ? "Edit" : "Request access"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;