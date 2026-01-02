import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllVehicles from './../pages/All Vehicles/AllVehicles';
import AddVehicles from './../pages/Add Vehicles/AddVehicles';
import MyVehicles from './../pages/My Vehicles/MyVehicles';
import MyBookings from './../pages/My Bookings/MyBookings';
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ViewDetails from "../pages/View Details/ViewDetails";
import PrivateRoute from './../Private Route/PrivateRoute';
import UpdateVehicle from "../pages/Update Vehicle/UpdateVehicle";
import FeaturedOwner from "../pages/Featured Owner/FeaturedOwner";
import AboutTravelEase from "../pages/About TravelEase/AboutTravelEase";
import ErrorPage from "../pages/Error Page/ErrorPage";
import MyProfile from "../pages/My Profile/MyProfile";
// নতুন ইম্পোর্ট
import DashboardLayout from "../Layouts/DashboardLayout"; 
import DashboardHome from "../pages/Dashboard/DashboardHome"; // এই ফাইলটি তৈরি করতে হবে

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />, // ভালো প্র্যাকটিস
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch('https://travel-ease-server-seven.vercel.app/latestVehicles'),
            },
            {
                path: "/allVehicles",
                element: <AllVehicles></AllVehicles>,
                loader: () => fetch('https://travel-ease-server-seven.vercel.app/travels'),
            },
            {
                path: "/viewDetails/:id",
                element: <PrivateRoute><ViewDetails /></PrivateRoute>,
            },
            {
                path: "/featuredOwner",
                element: <FeaturedOwner />,
            },
            {
                path: "/aboutTravelEase",
                element: <AboutTravelEase />,
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            { 
                path: "myProfile", // '/auth/myProfile' হিসেবে কাজ করবে
                element: <PrivateRoute><MyProfile /></PrivateRoute> 
            }
        ],
    },
    // নতুন ড্যাশবোর্ড রাউট স্ট্রাকচার
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "home", // '/dashboard/home'
                element: <DashboardHome />
            },
            {
                path: "addVehicles", // '/dashboard/addVehicles'
                element: <AddVehicles />
            },
            {
                path: "myVehicles", // '/dashboard/myVehicles'
                element: <MyVehicles />
            },
            {
                path: "myBookings", // '/dashboard/myBookings'
                element: <MyBookings />
            },
            {
                path: "updateVehicle/:id", // '/dashboard/updateVehicle/:id'
                element: <UpdateVehicle />
            },
        ]
    },
    // 404 Catch-all Route
    {
        path: "*",
        element: <ErrorPage />,
    }
]);