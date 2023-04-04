import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Restau() {
    const [restaus, setRestaus] = useState([]);
    useEffect(() => {
        loadRestaus();
    }, []);

    const loadRestaus = async () => {
        const result = await axios.get("http://localhost:8088/api/restau");
        setRestaus(result.data);
    }; return (
        <div className="container">

            <div className="py-4">
                <a href="/AddRestau" class="btn btn-primary" role="button" data-bs-toggle="button">Thêm Nhà Hàng</a>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col" class="col-md-1">
                                ID
                            </th>
                            <th scope="col" class="col-md-2">
                                Restaurance
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
                        {restaus.map((restau, index) => (
                            <tr>
                                <th key={index}>
                                    {index + 1}
                                </th>
                                <td>{restau.name}</td>
                                <td>{restau.addressSecond.phone}</td>
                                <td>{restau.addressSecond.address2}</td>
                                <td>{restau.addressSecond.ward.name}</td>
                                <td>{restau.addressSecond.ward.district.name}</td>
                                <td>{restau.addressSecond.ward.district.city.name}</td>
                                <td>
                                    <button className="btn btn-primary mx-2">Detail</button>
                                    <Link className="btn btn-outline-primary mx-2" to={`/editplace/${restau.id}`}>
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