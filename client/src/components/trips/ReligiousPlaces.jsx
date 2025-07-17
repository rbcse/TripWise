import { useEffect, useState } from "react";
import axios from "axios";
import ReadMore from "./ReadMore";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReligiousPlaces = ({ searchInput, selectedTrip }) => {
    const [allPlaces, setAllPlaces] = useState([]);
    const [places, setPlaces] = useState([]);
    const [addedPlaces, setAddedPlaces] = useState(new Set()); 
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedTrip?.value) {
            fetchTripPlaces(selectedTrip.value); 
        }
        fetchPlaces();
    }, [selectedTrip]);

    const fetchPlaces = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/all-religious-places`);
            if (response.data) {
                setAllPlaces(response.data.places);
                setPlaces(response.data.places);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTripPlaces = async (tripId) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/${tripId}/places`);
            if (response.data?.places) {
                setAddedPlaces(new Set(response.data.places)); // Store added places
            }
        } catch (error) {
            console.error("Error fetching trip places:", error);
        }
    };

    const addReligiousPlaces = async (placeName, placeLocation) => {
        if (!selectedTrip) {
            toast.error("Please select a trip first!");
            return;
        }
    
        const trip_id = selectedTrip.value;
        const placeString = `${placeName}, ${placeLocation}`;
        const tripData = { trip_id, place: placeString };
    
        try {
            await axios.post(`${BACKEND_URL}/trip/add-religious-place`, tripData);
            setAddedPlaces((prev) => new Set(prev).add(placeString));
            toast.success("Place added to trip!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add place.");
        }
    };
    

    const removePlace = async (placeName, placeLocation) => {
        const trip_id = selectedTrip.value;
        const placeString = `${placeName}, ${placeLocation}`;
        const tripData = { trip_id, place: placeString };

        try {
            await axios.post(`${BACKEND_URL}/trip/remove-place`, tripData);
            setAddedPlaces((prev) => {
                const newSet = new Set(prev);
                newSet.delete(placeString); // Remove from Set
                return newSet;
            });
            toast.info("Place removed from trip!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove place.");
        }
    };

    useEffect(() => {
        if (searchInput === "All") {
            setPlaces(allPlaces);
        } else {
            setPlaces(
                allPlaces.filter((place) =>
                    place.location.toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        }
    }, [searchInput, allPlaces]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4 w-full">
            {places.length > 0 ? (
                places.map((place) => {
                    const placeString = `${place.name}, ${place.location}`;
                    const isAdded = addedPlaces.has(placeString);

                    return (
                        <div key={place._id} className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 w-full">
                            <img src={place.image} alt={place.name} className="w-full h-40 object-cover rounded-lg" />
                            <div className="flex justify-between items-center mt-3">
                                <h2 className="text-lg font-semibold">{place.name}</h2>
                                <p className="text-gray-600">{place.location}</p>
                            </div>
                            <div className="flex justify-between mt-4 space-x-4">
                                <button
                                    className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 w-auto"
                                    onClick={() => navigate("/readmore", { state: { place } })}
                                    >
                                    Read More
                                </button>
                                <button
                                    className={`cursor-pointer px-4 py-2 rounded-lg w-auto ${
                                        isAdded
                                        ? "bg-red-500 text-white hover:bg-red-700"
                                        : "bg-[#f2b50d] text-black hover:bg-yellow-500"
                                    }`}
                                    onClick={() =>
                                        isAdded
                                        ? removePlace(place.name, place.location)
                                        : addReligiousPlaces(place.name, place.location)
                                    }
                                    >
                                    {isAdded ? "Remove" : "Add to Trip"}
                                </button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-500 col-span-full">No places found</p>
            )}
        <ToastContainer/>
        </div>
    );
}

export default ReligiousPlaces;