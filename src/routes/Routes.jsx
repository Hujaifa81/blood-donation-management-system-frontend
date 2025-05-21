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
                path: 'create-donation-request',
                element: <CreateDonationRequest></CreateDonationRequest>
            },
            {
                path:'dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/update-request/:id',
                element:<UpdateRequest></UpdateRequest>
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },
            {
                path:'dashboard/my-donation-requests',
                element:<MyDonationRequests></MyDonationRequests>
            },
            {
                path:'dashboard/all-blood-donation-request',
                element:<AllBloodDonationRequests></AllBloodDonationRequests>
            },
            {
                path:'dashboard/all-users',
                element:<AllUsers></AllUsers>
            },
            {
                path:'dashboard/content-management/add-blog',
                element:<AddBlog></AddBlog>
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