import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import { useLoaderData } from 'react-router';
import VehicleCard from '../../components/Vehicle Card/VehicleCard';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
    const data = useLoaderData()
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState([]);
    // console.log(data)
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setVehicles(data);
            setLoading(false);
        }, 300);
    }, [data]);

    if (loading) {
        return <Spinner />;
    }
    return (
        <div>
            <div className='text-center text-error font-bold text-2xl'>Latest Vehicles</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 w-10/12 mx-auto'>
                {vehicles.map(vehicle => <VehicleCard key={vehicle._id}  vehicle={vehicle}></VehicleCard>)}
            </div>
        </div>
    );
};

export default Home;