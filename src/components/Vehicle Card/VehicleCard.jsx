import React from 'react';
import { Link } from 'react-router';

const VehicleCard = ({vehicle}) => {
     const {vehicleName, coverImage, category, description, _id, owner, pricePerDay} = vehicle
    return (
     <div className="card w-full my-10 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicleName}</h2>
        <div className="badge text-xs badge-xs badge-secondary rounded-full">{category}</div>
        <div className="text-sm text-error">{owner}</div>
        <p>PricePerDay: {pricePerDay}</p>
        <p className="line-clamp-1">
            {description}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-4 text-sm text-base-content/60">
          </div>
          <Link to={`/viewDetails/${_id}`} className="btn rounded-full bg-error hover:bg-pink-700 text-white w-full btn-sm">View Details</Link>
        </div>
      </div>
    </div>
    );
};

export default VehicleCard;