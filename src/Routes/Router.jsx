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



export const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path: "/",
                element:<Home></Home>,
                loader: () => fetch('http://localhost:3000/latestVehicles'),
            },
            {
                path: "/allVehicles",
                element:<AllVehicles></AllVehicles>,
                loader: () => fetch('http://localhost:3000/travels'),
            },
            {
                path: "/addVehicles",
                element:<PrivateRoute>
                    <AddVehicles></AddVehicles>
                </PrivateRoute>,
            },
            {
                path: "/myVehicles",
                element:<PrivateRoute>
                    <MyVehicles></MyVehicles>
                </PrivateRoute>,
            },
            {
                path: "/myBookings",
                element:<MyBookings></MyBookings>,
            },
            {
                path: "/viewDetails/:id",
                element:<PrivateRoute>
                    <ViewDetails></ViewDetails>
                </PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:3000/travels/${params.id}`),
            },
            {
                path: "/updateVehicle/:id",
                element:<PrivateRoute>
                    <UpdateVehicle></UpdateVehicle>
                </PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:3000/travels/${params.id}`),
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'login',
                element: <Login></Login>,
            },
            {
                path: 'register',
                element: <Register></Register>,
            },
            // {
            //     path: 'myProfile',
            //     Component: MyProfile,
            // },
            // {
            //     path: 'updateProfile',
            //     element:
            // },
            // {
            //     path: 'forgetPassword',
            //     Component: ForgetPassword,
            // },
        ],
    },
])