import React from 'react';

const FeaturedOwner = () => {

    const featuredOwner = {
        vehicleName: "Nissan Leaf",
        owner: "Jannat Akter",
        category: "Electric Car",
        coverImage: "https://i.ibb.co/8nqbMc5K/vehicle4.jpg",
        description: "Jannat Akter is a trusted owner providing eco-friendly electric cars. Her vehicles are well-maintained, reliable, and perfect for city trips."
    };


    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8">
            <section className="bg-base-200 p-6 rounded-2xl shadow-lg flex flex-col items-center gap-6">
                <img
                    src={featuredOwner.coverImage}
                    alt={featuredOwner.owner}
                    className="w-full max-w-md h-64 md:h-80 object-cover rounded-lg"
                />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-error mb-2">Featured Owner</h2>
                    <h3 className="text-xl font-semibold text-blue-600">{featuredOwner.owner}</h3>
                    <p className="text-gray-700 mt-2">{featuredOwner.description}</p>
                    <p className="mt-2 font-medium text-red-700">Vehicle: {featuredOwner.vehicleName} ({featuredOwner.category})</p>
                </div>
            </section>
        </div>
    );
};

export default FeaturedOwner;