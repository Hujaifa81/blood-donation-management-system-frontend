import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/Signup";
import SignIn from "../pages/SignIn";

export const router = createBrowserRouter([
    {
        path:'/sign-up',
        element:<SignUp></SignUp>
    },
    {
        path:'/sign-in',
        element:<SignIn></SignIn>
    }
])