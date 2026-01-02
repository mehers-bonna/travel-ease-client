import React, { use, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import profileImg from '../../assets/profile.jpg';
import travelLogo from '../../assets/travelLogo.jpg';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
    const navigate = useNavigate();

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                toast.success("You logged out successfully.");
                navigate("/");
            }).catch((error) => {
                toast.error(error.message);
            });
    };

    // NavLink Styles
    const linkStyles = ({ isActive }) =>
        isActive ? "text-error font-bold underline" : "hover:text-error transition-colors";

    // Common Links (Visible to all)
    const commonLinks = (
        <>
            <li><NavLink to='/' className={linkStyles}>Home</NavLink></li>
            <li><NavLink to='/allVehicles' className={linkStyles}>All Vehicles</NavLink></li>
            <li><NavLink to='/aboutTravelEase' className={linkStyles}>About Us</NavLink></li>
            <li><NavLink to='/termsAndConditions' className={linkStyles}>Terms/Conditions</NavLink></li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-md shadow-sm">
            <div className="navbar w-10/12 mx-auto px-0">
                <div className="navbar-start">
                    {/* Mobile Dropdown */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
                            {commonLinks}
                            {user && (
                                <>
                                    <li><NavLink to='/dashboard/home' className={linkStyles}>Dashboard</NavLink></li>
                                    <li><NavLink to='/featuredOwner' className={linkStyles}>Featured Owner</NavLink></li>
                                </>
                            )}
                        </ul>
                    </div>
                    
                    {/* Logo & Theme Toggle */}
                    <div className="flex items-center gap-2">
                        <img className='h-10 w-10 rounded-full object-cover' src={travelLogo} alt="Logo" />
                        <Link to='/' className="hidden sm:block text-error text-2xl font-bold">TravelEase</Link>
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={(e) => handleTheme(e.target.checked)}
                            className="toggle toggle-error toggle-sm ml-2"
                        />
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6 font-medium">
                        {commonLinks}
                        {user && (
                            <>
                                <li><NavLink to='/dashboard/home' className={linkStyles}>Dashboard</NavLink></li>
                                <li><NavLink to='/featuredOwner' className={linkStyles}>Featured Owner</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Navbar End - Auth Logic */}
                <div className="navbar-end gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-error/20 hover:border-error">
                                <div className="w-10 rounded-full" title={user?.displayName}>
                                    <img src={user?.photoURL || profileImg} alt="User profile" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-xl w-56 border border-base-200">
                                <div className="px-2 pb-2 mb-2 border-b border-base-200">
                                    <p className="font-bold text-error">{user?.displayName}</p>
                                    <p className="text-xs opacity-70 truncate">{user?.email}</p>
                                </div>
                                <li><Link to="/dashboard/home">My Dashboard</Link></li>
                                <li><Link to="/auth/myProfile">View Profile</Link></li>
                                <li className="mt-2">
                                    <button onClick={handleLogOut} className="btn btn-error btn-sm text-white hover:bg-pink-600">Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to='/auth/login' className="btn btn-error btn-sm text-white px-5 shadow-md hidden sm:flex">Login</Link>
                            <Link to='/auth/register' className="btn btn-error btn-sm text-white px-5 shadow-md">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;