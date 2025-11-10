import React from 'react';
import { Link, useLoaderData } from 'react-router';

const ViewDetails = () => {
    const data = useLoaderData()
    const travel = data.result
    console.log(travel)


    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={travel.coverImage}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {travel.vehicleName}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
               {travel.category}
              </div>

              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {travel.owner}
              </div>
            </div>

            <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                PricePerDay: {travel.pricePerDay}
              </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {travel.description}
            </p>
            
            <div className="flex gap-3 mt-6">
              <Link
                to={`/updateVehicle/${travel._id}`}
                className="btn btn-primary rounded-full bg-error text-white border-0 hover:bg-pink-600"
              >
                Update Vehicle
              </Link>
              <button
                className="btn btn-primary rounded-full bg-error text-white border-0 hover:bg-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ViewDetails;