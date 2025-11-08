import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllVehicles from './../pages/All Vehicles/AllVehicles';
import AddVehicles from './../pages/Add Vehicles/AddVehicles';
import MyVehicles from './../pages/My Vehicles/MyVehicles';
import MyBookings from './../pages/My Bookings/MyBookings';



export const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path: "/",
                element:<Home></Home>,
            },
            {
                path: "/allVehicles",
                element:<AllVehicles></AllVehicles>,
            },
            {
                path: "/addVehicles",
                element:<AddVehicles></AddVehicles>,
            },
            {
                path: "/myVehicles",
                element:<MyVehicles></MyVehicles>,
            },
            {
                path: "/myBookings",
                element:<MyBookings></MyBookings>,
            }
        ]
    }
])