import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import dummyImg from '../assets/user.png';
import { useNavigate } from "react-router";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userImg , setUserImg] = useState(dummyImg);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const tokenData = jwtDecode(token);
            setUser(tokenData);
            setUserImg(tokenData.picture || dummyImg);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md w-full fixed left-0 top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <a href="/" className="font-bold text-xl text-[#f2b50d]">
                        Trip<span className="text-black">Wise</span>
                    </a>

                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-gray-700 hover:text-gray-900">About</a>

                        {user ? (
                            <div className="relative">
                                <img
                                    src={userImg}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                                        <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            My Profile
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="/login" className="text-gray-700 hover:text-gray-900">Login</a>
                        )}

                        <a href="/plan-trip" className="bg-[#f2b50d] px-4 py-2 rounded-[10px] font-[500]">See destinations</a>
                    </div>

                    <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu with Sliding Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <a href="#" className="text-gray-700 hover:text-gray-900 text-lg">About</a>
                            {user ? (
                                <div className="flex flex-col items-center space-y-3">
                                    <img
                                        src={userImg}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <button
                                        onClick={toggleDropdown}
                                        className="text-gray-700 hover:text-gray-900 text-lg"
                                    >
                                        {user.name}
                                    </button>
                                    {dropdownOpen && (
                                        <div className="w-40 bg-white border shadow-lg rounded-lg py-2">
                                            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                My Profile
                                            </a>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <a href="/login" className="text-gray-700 hover:text-gray-900 text-lg">Login</a>
                            )}
                            <a href="/plan-trip" className="bg-[#f2b50d] px-6 py-2 rounded-[10px] font-[500]">See destinations</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
