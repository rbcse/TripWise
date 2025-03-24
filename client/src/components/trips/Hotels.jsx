import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hotels = ({ searchInput, selectedTrip }) => {
    const [allHotels, setAllHotels] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [addedHotels, setAddedHotels] = useState(new Set()); 
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    useEffect(() => {
        if (selectedTrip?.value) {
            fetchTripHotels(selectedTrip.value); 
        }
        fetchHotels();
    }, [selectedTrip]);

    const fetchHotels = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/all-hotels`);
            if (response.data) {
                setAllHotels(response.data.hotels);
                setHotels(response.data.hotels);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTripHotels = async (tripId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/${tripId}/hotels`);
            if (response.data?.hotels) {
                setAddedHotels(new Set(response.data.hotels)); 
            }
        } catch (error) {
            console.error("Error fetching trip hotels:", error);
        }
    };

    const addHotel = async (hotelName, hotelLocation) => {
        if (!selectedTrip?.value) {
            toast.error("No trip selected!");
            return;
        }
    
        const trip_id = selectedTrip.value;
        const hotelString = `${hotelName}, ${hotelLocation}`;
        const tripData = { trip_id, hotel: hotelString };
    
        try {
            await axios.post(`${BACKEND_URL}/trip/add-hotel`, tripData);
            setAddedHotels((prev) => new Set(prev).add(hotelString)); // Add to Set
            toast.success("Hotel added to trip!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add hotel.");
        }
    };
    
    const removeHotel = async (hotelName, hotelLocation) => {
        if (!selectedTrip?.value) {
            toast.error("No trip selected!");
            return;
        }
    
        const trip_id = selectedTrip.value;
        const hotelString = `${hotelName}, ${hotelLocation}`;
        const tripData = { trip_id, hotel: hotelString };
    
        try {
            await axios.post(`${BACKEND_URL}/trip/remove-hotel`, tripData);
            setAddedHotels((prev) => {
                const newSet = new Set(prev);
                newSet.delete(hotelString); // Remove from Set
                return newSet;
            });
            toast.info("Hotel removed from trip!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove hotel.");
        }
    };
    

    useEffect(() => {
        if (searchInput === "All") {
            setHotels(allHotels);
        } else {
            setHotels(
                allHotels.filter((hotel) =>
                    hotel.location.toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        }
    }, [searchInput, allHotels]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4 w-full">
            {hotels.length > 0 ? (
                hotels.map((hotel) => {
                    const hotelString = `${hotel.name}, ${hotel.location}`;
                    const isAdded = addedHotels.has(hotelString);

                    return (
                        <div key={hotel._id} className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 w-full">
                            <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-lg" />
                            <div className="flex justify-between items-center mt-3">
                                <h2 className="text-lg font-semibold">{hotel.name}</h2>
                                <p className="text-gray-600">{hotel.location}</p>
                            </div>
                            <div className="flex justify-between mt-4 space-x-4">
                                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 w-auto">
                                    View Details
                                </button>
                                <button
                                    className={`cursor-pointer px-4 py-2 rounded-lg w-auto ${
                                        isAdded
                                            ? "bg-red-500 text-white hover:bg-red-700"
                                            : "bg-[#f2b50d] text-black hover:bg-yellow-500"
                                    }`}
                                    onClick={() =>
                                        isAdded
                                            ? removeHotel(hotel.name, hotel.location)
                                            : addHotel(hotel.name, hotel.location)
                                    }
                                >
                                    {isAdded ? "Remove" : "Add to Trip"}
                                </button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-500 col-span-full">No hotels found</p>
            )}
        </div>
    );
};

export default Hotels;
