import React, { useEffect, useState } from 'react'
import { assignAsset, getAssets } from '../../api/assetAPI'
import { useAuth } from '../../context/AuthContext'
import { acceptRequest } from '../../api/requestAPI'
import { useParams } from 'react-router'

const AssignAssets = () => {
  const { employeeEmail } = useParams();  
  const { user } = useAuth()
  const [allAssets, setAllAssets] = useState(null)

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (user) {
          const data = await getAssets(user.email)
          if (data) setAllAssets(data)
        }
      }
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }, [])

  console.log(employeeEmail)

  return (
    <>
      {
        allAssets && user ? (
          <div>
            <h1 className="text-4xl text-gray-700 font-semibold text-center my-5">
              Assign Assets
            </h1>

            <p className="text-gray-800 text-center">
              Total assets: {allAssets.length}
            </p>

            <div className="overflow-x-auto rounded-box w-[70%] mx-auto min-h-screen">
              <table className="table bg-gray-100 text-gray-700 my-10">
                <thead className="text-gray-800">
                  <tr>
                    <th></th>
                    <th>Asset Name</th>
                    <th>Asset Tag</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    allAssets.map((asset, index) => (
                      <tr key={asset._id}>
                        <th>{index + 1}</th>
                        <td className="font-medium">{asset.productName}</td>
                        <td>{asset.productType}</td>
                        <td>
                          <span
                            className={`badge ${
                              asset.status === 'assigned'
                                ? 'badge-warning'
                                : 'badge-success'
                            }`}
                          >
                            {asset.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={async () => {
                              const response = await assignAsset(employeeEmail, user.email, asset._id);
                              console.log(response);
                            }}
                            disabled={asset.status === 'assigned'}
                          >
                            Assign Asset
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center mt-10">Loading...</div>
        )
      }
    </>
  )
}

export default AssignAssets
