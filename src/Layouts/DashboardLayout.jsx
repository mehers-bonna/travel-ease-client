import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router";
import { FaHome, FaPlusCircle, FaCar, FaBookmark, FaUserCircle, FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const activeClass = "flex items-center gap-3 p-3 rounded-lg bg-error text-white font-semibold transition-all";
    const normalClass = "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-all";

    const navLinks = (
        <>
            <NavLink onClick={() => setIsOpen(false)} to="/dashboard/home" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaHome /> Overview
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/dashboard/addVehicles" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaPlusCircle /> Add Vehicle
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/dashboard/myVehicles" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaCar /> My Vehicles
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/dashboard/myBookings" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaBookmark /> My Bookings
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/auth/myProfile" className={({ isActive }) => isActive ? activeClass : normalClass}>
                <FaUserCircle /> My Profile
            </NavLink>
        </>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 overflow-x-hidden">
            
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 hidden lg:flex flex-col p-6 sticky top-0 h-screen">
                <div className="mb-10 text-center">
                    <Link to="/" className="text-2xl font-bold text-error">TravelEase</Link>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">User Dashboard</p>
                </div>
                <nav className="flex flex-col gap-2 flex-1">
                    {navLinks}
                </nav>
                <div className="mt-auto border-t pt-4">
                    <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-error transition-all text-sm font-semibold">
                        <FaArrowLeft /> Back to Home
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar (Overlay/Drawer) */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
                
                {/* Mobile Menu Content */}
                <aside className={`absolute left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-10">
                        <Link to="/" className="text-xl font-bold text-error font-bold">TravelEase</Link>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 text-xl"><FaTimes /></button>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {navLinks}
                    </nav>
                </aside>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white dark:bg-slate-800 p-4 border-b dark:border-gray-700 flex justify-between items-center sticky top-0 z-40">
                    <button onClick={() => setIsOpen(true)} className="text-gray-600 dark:text-gray-300 text-2xl p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                        <FaBars />
                    </button>
                    <span className="font-bold text-error text-lg">TravelEase Dashboard</span>
                    <div className="w-8"></div>
                </header>
                
                <main className="p-4 md:p-8 lg:p-12">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;