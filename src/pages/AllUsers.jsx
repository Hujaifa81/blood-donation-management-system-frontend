import React, { useState } from 'react';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import useTanstackPatch from '../hooks/useTanstackPatch';

const AllUsers = () => {
    const [status, setStatus] = useState('')
    const { data } = useTanstackGetRequest(`/users?status=${status}`, 'users', status, true)
    const { mutate } = useTanstackPatch('users')

    const handleFilter = (value) => {
        setStatus(value)
    }
    const handleStatus = (value, id) => {
        mutate({
            url: `/user/${id}`,
            data: { userStatus: value }
        })
    }
    const handleRole = (value, id) => {
        mutate({
            url: `/user/${id}`,
            data: { role: value }
        })
    }
    return (
        <div className="overflow-x-auto max-w-6xl mx-auto p-5 dark:bg-black">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">User Management</h2>
            <select
                defaultValue=""
                onChange={(e) => handleFilter(e.target.value)}
                className="select mb-4"
            >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>

            </select>
            {!Array.isArray(data) && (
                <p className="text-red">Loading or no data available...</p>
            )}

            {Array.isArray(data) && data.length === 0 && (
                <p className="text-red-500 mt-4">No donation requests with status "{status}"</p>
            )}
            {
                Array.isArray(data) && data.length > 0 && (
                    <table className="table table-zebra min-w-full text-sm text-left text-gray-500 dark:text-gray-300">
                        <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white">
                            <tr>
                                <th className="p-3">Avatar</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((user) => (
                                <tr key={user._id} className="border-b dark:border-gray-700">
                                    <td className="p-3">
                                        <img src={user.image} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                                    </td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className={`p-3 capitalize ${user.role === 'admin' && 'text-blue-500'} ${user.role === 'volunteer' && 'text-yellow-600'} ${user.role === 'donor' && 'text-green-600'}`}>{user.role}</td>
                                    <td className={`p-3 capitalize ${user.status === 'blocked' ? 'text-red-500' : 'text-green-500'}`}>{user.status}</td>
                                    <td className="p-3">
                                        <div className="dropdown dropdown-left">
                                            <div tabIndex={0} role="button" className="btn btn-sm m-1 bg-gray-200 dark:bg-gray-700">
                                                ⋮
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48">
                                                {user.status === 'active' && (
                                                    <li>
                                                        <button onClick={() => handleStatus('blocked', user._id)} className="text-red-600">Block</button>
                                                    </li>
                                                )}
                                                {user.status === 'blocked' && (
                                                    <li>
                                                        <button onClick={() => handleStatus('active', user._id)} className="text-green-600">Unblock</button>
                                                    </li>
                                                )}
                                                {user.role === 'donor' && user.status === 'active' && (
                                                    <>
                                                        <li>
                                                            <button onClick={() => handleRole('volunteer', user._id)} className="text-yellow-600">Make Volunteer</button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => handleRole('admin', user._id)} className="text-blue-600">Make Admin</button>
                                                        </li>
                                                    </>
                                                )}
                                                {user.role === 'volunteer' && user.status === 'active' && (
                                                    <>
                                                        <li>
                                                            <button onClick={() => handleRole('donor', user._id)} className="text-green-600">Make Donor</button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => handleRole('admin', user._id)} className="text-blue-600">Make Admin</button>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>

    );
};

export default AllUsers;