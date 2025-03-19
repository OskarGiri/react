import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from "../../components/layout/Layout";

const ProductInfo = () => {
    const { id } = useParams();  // Get the 'id' from the URL params
    const [roomDetails, setRoomDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(id);

    useEffect(() => {
        // Check if id exists
        if (!id) {
            setLoading(false);  // Stop loading if no id
            return; // Exit the useEffect if id is not available
        }

        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/getbyIdrentroom/${id}`);
                setRoomDetails(response.data.room); // Assuming response.data.room contains the room details
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!roomDetails) {
        return <div>Room not found</div>;
    }

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                            <div>
                                <img
                                    className="w-full lg:h-[39em] rounded-lg"
                                    src={roomDetails.picture}  // Dynamically set image based on fetched data
                                    alt="room"
                                />
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6">
                                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                        {roomDetails.title}  {/* Dynamically set title */}
                                    </h2>
                                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                        Rs. {roomDetails.price} {/* Dynamically set price */}
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                        Description:
                                    </h2>
                                    <p>{roomDetails.description}</p> {/* Dynamically set description */}
                                </div>

                                {/* Static Contact Information Section */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-700 dark:text-gray-400 mb-4">Contact Information</h2>
                                    <p className="text-gray-700 dark:text-gray-400">
                                        <strong>Email: </strong>Oscar123@gmail.com
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-400">
                                        <strong>Phone Number: </strong>+9823456789
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;
