import React from 'react';
import { FaUsers, FaHandHoldingHeart, FaTint } from 'react-icons/fa';
import useTanstackGetRequest from '../hooks/useTanstackGetRequest';
import useAuth from '../hooks/useAuth';

const AdminDashboardHomePage = () => {
    const {user}=useAuth()
    const {data: totalUsers}=useTanstackGetRequest('/users/count?role=donor', 'totalUsers', [], true);
    const {data:totalRequests}=useTanstackGetRequest('/donationRequests/count', 'totalRequests', [], true);
    const {data:totalFunding}=useTanstackGetRequest('/total-funding','totalFunding',[],true);
  

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-black">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold dark:text-white">👋 Welcome to {user?.displayName}'s Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage donors, funding, and blood requests at a glance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donors */}
        <div className="card bg-white dark:bg-gray-900 shadow-md p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700">
          <FaUsers className="text-4xl text-red-600" />
          <div>
            <h3 className="text-2xl font-bold dark:text-white">{totalUsers ?? 0}</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Donors</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="card bg-white dark:bg-gray-900 shadow-md p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700">
          <FaHandHoldingHeart className="text-4xl text-green-600" />
          <div>
            <h3 className="text-2xl font-bold dark:text-white">${totalFunding?.toFixed(2) ?? '0.00'}</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Funding</p>
          </div>
        </div>

        {/* Total Blood Requests */}
        <div className="card bg-white dark:bg-gray-900 shadow-md p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700">
          <FaTint className="text-4xl text-blue-600" />
          <div>
            <h3 className="text-2xl font-bold dark:text-white">{totalRequests ?? 0}</h3>
            <p className="text-gray-600 dark:text-gray-400">Blood Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHomePage;
