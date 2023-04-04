import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Firm() {
  const [firms, setFirms] = useState([]);
  useEffect(() => {
    loadFirms();
  }, []);

  const loadFirms = async () => {
    const result = await axios.get("http://localhost:8088/api/firm");
    setFirms(result.data);
  };

  return (
    <div className="container">

      <div className="py-4">
        <a href="/addfirm" class="btn btn-primary" role="button" data-bs-toggle="button">Thêm Công Ty</a>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col" class="col-md-1">
                ID
              </th>
              <th scope="col" class="col-md-2">
                Name Firm
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
            {firms.map((firm, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{firm.name}</td>
                <td>{firm.addressSecond.phone}</td>
                <td>{firm.addressSecond.address2}</td>
                <td>{firm.addressSecond.ward.name}</td>
                <td>{firm.addressSecond.ward.district.name}</td>
                <td>{firm.addressSecond.ward.district.city.name}</td>
                <td>
                  <button className="btn btn-primary mx-2">Detail</button>
                  <Link className="btn btn-outline-primary mx-2"
                    to={'/editFirm/${firm.id}'}
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