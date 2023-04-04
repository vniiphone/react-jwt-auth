import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/AddTour.css";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { image } from '@cloudinary/url-gen/qualifiers/source';
// Import the Cloudinary classes.
import { Cloudinary } from '@cloudinary/base';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryContext } from 'cloudinary-react';


const cloudinary = new Cloudinary({
    cloud: {
        cloudName: 'quocvu1202',
        apiKey: '213571667938334',
        apiSecret: 'Px1T6Q3-V9psTx8aE8nsK23s6F8',
    },
})

function ThemTour() {
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

    const [tour, setTour] = useState({
        name: "",
        slot: "",
        price: "",
        beginTrip: "",
        endTrip: "",
        description: "",
        imagePublicId: "",
        imageUrl: "",
        selectedCategory: ""
    });

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

    const handleChangeCategory = (e) => {
        const category_idd = e.target.value;
        setSelectCategory(category_idd);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedCategory)
        {
            alert('Vui lòng chọn loại tour!');
            return;
        }
        if (!imageUrl)
        {
            alert('Vui lòng chọn ảnh cho tour!');
            return;
        }
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
                    method: 'post',
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
            const response = await axios.post(apiTourCreate, tourData);

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
                                                    onChange={(e) => { setName(e.target.value) }}
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
                                                    onChange={(e) => setSlot(e.target.value)}
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
                                                    onChange={(e) => setPrice(e.target.value)}
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
                                                    onChange={(e) => setBeginTrip(e.target.value)}
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
                                                    onChange={(e) => setEndTrip(e.target.value)}
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
                                                    onChange={(e) => setDescription(e.target.value)}
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
                                                    onChange={handleImageChange}
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
                                            </div>

                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="selectCategory">loại Tour</label>
                                                <select
                                                    id="selectCategory"
                                                    name="category_id"
                                                    value={selectedCategory}
                                                    onChange={handleChangeCategory}
                                                    className="form-control"
                                                    required="required"
                                                    data-error="Vui lòng chọn loại Tour."
                                                >
                                                    <option value="" selected>---- Chọn Loại Tour ---</option>
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
export default ThemTour;

