import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/Signup";
import SignIn from "../pages/SignIn";
import MainLayout from "../layouts/MainLayout";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import UpdateRequest from "../pages/UpdateRequest";

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
            }
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