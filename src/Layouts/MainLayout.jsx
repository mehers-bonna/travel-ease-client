// import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Banner from './../components/Banner/Banner';
import Footer from './../components/Footer/Footer';

const MainLayout = () => {
    const location = useLocation()
    // const [isLoading, setIsLoading] = useState(false);
    // useEffect(() => {
    //     setIsLoading(true);
    //     const timer = setTimeout(() => setIsLoading(false), 300); 
    //     return () => clearTimeout(timer);
    // }, [location]);
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            {/* {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <h1 className="text-2xl font-bold tracking-widest text-gray-800 flex items-center gap-2">
                        L <span className="animate-pulse"><img src={logo} alt="" className="w-24 animate-spin" /></span> ADING
                    </h1>
                </div>
            )} */}
            <div className='flex-1'>
                {location.pathname === "/" && <Banner />}
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;