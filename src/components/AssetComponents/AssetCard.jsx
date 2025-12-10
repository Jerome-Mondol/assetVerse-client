import React from 'react'
import { Link } from 'react-router'

const AssetCard = ({ assetImage, assetName, assetType, assetQuantity, id, role }) => {
  return (
    <>
        <div className='w-[90%]' >
            <div className="card bg-gray-100 w-full shadow-sm mb-5">
  <figure  >
    <img
      src={assetImage}
      alt={assetName} 
      className='h-52 text-gray-600 w-full object-cover'
      />
  </figure>
  <div className="card-body bg-gray-200">
    <h2 className="card-title text-gray-700 ">{assetName}</h2>
    <p className='text-gray-500' >Category: {assetType}</p>
    <p className={assetQuantity <= 0 ? "text-gray-500 bg-red-500/50 w-fit px-2 py-1 rounded-lg" : "text-gray-500 bg-green-500/50 w-fit px-2 py-1 rounded-lg"}>{ assetQuantity <= 0 ? "Unavailable" : "Available" }</p>
    <div className="card-actions justify-end">
      <Link to={`/asset-details/${id}`}><h1 className="btn btn-primary w-full">{role === 'hr' ? "Edit" : "Request access"}</h1></Link>
    </div>
  </div>
</div>    
        </div> 
    </>
  )
}

export default AssetCard
