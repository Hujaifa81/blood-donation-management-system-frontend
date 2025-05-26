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
import AdminPrivateRoute from "../components/AdminPrivateRoute";
import AdminOrVolunteerPrivateRoute from "../components/AdminOrVolunteerPrivateRoute";
import DonationRequests from "../pages/DonationRequests";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import Search from "../pages/Search";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>

            },
            {
                path: '/donation-requests',
                element: <DonationRequests></DonationRequests>
            },
            {
                path: '/donation-requests/details/:id',
                element: <PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>
            },
            {
                path:'/blogs',
                element:<Blogs></Blogs>
            },
            {
                path: '/blogs/:id',
                element:<BlogDetails></BlogDetails>
            },
            {
                path:'/search',
                element:<Search></Search>
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
                        element: <AdminPrivateRoute><AllUsers></AllUsers></AdminPrivateRoute>
                    },
                    {
                        path: 'all-blood-donation-request',
                        element: <AdminOrVolunteerPrivateRoute><AllBloodDonationRequests></AllBloodDonationRequests></AdminOrVolunteerPrivateRoute>
                    },
                    {
                        path: 'content-management',
                        element: <AdminOrVolunteerPrivateRoute><ContentManagement></ContentManagement></AdminOrVolunteerPrivateRoute>
                    },
                    {
                        path: 'content-management/add-blog',
                        element: <AdminOrVolunteerPrivateRoute><AddBlog></AddBlog></AdminOrVolunteerPrivateRoute>
                    },
                    {
                        path: 'update-request/:id',
                        element: <AdminPrivateRoute><UpdateRequest></UpdateRequest></AdminPrivateRoute>
                    },
                ]
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