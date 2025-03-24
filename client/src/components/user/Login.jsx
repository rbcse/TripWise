import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;
    const navigate = useNavigate();

    const googleLogin = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);

        const googleUserDetails = {
            email: decoded.email,
            password: 'GoogleAuth@123'
        };

        setIsLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/user/login`, googleUserDetails);

            if (response.data.success) {
                localStorage.setItem("token",response.data.token);
                toast.success("Google Signup successful! Redirecting...");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Google Signup failed. Try again!");
        } finally {
            setIsLoading(false);
        }
    }

    const userLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/user/login`, userDetails);
            console.log(response.data);

            if (response.data.success) {
                localStorage.setItem("token",response.data.token);
                toast.success("Login successful! Redirecting...");
                navigate("/");
            } else {
                toast.error(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <ToastContainer /> {/* Toast notification container */}
                <h2 className="text-2xl font-bold text-center mb-6">Login to
                    <span className="text-[#f2b50d]"> Trip</span>
                    <span className="text-black">Wise</span>
                </h2>
                <form className="space-y-4" onSubmit={userLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b50d]"
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b50d]"
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    />
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-[#f2b50d] text-black font-semibold p-3 rounded-lg hover:bg-yellow-500 flex justify-center items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                        ) : "Login"}
                    </button>
                </form>
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={googleLogin}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />

                </GoogleOAuthProvider>
                <div className="flex justify-between items-center pt-5">
                    <h2>New to <span className="text-[#f2b50d]">Trip</span>Wise?</h2>
                    <a href="/signup" className="text-[#fdbc08]">Create account</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
