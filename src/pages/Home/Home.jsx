import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import VehicleCard from '../../components/Vehicle Card/VehicleCard';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import { FaShieldAlt, FaHeadset, FaWallet } from 'react-icons/fa';
import Image1 from '../../assets/vehicle1.jpg';

const Home = () => {
    const data = useLoaderData();
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (data) {
            setVehicles(data);
            setLoading(false);
        }
    }, [data]);

    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if (email) {
            toast.success("Thank you for subscribing to our newsletter!");
            e.target.reset();
        } else {
            toast.error("Please enter a valid email address.");
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="overflow-hidden bg-white dark:bg-slate-950 space-y-12 md:space-y-20 py-10">

            {/* 1. Statistics Section */}
            <section className="w-10/12 mx-auto bg-white dark:bg-slate-900 py-12 border rounded-3xl dark:border-slate-800 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-[#FF5A6E]">150+</h3>
                        <p className="text-gray-500 uppercase text-[10px] md:text-xs mt-1 font-bold">Total Vehicles</p>
                    </div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-[#FF5A6E]">2k+</h3>
                        <p className="text-gray-500 uppercase text-[10px] md:text-xs mt-1 font-bold">Happy Rentals</p>
                    </div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-[#FF5A6E]">4.9</h3>
                        <p className="text-gray-500 uppercase text-[10px] md:text-xs mt-1 font-bold">User Rating</p>
                    </div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-[#FF5A6E]">24/7</h3>
                        <p className="text-gray-500 uppercase text-[10px] md:text-xs mt-1 font-bold">Support</p>
                    </div>
                </div>
            </section>

            {/* 2. Features Section */}
            <section className="w-10/12 mx-auto py-16 bg-gray-50 dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">Why TravelEase?</h2>
                    <p className="text-gray-500 mt-4 italic">"Your journey, our priority"</p>
                </div>
                <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center group">
                        <div className="w-16 h-16 bg-[#FF5A6E]/10 text-[#FF5A6E] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-[#FF5A6E] group-hover:text-white transition-all">
                            <FaShieldAlt />
                        </div>
                        <h4 className="text-xl font-bold mb-3 dark:text-white">Secured Booking</h4>
                        <p className="text-gray-500 text-sm">Your data and payments are 100% protected.</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center group">
                        <div className="w-16 h-16 bg-[#FF5A6E]/10 text-[#FF5A6E] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-[#FF5A6E] group-hover:text-white transition-all">
                            <FaWallet />
                        </div>
                        <h4 className="text-xl font-bold mb-3 dark:text-white">Best Price</h4>
                        <p className="text-gray-500 text-sm">Competitive prices and no hidden charges.</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center group">
                        <div className="w-16 h-16 bg-[#FF5A6E]/10 text-[#FF5A6E] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:bg-[#FF5A6E] group-hover:text-white transition-all">
                            <FaHeadset />
                        </div>
                        <h4 className="text-xl font-bold mb-3 dark:text-white">24/7 Support</h4>
                        <p className="text-gray-500 text-sm">Dedicated team here to help you anytime.</p>
                    </div>
                </div>
            </section>

            {/* 3. Latest Vehicles Section */}
            <section className="w-10/12 mx-auto">
                <div className='text-center mb-12'>
                    <span className="text-[#FF5A6E] font-bold tracking-widest uppercase text-sm">Our Fleet</span>
                    <h2 className='text-4xl font-extrabold mt-2 text-gray-800 dark:text-white'>Latest Vehicles</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {vehicles.slice(0, 6).map(vehicle => <VehicleCard key={vehicle._id} vehicle={vehicle}></VehicleCard>)}
                </div>
                <div className="text-center mt-12">
                    <Link to="/allVehicles" className="btn bg-[#FF5A6E] hover:bg-[#e44d5f] border-none text-white px-10 rounded-full shadow-lg">Explore All Vehicles</Link>
                </div>
            </section>

            {/* 4. How it Works Section */}
            <section className="w-10/12 mx-auto py-20 bg-[#FFF5F6] dark:bg-slate-900 rounded-[50px] px-8 border border-[#FF5A6E]/5">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-extrabold mb-12 text-slate-800 dark:text-white">How It Works?</h2>
                        <div className="space-y-10">
                            <div className="flex gap-6 items-start">
                                <span className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-[#FF5A6E] flex items-center justify-center font-bold text-xl shadow-sm border border-[#FF5A6E]/10">1</span>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800 dark:text-gray-200">Choose a Vehicle</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Select from our wide range of premium vehicles.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <span className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-[#FF5A6E] flex items-center justify-center font-bold text-xl shadow-sm border border-[#FF5A6E]/10">2</span>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800 dark:text-gray-200">Pick-up Date</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Select your journey date and duration.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <span className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-[#FF5A6E] flex items-center justify-center font-bold text-xl shadow-sm border border-[#FF5A6E]/10">3</span>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800 dark:text-gray-200">Enjoy Your Ride</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Confirm and hit the road with confidence!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF5A6E]/10 rounded-full blur-3xl"></div>
                        <img src={Image1} alt="Car" className="relative z-10 w-full rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </section>

            {/* 5. FAQ Section */}
            <section className="w-10/12 mx-auto py-20 px-4 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800">
                <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto space-y-4">
                    <div className="collapse collapse-plus bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-lg font-semibold dark:text-gray-200">How do I book a vehicle?</div>
                        <div className="collapse-content text-gray-500 dark:text-gray-400"><p>Simply login to your account and click the book button on your favorite vehicle.</p></div>
                    </div>
                    <div className="collapse collapse-plus bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-lg font-semibold dark:text-gray-200">What is the fuel policy?</div>
                        <div className="collapse-content text-gray-500 dark:text-gray-400"><p>We follow a 'Full-to-Full' policy.</p></div>
                    </div>
                </div>
            </section>

            {/* 6. Newsletter Section */}
            <section className="w-10/12 mx-auto py-20 bg-[#FFF5F6] dark:bg-slate-900 rounded-[40px] px-6 border border-[#FF5A6E]/10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">Subscribe to Newsletter</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10 italic">Get exclusive offers directly in your inbox.</p>
                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                    <input name="email" type="email" required placeholder="Enter your email" className="input input-bordered flex-1 rounded-full px-6 dark:bg-slate-800 focus:outline-[#FF5A6E]" />
                    <button type="submit" className="btn bg-[#FF5A6E] hover:bg-[#e44d5f] text-white border-none rounded-full px-10 font-bold">Subscribe Now</button>
                </form>
            </section>

        </div>
    );
};

export default Home;