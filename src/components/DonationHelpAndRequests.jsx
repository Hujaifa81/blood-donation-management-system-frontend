import React from 'react';
import { FaHandsHelping, FaCheckCircle, FaHeartbeat, FaBaby, FaUserCheck, FaBriefcaseMedical, FaSmile } from "react-icons/fa";


import DonationRequestsTable from './DonationRequestsTable';

const DonationHelpAndRequests = () => {



    return (
        <section className="bg-gray-100 py-16 px-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT SIDE: How Your Donation Helps */}
                <div>
                    <h2 className="text-3xl font-bold mb-8">
                        How Your Donation Helps
                        <div className="w-16 h-1 bg-red-500 mt-2" />
                    </h2>
                    

                    <ul className="space-y-5 text-gray-800 dark:text-gray-200">
                        <li className="flex items-start gap-3">
                            <FaHandsHelping className="text-red-500 mt-1" />
                            <div>
                                <h4 className="font-semibold">Saves Lives</h4>
                                <p>Every pint of blood can save up to three lives — your donation truly matters.</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <FaCheckCircle className="text-red-500 mt-1" />
                            <div>
                                <h4 className="font-semibold">Supports Medical Treatments</h4>
                                <p>Essential for surgeries, cancer treatment, trauma care, and chronic illnesses.</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <FaCheckCircle className="text-red-500 mt-1" />
                            <div>
                                <h4 className="font-semibold">Promotes Community Bond</h4>
                                <p>Builds a culture of care and connection within your local community.</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <FaHeartbeat className="text-red-500 mt-1" />
                            <div>
                                <h4 className="font-semibold">Ensures Emergency Readiness</h4>
                                <p>Provides hospitals with a critical reserve of blood for accidents and trauma cases.</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <FaBaby className="text-red-500 mt-1" />
                            <div>
                                <h4 className="font-semibold">Helps Mothers and Newborns</h4>
                                <p>Crucial for managing complications during childbirth and saving infant lives.</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <FaUserCheck className="text-red-500 mt-1" />
                            <div>
                                <h4 className="font-semibold">Assists Blood Disorder Patients</h4>
                                <p>Supports those with thalassemia, sickle cell disease, hemophilia, and anemia.</p>
                            </div>
                        </li>

                        
                    </ul>

                </div>

                {/* RIGHT SIDE: Current Blood Requests */}
                <div>
                    <h2 className="text-3xl font-bold mb-8">
                        Current Blood Request
                        <div className="w-16 h-1 bg-red-500 mt-2" />
                    </h2>
                    <DonationRequestsTable limit={true}></DonationRequestsTable>
                    {/* <div className="bg-white rounded shadow overflow-hidden">
            {bloodRequests.map((req, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-3 border-b last:border-b-0"
              >
                <FaHeart className="text-red-500" />
                <span className="text-sm text-gray-800">{req}</span>
              </div>
            ))}
          </div> */}
                    
                </div>
            </div>
        </section>
    );
};

export default DonationHelpAndRequests;
