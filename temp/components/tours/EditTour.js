import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import "./css/AddTour.css";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { image } from '@cloudinary/url-gen/qualifiers/source';
// Import the Cloudinary classes.
import { Cloudinary } from '@cloudinary/base';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryContext } from 'cloudinary-react';
const EditTour = () => {

    const [tour, setTour] = useState({});
    const { id } = useParams();
    const apiCategory = "http://localhost:8088/api/category";
    const apiTour = "http://localhost:8088/api/tour/list";
    const apiTourCreate = "http://localhost:8088/api/tour/create3";
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectCategory] = useState("");
    const [name, setName] = useState('');
    const [slot, setSlot] = useState('');
    const [price, setPrice] = useState('');
    const [beginTrip, setBeginTrip] = useState('');
    const [endTrip, setEndTrip] = useState('');
    const [description, setDescription] = useState('');
    const [imagePublicId, setImagePublicId] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        axios
            .get(`${apiCategory}`)
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const loadTour = async () => {
        const result = await axios.get(`http://localhost:8088/api/tour/${id}`)
        setTour(result.data)
    }
    useEffect(() => {
        loadTour()
    }, [])

    console.log('http://localhost:8088/api/tour/${id}')
    console.log("Id Tour:", id);
    /* useEffect(() => {
        // Lấy dữ liệu tour từ API và cập nhật state tour
        axios
            .get(`http://localhost:8088/api/tour/${id}`)
            .then((response) => {
                setTour(response.data);
                setName(response.data.name);
                setSlot(response.data.slot);
                setPrice(response.data.price);
                setBeginTrip(response.data.beginTrip);
                setEndTrip(response.data.endTrip);
                setDescription(response.data.description);
                setImagePublicId(response.data.imagePublicId);
                setImageUrl(response.data.imageUrl);
                setSelectCategory(response.data.category_id);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); */



    /* 
        const handleChangeCategory = (e) => {
            const category_idd = e.target.value;
            setSelectCategory(category_idd);
        };
    
        const handleImageChange = (e) => {
            const file = e.target.files[0];
            setImageUrl(file);
        }; */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try
        {
            // Upload the image to Cloudinary and obtain the image URL
            const imageData = new FormData();
            imageData.append('file', imageUrl);
            imageData.append('upload_preset', 'BookingTour');
            imageData.append('cloud_name', 'quocvu1202');
            const imageResponse = await fetch(
                'https://api.cloudinary.com/v1_1/quocvu1202/image/upload',
                {
                    method: 'put',
                    body: imageData,
                }
            );
            const imageJson = await imageResponse.json();
            const tourData = {
                name,
                slot,
                price,
                beginTrip,
                endTrip,
                description,
                imageUrl: imageJson.secure_url, // Use the image URL obtained from Cloudinary API
                imagePublicId: null,
                category_id: selectedCategory,
            }
            const encodeTour = encodeURIComponent(tourData);
            console.log(tourData);;

            // Submit the tour data to the server
            const response = await axios.put('http://localhost:8088/api/tour/${id}', tourData);

            // Reset the form

            console.log(response.data);
            alert('Lưu thông tin thành công!');
        } catch (error)
        {
            console.log(error);
            alert('Lỗi khi lưu thông tin Tour');
        }
    };
    return (
        <div className="row ">
            <div className="col-lg-7 mx-auto">
                <a href="/tour" className="btn btn-primary" role="button" data-bs-toggle="button">Trở Về</a>
                <div className="card mt-2 mx-auto p-4 bg-light">
                    <div className="card-body bg-light">
                        <div className="container">
                            <form
                                className="form-control"
                                id="tour-form"
                                onSubmit={handleSubmit}
                            >
                                <div className="controls">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="form_name">Tên Tour</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={name}
                                                    // onChange={(e) => setName(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Nhập tên Tour"
                                                    required
                                                    data-error="Tour name is required."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="form-address">Số chỗ</label>
                                                <input
                                                    type="number"
                                                    name="slot"
                                                    className="form-control"
                                                    value={slot}
                                                    //  onChange={(e) => setSlot(e.target.value)}
                                                    placeholder="Số chỗ"
                                                    required
                                                    data-error="Slot is required."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="form_price">Price *</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={price}
                                                    //  onChange={(e) => setPrice(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Nhập giá"
                                                    required="required"
                                                    data-error="Price is required."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="form_begin_trip">Ngày khởi hành *</label>
                                                <input
                                                    type="date"
                                                    name="begin_trip"
                                                    value={beginTrip}
                                                    // onChange={(e) => setBeginTrip(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Ngày khởi hành"
                                                    required="required"
                                                    data-error="Begin trip date is required."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="form_end_trip">Ngày kết thúc *</label>
                                                <input
                                                    type="date"
                                                    name="end_trip"
                                                    value={endTrip}
                                                    //  onChange={(e) => setEndTrip(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Ngày kết thúc"
                                                    required="required"
                                                    data-error="End trip date is required."
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="form_description">Mô tả *</label>
                                                <textarea
                                                    name="description"
                                                    value={description}
                                                    //  onChange={(e) => setDescription(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Nhập mô tả"
                                                    rows="4"
                                                    required="required"
                                                    data-error="Description is required."
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="image">Image</label>
                                                <input
                                                    //   onChange={handleImageChange}
                                                    // onChange={(e) => setImageUrl(e.target.files[0])}
                                                    type="file"
                                                    className="form-control-file"
                                                    id="image"
                                                    accept="image/*"
                                                />
                                                {imageUrl && (
                                                    <CloudinaryContext cloudName="quocvu1202">
                                                        <AdvancedImage cldImg={{ publicId: imageUrl }} />
                                                    </CloudinaryContext>
                                                )}
                                                <img src={imageUrl} alt="Tour image" />

                                            </div>

                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="selectCategory">Thể loại</label>
                                                <select
                                                    id="selectCategory"
                                                    name="category_id"
                                                    value={selectedCategory}
                                                    //  onChange={handleChangeCategory}
                                                    className="form-control"
                                                    required="required"
                                                    data-error="Vui lòng chọn thể loại."
                                                >
                                                    <option value="" selected>---- Chọn Thể Loại ---</option>
                                                    {categoryList.map((category) => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <br />
                                        <div className="col-md-12">
                                            <input
                                                type="submit"
                                                className="btn btn-success btn-save pt-2 btn-block"
                                                value="Save Hotel"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditTour