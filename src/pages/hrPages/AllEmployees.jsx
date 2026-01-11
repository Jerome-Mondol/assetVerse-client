import React from 'react'
import { useEffect } from 'react'
import { getAffiliations, removeAffiliation } from '../../api/affiliationAPI'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router'

const AllEmployees = () => {
    const { user } = useAuth();
    const [affiliations, setAffiliations] = useState(null)

    useEffect(() => {
        try {
            const getData = async () => {
                if (user) {
                    const data = await getAffiliations(user.email);
                    if (data) {
                        setAffiliations(data);
                    }
                }
            }

            getData();
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    console.log(affiliations);

    return (
        <>
            {
                affiliations ?
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
                                    {affiliations && affiliations.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-8 text-gray-500 font-semibold">No employees found</td>
                                        </tr>
                                    )}
                                    {affiliations && affiliations.map((affiliation, index) => (
                                        affiliation.status !== 'inactive' &&
                                        <tr key={index} >
                                            <th>{index + 1}</th>
                                            <td className='font-medium' >{affiliation.employeeName}</td>
                                            <td>{affiliation.employeeEmail}</td>
                                            <td>
                                                <div>
                                                    <button
                                                        onClick={async (e) => {
                                                            const response = await removeAffiliation(affiliation._id);
                                                            if (response) {
                                                                setAffiliations(prev =>
                                                                    prev.filter(a => a._id !== affiliation._id)
                                                                );
                                                            }
                                                        }}
                                                        className='btn btn-warning'>Remove Employee</button>
                                                    <Link to={`/assign-assets/${affiliation.employeeEmail}`} ><h1 className='btn btn-success ml-2'>Assign Asset</h1></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> :
                    <div className="grid grid-cols-2 gap-4 w-[60%] mx-auto mt-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>
            }
        </>
    )
}

export default AllEmployees
