import React from 'react';
import { FaShieldAlt, FaUserCheck, FaFileContract, FaCreditCard, FaBan } from "react-icons/fa";

const TermsAndConditions = () => {
    const termsData = [
        {
            icon: <FaUserCheck className="text-error text-2xl" />,
            title: "User Obligations",
            description: "To rent a vehicle, you must be at least 18 years old and possess a valid driving license. You are responsible for maintaining the confidentiality of your account."
        },
        {
            icon: <FaShieldAlt className="text-error text-2xl" />,
            title: "Safety & Insurance",
            description: "All users must follow traffic laws in Bangladesh. While we connect owners and renters, safety is a mutual responsibility. Insurance coverage depends on the owner's policy."
        },
        {
            icon: <FaCreditCard className="text-error text-2xl" />,
            title: "Booking & Payments",
            description: "Payments must be made through our authorized payment gateways. Cancellations are subject to the specific policy mentioned in the vehicle details."
        },
        {
            icon: <FaBan className="text-error text-2xl" />,
            title: "Prohibited Uses",
            description: "Vehicles cannot be used for illegal activities, transporting hazardous materials, or sub-renting to others without TravelEase's permission."
        }
    ];

    return (
        <div className="bg-base-100 py-16 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block p-3 rounded-full bg-error/10 mb-4">
                        <FaFileContract className="text-error text-3xl" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        Terms & <span className="text-error">Conditions</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto italic">
                        "Please read these terms carefully before using TravelEase. By using our platform, you agree to follow these guidelines for a safe journey."
                    </p>
                    <div className="mt-4 text-sm text-gray-400 font-medium uppercase tracking-widest">
                        Last Updated: January 2026
                    </div>
                </div>

                {/* Terms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {termsData.map((term, index) => (
                        <div key={index} className="p-8 bg-base-200 rounded-3xl border border-transparent hover:border-error/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="mb-4">
                                {term.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{term.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {term.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Detailed Text Section */}
                <div className="mt-16 bg-error/5 p-8 rounded-3xl border border-error/10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        By accessing or using TravelEase, you signify that you have read, understood, and agreed to be bound by these Terms and Conditions. We reserve the right to modify these terms at any time, and your continued use of the platform after such changes signifies your acceptance.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Limitation of Liability</h2>
                    <p className="text-gray-700 leading-relaxed">
                        TravelEase is a marketplace platform connecting vehicle owners and renters. We are not liable for any mechanical failures, accidents, or disputes that may arise between the owner and the renter. However, we provide support and mediation to resolve any issues.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;