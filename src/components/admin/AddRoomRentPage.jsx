import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addroom.css'; // Import the CSS file

const AddRoomRentPage = () => {
    // Define state for form fields
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price || !description || !picture) {
            setError('All fields are required');
            return;
        }

        // Prepare the form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('picture', picture);

        try {
            // Make the API call to create the RentRoom
            const response = await axios.post('http://localhost:5000/api/createrentroom', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success response
            if (response.status === 201) {
                alert('Room added successfully!');
                // Reset the form
                setTitle('');
                setPrice('');
                setDescription('');
                setPicture(null);
            }
        } catch (err) {
            setError('Error adding the room');
            console.error('Error:', err);
        }
    };

    return (
        <div className="add-room-container">
            <h1 className="add-room-title">Add Room Rent</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="add-room-form">
                <div className="form-field">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea"
                    ></textarea>
                </div>

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

                <button type="submit" className="submit-button">Add Room</button>
            </form>
        </div>
    );
};

export default AddRoomRentPage;
