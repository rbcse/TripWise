const PreviousTrips = (props) => {
    const today = new Date().toISOString().split("T")[0];
    const prevTrips = props.userTrips.filter(trip => trip.date_of_arrival.split("T")[0] < today);
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Previous Trips</h2>
        {prevTrips.length === 0 ? (
          <p className="text-gray-500">No previous trips found.</p>
        ) : (
          prevTrips.map(trip => (
            <div key={trip._id} className="mb-6 border border-gray-300 rounded-lg shadow-md overflow-hidden">
              {/* Trip Name & Dates */}
              <div className="bg-gray-100 p-4 flex justify-between items-center font-semibold text-lg">
                <span className="text-gray-800">{trip.trip_name}</span>
                <span className="text-gray-600">
                  {trip.date_of_arrival.split("T")[0]} - {trip.date_of_return.split("T")[0]}
                </span>
              </div>
  
              {/* Trip Details */}
              <div className="p-4 space-y-2">
                {/* Places */}
                <div className="text-gray-700">
                  <span className="font-semibold">Places:</span> {trip.places?.join(", ") || "No places added"}
                </div>
  
                {/* Hotels */}
                <div className="text-gray-700">
                  <span className="font-semibold">Hotels:</span> {trip.hotels?.join(", ") || "No hotels added"}
                </div>
  
                {/* Restaurants */}
                <div className="text-gray-700">
                  <span className="font-semibold">Restaurants:</span> {trip.restaurants?.join(", ") || "No restaurants added"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default PreviousTrips;
  