import React from 'react';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import useAuth from '../hooks/useAuth';
import useTanstackDeleteRequest from '../hooks/useTanstackDeleteRequest';
import useTanstackPatch from '../hooks/useTanstackPatch';
import { Link, useNavigate } from 'react-router-dom';

const DonorDashboardHomePage = () => {
  const { user } = useAuth()
  const { data } = useTanstackGetRequest(`/donationRequests/${user?.email}?limit=3`, 'donationRequests', `${user?.email}`, true)
  const { mutate: deleteRequest } = useTanstackDeleteRequest('donationRequests')
  const { mutate: patchRequest } = useTanstackPatch('donationRequests')
  const navigate = useNavigate()


  const handleStatusChange = async (id, status) => {
    let data = {
      id,
      status
    }
    if (status === 'inprogress') {
      data = {
        ...data,
        donorInfo: {
          donorName: user?.displayName,
          donorEmail: user?.email
        }
      }
    }
    patchRequest({
      url: `/donationRequests/${data.id}`,
      data: data
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-5 dark:bg-black">
      <h1 className="text-2xl font-bold dark:text-white mb-4">Welcome, {user?.displayName}</h1>

      {Array.isArray(data) && (
        <>
          <h2 className="text-xl font-semibold dark:text-white mb-2">Recent Donation Requests</h2>
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
                  <th className="p-3">Actions</th>
                  <th className="p-3">Donor Name</th>
                  <th className="p-3">Donor Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((req) => (
                  <tr key={req._id} className="border-b dark:border-gray-700">
                    <td className="p-3">{req.recipientName}</td>
                    <td className="p-3">{req.recipientDistrict}, {req.recipientUpazila}</td>
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
                    <td className="px-6 py-4 space-x-2">
                      <Link to={`/update-request/${req._id}`}>
                        <button

                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Update
                        </button></Link>
                      <button
                        onClick={() => deleteRequest(`/donationRequests/${req._id}`)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm mt-1"
                      >
                        Delete
                      </button>
                    </td>

                    <td>{req.donorInfo ? req.donorInfo.donorName : '-'}</td>
                    <td>{req.donorInfo ? req.donorInfo.donorEmail : '-'}</td>



                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={() => navigate('/dashboard/my-donation-requests')}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              View My All Requests
            </button>
          </div>
        </>
      )}
    </div>
  );

};

export default DonorDashboardHomePage;