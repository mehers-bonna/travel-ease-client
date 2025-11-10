import React from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

const AddVehicles = () => {
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      vehicleName: e.target.vehicleName.value,
      owner: e.target.owner.value,
      category: e.target.category.value,
      location: e.target.location.value,
      availability: e.target.availability.value,
      description: e.target.description.value,
      pricePerDay: e.target.pricePerDay.value,
      coverImage: e.target.coverImage.value,
      userEmail: e.target.userEmail.value,
      createdAt: new Date(),
      categories: "Hybrid",
    }
    
    fetch('http://localhost:3000/travels', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        toast.success("Successfully added!")
         navigate("/")
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })

   

  }
    return (
        <div className="card border border-gray-200 bg-base-100 w-50% max-w-md mx-auto shadow-2xl rounded-2xl my-5">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/*Vehicle Name Field */}
          <div>
            <label className="label font-medium">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>
          {/* owner Name */}
          <div>
            <label className="label font-medium">Owner Name</label>
            <input
              type="text"
              name="owner"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={""}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Yamaha Bike">Yamaha Bike</option>
              <option value="Honda Bike">Honda Bike</option>
              <option value="Phoenix Bicycle">Phoenix Bicycle</option>
              <option value="Helicopter">Helicopter</option>
              <option value="Toyota HiAce Bus">Toyota HiAce Bus</option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Toyota Corolla">Toyota Corolla</option>
              <option value="Isuzu Truck">Isuzu Truck</option>
            </select>
          </div>

          {/* location */}
          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Location"
            />
          </div>
          {/* availability */}
          <div>
            <label className="label font-medium">Availability</label>
            <select
              defaultValue={""}
              name="availability"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select availability
              </option>
              <option value="Vehicles">Available</option>
              <option value="Plants">Booked</option>
            </select>
          </div>
          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Price Per Day */}

          <div>
            <label className="label font-medium">PricePerDay</label>
            <input
              type="text"
              name="pricePerDay"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Price"
            />
          </div>


          {/* Cover Image */}
          <div>
            <label className="label font-medium">CoverImage</label>
            <input
              type="url"
              name="coverImage"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* user email */}

          <div>
            <label className="label font-medium">User Email</label>
            <input
              type="text"
              name="userEmail"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-error hover:bg-pink-600"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
    );
};

export default AddVehicles;