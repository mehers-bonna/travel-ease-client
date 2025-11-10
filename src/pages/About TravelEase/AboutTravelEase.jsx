import React from 'react';
import travelEase from '../../assets/travelEase.jpg';

const AboutTravelEase = () => {
    return (
         <div className="max-w-3xl mx-auto p-4 md:p-8">
            <section className="bg-base-200 p-6 rounded-2xl shadow-lg flex flex-col items-center gap-6">
                <img
                    src={travelEase}
                    alt="TravelEase"
                    className="w-full max-w-md h-64 md:h-80 object-cover rounded-lg"
                />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error mb-2">About TravelEase</h2>
                    <p className="text-gray-700 mt-2">
                        TravelEase is your trusted platform for renting vehicles across Bangladesh. 
                        We connect travelers with verified vehicle owners to provide a smooth, reliable, 
                        and enjoyable travel experience. Whether you need a car, bike, or van, TravelEase 
                        makes booking simple and safe.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutTravelEase;