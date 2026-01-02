import React, { useEffect, useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import VehicleCard from '../../components/Vehicle Card/VehicleCard';
import Spinner from '../../components/Spinner/Spinner';

const AllVehicles = () => {
    const allData = useLoaderData(); 
    const [loading, setLoading] = useState(true);

    // States for Search, Filter & Sort
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    const filteredAndSortedData = useMemo(() => {
        let filtered = [...allData].filter(item => {
            const matchesSearch = item.vehicleName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesPrice = maxPrice === '' || parseFloat(item.pricePerDay) <= parseFloat(maxPrice);
            return matchesSearch && matchesCategory && matchesPrice;
        });

        if (sortOrder === 'asc') {
            filtered.sort((a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay));
        } else if (sortOrder === 'desc') {
            filtered.sort((a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay));
        } else if (sortOrder === 'default') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
        }
        return filtered;
    }, [allData, searchQuery, selectedCategory, maxPrice, sortOrder]);

    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, maxPrice]);

    if (loading) return <Spinner />;

    return (
        <div className="w-10/12 mx-auto px-4 py-10">
            <div className="text-error text-3xl text-center font-bold">All Vehicles</div>
            <p className="text-center mb-8">Explore Your Vehicle.</p>

            {/* --- Search, Filter & Sort Bar --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-base-200 p-6 rounded-2xl shadow-sm">
                
                {/* Search Input */}
                <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-gray-500">Search Vehicle</label>
                    <input 
                        type="text" 
                        placeholder="Type name..." 
                        className="input input-bordered rounded-full focus:border-error outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Category Filter */}
                <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-gray-500">Category</label>
                    <select 
                        className="select select-bordered rounded-full"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Phoenix Bicycle">Phoenix Bicycle</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Toyota Corolla">Toyota Corolla</option>
                        <option value="Mini Bus">Mini Bus</option>
                        <option value="Helicopter">Helicopter</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Truck">Truck</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Van">Van</option>
                        <option value="CNG/Auto">CNG/Auto</option>
                        <option value="Electric Car">Electric Car</option>
                        <option value="Bike">Bike</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Sedan">Sedan</option>
                    </select>
                </div>

                {/* Price Range Filter */}
                <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-gray-500">Max Price/Day</label>
                    <input 
                        type="number" 
                        placeholder="Budget limit..." 
                        className="input input-bordered rounded-full focus:border-error outline-none"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                {/* Sort Order */}
                <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-gray-500">Sort By</label>
                    <select 
                        className="select select-bordered rounded-full"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Newest First</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* --- Display Section --- */}
            {currentItems.length > 0 ? (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                        {currentItems.map(vehicle => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle} />
                        ))}
                    </div>

                    {/* --- Pagination Controls --- */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12 join">
                            <button 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="join-item btn btn-outline btn-error"
                            >
                                « Previous
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`join-item btn btn-outline btn-error ${currentPage === index + 1 ? 'btn-active !text-white' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button 
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="join-item btn btn-outline btn-error"
                            >
                                Next »
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-400">No vehicles found!</h2>
                    <button 
                        onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setMaxPrice('');}}
                        className="btn btn-link text-error"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllVehicles;