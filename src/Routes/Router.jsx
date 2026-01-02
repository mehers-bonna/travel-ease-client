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
import DashboardLayout from "../Layouts/DashboardLayout"; 
import DashboardHome from "../pages/Dashboard/DashboardHome";
import TermsAndConditions from "../pages/Terms And Conditions/TermsAndConditions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
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
                element: <ViewDetails />,
            },
            {
                path: "/featuredOwner",
                element: <FeaturedOwner />,
            },
            {
                path: "/aboutTravelEase",
                element: <AboutTravelEase />,
            },
            {
                path: "/termsAndConditions",
                element: <TermsAndConditions />,
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
                path: "myProfile", 
                element: <PrivateRoute><MyProfile /></PrivateRoute> 
            }
        ],
    },
    // Dashboard route
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "home", 
                element: <DashboardHome />
            },
            {
                path: "addVehicles", 
                element: <AddVehicles />
            },
            {
                path: "myVehicles", 
                element: <MyVehicles />
            },
            {
                path: "myBookings", 
                element: <MyBookings />
            },
            {
                path: "updateVehicle/:id", 
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