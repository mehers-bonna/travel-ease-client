import React from 'react';
import { FaCheckCircle, FaStar, FaQuoteLeft, FaCarSide } from 'react-icons/fa';

const FeaturedOwner = () => {
    const featuredOwner = {
        vehicleName: "Nissan Leaf",
        owner: "Jannat Akter",
        category: "Electric Car",
        ownerImage: "https://i.ibb.co/8nqbMc5K/vehicle4.jpg", 
        description: "Jannat Akter is a top-rated host on TravelEase. Known for her punctuality and perfectly maintained eco-friendly vehicles, she has successfully completed 50+ rentals with zero complaints.",
        rating: 5.0,
        trips: 54
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 font-sans">
            {/* Main Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-pink-100 border border-pink-50">
                
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF5A6E]/5 blur-[100px] -mr-36 -mt-36 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF5A6E]/10 blur-[100px] -ml-36 -mb-36 rounded-full"></div>

                <div className="relative flex flex-col lg:flex-row items-stretch">
                    
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 h-[350px] lg:h-auto relative">
                        <img
                            src={featuredOwner.ownerImage}
                            alt={featuredOwner.owner}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white hidden lg:block"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden"></div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-8 left-8 flex items-center gap-2 bg-[#FF5A6E] px-5 py-2.5 rounded-full shadow-lg shadow-pink-200">
                            <span className="flex h-2.5 w-2.5 rounded-full bg-white animate-pulse"></span>
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Top Rated Host</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
                        <div className="flex items-center gap-3 text-[#FF5A6E] mb-6">
                            <FaQuoteLeft className="text-4xl opacity-20" />
                            <span className="uppercase tracking-[0.3em] text-xs font-black">Owner Spotlight</span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                                {featuredOwner.owner}
                            </h2>
                            <FaCheckCircle className="text-[#FF5A6E] text-3xl" title="Verified Professional" />
                        </div>

                        <p className="text-slate-500 text-lg leading-relaxed mb-10 italic font-medium">
                            "{featuredOwner.description}"
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-1 mb-12 p-1 bg-pink-50/50 rounded-3xl border border-pink-100">
                            <div className="py-6 text-center border-r border-pink-100">
                                <p className="text-[#FF5A6E] font-black text-2xl md:text-3xl">{featuredOwner.rating}</p>
                                <div className="flex justify-center text-[#FF5A6E] text-[10px] mt-2 gap-0.5">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                            </div>
                            <div className="py-6 text-center border-r border-pink-100">
                                <p className="font-black text-2xl md:text-3xl text-slate-800">{featuredOwner.trips}+</p>
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Trips</p>
                            </div>
                            <div className="py-6 text-center">
                                <p className="font-black text-2xl md:text-3xl text-[#FF5A6E]">100%</p>
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Response</p>
                            </div>
                        </div>

                        {/* Fleet Highlight */}
                        <div className="group flex items-center gap-5 bg-pink-50/30 p-5 rounded-2xl border border-pink-100 hover:bg-[#FF5A6E]/5 transition-all duration-500 cursor-default">
                            <div className="p-4 bg-[#FF5A6E] rounded-xl shadow-md shadow-pink-200">
                                <FaCarSide className="text-3xl text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Main Fleet</p>
                                <p className="text-xl font-bold text-slate-800 group-hover:text-[#FF5A6E] transition-colors">
                                    {featuredOwner.vehicleName} <span className="text-pink-200 mx-2">|</span> 
                                    <span className="text-sm font-medium text-slate-500">{featuredOwner.category}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedOwner;