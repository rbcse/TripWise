import React from 'react';

const Footer = () => {
    return (
        <footer className="text-gray-700 bg-gray-50 py-8 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold text-[#f2b50d]">Trip<span className='text-black'>Wise</span></h2>
                        <p className="text-gray-500">Your smart trip-planning platform</p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                        <a href="#" className="text-gray-500 hover:text-[#f2b50d]">About</a>
                        <a href="#" className="text-gray-500 hover:text-[#f2b50d]">Contact</a>
                        <a href="#" className="text-gray-500 hover:text-[#f2b50d]">Privacy Policy</a>
                    </div>
                </div>
                <div className="mt-6 text-center text-gray-500 text-sm">
                    <p>&copy; 2025 TripWise. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
