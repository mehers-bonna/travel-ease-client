import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import VehicleCard from '../../components/Vehicle Card/VehicleCard';
import Spinner from '../../components/Spinner/Spinner';

const AllVehicles = () => {

    const data = useLoaderData()
    const [loading, setLoading] = useState(true);
    // console.log(data)

     const [sortOrder, setSortOrder] = useState('default');
    const [displayData, setDisplayData] = useState([]);

    const shuffleArray = (array) => {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    useEffect(() => {
        setLoading(true);

        let newData = [...data];
        if (sortOrder === 'asc') {
            newData.sort((a, b) => a.pricePerDay - b.pricePerDay);
        } else if (sortOrder === 'desc') {
            newData.sort((a, b) => b.pricePerDay - a.pricePerDay);
        } else {
            newData = shuffleArray(newData); 
        }
        setDisplayData(newData);

        setTimeout(() => {
            setDisplayData(newData);
            setLoading(false);
            }, 300); 
    }, [sortOrder, data]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <div className="text-error text-2xl text-center font-bold"> All Vehicles</div>
            <p className=" text-center ">Explore Your Vehicle.</p>


            <div className="text-center my-4">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border-2 px-3 py-2 rounded-full text-lg w-90 focus:outline-none focus:ring-2 focus:error"
                >
                    <option value="default">Sort: Random</option>
                    <option value="asc">PricePerDay: Low to High</option>
                    <option value="desc">PricePerDay: High to Low</option>
                </select>
            </div>



            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 w-10/12 mx-auto'>
                {displayData.map(vehicle => <VehicleCard key={vehicle._id}  vehicle={vehicle}></VehicleCard>)}
            </div>
        </div>
    );
};

export default AllVehicles;