import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import moment from 'moment';


function TourList() {
    const [tours, setTours] = useState([]);


    const apiTourDelete = 'http://localhost:8088/api/tour/'
    useEffect(() => {
        axios.get('http://localhost:8088/api/tour/List')
            .then(response => {
                setTours(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }); // Thêm history vào danh sách phụ thuộc của useEffect

    const handleDelete = (id) => {
        const url = apiTourDelete + id;
        fetch(url, {
            method: 'delete',
        }).then(response => {
            // Nếu xóa thành công, cập nhật lại danh sách tour
            if (response.ok)
            {
                setTours(tours.filter(tour => tour.id !== id));
            }
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className='container'>
            <div className='py-4'>

                <a href="/AddTour" class="btn btn-primary" role="button" data-bs-toggle="button">Thêm Tour Mới</a>

                <h1>Tour List</h1>
                <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='col' className='col-md-1 center'>ID</th>
                            <th scope='col' className='col-md-1 center'>Name</th>
                            <th scope='col' className='col-md-1 center'>Slot</th>
                            <th scope='col' className='col-md-1 center'>Price</th>
                            <th scope='col' className='col-md-1 center'>Begin Trip</th>
                            <th scope='col' className='col-md-1 center'>End Trip</th>
                            <th scope='col' className='col-md-1 clearfix'>Description</th>
                            <th scope="col" class="col-md-3 clearfix">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map(tour => (
                            <tr key={tour.id}>
                                <td className='col-md-1 center' >{tour.id}</td>
                                <td className='col-md-1 center'>{tour.name}</td>
                                <td className='col-md-1 center'>{tour.slot}</td>
                                <td className='col-md-1 center'>{tour.price}</td>
                                <td className='col-md-1 center'>{moment(tour.beginTrip).format("DD/MM/YYYY")}</td>
                                <td className='col-md-1 center'>{moment(tour.endTrip).format("DD/MM/YYYY")}</td>
                                <td className='col-md-1 center'>{tour.description}</td>
                                <td className='col-md-1 center'>
                                    <button className="btn btn-primary mx-2">Detail</button>

                                    <Link to={`/edittour/${tour.id}`}>
                                        <button
                                            className="btn btn-outline-primary mx-2"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(tour.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TourList;
