import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddToMap from "./AddToMap";
import TripGraph from "./TripGraph";
import TripSequence from "./TripSequence";

const UpcomingTrips = (props) => {
    const today = new Date().toISOString().split("T")[0];
    const [trips, setTrips] = useState(props.userTrips);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [sequence, setSequence] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    useEffect(() => {
        setTrips(props.userTrips);
    }, [props.userTrips]);

    const cancelTrip = async (tripId) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/trip/cancel-trip`, { tripId });
            if (response.data.success) {
                toast.success("Trip Deleted Successfully");
                setTrips(prevTrips => prevTrips.filter(trip => trip._id !== tripId));
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
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
    };

    const openSeqMap = (trip) => {
        setSelectedTrip(trip);
        setSequence(true);
        setShowGraph(false);
        setShowMap(false);
    };

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Upcoming Trips</h2>
            {trips.filter(trip => trip.date_of_arrival >= today).length === 0 ? (
                <p className="text-gray-500 text-center">No upcoming trips found.</p>
            ) : (
                trips.map(trip => (
                    <div key={trip._id} className="mb-6 border border-gray-300 rounded-lg shadow-md overflow-hidden">
                        <div className="bg-[#f2b50d] p-4 flex flex-col sm:flex-row justify-between items-center font-semibold text-lg">
                            <span className="text-gray-800 text-center sm:text-left">{trip.trip_name}</span>
                            <span className="text-gray-600 text-center sm:text-right">{trip.date_of_arrival.split("T")[0]} - {trip.date_of_return.split("T")[0]}</span>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="text-gray-700">
                                <span className="font-semibold">Places:</span> {trip.places?.join(", ") || "No places added"}
                            </div>
                            <div className="text-gray-700">
                                <span className="font-semibold">Hotels:</span> {trip.hotels?.join(", ") || "No hotels added"}
                            </div>
                            <div className="text-gray-700">
                                <span className="font-semibold">Restaurants:</span> {trip.restaurants?.join(", ") || "No restaurants added"}
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-between items-center gap-3 sm:gap-7 mt-3">
                                <button className="bg-[#f2b50d] text-black px-4 py-2 rounded-lg font-semibold shadow-md w-full sm:w-auto"
                                    onClick={() => openSeqMap(trip)}>
                                    {trip.trip_sequence ? "Update Sequence" : "Set Sequence"}
                                </button>
                                <button className="bg-[#f2b50d] text-black px-4 py-2 rounded-lg font-semibold shadow-md w-full sm:w-auto"
                                    onClick={() => openMap(trip)}>
                                    See Map
                                </button>
                                <button className="bg-[#f2b50d] text-black px-4 py-2 rounded-lg font-semibold shadow-md w-full sm:w-auto"
                                    onClick={() => openGraph(trip)}>
                                    Trip Graph
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md w-full sm:w-auto"
                                    onClick={() => cancelTrip(trip._id)}>
                                    Cancel Trip
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {showMap && selectedTrip && <AddToMap places={selectedTrip.places} restaurants={selectedTrip.restaurants} hotels={selectedTrip.hotels} />}
            {showGraph && selectedTrip && <TripGraph selectedTrip={selectedTrip} />}
            {sequence && selectedTrip && <TripSequence trip={selectedTrip} onClose={() => setSequence(false)} />}
            <ToastContainer />
        </div>
    );
};

export default UpcomingTrips;