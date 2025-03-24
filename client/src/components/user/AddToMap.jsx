import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Define custom icons
const placeIcon = L.icon({
  iconUrl: "/icons/location.png",
  iconSize: [30, 30],
});

const hotelIcon = L.icon({
  iconUrl: "/icons/hotel.png",
  iconSize: [30, 30],
});

const restaurantIcon = L.icon({
  iconUrl: "/icons/restaurant.png",
  iconSize: [30, 30],
});

const AddToMap = ({ places = [], restaurants = [], hotels = [] }) => {
  const [locations, setLocations] = useState([]);
  const defaultCenter = [21.1702, 72.8311]; // Surat, India

  // Function to get coordinates from place name
  const getCoordinates = async (place, type, delay = 500) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, delay)); // Add delay
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
      );
      if (response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon),
          name: place,
          type: type, // Assign type dynamically
        };
      } else {
        console.warn(`No coordinates found for: ${place}`);
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${place}:`, error);
    }
    return null;
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations = [];

      for (const place of places) {
        const location = await getCoordinates(place, "place", 300);
        if (location) fetchedLocations.push(location);
      }
      for (const hotel of hotels) {
        const location = await getCoordinates(hotel, "hotel", 300);
        if (location) fetchedLocations.push(location);
      }
      for (const restaurant of restaurants) {
        const location = await getCoordinates(restaurant, "restaurant", 300);
        if (location) fetchedLocations.push(location);
      }

      // console.log(fetchedLocations);

      setLocations(fetchedLocations);
    };

    if (places.length || restaurants.length || hotels.length) {
      fetchLocations();
    }
  }, [places, restaurants, hotels]);

  // Function to get icon based on place type
  const getIcon = (type) => {
    switch (type) {
      case "hotel":
        return hotelIcon;
      case "restaurant":
        return restaurantIcon;
      default:
        return placeIcon;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center my-4">Trip Map</h2>
      <MapContainer center={defaultCenter} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render Markers with Custom Icons */}
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]} icon={getIcon(loc.type)}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}

        {/* Draw Red Line Connecting Locations */}
        {locations.length > 1 && (
          <Polyline
            positions={locations.map((loc) => [loc.lat, loc.lng])}
            pathOptions={{ color: "red", weight: 3 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default AddToMap;
