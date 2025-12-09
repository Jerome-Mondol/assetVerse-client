import React, { useEffect, useState } from 'react'
import AssetCard from '../components/AssetComponents/AssetCard'
import { axiosInstance, secureAxios } from '../config/axios'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { getUser } from '../api/userAPI'

const AssetList = () => {
  const [assetList, setAssetList] = useState(null);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetResponse = await secureAxios.get(`/assets/hr?email=${user.email}`)
        if(user) {
          const userResponse = await getUser(user.email);
          setUserRole(userResponse.role);
        }
        setAssetList(assetResponse.data);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);




  return (
    <>
    {
      <div className='bg-white' >
        <h1 className='text-gray-800 font-semibold text-4xl text-center py-5' >All assets</h1>
        <div className='max-w-[80vw]  grid grid-cols-3 md:grid-cols-4 place-items-center mx-auto' >
          {
            assetList &&
              assetList.map(({ productName, productImage, productType, productQuantity, _id }, index) => (
                <>
                  <AssetCard assetImage={productImage} assetName={productName} assetType={productType} assetQuantity={productQuantity} key={index} id={_id} role={userRole}/>
                  <AssetCard assetImage={productImage} assetName={productName} assetType={productType} assetQuantity={productQuantity} key={index} id={_id} role={userRole}/>
                  <AssetCard assetImage={productImage} assetName={productName} assetType={productType} assetQuantity={productQuantity} key={index} id={_id} role={userRole}/>
                </>
              ))
          }
        </div>
      </div>
      }
    </>
  )
}

export default AssetList
