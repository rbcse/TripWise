import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import dummyImg from '../assets/user.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userImg , setUserImg] = useState(dummyImg);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const tokenData = jwtDecode(token);
            setUser(tokenData);
            setUserImg(tokenData.picture);
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
        window.location.reload(); 
    };

    return (
        <nav className="bg-white shadow-md w-full fixed left-0 top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <a href="/" className="font-bold text-xl text-[#f2b50d]">
                        Trip<span className="text-black">Wise</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-gray-700 hover:text-gray-900">About</a>

                        {/* Show profile picture if logged in, else show Login button */}
                        {user ? (
                            <div className="relative">
                                <img
                                    src={userImg}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white  shadow-lg rounded-lg py-2">
                                        <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            My Profile
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="/login" className="text-gray-700 hover:text-gray-900">Login</a>
                        )}

                        <a href="/plan-trip" className="bg-[#f2b50d] px-4 py-2 rounded-[10px] font-[500]">Plan Trips</a>
                    </div>

                    <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="block text-gray-700 hover:text-gray-900">About</a>
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <img
                                    src={user.picture || "https://via.placeholder.com/40"}
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <button
                                    onClick={toggleDropdown}
                                    className="text-gray-700 hover:text-gray-900 focus:outline-none"
                                >
                                    {user.name}
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg py-2">
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
                            <a href="/login" className="block text-gray-700 hover:text-gray-900">Login</a>
                        )}
                        <a href="/plan-trip" className="bg-[#f2b50d] px-4 py-2 rounded-[10px] font-[500]">Plan Trips</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
