import { useState } from "react";
import ImageUploader from "./ImageUploader";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPlaceForm = () => {
    const [image, setImage] = useState(null);
    const [name , setName] = useState("");
    const [location , setLocation] = useState("");
    const [rating , setRating] = useState(0);
    const [description , setDescription] = useState("");
    const [loading, setLoading] = useState(false); // 🔹 Preloader state
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const submitPlaceDetails = async (e) => {
        e.preventDefault();
        setLoading(true); // 🔹 Show preloader
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("location", location);
            formData.append("rating", rating);
            formData.append("description", description);

            const response = await axios.post(`${BACKEND_URL}/admin/add-place`, formData);
            if(response.data.success){
                toast.success("Place added successfully");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error("Failed to add place");
        } finally {
            setLoading(false); // 🔹 Hide preloader after response
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                <span className="text-[#f2b50d]">Trip</span>
                <span className="text-black">Wise</span>
            </h2>
            <form className="space-y-4">
                <ImageUploader image={image} setImage={setImage} />
                <input type="text" placeholder="Place Name" className="outline-none w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f2b50d]"  onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Location" className="outline-none w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f2b50d]"  onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="Rating (out of 5)" className="outline-none w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f2b50d]"  onChange={(e) => setRating(e.target.value)} />
                <textarea placeholder="Description" className="outline-none w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f2b50d]" rows="4" onChange={(e) => setDescription(e.target.value)}></textarea>
                
                <button 
                    type="submit" 
                    className="w-full bg-[#f2b50d] text-black font-semibold p-3 rounded-lg hover:bg-yellow-500 flex items-center justify-center"
                    onClick={submitPlaceDetails} 
                    disabled={loading} // 🔹 Disable while loading
                >
                    {loading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-black" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                            </svg>
                            Adding...
                        </div>
                    ) : (
                        "Add Place"
                    )}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddPlaceForm;
