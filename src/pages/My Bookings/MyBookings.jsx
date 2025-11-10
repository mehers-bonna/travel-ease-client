import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';

const MyBookings = () => {
    const { user } = use(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
    
    
    useEffect(() => {
            fetch(`http://localhost:3000/myBookings?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setVehicles(data)
                    setLoading(false)
                })
                .catch(err => {
                console.log(err);
                setLoading(false);
            });
        }, [user.email])
        if (loading) {
        return <Spinner />;
        }
    return (
        <div>
            <h1 className='text-2xl text-center text-error font-bold'>My Bookings</h1>
            {vehicles.map(vehicle => (
                <div
                    key={vehicle._id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-xl w-11/12 mx-auto my-4"
                >
                    {/* Left side Image */}
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <img
                            src={vehicle.coverImage}
                            alt={vehicle.vehicleName}
                            className="w-full md:w-24 h-48 md:h-24 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                        />
                        <div className="text-center md:text-left">
                            <h2 className="text-lg font-semibold">{vehicle.vehicleName}</h2>
                            <p className="text-error"><span className='font-bold text-black'>Owner Name:</span> {vehicle.owner}</p>
                        </div>
                    </div>

                    {/* Right side Button */}
                    <div className="flex flex-col justify-between items-center md:items-center space-y-4 mt-4 md:mt-0">
                        <h2 className="text-error "><span className='font-bold text-black'>Booked By: </span>{vehicle.userEmail}</h2>
                        <Link to='/' className="px-3 py-1 bg-error text-white rounded-full hover:bg-pink-600">
                            Go Back
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBookings;