import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Place() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        loadPlaces();
    }, []);

    const loadPlaces = async () => {
        const result = await axios.get("http://localhost:8088/api/place");
        setPlaces(result.data);
    }; return (
        <div className="container">

            <div className="py-4">
                <a href="/AddPlace" class="btn btn-primary" role="button" data-bs-toggle="button">Thêm Địa Điểm Du Lịch</a>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col" class="col-md-1">
                                ID
                            </th>
                            <th scope="col" class="col-md-2">
                                Place
                            </th>
                            <th scope="col" class="col-md-1">
                                Phone
                            </th>
                            <th scope="col" class="col-md-1">
                                Address
                            </th>
                            <th scope="col" class="col-md-1">
                                Ward
                            </th>
                            <th scope="col" class="col-md-2">
                                District
                            </th>
                            <th scope="col" class="col-md-1">
                                Province/City
                            </th>
                            <th scope="col" class="col-md-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {places.map((place, index) => (
                            <tr>
                                <th key={index}>
                                    {index + 1}
                                </th>
                                <td>{place.name}</td>
                                <td>{place.addressSecond.phone}</td>
                                <td>{place.addressSecond.address2}</td>
                                <td>{place.addressSecond.ward.name}</td>
                                <td>{place.addressSecond.ward.district.name}</td>
                                <td>{place.addressSecond.ward.district.city.name}</td>
                                <td>
                                    <button className="btn btn-primary mx-2">Detail</button>
                                    <Link className="btn btn-outline-primary mx-2" to={`/editplace/${place.id}`}>
                                        Edit
                                    </Link>

                                    <button className="btn btn-danger mx-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}