import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import Spinner from '../../components/Spinner/Spinner';

const MyVehicles = () => {
    const { user } = use(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://travel-ease-server-seven.vercel.app/travels/${id}`, {
                    method: "DELETE",
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your vehicle has been deleted.",
                            icon: "success"
                        });

                        const remainingVehicles = vehicles.filter(v => v._id !== id);
                        setVehicles(remainingVehicles);
                    }
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire("Error!", "Something went wrong.", "error");
                });
            }
        });
    }

    useEffect(() => {
        fetch(`https://travel-ease-server-seven.vercel.app/myVehicles?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setVehicles(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, [user]);

    if (loading) return <Spinner />;

    return (
        <div className="py-10">
            <h1 className='text-3xl text-center text-error font-extrabold mb-8 uppercase tracking-wider'>
                My Vehicles
            </h1>
            
            {vehicles.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl">You haven't added any vehicles yet.</p>
                    <Link to="/dashboard/addVehicles" className="btn btn-error mt-4 text-white">Add Now</Link>
                </div>
            ) : (
                vehicles.map(vehicle => (
                    <div
                        key={vehicle._id}
                        className="flex flex-col md:flex-row items-center justify-between p-5 bg-white dark:bg-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl w-11/12 lg:w-3/4 mx-auto my-6 border border-gray-100 dark:border-gray-700"
                    >
                        {/* Left side Content */}
                        <div className="flex items-center w-full md:w-auto">
                            <img
                                src={vehicle.coverImage}
                                alt={vehicle.vehicleName}
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-sm mr-6"
                            />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{vehicle.vehicleName}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className='font-semibold text-error'>Category:</span> {vehicle.category}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className='font-semibold text-error'>Price:</span> ${vehicle.pricePerDay}/day
                                </p>
                            </div>
                        </div>

                        {/* Right side Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-6 md:mt-0 justify-center">
                            <Link to={`/viewDetails/${vehicle._id}`} className="btn btn-sm btn-outline btn-error rounded-full">
                                View
                            </Link>
                            <Link to={`/dashboard/updateVehicle/${vehicle._id}`} className="btn btn-sm btn-error text-white rounded-full">
                                Update
                            </Link>
                            <button onClick={() => handleDelete(vehicle._id)} className="btn btn-sm bg-gray-200 hover:bg-red-100 hover:text-red-600 border-0 rounded-full text-gray-700">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyVehicles;