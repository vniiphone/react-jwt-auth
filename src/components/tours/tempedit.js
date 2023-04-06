import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';// Import the Cloudinary classes.
import axios from 'axios';// Import the Cloudinary classes.
import { Cloudinary } from '@cloudinary/base';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryContext } from 'cloudinary-react';
import { createBrowserHistory } from 'history';


const EditTour = () => {
    const { id } = useParams(); // Lấy ID của tour từ URL
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

    });

    const apiCategory = "http://localhost:8088/api/category";


    useEffect(() => {
        // const getTour = async () => {
        //     try
        //     {
        //         const { data } = await axios.get(`http://localhost:8088/api/tour/${id}`);
        //         setTour(data);
        //     } catch (error)
        //     {
        //         console.error(error);
        //     }
        // };




        axios
            .get(`${apiCategory}`)
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getTour();
    }, [id]);
    const handleChangeCategory = (e) => {
        const category_idd = e.target.value;
        setSelectCategory(category_idd);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTour((prevState) => ({ ...prevState, [name]: value }));
    };
    const history = createBrowserHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try
        {
            if (handleImageChange)
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
            } else
            {
                await axios.put(`http://localhost:8088/api/tour/${id}`, tour);
                // Chuyển hướng đến trang danh sách tour sau khi cập nhật thành công
                history.push('/tour-list');
            }

        } catch (error)
        {
            console.error(error);
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
                                                    value={tour.name}
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
                                                    value={tour.slot}
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
                                                    value={tour.price}
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
                                                    value={tour.beginTrip}
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
                                                    value={tour.endTrip}
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
                                                    value={tour.description}
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
                                        <div className="col-8 flex-center">
                                            <input
                                                type="submit"
                                                className="btn btn-success btn-save pt-1 btn-block"
                                                value="Update Tour"
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

    );
    export default EditTour

/*

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
        */



// const EditTour = () => {
//     const { id } = useParams(); // Lấy ID của tour từ URL
//     const [categoryList, setCategoryList] = useState([]);
//     const [selectedCategory, setSelectCategory] = useState("");
//     const [name, setName] = useState('');
//     const [slot, setSlot] = useState('');
//     const [price, setPrice] = useState('');
//     const [beginTrip, setBeginTrip] = useState('');
//     const [endTrip, setEndTrip] = useState('');
//     const [description, setDescription] = useState('');
//     const [imagePublicId, setImagePublicId] = useState('');
//     const [imageUrl, setImageUrl] = useState(null);

//     const [tour, setTour] = useState({

//     });

//     const apiCategory = "http://localhost:8088/api/category";


//     useEffect(() => {
//         // const getTour = async () => {
//         //     try
//         //     {
//         //         const { data } = await axios.get(`http://localhost:8088/api/tour/${id}`);
//         //         setTour(data);
//         //     } catch (error)
//         //     {
//         //         console.error(error);
//         //     }
//         // };
//         const getTour = async () => {
//             try
//             {
//                 const { data } = await axios.get(`http://localhost:8088/api/tour/${id}`);
//                 setTour(data);
//             } catch (error)
//             {
//                 console.error(error);
//             }
//         };
//         getTour();
//     }, [id]);


//     axios
//         .get(`${apiCategory}`)
//         .then((response) => {
//             setCategoryList(response.data);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     getTour();
// }, [id]);
// const handleChangeCategory = (e) => {
//     const category_idd = e.target.value;
//     setSelectCategory(category_idd);
// };
// const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageUrl(file);
// };
// const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setTour((prevState) => ({ ...prevState, [name]: value }));
// };
// const history = createBrowserHistory();
// const handleSubmit = async (event) => {
//     event.preventDefault();
//     try
//     {
//         if (handleImageChange)
//         {
//             // Upload the image to Cloudinary and obtain the image URL
//             const imageData = new FormData();
//             imageData.append('file', imageUrl);
//             imageData.append('upload_preset', 'BookingTour');
//             imageData.append('cloud_name', 'quocvu1202');
//             const imageResponse = await fetch(
//                 'https://api.cloudinary.com/v1_1/quocvu1202/image/upload',
//                 {
//                     method: 'post',
//                     body: imageData,
//                 }
//             );
//             const imageJson = await imageResponse.json();
//         } else
//         {
//             await axios.put(`http://localhost:8088/api/tour/${id}`, tour);
//             // Chuyển hướng đến trang danh sách tour sau khi cập nhật thành công
//             history.push('/tour-list');
//         }

//     } catch (error)
//     {
//         console.error(error);
//     }
// };




/*

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
*/