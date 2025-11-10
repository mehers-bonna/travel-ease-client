import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const UpdateVehicle = () => {


  const navigate = useNavigate();
  const data = useLoaderData();
  const travel = data.result;
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
          vehicleName: e.target.vehicleName.value,
          category: e.target.category.value,
          description: e.target.description.value,
          pricePerDay: e.target.pricePerDay.value,
          coverImage: e.target.coverImage.value,
          availability: e.target.availability.value,
          
          
        }
        
        fetch(`http://localhost:3000/travels/${travel._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            toast.success("Successfully added!")
            navigate(`/viewDetails/${travel._id}`);
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
  }


  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl my-5">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Update Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/*Vehicle Name Field */}
          <div>
            <label className="label font-medium">Vehicle Name</label>
            <input
              type="text"
              defaultValue={travel.vehicleName}
              name="vehicleName"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter vehicle name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <input
              type="text"
              defaultValue={travel.category}
              name="category"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter category"
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
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              defaultValue={travel.description}
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
              defaultValue={travel.pricePerDay}
              name="pricePerDay"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Price"
            />
          </div>

          {/* coverImage URL */}
          <div>
            <label className="label font-medium">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              defaultValue={travel.coverImage}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button

            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-error hover:bg-pink-600"
          >
            Update Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicle;