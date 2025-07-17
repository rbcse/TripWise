import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Places from "./Places";
import Hotels from "./Hotels";
import Restaurants from "./Restaurants";
import Select from "react-select";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ReligiousPlaces from "./ReligiousPlaces";

const PlanTrip = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Places");
    const [searchInput, setSearchInput] = useState({ value: "All", label: "All" });
    const [userTrips, setUserTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const token = localStorage.getItem("token");
    let tokenData;
    if(!token){
        navigate("/login");
    }
    else{
        tokenData = jwtDecode(token);
    }

    const getUserTrips = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/trip/get-user-trips`, { user_id: tokenData.id });
            setUserTrips(response.data.userTrips); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        getUserTrips();
    }, [navigate]);

    const locationOptions = [
        { value: "All", label: "All" },
        { value: "Jaipur", label: "Jaipur" },
        { value: "Delhi", label: "Delhi" },
        { value: "Mumbai", label: "Mumbai" },
        { value: "Surat", label: "Surat" },
    ];

    const tripOptions = userTrips.map(trip => ({
        value: trip._id,
        label: trip.trip_name,
    }));

    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row justify-between items-center mt-20 p-2 w-3/4 mx-auto gap-4">
                {/* Tab Navigation */}
                <div className="flex gap-2 w-full">
                    {["Places", "Hotels", "Restaurants" , "Religious Places"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-6 py-2 rounded-md font-semibold text-gray-700 transition-all cursor-pointer focus:outline-none ${
                                activeTab === tab ? "bg-[#f2b50d]" : "bg-white"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Filters (Trips & Location) */}
                <div className="flex md:flex-row gap-2 w-full md:w-auto items-center">
                    {/* Trip Dropdown */}
                    <Select
                        options={tripOptions}
                        value={selectedTrip}
                        onChange={setSelectedTrip}
                        isClearable
                        placeholder="Select Trip"
                        className="w-full md:w-48"
                        styles={{
                            control: (base) => ({
                                ...base,
                                color: "black",
                                "&:hover": {
                                    borderColor: "#d9a208",
                                },
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: "black",
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: "black",
                            }),
                        }}
                    />

                    {/* Location Dropdown */}
                    <Select
                        options={locationOptions}
                        value={searchInput}
                        onChange={setSearchInput}
                        isClearable
                        placeholder="Filter by Location"
                        className="w-full md:w-64"
                        styles={{
                            control: (base) => ({
                                ...base,
                                color: "black",
                                "&:hover": {
                                    borderColor: "#d9a208",
                                },
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: "black",
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: "black",
                            }),
                            menu: (base) => ({
                                ...base,
                                backgroundColor: "white",
                            }),
                            option: (base, { isFocused }) => ({
                                ...base,
                                backgroundColor: isFocused ? "#f2b50d" : "white",
                                color: isFocused ? "black" : "black",
                            }),
                        }}
                    />
                </div>
            </div>

            {/* Display Components based on active tab */}
            <div className="mt-6 text-center text-lg font-semibold p-4 bg-white shadow-md rounded-lg w-11/12 md:w-3/4 mx-auto">
                {activeTab === "Places" && <Places searchInput={searchInput.value} selectedTrip={selectedTrip} />}
                {activeTab === "Hotels" && <Hotels searchInput={searchInput.value} selectedTrip={selectedTrip} />}
                {activeTab === "Restaurants" && <Restaurants searchInput={searchInput.value} selectedTrip={selectedTrip} />}
                {activeTab === "Religious Places" && <ReligiousPlaces searchInput={searchInput.value} selectedTrip={selectedTrip} />}
            </div>
        </div>
    );
};

export default PlanTrip;
