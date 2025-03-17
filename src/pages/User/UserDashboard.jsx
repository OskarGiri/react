import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";

const products = [
    {
        id: 1,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/17/97/fe/b8/kathmandu-airport-hotel.jpg',
        title: 'Kathmandu',
        Rent: 12222,
    },
];

const UserDashboard = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePicture: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal visibility state
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        profilePicture: '',
    });


     const [picture, setPicture] = useState(null);
    
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/users/getbyIDusers/${userId}`);
                    console.log(response.data);
                    setUserData({
                        name: response.data.fullName,
                        email: response.data.email,
                        profilePicture: response.data.profilePicture || '',
                    });
                    setEditFormData({
                        name: response.data.fullName,
                        email: response.data.email,
                        profilePicture: response.data.profilePicture || '',
                    });
                } catch (err) {
                    setError('Failed to fetch user data');
                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        } else {
            setError('No user logged in');
            setLoading(false);
        }
    }, []);

    // Handle form change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    // Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const formData = new FormData();
                formData.append('fullName', editFormData.name);
                formData.append('email', editFormData.email);
                    formData.append('profilePic', picture);
            
    
                // Make PUT request to update user
                const response = await axios.put(`http://localhost:5000/users/updateuser/${userId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // important for file upload
                    },
                });
    
                setUserData({
                    name: response.data.fullName,
                    email: response.data.email,
                    profilePicture: response.data.profilePicture || '',
                });
    
                setIsEditModalOpen(false); // Close the modal after submission
            }
        } catch (err) {
            setError('Failed to update profile');
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-5 lg:py-8">
        {/* Top */}
        <div className="top">
            {/* Main */}
            <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
                {/* Text */}
                   {/* Profile Picture */}
                   {userData.profilePicture && (
                        <div className="my-4">
                            <img
                                src={userData.profilePicture}
                                alt="Profile"
                                className="w-32 h-32 object-cover rounded-full mx-auto"
                            />
                        </div>
                    )}
                <div className="text-center">
                    <h1 className="text-lg"><span className="font-bold">Name :</span> {userData.name}</h1>
                    <h1 className="text-lg"><span className="font-bold">Email :</span> {userData.email}</h1>
    
                 
                </div>
                {/* Edit Button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2" htmlFor="profilePicture">Profile Picture URL</label>
                                <div className="form-field">
                    <label htmlFor="picture" className="form-label">Upload Picture</label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        onChange={(e) => setPicture(e.target.files[0])}
                        className="form-input"
                    />
                </div>
                            </div>
                            {/* Profile Picture Preview */}
                            {editFormData.profilePicture && (
                                <div className="mb-4">
                                    <img
                                        src={editFormData.profilePicture}
                                        alt="Profile Preview"
                                        className="w-32 h-32 object-cover rounded-full mx-auto"
                                    />
                                </div>
                            )}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
