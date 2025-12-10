import React, { useEffect, useState } from 'react'
import AssetCard from '../components/AssetComponents/AssetCard'
import { useAuth } from '../context/AuthContext'
import { getUser } from '../api/userAPI'
import { getAllAssets, getAssetsOfEmployee } from '../api/assetAPI'

const RequestAsset = () => {
  const [assetList, setAssetList] = useState(null);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');

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

  console.log(assetList)


  return (
    <>
    {
      <div className='bg-white' >
        <h1 className='text-gray-800 font-semibold text-4xl text-center py-10'>Request a asset</h1>
        <div className='max-w-[80vw] grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto' >
          {
            assetList &&
              assetList.map(({ productName, productImage, productType, companyName, _id }, index) => (
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
