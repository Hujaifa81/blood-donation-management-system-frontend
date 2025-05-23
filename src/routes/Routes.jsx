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
import PrivateRoute from "../components/PrivateRoute";


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
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: 'my-donation-requests',
                element: <PrivateRoute><MyDonationRequests></MyDonationRequests></PrivateRoute>
            },
            {
                path: 'create-donation-request',
                element: <PrivateRoute><CreateDonationRequest></CreateDonationRequest></PrivateRoute>
            },
            {
                path: 'all-users',
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path: 'all-blood-donation-request',
                element: <PrivateRoute><AllBloodDonationRequests></AllBloodDonationRequests></PrivateRoute>
            },
            {
                path: 'content-management',
                element: <PrivateRoute><ContentManagement></ContentManagement></PrivateRoute>
            },
            {
                path: 'content-management/add-blog',
                element:<PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: 'update-request/:id',
                element: <PrivateRoute><UpdateRequest></UpdateRequest></PrivateRoute>
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