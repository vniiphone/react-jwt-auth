import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Category() {
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        loadCategorys();
    }, []);

    const loadCategorys = async () => {
        const result = await axios.get("http://localhost:8088/api/category");
        setCategorys(result.data);
    };

    return (
        <div className="container">

            <div className="py-4">
                <a href="/addcategory" class="btn btn-primary" role="button" data-bs-toggle="button">Thêm Loại Tour</a>

                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col" class="col-md-1">
                                ID
                            </th>
                            <th scope="col" class="col-md-2">
                                Category
                            </th>
                            <th scope="col" class="col-md-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorys.map((category, index) => (
                            <tr>
                                <th scope="row" key={index} className="ant-col-md-1">
                                    {index + 1}
                                </th>
                                <td className="ant-col-md-2">{category.name}</td>
                                <td className="ant-col-md-3">
                                    <button className="btn btn-primary mx-2">Detail</button>
                                    <Link className="btn btn-outline-primary mx-2"
                                        to={'/editCategory/${category.id}'}
                                    >
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