import React from 'react'
import { useEffect } from 'react'
import { getAffiliations } from '../../api/affiliationAPI'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

const AllEmployees = () => {
    const { user } = useAuth();
    const [affiliations, setAffiliations] = useState(null)

    useEffect(() => {
        try {
            const getData = async () => {
                if(user) {
                    const data = await getAffiliations(user.email);
                    if(data) {
                        setAffiliations(data);
                    }
                }
            }

        getData();            
        }
        catch(err) {
            console.log(err);
        }

       
    }, [])

    console.log(affiliations);

  return (
    <>
        <div>
            <h1 className='text-4xl text-gray-700 font-semibold text-center my-5' >All Employees</h1>
            <p className='text-gray-800 text-center' >Total employees: {affiliations && affiliations.length}</p>
            <div className="overflow-x-auto rounded-box w-[60%] mx-auto min-h-screen">
  <table className="table bg-gray-100 text-gray-700 my-10">
    {/* head */}
    <thead className='text-gray-800'>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody >
      {
        affiliations && 
        affiliations.map((affiliation, index) => (
            <tr key={index} >
        <th>{index + 1}</th>
        <td className='font-medium' >{affiliation.employeeName}</td>
        <td>{affiliation.employeeEmail}</td>
        <td>
            <div>
                <button className='btn btn-warning' >Remove Affiliation</button>
            </div>
        </td>
      </tr>
        ))
      }
    </tbody>
  </table>
</div>
        </div> 
    </>
  )
}

export default AllEmployees
