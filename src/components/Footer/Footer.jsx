import React from 'react';
import travelLogo from '../../assets/travelLogo.jpg';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { PiYoutubeLogoFill } from 'react-icons/pi';
import { ImFacebook2 } from 'react-icons/im';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-error/60 text-white py-16 px-6 md:px-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* 1. Brand & Description */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <img className='h-12 w-12 rounded-full border-2 border-white' src={travelLogo} alt="TravelEase" />
                        <span className="text-2xl font-extrabold tracking-tight">TravelEase</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80">
                        Experience the ultimate freedom of travel with our premium vehicle rental services. Your journey, our commitment.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors"><ImFacebook2 size={20} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors"><FaXTwitter size={20} /></a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors"><PiYoutubeLogoFill size={22} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors"><FaInstagram size={20} /></a>
                    </div>
                </div>

                {/* 2. Quick Links */}
                <div>
                    <h4 className="font-bold text-lg mb-6 border-l-4 border-white pl-3">Quick Links</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="hover:underline transition-all">Home</Link></li>
                        <li><Link to="/allVehicles" className="hover:underline transition-all">All Vehicles</Link></li>
                        <li><Link to="/about" className="hover:underline transition-all">About Us</Link></li>
                        <li><Link to="/dashboard" className="hover:underline transition-all">User Dashboard</Link></li>
                    </ul>
                </div>

                {/* 3. Support & Legal */}
                <div>
                    <h4 className="font-bold text-lg mb-6 border-l-4 border-white pl-3">Support</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Trust & Safety</a></li>
                    </ul>
                </div>

                {/* 4. Contact Info */}
                <div>
                    <h4 className="font-bold text-lg mb-6 border-l-4 border-white pl-3">Contact Us</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt />
                            <span>+880 1234 567 890</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope />
                            <span>support@travelease.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaMapMarkerAlt />
                            <span>Gulshan-2, Dhaka, Bangladesh</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/20 text-center text-xs text-white/70">
                <p>Copyright © {new Date().getFullYear()} - <span className="font-bold">TravelEase</span>. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;