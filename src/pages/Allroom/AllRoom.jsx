import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Layout from "../../components/layout/Layout";

const AllProduct = () => {
    const [rooms, setRooms] = useState([]); // Store room data from API
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch all rooms from the backend
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getAllrentrooms');
                setRooms(response.data.rooms); // Assuming response.data.rooms contains the room data
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchRooms();
    }, []); // Empty dependency array ensures this runs once when component mounts

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">All Room</h1>
                </div>

                {/* Main content */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {rooms.map((item, index) => {
                                const { picture, title, price, id } = item;
                                return (
                                    <div key={index} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)} // Use the room's ID in the URL
                                                className="lg:h-80 h-96 w-full"
                                                src={picture}
                                                alt={title}
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
Kathmandu                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    {title.substring(0, 25)}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    ₹{price}
                                                </h1>

                                                <div className="flex justify-center">
                                                    <button className="bg-blue-500 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                    onClick={() => navigate(`/productinfo/${id}`)} >

                                                        Book now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
