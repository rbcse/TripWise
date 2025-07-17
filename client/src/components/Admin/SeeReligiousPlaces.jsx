import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeeReligiousPlaces = () => {
    const [Places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const getAllPlaces = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/all-religious-places`);
            console.log(response);
            setPlaces(response.data.places);
        } catch (error) {
            console.error("Error fetching Places:", error);
        }
    };

    const updatePlace = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/admin/update-religious-place`, selectedPlace);
            if (response.data.success) {
                toast.success("Place Updated Successfully");
                getAllPlaces(); // Refresh the Place list after update
                handleClose();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAllPlaces();
    }, []);

    const handleEdit = (Place) => {
        setSelectedPlace({ ...Place }); 
    };

    const handleClose = () => {
        setSelectedPlace(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedPlace((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Places</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Places.map((Place) => (
                    <div key={Place._id} className="rounded-lg shadow-md p-4">
                        <img 
                            src={Place.image} 
                            alt={Place.name} 
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h2 className="text-lg font-semibold mt-2">{Place.name}</h2>
                        <p className="text-gray-600">{Place.location}</p>
                        <p className="text-yellow-500 font-semibold">⭐ {Place.rating}</p>
                        <div className="flex justify-between mt-3">
                            <button 
                                onClick={() => handleEdit(Place)} 
                                className="bg-[#f2b50d] text-black px-3 py-1 rounded-md cursor-pointer"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => console.log("Delete Place with ID:", Place._id)} 
                                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPlace && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex justify-center items-center transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 hover:scale-100">
                        <h2 className="text-xl font-bold mb-4">Edit Place</h2>
                        <input 
                            type="text" 
                            name="name"
                            value={selectedPlace.name} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input 
                            type="text" 
                            name="location"
                            value={selectedPlace.location} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <textarea 
                            name="description"
                            value={selectedPlace.description} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        ></textarea>
                        <input 
                            type="number" 
                            name="rating"
                            value={selectedPlace.rating} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <div className="flex justify-between mt-3">
                            <button 
                                className="bg-[#f2b50d] text-black px-4 py-2 rounded-md cursor-pointer" 
                                onClick={updatePlace}
                            >
                                Update
                            </button>
                            <button 
                                onClick={handleClose} 
                                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default SeeReligiousPlaces;