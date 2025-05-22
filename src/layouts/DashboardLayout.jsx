import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <div className='w-1/5'>
                <Sidebar></Sidebar>
            </div>
            <div className='w-4/5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;