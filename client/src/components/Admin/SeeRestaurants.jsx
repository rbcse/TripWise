import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeeRestaurants = () => {
    const [Restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const getAllRestaurants = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/trip/all-restaurants`);
            setRestaurants(response.data.restaurants);
        } catch (error) {
            console.error("Error fetching Restaurants:", error);
        }
    };

    const updateRestaurant = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/admin/update-restaurant`, selectedRestaurant);
            if (response.data.success) {
                toast.success("Restaurant Updated Successfully");
                getAllRestaurants(); // Refresh the Restaurant list after update
                handleClose();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAllRestaurants();
    }, []);

    const handleEdit = (Restaurant) => {
        setSelectedRestaurant({ ...Restaurant }); 
    };

    const handleClose = () => {
        setSelectedRestaurant(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedRestaurant((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Restaurants</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Restaurants.map((Restaurant) => (
                    <div key={Restaurant._id} className="rounded-lg shadow-md p-4">
                        <img 
                            src={Restaurant.image} 
                            alt={Restaurant.name} 
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h2 className="text-lg font-semibold mt-2">{Restaurant.name}</h2>
                        <p className="text-gray-600">{Restaurant.location}</p>
                        <p className="text-yellow-500 font-semibold">⭐ {Restaurant.rating}</p>
                        <div className="flex justify-between mt-3">
                            <button 
                                onClick={() => handleEdit(Restaurant)} 
                                className="bg-[#f2b50d] text-black px-3 py-1 rounded-md cursor-pointer"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => console.log("Delete Restaurant with ID:", Restaurant._id)} 
                                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedRestaurant && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex justify-center items-center transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-95 hover:scale-100">
                        <h2 className="text-xl font-bold mb-4">Edit Restaurant</h2>
                        <input 
                            type="text" 
                            name="name"
                            value={selectedRestaurant.name} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input 
                            type="text" 
                            name="location"
                            value={selectedRestaurant.location} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <textarea 
                            name="description"
                            value={selectedRestaurant.description} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        ></textarea>
                        <input 
                            type="number" 
                            name="rating"
                            value={selectedRestaurant.rating} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <div className="flex justify-between mt-3">
                            <button 
                                className="bg-[#f2b50d] text-black px-4 py-2 rounded-md cursor-pointer" 
                                onClick={updateRestaurant}
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
};

export default SeeRestaurants;
