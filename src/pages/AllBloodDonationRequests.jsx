import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import useTanstackDeleteRequest from '../hooks/useTanstackDeleteRequest';
import useTanstackPatch from '../hooks/useTanstackPatch';
import { Link } from 'react-router-dom';
import useRoleStatus from '../hooks/useRoleStatus';

const AllBloodDonationRequests = () => {
  const { user } = useAuth();
  const { userRole, userStatus } = useRoleStatus()
  const [status, setStatus] = useState('');
  console.log(userRole, userStatus);


  const { data } = useTanstackGetRequest(
    `/donationRequests?status=${status}`,
    'donationRequests',
    status,
    true
  );

  const { mutate: deleteRequest } = useTanstackDeleteRequest('donationRequests');
  const { mutate: patchRequest } = useTanstackPatch('donationRequests');

  const handleStatusChange = (id, status) => {
    let data = {
      id,
      status,
    };
    if (status === 'inprogress') {
      data = {
        ...data,
        donorInfo: {
          donorName: user?.displayName,
          donorEmail: user?.email,
        },
      };
    }
    patchRequest({
      url: `/donationRequests/${data.id}`,
      data,
    });
  };

  const handleFilter = (value) => {
    setStatus(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-5 dark:bg-black">
      <h1 className="text-2xl font-bold dark:text-white mb-4">
        Welcome, {user?.displayName}
      </h1>

      <select
        defaultValue=""
        onChange={(e) => handleFilter(e.target.value)}
        className="select mb-4"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="inprogress">Inprogress</option>
        <option value="done">Done</option>
        <option value="cancel">Canceled</option>
      </select>

      {!Array.isArray(data) && (
        <p className="text-red">Loading or no data available...</p>
      )}

      {Array.isArray(data) && data.length === 0 && (
        <p className="text-red-500 mt-4">No donation requests with status "{status}"</p>
      )}

      {Array.isArray(data) && data.length > 0 && (
        <>
          <h2 className="text-xl font-semibold dark:text-white mb-2">
            My Donation Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra min-w-full text-sm text-left text-gray-500 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white">
                <tr>
                  <th className="p-3">Recipient</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Blood Group</th>
                  <th className="p-3">Status</th>
                  {
                    userRole==='admin' && (<th className="p-3">Actions</th>)
                  }
                  <th className="p-3">Donor Name</th>
                  <th className="p-3">Donor Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((req) => (
                  <tr key={req._id} className="border-b dark:border-gray-700">
                    <td className="p-3">{req.recipientName}</td>
                    <td className="p-3">
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td className="p-3">{req.donationDate}</td>
                    <td className="p-3">{req.donationTime}</td>
                    <td className="p-3">{req.bloodGroup}</td>
                    <td className="p-3 capitalize">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        disabled={req.status === 'done' || req.status === 'cancel'}
                        className="bg-white dark:bg-gray-900 border p-1 rounded"
                      >
                        {req.status === 'pending' && (
                          <>
                            <option value="pending">pending</option>
                            <option value="inprogress">inprogress</option>
                          </>
                        )}
                        {req.status === 'inprogress' && (
                          <>
                            <option value="inprogress">inprogress</option>
                            <option value="done">done</option>
                            <option value="cancel">cancel</option>
                          </>
                        )}
                        {(req.status === 'done' || req.status === 'cancel') && (
                          <option value={req.status}>{req.status}</option>
                        )}
                      </select>
                    </td>
                    {
                      userRole==='admin' && ( <td className="px-6 py-4 space-x-2">
                      <Link to={`/update-request/${req._id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteRequest(`/donationRequests/${req._id}`)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm mt-1"
                      >
                        Delete
                      </button>
                    </td>)
                    }
                    <td>{req.donorInfo ? req.donorInfo.donorName : '-'}</td>
                    <td>{req.donorInfo ? req.donorInfo.donorEmail : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBloodDonationRequests;
