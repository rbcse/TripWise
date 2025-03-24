import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        image : ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const clientId = import.meta.env.VITE_REACT_APP_CLIENT_ID;

    const googleSignup = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        
        const googleUserDetails = {
            name: decoded.name,
            email: decoded.email,
            password: 'GoogleAuth@123',
            image : decoded.picture
        };
    
        setIsLoading(true);
    
        try {
            const response = await axios.post(`${BACKEND_URL}/user/signup`, googleUserDetails);
    
            if (response.data.success) {
                toast.success("Google Signup successful! Redirecting...");
                setTimeout(() => {
                    navigate('/login');
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
    };
    

    const checkUserEmail = async (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            return { success: false, error: "Email is required." };
        }

        if (!emailRegex.test(email)) {
            return { success: false, error: "Invalid email format." };
        }

        return { success: true, message: "Valid email." };
    };

    const checkUserPassword = async (password) => {
        if (!password) {
            return { success: false, error: "Password is required." };
        }

        if (password.length < 8) {
            return { success: false, error: "Password must be at least 8 characters long." };
        }

        if (!/[A-Z]/.test(password)) {
            return { success: false, error: "Password must contain at least one uppercase letter." };
        }

        if (!/[a-z]/.test(password)) {
            return { success: false, error: "Password must contain at least one lowercase letter." };
        }

        if (!/[0-9]/.test(password)) {
            return { success: false, error: "Password must contain at least one digit." };
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { success: false, error: "Password must contain at least one special character." };
        }

        return { success: true, message: "Valid password." };
    };

    const userSignup = async (e) => {
        if(e){
            e.preventDefault();
        }
        setIsLoading(true);

        try {
            console.log("User:", userDetails);
            const checkEmail = await checkUserEmail(userDetails.email);
            const checkPassword = await checkUserPassword(userDetails.password);

            if (!checkEmail.success) {
                toast.error(checkEmail.error);
                setIsLoading(false);
                return;
            } else if (!checkPassword.success) {
                toast.error(checkPassword.error);
                setIsLoading(false);
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/user/signup`, userDetails);
            console.log(response.data);

            if (response.data.success) {
                toast.success("Signup successful! Redirecting...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }

            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error("Signup failed. Try again!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <ToastContainer />
                <h2 className="text-2xl font-bold text-center mb-6">New to
                    <span className="text-[#f2b50d]"> Trip</span>
                    <span className="text-black">Wise</span>
                </h2>
                <form className="space-y-4" onSubmit={userSignup}>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2b50d]"
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    />
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
                        ) : "Create Account"}
                    </button>
                </form>
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={googleSignup}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />

                </GoogleOAuthProvider>
                <div className="flex justify-between items-center pt-5">
                    <h2>Already have an account?</h2>
                    <a href="/login" className="text-[#fdbc08]">Login</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
