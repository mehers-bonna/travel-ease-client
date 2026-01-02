import React from 'react';
import travelEase from '../../assets/travelEase.jpg';

const AboutTravelEase = () => {
    return (
        <div className="bg-base-100 py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative group">
                    <div className="absolute -inset-2 bg-error opacity-10 rounded-2xl group-hover:opacity-20 transition duration-500"></div>
                    <img
                        src={travelEase}
                        alt="TravelEase Fleet"
                        className="relative w-full h-[300px] md:h-[450px] object-cover rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-[1.01]"
                    />
                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl hidden md:block">
                        <p className="text-error font-bold text-xl">500+ Vehicles</p>
                        <p className="text-gray-500 text-sm">Trusted by Travelers</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div className="inline-block px-4 py-1 rounded-full bg-error/10 text-error font-medium text-sm">
                        Who We Are
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                        Your Ultimate Partner for <span className="text-error">Seamless Journeys</span>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        TravelEase is not just a rental platform; it's your gateway to exploring 
                        Bangladesh with freedom. We bridge the gap between reliable vehicle owners 
                        and enthusiastic travelers, ensuring every mile you cover is safe, comfortable, 
                        and memorable.
                    </p>

                    {/* Features/Stats Grid */}
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="border-l-4 border-error pl-4">
                            <h4 className="text-2xl font-bold text-gray-800">Fast Booking</h4>
                            <p className="text-gray-500 text-sm">Book your ride in less than 2 minutes.</p>
                        </div>
                        <div className="border-l-4 border-error pl-4">
                            <h4 className="text-2xl font-bold text-gray-800">Verified Hosts</h4>
                            <p className="text-gray-500 text-sm">Every vehicle & owner is strictly verified.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutTravelEase;