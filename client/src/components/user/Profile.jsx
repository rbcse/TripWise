import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpcomingTrips from "./UpcomingTrips";
import PreviousTrips from "./PreviousTrips";

const Profile = () => {
  const token = localStorage.getItem("token");
  const tokenData = jwtDecode(token);
  const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const [showForm, setShowForm] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    user_id: tokenData.id,
    trip_name: "",
    date_of_arrival: "",
    date_of_return: ""
  });

  const fetchAllTrips = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/trip/user-trips`, { user_id: tokenData.id });
      setUserTrips(response.data.userTrips);
    } catch (error) {
      toast.error("Error fetching trips");
    }
  };

  useEffect(() => {
    fetchAllTrips();
  }, []);

  const validateTrip = () => {
    if (!tripDetails.trip_name.trim()) {
      toast.error("Trip name is required!");
      return false;
    }
    if (!tripDetails.date_of_arrival) {
      toast.error("Date of arrival is required!");
      return false;
    }
    if (!tripDetails.date_of_return) {
      toast.error("Return date is required!");
      return false;
    }
    const arrivalDate = new Date(tripDetails.date_of_arrival);
    const returnDate = new Date(tripDetails.date_of_return);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (arrivalDate < today) {
      toast.error("Date of arrival cannot be in the past!");
      return false;
    }
    if (returnDate < arrivalDate) {
      toast.error("Return date cannot be before arrival date!");
      return false;
    }
    return true;
  };

  const createTrip = async () => {
    if (!validateTrip()) return;
    setIsLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/trip/add-destination`, tripDetails);
      toast.success("Trip created successfully!");
      fetchAllTrips();
    } catch (error) {
      toast.error("Error creating trip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col md:flex-row h-screen mt-17">
        <button
          className="md:hidden mt-23 bg-gray-100 p-4 absolute top-4 right-4 rounded-md shadow-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>

        <div className={`md:w-1/5 bg-gray-100 p-4 ${menuOpen ? "block" : "hidden md:block"}`}>
          <button className="w-full p-3 text-black font-medium hover:bg-[#f2b50d] rounded-md" onClick={() => { setShowForm(false); setShowUpcoming(false); }}>
            Previous Trips
          </button>
          <button className="w-full p-3 text-black font-medium hover:bg-[#f2b50d] rounded-md" onClick={() => { setShowForm(true); setShowUpcoming(false); }}>
            Create Trip
          </button>
          <button className="w-full p-3 text-black font-medium hover:bg-[#f2b50d] rounded-md" onClick={() => { setShowForm(false); setShowUpcoming(true); }}>
            Upcoming Trips
          </button>
        </div>

        <div className="md:w-3/4 p-6">
          {showForm ? (
            <div className="bg-white p-6 shadow-md rounded-md">
              <h2 className="text-3xl font-bold">
                <span className="text-[#f2b50d]">Trip</span>
                <span className="text-black">Wise</span>
              </h2>
              <div className="mt-4">
                <label className="block mb-2 font-semibold">Trip Name</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter trip name" value={tripDetails.trip_name} onChange={(e) => setTripDetails({ ...tripDetails, trip_name: e.target.value })} />
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-semibold">Date of Arrival</label>
                <input type="date" className="w-full p-2 border rounded-md" value={tripDetails.date_of_arrival} onChange={(e) => setTripDetails({ ...tripDetails, date_of_arrival: e.target.value })} />
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-semibold">Return Date</label>
                <input type="date" className="w-full p-2 border rounded-md" value={tripDetails.date_of_return} onChange={(e) => setTripDetails({ ...tripDetails, date_of_return: e.target.value })} />
              </div>
              <button className={`mt-4 p-3 text-black bg-[#f2b50d] rounded-md w-full font-medium ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`} onClick={createTrip} disabled={isLoading}>
                {isLoading ? "Loading..." : "Create Trip"}
              </button>
            </div>
          ) : showUpcoming ? (
            <UpcomingTrips userTrips={userTrips} />
          ) : (
            <PreviousTrips userTrips={userTrips} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;