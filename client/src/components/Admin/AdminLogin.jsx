import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
    const [adminDetails, setAdminDetails] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload
        setIsLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/admin/login`, adminDetails);
            
            if (response.data.success) {
                toast.success("Admin Login Successful, Redirecting...");
                setTimeout(() => navigate("/tripWise-admin-dashboard"), 2000);
            } else {
                toast.error(response.data.error || "Login failed");
            }
        } catch (error) {
            toast.error("Invalid Credentials or Server Error");
            console.error("Login Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">
                    <span className="text-[#f2b50d]">Trip</span>
                    <span className="text-black">Wise</span>
                </h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Admin Email"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b50d]"
                        onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b50d]"
                        onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#f2b50d] text-black font-semibold p-3 rounded-lg hover:bg-yellow-500"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AdminLogin;
