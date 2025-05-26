import React, { useState } from 'react';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import { useParams } from 'react-router-dom';
import DonateModal from '../components/DonateModal';


const DonationRequestDetails = () => {
    const { id } = useParams()
    const [show,setShow]=useState(false)
    const { data: donationRequest } = useTanstackGetRequest(`/donationRequest/${id}`, 'donationRequests', id, true)
    if (!donationRequest) return <p className="text-center text-gray-600">No data available</p>;
    
    const {
        name,
        email,
        recipientName,
        recipientDistrict,
        recipientUpazila,
        hospitalName,
        fullAddress,
        bloodGroup,
        donationDate,
        donationTime,
        requestMessage,
        status
    } = donationRequest;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">Donation Request Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requester Info */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Requester Name</h4>
                    <p className="text-gray-800 dark:text-gray-300">{name}</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Requester Email</h4>
                    <p className="text-gray-800 dark:text-gray-300">{email}</p>
                </div>

                {/* Recipient Info */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Recipient Name</h4>
                    <p className="text-gray-800 dark:text-gray-300">{recipientName}</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Recipient Location</h4>
                    <p className="text-gray-800 dark:text-gray-300">
                        {recipientUpazila}, {recipientDistrict}
                    </p>
                </div>

                {/* Hospital Info */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Hospital Name</h4>
                    <p className="text-gray-800 dark:text-gray-300">{hospitalName}</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Full Address</h4>
                    <p className="text-gray-800 dark:text-gray-300">{fullAddress}</p>
                </div>

                {/* Blood Info */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Blood Group</h4>
                    <p className="text-xl font-bold text-red-600">{bloodGroup}</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Donation Date & Time</h4>
                    <p className="text-gray-800 dark:text-gray-300">
                        {donationDate} at {donationTime}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Donation Status</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${status === 'pending' ? 'bg-yellow-500' :
                            status === 'inprogress' ? 'bg-blue-500' :
                                status === 'done' ? 'bg-green-600' :
                                    status === 'cancel' ? 'bg-gray-500' : 'bg-red-600'
                        }`}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Request Message */}
            <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Request Message</h4>
                <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    {requestMessage}
                </p>
            </div>
            <button className='btn btn-accent' onClick={() => setShow(true)}>Donate</button>
            <DonateModal show={show} setShow={setShow} id={id} status={'inprogress'}></DonateModal>
        </div>
    );
};

export default DonationRequestDetails;
