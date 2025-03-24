import feedbackImg from "../../assets/feedback.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Feedback = () => {
    const [feedbackDetails, setFeedbackDetails] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const submitFeedback = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/user/feedback`, feedbackDetails);
            if (response.data.success) {
                toast.success("Feedback Submitted Successfully");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6">
            <div className="md:w-1/2 flex justify-center">
                <img src={feedbackImg} alt="Feedback" className="w-full max-w-xs md:max-w-md" />
            </div>
            
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md w-full mt-6 md:mt-0">
                <h2 className="text-2xl font-bold mb-4">
                    Feedback to
                    <span className="text-[#fbc531]">Trip</span>
                    <span className="text-black">Wise</span>
                </h2>
                
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbc531]"
                        onChange={(e) => setFeedbackDetails({ ...feedbackDetails, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbc531]"
                        onChange={(e) => setFeedbackDetails({ ...feedbackDetails, email: e.target.value })}
                    />
                    <textarea
                        placeholder="Your Feedback"
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbc531]"
                        onChange={(e) => setFeedbackDetails({ ...feedbackDetails, description: e.target.value })}
                    ></textarea>
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-[#fbc531] text-black p-2 rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center justify-center"
                        onClick={submitFeedback}
                        disabled={loading}
                    >
                        {loading ? <span className="loader border-t-2 border-black w-4 h-4 rounded-full animate-spin"></span> : "Submit"}
                    </button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
            </div>
        </div>
    );
};

export default Feedback;
