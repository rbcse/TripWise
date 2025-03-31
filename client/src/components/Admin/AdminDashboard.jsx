import { useState } from "react";
import AddPlaceForm from "./AddPlace";
import AddHotelForm from "./AddHotel";
import AddRestaurantForm from "./AddRestaurant";
import SeeHotels from "./SeeHotels";
import SeePlaces from "./SeePlaces";
import SeeRestaurants from "./SeeRestaurants";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("addPlace");

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">
                    <span className="text-[#f2b50d]">Trip</span>
                    <span className="text-black">Wise</span> Admin
                </h2>
                <ul className="flex flex-col gap-3">
                    <li
                        className={`cursor-pointer p-3 text-lg rounded-lg ${
                            activeTab === "addPlace" ? "bg-[#f2b50d] text-black" : "text-gray-700"
                        } hover:bg-yellow-300`}
                        onClick={() => setActiveTab("addPlace")}
                    >
                        Add Place
                    </li>
                    <li
                        className={`cursor-pointer p-3 text-lg rounded-lg ${
                            activeTab === "addHotel" ? "bg-[#f2b50d] text-black" : "text-gray-700"
                        } hover:bg-yellow-300`}
                        onClick={() => setActiveTab("addHotel")}
                    >
                        Add Hotel
                    </li>
                    <li
                        className={`cursor-pointer p-3 text-lg rounded-lg ${
                            activeTab === "addRestaurant" ? "bg-[#f2b50d] text-black" : "text-gray-700"
                        } hover:bg-yellow-300`}
                        onClick={() => setActiveTab("addRestaurant")}
                    >
                        Add Restaurant
                    </li>
                    <li
                        className={`cursor-pointer p-3 text-lg rounded-lg ${
                            activeTab === "seeHotels" ? "bg-[#f2b50d] text-black" : "text-gray-700"
                        } hover:bg-yellow-300`}
                        onClick={() => setActiveTab("seeHotels")}
                    >
                        See Hotels
                    </li>
                    <li
                        className={`cursor-pointer p-3 text-lg rounded-lg ${
                            activeTab === "seePlaces" ? "bg-[#f2b50d] text-black" : "text-gray-700"
                        } hover:bg-yellow-300`}
                        onClick={() => setActiveTab("seePlaces")}
                    >
                        See Places
                    </li>
                    <li
                        className={`cursor-pointer p-3 text-lg rounded-lg ${
                            activeTab === "seeRestaurants" ? "bg-[#f2b50d] text-black" : "text-gray-700"
                        } hover:bg-yellow-300`}
                        onClick={() => setActiveTab("seeRestaurants")}
                    >
                        See Restaurants
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-8">
                {activeTab === "addPlace" && <AddPlaceForm />}
                {activeTab === "addHotel" && <AddHotelForm />}
                {activeTab === "addRestaurant" && <AddRestaurantForm />}
                {activeTab === "seeHotels" && <SeeHotels />}
                {activeTab === "seePlaces" && <SeePlaces />}
                {activeTab === "seeRestaurants" && <SeeRestaurants />}
            </div>
        </div>
    );
};

export default AdminDashboard;
