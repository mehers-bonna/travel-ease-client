import React from 'react';
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import bannerImg1 from '../../assets/banner.png'; 
import bannerImg2 from '../../assets/bannerImgTwo.jpg'; 
import bannerImg3 from '../../assets/bannerImg3.jpg'; 

const Banner = () => {
    const zoom = useSpring({
        from: { transform: "scale(1)" },
        to: { transform: "scale(1.15)" },
        config: { duration: 6000 },
        loop: { reverse: true },
    });

    const today = format(new Date(), "MMMM d, yyyy");

    const slideData = [
        {
            id: 1,
            image: bannerImg1,
            title: "Find Your Perfect Vehicle",
            subTitle: "Book your dream car with ease and comfort."
        },
        {
            id: 2,
            image: bannerImg2,
            title: "Explore the Open Road",
            subTitle: "Wide range of vehicles for every adventure."
        },
        {
            id: 3,
            image: bannerImg3,
            title: "Premium Quality Rides",
            subTitle: "Affordable prices with top-notch service."
        }
    ];

    return (
        <div className="flex justify-center items-center h-[70vh] w-full my-10">
            <div className="relative w-10/12 mx-auto h-full rounded-xl overflow-hidden">
                
                <Swiper
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    effect="fade"
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="h-full w-full"
                >
                    {slideData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-full overflow-hidden">
                                <animated.img
                                    style={zoom}
                                    src={slide.image}
                                    alt="banner"
                                    className="w-full h-full object-cover rounded-xl"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50"></div>

                                {/* Content */}
                                <motion.div
                                    key={slide.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4"
                                >
                                    <h1 className="text-5xl font-bold">{slide.title}</h1>

                                    <p className="mt-3 text-lg">
                                        Today: {today}
                                    </p>
                                    
                                    <p className="mt-2 text-gray-200 max-w-lg hidden md:block">
                                        {slide.subTitle}
                                    </p>

                                    <Link to="/allVehicles">
                                        <button className="mt-6 px-6 py-3 bg-error hover:bg-pink-700 rounded-lg transition-colors font-semibold">
                                            All Vehicles
                                        </button>
                                    </Link>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;