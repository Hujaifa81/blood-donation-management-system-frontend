import React from 'react';
import { FaEye } from 'react-icons/fa';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import { Link } from 'react-router-dom';



const DonationRequestsTable = ({limit,currentPage,itemsPerPage}) => {
    const url = limit
    ? `/donationRequests?pageLimit=5&status=pending`
    : `/donationRequests?status=pending&page=${currentPage}&limit=${itemsPerPage}`;

  const { data: donationRequests } = useTanstackGetRequest(
    url,
    'donationRequests',
    [],
    false
  );


    return (
        <div className="overflow-x-auto max-w-5xl mx-auto bg-white dark:bg-gray-900 p-4 rounded shadow">
            {
                Array.isArray(donationRequests) && donationRequests.length>0 ? (<div><table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white">
                    <tr>
                        <th className="p-3">Recipient Name</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Blood Group</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Time</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {donationRequests?.map((req, idx) => (
                        <tr key={idx} className="border-b dark:border-gray-700">
                            <td className="p-3">{req.recipientName}</td>
                            <td className="p-3">{req.recipientUpazila},{req.recipientDistrict}</td>
                            <td className="p-3 font-semibold">{req.bloodGroup}</td>
                            <td className="p-3">{req.donationDate}</td>
                            <td className="p-3">{req.donationTime}</td>
                            <td className="p-3">
                                <Link to={`/donation-requests/details/${req._id}`}><button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                                    <FaEye />View
                                </button></Link>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                limit && <div className="mt-4">
                        <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700">
                           <Link to='/donation-requests'>View More</Link> 
                        </button>
                    </div>
            }
            
            </div>):<p>No requests found</p>
            }
            
        </div>
    );
};

export default DonationRequestsTable;
