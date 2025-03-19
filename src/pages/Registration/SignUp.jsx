import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // To redirect after successful signup

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true); // Set loading state while waiting for the API response
        setError(''); // Reset error state before making request
        setSuccessMessage(''); // Reset success message before making request
        
        try {
            // POST request to the backend signup API
            const response = await axios.post('http://localhost:5000/users/register', {
                fullName,
                email,
                password,
                profilePic
            });

            if (response.status === 201) {
                // Set the success message and reset the form
                setSuccessMessage("Signup successful! You can now log in.");
                // Redirect user to login page after a short delay
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong!"); // Show error if signup fails
        } finally {
            setLoading(false); // Reset loading state after API request
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {/* Signup Form */}
            <div className="login_Form bg-blue-50 px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">
                
                {/* Top Heading */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-blue-500'>
                        Signup
                    </h2>
                </div>

                {/* Full Name Input */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Signup Button */}
                <div className="mb-5">
                    <button
                        type='button'
                        className='bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md'
                        onClick={handleSubmit}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Signing Up...' : 'Signup'}
                    </button>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="text-green-500 text-center mb-3">
                        {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-center mb-3">
                        {error}
                    </div>
                )}

                <div>
                    <h2 className='text-black'>
                        Have an account? <Link className=' text-blue-500 font-bold' to={'/'}>Login</Link>
                    </h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;
