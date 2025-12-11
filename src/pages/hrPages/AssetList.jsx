import React, { useEffect, useState } from 'react'
import AssetCard from '../../components/AssetComponents/AssetCard'
import { useAuth } from '../../context/AuthContext'
import { getUser } from '../../api/userAPI'
import { getAssets } from '../../api/assetAPI'

const AssetList = () => {
  const [assetList, setAssetList] = useState(null);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');

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
    }

    fetchData();
  }, []);

  console.log(assetList)


  return (
    <>
    {
      <div className='bg-white' >
        <h1 className='text-gray-800 font-semibold text-4xl text-center py-5' >All assets</h1>
        <div className='max-w-[80vw]  grid grid-cols-3 md:grid-cols-4 place-items-center mx-auto' >
          {
            assetList &&
              assetList.map(({ productName, productImage, productType, productQuantity, _id }, index) => (
                  <AssetCard key={index} assetImage={productImage} assetName={productName} assetType={productType} assetQuantity={productQuantity} id={_id} role={userRole}/>
              ))
          }
        </div>
      </div>
      }
    </>
  )
}

export default AssetList
