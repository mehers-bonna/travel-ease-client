import React from 'react';
import Banner from '../../components/Banner/Banner';
import { useLoaderData } from 'react-router';
import VehicleCard from '../../components/Vehicle Card/VehicleCard';

const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <div className='text-center text-error font-bold text-2xl'>Latest Vehicles</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 w-10/12 mx-auto'>
                {data.map(vehicle => <VehicleCard key={vehicle._id}  vehicle={vehicle}></VehicleCard>)}
            </div>
        </div>
    );
};

export default Home;