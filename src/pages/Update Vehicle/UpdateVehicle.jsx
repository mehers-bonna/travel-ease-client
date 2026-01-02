import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthContext';
import { getIdToken } from 'firebase/auth';

const UpdateVehicle = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [travel, setTravel] = useState(null);
  const [formData, setFormData] = useState({
    vehicleName: '',
    category: '',
    description: '',
    pricePerDay: '',
    coverImage: '',
    availability: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return; 

    const fetchTravel = async () => {
      setLoading(true);
      try {
        const token = await getIdToken(user);
        console.log("Firebase token:", token);

        const res = await fetch(`https://travel-ease-server-seven.vercel.app/travels/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Fetched travel:", data);

        if (data?.result) {
          setTravel(data.result);
          setFormData({
            vehicleName: data.result.vehicleName || '',
            category: data.result.category || '',
            description: data.result.description || '',
            pricePerDay: data.result.pricePerDay || '',
            coverImage: data.result.coverImage || '',
            availability: data.result.availability || '',
          });
        } else {
          toast.error('Vehicle not found or unauthorized');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error('Failed to load vehicle data');
      } finally {
        setLoading(false);
      }
    };

    fetchTravel();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!travel?._id) {
      toast.error('Travel data not loaded yet!');
      return;
    }

    setLoading(true);

    try {
      const token = await getIdToken(user);

      const res = await fetch(`https://travel-ease-server-seven.vercel.app/travels/${travel._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Update response:", data);

      if (res.ok) {
        toast.success('Vehicle updated successfully!');
        navigate(`/viewDetails/${travel._id}`);
      } else {
        toast.error(data.message || 'Failed to update vehicle');
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error('Error updating vehicle');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !travel) return <Spinner />;

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl my-5">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Update Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="label font-medium">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleChange}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter vehicle name"
            />
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter category"
            />
          </div>

          <div>
            <label className="label font-medium">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>Select availability</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="label font-medium">Price Per Day</label>
            <input
              type="text"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="label font-medium">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

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
