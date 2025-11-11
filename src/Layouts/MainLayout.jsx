// import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Banner from './../components/Banner/Banner';
import Footer from './../components/Footer/Footer';

const MainLayout = () => {
    const location = useLocation()
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='flex-1'>
                {location.pathname === "/" && <Banner />}
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;