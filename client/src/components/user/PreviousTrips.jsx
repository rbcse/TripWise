import { useState } from "react";
import Expenditure from "./Expenditure";

const PreviousTrips = (props) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const prevTrips = props.userTrips.filter(trip => trip.date_of_return.split("T")[0] < today);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Previous Trips</h2>
      {prevTrips.length === 0 ? (
        <p className="text-gray-500">No previous trips found.</p>
      ) : (
        prevTrips.map(trip => (
          <div key={trip._id} className="mb-6 border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 p-4 flex justify-between items-center font-semibold text-lg">
              <span className="text-gray-800">{trip.trip_name}</span>
              <span className="text-gray-600">
                {trip.date_of_arrival.split("T")[0]} - {trip.date_of_return.split("T")[0]}
              </span>
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

              <div className="text-gray-700">
                <span className="font-semibold">Religious Places:</span> {trip.religiousplaces?.join(", ") || "No Religious place added"}
              </div>

              <div>
                <button
                  className="cursor-pointer bg-[#f2b50d] text-black px-4 py-2 rounded-lg font-semibold shadow-md w-full sm:w-auto"
                  onClick={() => setSelectedTrip(trip)}
                >
                  See Expenditure
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-xl relative">
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <Expenditure trip={selectedTrip} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousTrips;
