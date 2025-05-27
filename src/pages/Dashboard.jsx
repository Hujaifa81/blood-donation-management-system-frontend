import React from 'react';
import DonorDashboardHomePage from './DonorDashboardHomePage';
import useRoleStatus from '../hooks/useRoleStatus';
import AdminDashboardHomePage from './AdminDashboardHomePage';

const Dashboard = () => {
    const { userRole } = useRoleStatus()
    return (
        <div>
            {
                (userRole==='admin' || userRole==='volunteer') && <AdminDashboardHomePage></AdminDashboardHomePage>
                
            }
            {
                userRole==='donor' && <DonorDashboardHomePage></DonorDashboardHomePage>
            }
        </div>
    );
};

export default Dashboard;