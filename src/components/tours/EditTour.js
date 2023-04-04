import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditTour = () => {
    const { id } = useParams(); // Lấy ID của tour từ URL
    const [tour, setTour] = useState({});

    useEffect(() => {
        const getTour = async () => {
            try
            {
                const { data } = await axios.get(`http://localhost:8088/api/tour/${id}`);
                setTour(data);
            } catch (error)
            {
                console.error(error);
            }
        };

        getTour();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTour((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try
        {
            await axios.put(`http://localhost:8088/api/tour/${id}`, tour);
            // Chuyển hướng đến trang danh sách tour sau khi cập nhật thành công
            history.push('/tour-list');
        } catch (error)
        {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Edit Tour</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={tour.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="slot">Slot:</label>
                    <input
                        type="number"
                        name="slot"
                        value={tour.slot}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={tour.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="beginTrip">Begin Trip:</label>
                    <input
                        type="date"
                        name="beginTrip"
                        value={tour.beginTrip}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="endTrip">End Trip:</label>
                    <input
                        type="date"
                        name="endTrip"
                        value={tour.endTrip}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        value={tour.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Update Tour</button>
            </form>
        </div>
    );
};

export default EditTour;
