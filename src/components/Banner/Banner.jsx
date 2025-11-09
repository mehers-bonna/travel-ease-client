import React from 'react';
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import bannerImg from '../../assets/banner.png';
import { Link } from 'react-router';

const Banner = () => {
    const zoom = useSpring({
        from: { transform: "scale(1)" },
        to: { transform: "scale(1.2)" }, 
        config: { duration: 6000 },
        loop: { reverse: true },
    });

    const today = format(new Date(), "MMMM d, yyyy");

    return (
        <div className="flex justify-center items-center h-[80vh] w-full my-10">
            <div className="relative w-11/12 mx-auto h-full rounded-xl overflow-hidden">

                <animated.img
                    style={zoom}
                    src={bannerImg}
                    alt="background"
                    className="w-full h-full object-cover rounded-xl"
                />

                <div className="absolute inset-0 bg-black/50 "></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4"
                >
                    <h1 className="text-5xl font-bold">Find Your Perfect Vehicle</h1>

                    <p className="mt-3 text-lg">
                        Today: {today}
                    </p>

                    <Link to="/allVehicles">
                        <button className="mt-6 px-6 py-3 bg-error hover:bg-pink-700 rounded-lg">
                            All Vehicles
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;