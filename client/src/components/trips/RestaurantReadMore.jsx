import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "../Navbar";

const RestaurantReadMore = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const restaurant = location.state?.restaurant;

    if (!restaurant) return <p className="text-center mt-10 text-gray-500">Restaurant details not available.</p>;

    return (
        <div className="flex-col mt-20 bg-opacity-50 flex items-center justify-center p-4">
            <Navbar/>
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                {/* Close Button */}
                <button 
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    onClick={() => navigate(-1)} // Go back to previous page
                >
                    <X size={24} />
                </button>

                {/* Restaurant Image */}
                <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-56 object-cover rounded-lg mb-4"
                />

                {/* Restaurant Name & Location */}
                <h2 className="text-2xl font-bold text-gray-800">{restaurant.name}</h2>
                <p className="text-gray-500 italic">{restaurant.location}</p>

                {/* Description */}
                <p className="mt-4 text-gray-600">{restaurant.description}</p>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <a 
                        href={restaurant.menu} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#f2b50d] text-black px-4 py-2 rounded hover:bg-[#f2b50d] cursor-pointer transition"
                    >
                        View Menu
                    </a>
                    <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 cursor-pointer transition"
                        onClick={() => navigate(-1)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantReadMore;
