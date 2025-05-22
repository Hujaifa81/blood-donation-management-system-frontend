import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/Signup";
import SignIn from "../pages/SignIn";
import MainLayout from "../layouts/MainLayout";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import UpdateRequest from "../pages/UpdateRequest";
import Profile from "../pages/Profile";
import MyDonationRequests from "../pages/MyDonationRequests";
import AllBloodDonationRequests from "../pages/AllBloodDonationRequests";
import AllUsers from "../pages/AllUsers";
import AddBlog from "../pages/AddBlog";
import DashboardLayout from "../layouts/DashboardLayout";
import ContentManagement from "../pages/ContentManagement";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'my-donation-requests',
                element: <MyDonationRequests></MyDonationRequests>
            },
            {
                path: 'create-donation-request',
                element: <CreateDonationRequest></CreateDonationRequest>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'all-blood-donation-request',
                element: <AllBloodDonationRequests></AllBloodDonationRequests>
            },
            {
                path: 'content-management',
                element: <ContentManagement></ContentManagement>
            },
            {
                path: 'content-management/add-blog',
                element: <AddBlog></AddBlog>
            },
            {
                path: 'update-request/:id',
                element: <UpdateRequest></UpdateRequest>
            },
        ]
    },
    {
        path: '/sign-up',
        element: <SignUp></SignUp>
    },
    {
        path: '/sign-in',
        element: <SignIn></SignIn>
    }

])