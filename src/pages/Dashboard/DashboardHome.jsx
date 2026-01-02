import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        myVehiclesCount: 0,
        myBookingsCount: 0,
        loading: true
    });

    useEffect(() => {
        if (user?.email) {
            const fetchStats = async () => {
                try {
                    const token = await user.getIdToken();
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };

                    const [vehiclesRes, bookingsRes] = await Promise.all([
                        axios.get(`https://travel-ease-server-seven.vercel.app/myVehicles?email=${user.email}`, config),
                        axios.get(`https://travel-ease-server-seven.vercel.app/myBookings?email=${user.email}`, config)
                    ]);

                    setStats({
                        myVehiclesCount: vehiclesRes.data.length,
                        myBookingsCount: bookingsRes.data.length,
                        loading: false
                    });
                } catch (error) {
                    console.error("Error fetching stats:", error);
                    setStats(prev => ({ ...prev, loading: false }));
                }
            };

            fetchStats();
        }
    }, [user]);

    const data = [
        { name: 'My Listings', count: stats.myVehiclesCount },
        { name: 'My Bookings', count: stats.myBookingsCount },
    ];

    const COLORS = ['#FF5A5F', '#0088FE'];

    if (stats.loading) {
        return <div className="text-center mt-20 font-bold text-error">Loading Dashboard Data...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {user?.displayName || 'User'}!</h2>
                <p className="text-gray-500 dark:text-gray-400">Here is what's happening with your account.</p>
            </div>

            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-gray-500 uppercase">Total Listed Vehicles</p>
                    <h3 className="text-4xl font-extrabold text-error mt-2">{stats.myVehiclesCount}</h3>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-gray-500 uppercase">Vehicles You Booked</p>
                    <h3 className="text-4xl font-extrabold text-blue-500 mt-2">{stats.myBookingsCount}</h3>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-gray-500 uppercase">Profile Status</p>
                    <h3 className="text-4xl font-extrabold text-green-500 mt-2">Active</h3>
                </div>
            </div>

            {/* Dynamic Chart Section */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-6 text-gray-700 dark:text-white text-center md:text-left">Your Activity Overview</h3>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="count" barSize={60} radius={[10, 10, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;