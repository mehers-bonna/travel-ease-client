import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const ViewDetails = () => {
  const { user } = use(AuthContext)
  // const data = useLoaderData()
  // const travel = data.result
  // console.log(travel)
  const navigate = useNavigate();
  const { id } = useParams()
  const [travel, setTravel] = useState({})
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://travel-ease-server-seven.vercel.app/travels/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setTravel(data.result)
        setLoading(false)
      })
  }, [user, id])

  const handleBookNow = () => {
    setLoading(true);
    const { _id, ...rest } = travel;
    fetch(`https://travel-ease-server-seven.vercel.app/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...rest, userEmail: user.email })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast.success('Successfully Booked!!')
        navigate('/allVehicles')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  }
  if (loading) {
    return <Spinner />;
  }
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
                to={`/dashboard/updateVehicle/${travel._id}`}
                className="btn btn-primary rounded-full bg-error text-white border-0 hover:bg-pink-600"
              >
                Update Vehicle
              </Link>
              <button onClick={handleBookNow}
                className="btn btn-primary rounded-full bg-error text-white border-0 hover:bg-pink-600"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;