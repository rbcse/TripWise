import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TripSequence = ({ trip, onClose }) => {
    const { _id: tripId, places, hotels, restaurants, date_of_arrival, date_of_return, trip_name, trip_sequence = [] } = trip;
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    
    const destinations = [
        ...places.map(place => ({ name: place, type: "place" })),
        ...hotels.map(hotel => ({ name: hotel, type: "hotel" })),
        ...restaurants.map(restaurant => ({ name: restaurant, type: "restaurant" }))
    ];

    const [selectedDestinations, setSelectedDestinations] = useState({});
    const [selectedDates, setSelectedDates] = useState({});
    const [dateErrors, setDateErrors] = useState({});
    const [forceRender, setForceRender] = useState(false);

    useEffect(() => {
        if (trip_sequence.length > 0) {
            const initialDestinations = {};
            const initialDates = {};
            trip_sequence.forEach((item, index) => {
                initialDestinations[index] = item.name;
                initialDates[index] = item.date.split("T")[0];
            });
            setSelectedDestinations(initialDestinations);
            setSelectedDates(initialDates);
        }
    }, [trip_sequence, forceRender]);

    const handleDateChange = (index, event) => {
        const selectedDate = new Date(event.target.value);
        const arrival = new Date(date_of_arrival);
        const departure = new Date(date_of_return);
    
        setSelectedDates(prev => ({ ...prev, [index]: event.target.value }));
    
        if (selectedDate < arrival || selectedDate > departure) {
            setDateErrors(prev => ({ ...prev, [index]: "Selected date is out of trip range!" }));
        } else {
            setDateErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[index];
                return newErrors;
            });
        }
    };
    

    const handleDestinationChange = (index, event) => {
        setSelectedDestinations(prev => ({ ...prev, [index]: event.target.value }));
    };

    const addTripSequence = async () => {
        const tripSequence = Object.keys(selectedDestinations).map(index => ({
            name: selectedDestinations[index],
            date: selectedDates[index],
            type: destinations.find(dest => dest.name === selectedDestinations[index])?.type
        })).filter(item => item.name && item.date);

        if (tripSequence.length === 0) {
            alert("Please select at least one destination with a valid date.");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/trip/add-trip-sequence`, { tripId, tripSequence });
            toast.success("Trip sequence added successfully!");
            if (typeof onClose === "function") {
                onClose(true);
            }
        } catch (error) {
            console.error("Error adding trip sequence:", error);
            toast.error("Failed to add trip sequence.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-6 bg-white rounded-lg shadow-md max-w-lg w-full mx-auto border border-gray-300 relative">
                <h1 className="text-2xl font-bold mb-4">{trip_name}</h1>
                <div className="space-y-4">
                    {destinations.map((_, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-4">
                                <select 
                                    className="p-2 border border-gray-300 rounded-lg w-1/2" 
                                    value={selectedDestinations[index] || ""} 
                                    onChange={(event) => handleDestinationChange(index, event)}
                                >
                                    <option value="">Select Destination</option>
                                    {destinations.map((destination, i) => (
                                        <option key={i} value={destination.name}>{destination.name}</option>
                                    ))}
                                </select>
                                <input 
                                    type="date" 
                                    className={`p-2 border rounded-lg ${dateErrors[index] ? 'border-red-500' : 'border-gray-300'}`} 
                                    value={selectedDates[index] || ""} 
                                    onChange={(event) => handleDateChange(index, event)}
                                    min={date_of_arrival} 
                                    max={date_of_return}
                                />
                            </div>
                            {dateErrors[index] && <p className="text-red-500 text-sm">{dateErrors[index]}</p>}
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <button 
                            className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg font-semibold shadow-md"
                            onClick={() => onClose(false)}
                        >
                            Close
                        </button>
                        <button 
                            className="bg-[#f2b50d] text-black px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 cursor-pointer"
                            onClick={addTripSequence}
                        >
                            Submit
                        </button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripSequence;
