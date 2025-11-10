import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyVehicles = () => {
    const { user } = use(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

                fetch(`http://localhost:3000/travels/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        console.log(data)
                        navigate('/allVehicles')
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        });
    }


    useEffect(() => {
        fetch(`http://localhost:3000/myVehicles?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setVehicles(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>please wait...loading</div>
    }
    return (
        <div>
            <h1 className='text-2xl text-center text-error font-bold'>My Vehicles</h1>
            {vehicles.map(vehicle => (
                <div
                    key={vehicle._id}
                    className="flex items-center justify-between p-4 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-xl w-10/12 mx-auto my-4"
                >
                    {/* Left side Image */}
                    <div className="flex items-center">
                        <img
                            src={vehicle.coverImage}
                            alt={vehicle.vehicleName}
                            className="w-24 h-24 object-cover rounded-lg mr-4"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">{vehicle.vehicleName}</h2>
                            <p className="text-error">{vehicle.owner}</p>
                        </div>
                    </div>

                    {/* Right side Button */}
                    <div className="flex space-x-2">
                        <Link to={`/viewDetails/${vehicle._id}`} className="px-3 py-1 bg-error text-white rounded-full hover:bg-pink-600">
                            View Details
                        </Link>
                        <Link to={`/updateVehicle/${vehicle._id}`} className="px-3 py-1 bg-error text-white rounded-full hover:bg-pink-600">
                            Update Vehicle
                        </Link>
                        <button onClick={() => handleDelete(vehicle._id)} className="px-3 py-1 bg-error text-white rounded-full hover:bg-pink-600">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyVehicles;