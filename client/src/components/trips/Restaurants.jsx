import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Restaurants = ({ searchInput, selectedTrip }) => {
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const [restaurants, setRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [addedRestaurants, setAddedRestaurants] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedTrip?.value) {
            fetchTripRestaurants(selectedTrip.value);
        }
        getAllRestaurants();
    }, [selectedTrip]);

    const getAllRestaurants = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/all-restaurants`);
            if (response.data) {
                setAllRestaurants(response.data.restaurants);
                setRestaurants(response.data.restaurants);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTripRestaurants = async (tripId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/${tripId}/restaurants`);
            if (response.data?.restaurants) {
                setAddedRestaurants(new Set(response.data.restaurants));
            }
        } catch (error) {
            console.error("Error fetching trip restaurants:", error);
        }
    };

    const addRestaurant = async (restaurantName, restaurantLocation) => {
        const trip_id = selectedTrip.value;
        const restaurantString = `${restaurantName}, ${restaurantLocation}`;
        const tripData = { trip_id, restaurant: restaurantString };

        try {
            await axios.post(`${BACKEND_URL}/trip/add-restaurant`, tripData);
            setAddedRestaurants((prev) => new Set(prev).add(restaurantString));
            toast.success("Restaurant added to trip!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add restaurant.");
        }
    };

    const removeRestaurant = async (restaurantName, restaurantLocation) => {
        const trip_id = selectedTrip.value;
        const restaurantString = `${restaurantName}, ${restaurantLocation}`;
        const tripData = { trip_id, restaurant: restaurantString };

        try {
            await axios.post(`${BACKEND_URL}/trip/remove-restaurant`, tripData);
            setAddedRestaurants((prev) => {
                const newSet = new Set(prev);
                newSet.delete(restaurantString);
                return newSet;
            });
            toast.info("Restaurant removed from trip!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove restaurant.");
        }
    };

    useEffect(() => {
        if (searchInput === "All") {
            setRestaurants(allRestaurants);
        } else {
            setRestaurants(
                allRestaurants.filter((restaurant) =>
                    restaurant.location.toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        }
    }, [searchInput, allRestaurants]);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => {
                    const restaurantString = `${restaurant.name}, ${restaurant.location}`;
                    const isAdded = addedRestaurants.has(restaurantString);

                    return (
                        <div key={restaurant._id} className="bg-white p-4 shadow-md rounded-lg">
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="flex justify-between items-center mt-3">
                                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                                <p className="text-gray-500">{restaurant.location}</p>
                            </div>
                            <div className="flex gap-3 mt-3">
                                <button
                                    className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
                                    onClick={() => navigate("/restaurant-readmore", { state: { restaurant } })}
                                >
                                    Read More
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md cursor-pointer ${isAdded ? "bg-red-500 text-white hover:bg-red-700" : "bg-[#f2b50d] text-black hover:bg-yellow-500"}`}
                                    onClick={() =>
                                        isAdded
                                            ? removeRestaurant(restaurant.name, restaurant.location)
                                            : addRestaurant(restaurant.name, restaurant.location)
                                    }
                                >
                                    {isAdded ? "Remove" : "Add to Trip"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Restaurants;
