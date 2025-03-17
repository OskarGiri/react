import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RoomRentDetail = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]); // Default as empty array

    // Fetch all rooms from the backend API
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getAllrentrooms/');
                console.log('Rooms:', response.data.rooms); // Log the rooms array
                // Set the rooms state to the 'rooms' array from the response
                setRooms(Array.isArray(response.data.rooms) ? response.data.rooms : []);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
    
        fetchRooms();
    }, []);
    

    // Handle edit button click
    const handleEdit = (room) => {
        setSelectedRoom(room);
        setShowModal(true); // Open modal for editing
    };

    // Handle delete button click
    const handleDelete = async (roomId) => {
        try {
            await axios.delete(`http://localhost:5000/api/delRentroom/${roomId}`);
            setRooms(rooms.filter(room => room.id !== roomId)); // Remove room from the list
            console.log(`Room with ID: ${roomId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    // Handle save changes after editing
    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/api/updaterentroom/${selectedRoom.id}`, selectedRoom);
            setRooms(rooms.map(room => room.id === selectedRoom.id ? selectedRoom : room));
            setShowModal(false); // Close modal
            setSelectedRoom(null);
            alert('Room updated successfully');
        } catch (error) {
            console.error('Error updating room:', error);
        }
    };

    // Close the modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedRoom(null);
    };

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-xl text-pink-300 font-bold">All Rooms for Rent</h1>
                <Link to={'/addroom'}>
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">Add Room</button>
                </Link>
            </div>

            {/* Table to display room details */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Room Title</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Description</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Image</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {Array.isArray(rooms) && rooms.map((room, index) => (
                            <tr key={room.id} className="text-pink-300">
                                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{index + 1}</td>
                                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{room.title}</td>
                                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{room.description}</td>
                                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                    <img src={room.picture} alt={room.title} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{room.price}</td>
                                <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                                    <button onClick={() => handleEdit(room)} className="text-green-500 cursor-pointer mr-4">Edit</button>
                                    <button onClick={() => handleDelete(room.id)} className="text-red-500 cursor-pointer">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal Overlay */}
            {showModal && selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl mb-4">Edit Room</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-md mb-2">Room Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={selectedRoom.title}
                                    className="w-full px-4 py-2 border border-pink-200 rounded"
                                    onChange={(e) => setSelectedRoom({ ...selectedRoom, title: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-md mb-2">Price</label>
                                <input
                                    type="text"
                                    id="price"
                                    value={selectedRoom.price}
                                    className="w-full px-4 py-2 border border-pink-200 rounded"
                                    onChange={(e) => setSelectedRoom({ ...selectedRoom, price: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-md mb-2">Description</label>
                                <textarea
                                    id="description"
                                    value={selectedRoom.description}
                                    className="w-full px-4 py-2 border border-pink-200 rounded"
                                    onChange={(e) => setSelectedRoom({ ...selectedRoom, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-pink-500 text-white px-4 py-2 rounded"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomRentDetail;
