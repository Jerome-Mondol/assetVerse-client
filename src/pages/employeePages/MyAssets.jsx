import React, { useEffect, useState } from 'react'
import AssetCard from '../../components/AssetComponents/AssetCard'
import { useAuth } from '../../context/AuthContext'
import { getUser } from '../../api/userAPI'
import { getAssetsOfEmployee } from '../../api/assetAPI'

const MyAssets = () => {
  const [assetList, setAssetList] = useState(null);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
      try {
        const assetResponse = await getAssetsOfEmployee(user.email)
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
        <h1 className='text-gray-800 font-semibold text-4xl text-center py-5' >My assets</h1>
        <div className='max-w-[80vw]  grid grid-cols-3 md:grid-cols-4 place-items-center mx-auto' >
          {
            assetList &&
              assetList.map(({ assetName, assetImage, assetType, companyName, _id }, index) => (
                  <AssetCard key={index} assetImage={assetImage} assetName={assetName} assetType={assetType} companyName={companyName}  id={_id} role={userRole}/>
              ))
          }
        </div>
      </div>
      }
    </>
  )
}

export default MyAssets
