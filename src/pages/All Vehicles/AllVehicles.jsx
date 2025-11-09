import React from 'react';
import { useLoaderData } from 'react-router';
import VehicleCard from '../../components/Vehicle Card/VehicleCard';

const AllVehicles = () => {

    const data = useLoaderData()
    console.log(data)

    return (
        <div>
            <div className="text-2xl text-center font-bold"> All Vehicles</div>
            <p className=" text-center ">Explore Your Vehicle.</p>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 '>
                {data.map(vehicle => <VehicleCard key={vehicle._id}  vehicle={vehicle}></VehicleCard>)}
            </div>
        </div>
    );
};

export default AllVehicles;