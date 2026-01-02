import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [counts, setCounts] = useState({
        bookings: 0,
        vehicles: 0,
        loading: true
    });

    useEffect(() => {
        if (user?.email) {
            const fetchUserStats = async () => {
                try {
                    // Firebase Token সংগ্রহ (ব্যাকএন্ড verifyToken এর জন্য)
                    const token = await user.getIdToken();
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };

                    // My Vehicles এবং My Bookings ডেটা ফেচ করা
                    const [vehiclesRes, bookingsRes] = await Promise.all([
                        axios.get(`https://travel-ease-server-seven.vercel.app/myVehicles?email=${user.email}`, config),
                        axios.get(`https://travel-ease-server-seven.vercel.app/myBookings?email=${user.email}`, config)
                    ]);

                    setCounts({
                        vehicles: vehiclesRes.data.length,
                        bookings: bookingsRes.data.length,
                        loading: false
                    });
                } catch (error) {
                    console.error("Error loading profile stats:", error);
                    setCounts(prev => ({ ...prev, loading: false }));
                }
            };

            fetchUserStats();
        }
    }, [user]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Cover Photo Placeholder */}
            <div className="h-40 w-full bg-gradient-to-r from-error to-pink-500 rounded-t-2xl relative">
                <div className="absolute -bottom-16 left-10">
                    <img 
                        src={user?.photoURL || "https://i.ibb.co/bc9996n/user.png"} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                    />
                </div>
            </div>

            <div className="mt-20 px-10 pb-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">{user?.displayName || "Anonymous User"}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <hr className="my-8 opacity-20" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-sm text-gray-400 uppercase font-bold">Full Name</label>
                        <p className="text-lg font-medium dark:text-gray-200 mt-1">{user?.displayName || "N/A"}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 uppercase font-bold">Email Address</label>
                        <p className="text-lg font-medium dark:text-gray-200 mt-1">{user?.email}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 uppercase font-bold">Account Status</label>
                        <p className="mt-1"><span className="badge badge-success text-white p-3 border-none">Verified User</span></p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 uppercase font-bold">Last Login</label>
                        <p className="text-lg font-medium dark:text-gray-200 mt-1">
                            {user?.metadata?.lastSignInTime ? new Date(user?.metadata?.lastSignInTime).toLocaleDateString() : "Today"}
                        </p>
                    </div>
                </div>

                {/* ডাইনামিক স্ট্যাট সেকশন */}
                <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                        <span className="block text-2xl font-bold text-error">
                            {counts.loading ? "..." : counts.bookings < 10 ? `0${counts.bookings}` : counts.bookings}
                        </span>
                        <span className="text-xs text-gray-400 uppercase font-bold">Bookings</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                        <span className="block text-2xl font-bold text-error">
                            {counts.loading ? "..." : counts.vehicles < 10 ? `0${counts.vehicles}` : counts.vehicles}
                        </span>
                        <span className="text-xs text-gray-400 uppercase font-bold">Vehicles</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                        <span className="block text-2xl font-bold text-error">4.8</span>
                        <span className="text-xs text-gray-400 uppercase font-bold">Rating</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;