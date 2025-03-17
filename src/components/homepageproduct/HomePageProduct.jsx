import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePageProductCard = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                // Replace with your backend API endpoint
                const response = await axios.get('http://localhost:5000/api/getAllrentrooms');
                setRooms(response.data.rooms); // Assuming response.data.rooms contains the room data
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="mt-10">
            {/* Heading */}
            <div className="">
                <h1 className="text-center mb-5 text-2xl font-semibold">Rooms</h1>
            </div>

            {/* main */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {rooms.map((item) => {
                            const { id, picture, title, price } = item;
                            return (
                                <div key={id} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <img
                                            // Use navigate with URL parameter
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-80 h-96 w-full"
                                            src={picture}
                                            alt="Room"
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                Rental
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center">
                                                <button className="bg-blue-500 hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                    onClick={() => navigate(`/productinfo/${id}`)}
                                                    src={picture}
                                                >
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
    );
};

export default HomePageProductCard;
