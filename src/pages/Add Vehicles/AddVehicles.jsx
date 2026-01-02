import React, { use, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';
import { FaCar, FaMapMarkerAlt, FaDollarSign, FaImage, FaEnvelope, FaInfoCircle } from 'react-icons/fa';

const AddVehicles = () => {
  const { user } = use(AuthContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);

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

    fetch('https://travel-ease-server-seven.vercel.app/travels', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Successfully added!")
        navigate("/")
      })
      .catch(err => { console.log(err) })
      .finally(() => { setLoading(false); });
  }

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-error to-pink-500 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Add New Vehicle</h2>
          <p className="text-pink-100 mt-2">Fill in the details to list your vehicle on TravelEase</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vehicle Name */}
            <div className="form-control">
              <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Vehicle Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400"><FaCar /></span>
                <input name="vehicleName" type="text" placeholder="e.g. Toyota Corolla" required className="input input-bordered w-full pl-12 rounded-xl focus:ring-2 focus:ring-error transition-all" />
              </div>
            </div>

            {/* Owner Name */}
            <div className="form-control">
              <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Owner Name</label>
              <input name="owner" type="text" placeholder="Enter owner name" required className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-error" />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Category</label>
              <select name="category" defaultValue="" required className="select select-bordered w-full rounded-xl">
                <option value="" disabled>Select category</option>
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

            {/* Price Per Day */}
            <div className="form-control">
              <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Price Per Day</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400"><FaDollarSign /></span>
                <input name="pricePerDay" type="number" placeholder="Enter price" required className="input input-bordered w-full pl-12 rounded-xl" />
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Location</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400"><FaMapMarkerAlt /></span>
                <input name="location" type="text" placeholder="e.g. Dhaka, Bangladesh" required className="input input-bordered w-full pl-12 rounded-xl" />
              </div>
            </div>

            {/* Availability */}
            <div className="form-control">
              <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Availability Status</label>
              <select name="availability" defaultValue="" required className="select select-bordered w-full rounded-xl">
                <option value="" disabled>Select availability</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
          </div>

          {/* User Email */}
          <div className="form-control">
            <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">User Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400"><FaEnvelope /></span>
              <input name="userEmail" type="email" defaultValue={user?.email} required className="input input-bordered w-full pl-12 rounded-xl bg-gray-50 cursor-not-allowed" />
            </div>
          </div>

          {/* Cover Image URL */}
          <div className="form-control">
            <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Cover Image URL</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400"><FaImage /></span>
              <input name="coverImage" type="url" placeholder="https://example.com/image.jpg" required className="input input-bordered w-full pl-12 rounded-xl" />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label text-sm font-bold text-gray-600 dark:text-gray-300">Description</label>
            <div className="relative">
              <span className="absolute top-4 left-4 text-gray-400"><FaInfoCircle /></span>
              <textarea name="description" placeholder="Write something about the vehicle..." required className="textarea textarea-bordered w-full pl-12 rounded-2xl h-32 focus:ring-2 focus:ring-error"></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="btn btn-error w-full text-white rounded-xl py-4 h-auto text-lg font-bold shadow-lg shadow-pink-200 dark:shadow-none hover:scale-[1.02] transition-transform">
              Add Vehicle
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddVehicles;