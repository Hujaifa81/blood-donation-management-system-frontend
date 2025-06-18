import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const MainLayout = () => {
    return (
        <div className="min-h-screen  bg-white font-inter">
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;