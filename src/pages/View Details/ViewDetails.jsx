import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const ViewDetails = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [travel, setTravel] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {};
    if (user?.accessToken) {
      headers.authorization = `Bearer ${user.accessToken}`;
    }

    fetch(`https://travel-ease-server-seven.vercel.app/travels/${id}`, { headers })
      .then(res => res.json())
      .then(data => {
        if(data.result) {
            setTravel(data.result);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user, id]);

  const handleBookNow = () => {
    if (!user) {
        toast.error('You must be logged in to book!');
        return navigate('/auth/login');
    }

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
        toast.success('Successfully Booked!!');
        navigate('/dashboard/myBookings');
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  if (loading) return <Spinner />;
  if (!travel?.vehicleName) return <div className='text-center py-20'>Vehicle Not Found!</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={travel.coverImage}
              alt={travel.vehicleName}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {travel.vehicleName}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-[#FF5A6E] border-[#FF5A6E] font-medium">
                {travel.category}
              </div>
              <div className="badge badge-lg badge-outline text-[#FF5A6E] border-[#FF5A6E] font-medium">
                Owner: {travel.owner}
              </div>
            </div>

            <p className="text-xl font-bold text-slate-700">Price Per Day: ${travel.pricePerDay}</p>
            <p className="text-gray-600 leading-relaxed text-base">{travel.description}</p>

            <div className="flex gap-3 mt-6">
              {user && (
                <Link
                  to={`/dashboard/updateVehicle/${travel._id}`}
                  className="btn rounded-full bg-slate-200 text-slate-800 border-0 hover:bg-slate-300"
                >
                  Update Vehicle
                </Link>
              )}
              <button onClick={handleBookNow}
                className="btn flex-1 rounded-full bg-[#FF5A6E] text-white border-0 hover:bg-pink-600"
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