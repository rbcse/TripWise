import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddToMap from "./AddToMap";
import TripGraph from "./TripGraph";

const UpcomingTrips = (props) => {
    const today = new Date().toISOString().split("T")[0];
    const [trips, setTrips] = useState(props.userTrips);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [showGraph, setShowGraph] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    useEffect(() => {
        setTrips(props.userTrips);
    }, [props.userTrips]);

    const cancelTrip = async (tripId) => {
        try {
            console.log("Deleting trip:", tripId);
            const response = await axios.post(`${BACKEND_URL}/trip/cancel-trip`, { tripId });

            if (response.data.success) {
                toast.success("Trip Deleted Successfully");

                // Remove trip from UI
                setTrips(prevTrips => prevTrips.filter(trip => trip._id !== tripId));
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error in cancelTrip:", error);
            toast.error("Error deleting trip");
        }
    };

    const openMap = (trip) => {
        setSelectedTrip(trip);
        setShowMap(true);
        setShowGraph(false);
    };

    const openGraph = (trip) => {
        setSelectedTrip(trip);
        setShowGraph(true);
        setShowMap(false);
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Upcoming Trips</h2>
            {trips.filter(trip => trip.date_of_arrival >= today).length === 0 ? (
                <p className="text-gray-500">No upcoming trips found.</p>
            ) : (
                trips.map(trip => (
                    <div key={trip._id} className="mb-6 border border-gray-300 rounded-lg shadow-md overflow-hidden">
                        <div className="bg-[#f2b50d] p-4 flex justify-between items-center font-semibold text-lg">
                            <span className="text-gray-800">{trip.trip_name}</span>
                            <span className="text-gray-600">{trip.date_of_arrival.split("T")[0]} - {trip.date_of_return.split("T")[0]}</span>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="text-gray-700">
                                <span className="font-semibold">Places:</span> {trip.places?.join(", ") || "No places added"}
                            </div>
                            <div className="text-gray-700">
                                <span className="font-semibold">Hotels:</span> {trip.hotels?.join(", ") || "No hotels added"}
                            </div>
                            <div className="text-gray-700 flex justify-between w-full">
                                <div>
                                    <span className="font-semibold">Restaurants:</span> {trip.restaurants?.join(", ") || "No restaurants added"}
                                </div>
                                <div className="flex justify-center items-center gap-7">
                                    <button className="bg-[#f2b50d] text-black px-5 py-2 rounded-[8px] font-[500] cursor-pointer"
                                        onClick={() => openMap(trip)}>See Map</button>
                                    <button className="bg-[#f2b50d] text-black px-5 py-2 rounded-[8px] font-[500] cursor-pointer"
                                        onClick={() => openGraph(trip)}>Trip Graph</button>
                                    <button className="bg-[#f2b50d] text-black px-5 py-2 rounded-[8px] font-[500] cursor-pointer"
                                        onClick={() => cancelTrip(trip._id)}>Cancel Trip</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {showMap && selectedTrip && <AddToMap places={selectedTrip.places} restaurants={selectedTrip.restaurants} hotels={selectedTrip.hotels} />}
            {showGraph && selectedTrip && <TripGraph places={selectedTrip.places} restaurants={selectedTrip.restaurants} hotels={selectedTrip.hotels} />}
            <ToastContainer />
        </div>
    );
};

export default UpcomingTrips;
