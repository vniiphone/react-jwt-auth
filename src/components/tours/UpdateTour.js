import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { image } from '@cloudinary/url-gen/qualifiers/source';
// Import the Cloudinary classes.
import { Cloudinary } from '@cloudinary/base';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryContext } from 'cloudinary-react';
const EditTour = (props) => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectCategory] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [imagePublicId, setImagePublicId] = useState('');
    const navigate = useNavigate();

    const [tour, setTour] = useState({
        name: '',
        slot: '',
        price: '',
        beginTrip: '',
        endTrip: '',
        description: '',
        imagePublicId: '',
        imageUrl: null,
        category: {
            id: '',
            name: ''
        }
    });

    const apiCategory = "http://localhost:8088/api/category";

    useEffect(() => {
        const getTour = async () => {
            try
            {
                const { data } = await axios.get(`http://localhost:8088/api/tour/${props.match.params.id}`);
                setTour(data);
            } catch (error)
            {
                console.error(error);
            }
        };
        getTour();
    }, [props.match.params.id]);

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTour((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    };
    // Upload image to Cloudinary
    const uploadImage = async (e) => {
        try
        {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'your_upload_preset');
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
                formData
            );
            setTour({ ...tour, imagePublicId: response.data.public_id });
            setImageUrl(response.data.secure_url);
            console.log('Image uploaded to Cloudinary');
        } catch (error)
        {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try
        {
            if (tour.imageUrl)
            {
                // Upload the image to Cloudinary and obtain the image URL
                const imageData = new FormData();
                imageData.append('file', tour.imageUrl);
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
                setTour((prevState) => ({ ...prevState, imagePublicId: imageJson.public_id }));
            }
            await axios.put(`http://localhost:8088/api/tour/${props.match.params.id}`, tour);
            // Chuyển hướng đến trang danh sách tour sau khi cập nhật thành công
            props.history.push('/tour-list');
        } catch (error)
        {
            console.error(error);
        }
    };

    return (
        // <div className="row ">
        //     <div className="col-lg-7 mx-auto">
        //         <a href="/tour" className="btn btn-primary" role="button" data-bs-toggle="button">Trở Về</a>
        //         <div className="card mt-2 mx-auto p-4 bg-light">
        //             <div className="card-body bg-light">
        //                 <div className="container">
        //                     <form
        //                         className="form-control"
        //                         id="tour-form"
        //                         onSubmit={handleSubmit}
        //                     >
        //                         <div className="controls">
        //                             <div className="row">
        //                                 <div className="col-md-6">
        //                                     <div className="form-group">
        //                                         <label htmlFor="form_name">Tên Tour</label>
        //                                         <input
        //                                             type="text"
        //                                             name="name"
        //                                             value={tour.name}
        //                                             onChange={(e) => { setName(e.target.value) }}
        //                                             className="form-control"
        //                                             placeholder="Nhập tên Tour"
        //                                             required
        //                                             data-error="Tour name is required."

        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-md-6">
        //                                     <div className="form-group">
        //                                         <label htmlFor="form-address">Số chỗ</label>
        //                                         <input
        //                                             type="number"
        //                                             name="slot"
        //                                             className="form-control"
        //                                             value={tour.slot}
        //                                             onChange={(e) => setSlot(e.target.value)}
        //                                             placeholder="Số chỗ"
        //                                             required
        //                                             data-error="Slot is required."
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-md-6">
        //                                     <div className="form-group">
        //                                         <label htmlFor="form_price">Price *</label>
        //                                         <input
        //                                             type="number"
        //                                             name="price"
        //                                             value={tour.price}
        //                                             onChange={(e) => setPrice(e.target.value)}
        //                                             className="form-control"
        //                                             placeholder="Nhập giá"
        //                                             required="required"
        //                                             data-error="Price is required."
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-md-6">
        //                                     <div className="form-group">
        //                                         <label htmlFor="form_begin_trip">Ngày khởi hành *</label>
        //                                         <input
        //                                             type="date"
        //                                             name="begin_trip"
        //                                             value={tour.beginTrip}
        //                                             onChange={(e) => setBeginTrip(e.target.value)}
        //                                             className="form-control"
        //                                             placeholder="Ngày khởi hành"
        //                                             required="required"
        //                                             data-error="Begin trip date is required."
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-md-6">
        //                                     <div className="form-group">
        //                                         <label htmlFor="form_end_trip">Ngày kết thúc *</label>
        //                                         <input
        //                                             type="date"
        //                                             name="end_trip"
        //                                             value={tour.endTrip}
        //                                             onChange={(e) => setEndTrip(e.target.value)}
        //                                             className="form-control"
        //                                             placeholder="Ngày kết thúc"
        //                                             required="required"
        //                                             data-error="End trip date is required."
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-md-12">
        //                                     <div className="form-group">
        //                                         <label htmlFor="form_description">Mô tả *</label>
        //                                         <textarea
        //                                             name="description"
        //                                             value={tour.description}
        //                                             onChange={(e) => setDescription(e.target.value)}
        //                                             className="form-control"
        //                                             placeholder="Nhập mô tả"
        //                                             rows="4"
        //                                             required="required"
        //                                             data-error="Description is required."
        //                                         ></textarea>
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-md-12">
        //                                     <div className="form-group">
        //                                         <label htmlFor="image">Image</label>
        //                                         <input
        //                                             onChange={handleImageChange}
        //                                             // onChange={(e) => setImageUrl(e.target.files[0])}
        //                                             type="file"
        //                                             className="form-control-file"
        //                                             id="image"
        //                                             accept="image/*"
        //                                         />
        //                                         {imageUrl && (
        //                                             <CloudinaryContext cloudName="quocvu1202">
        //                                                 <AdvancedImage cldImg={{ publicId: imageUrl }} />
        //                                             </CloudinaryContext>
        //                                         )}
        //                                     </div>

        //                                 </div>
        //                                 <div className="col-md-12">
        //                                     <div className="form-group">
        //                                         <label htmlFor="selectCategory">loại Tour</label>
        //                                         <select
        //                                             id="selectCategory"
        //                                             name="category_id"
        //                                             value={selectedCategory}
        //                                             onChange={handleChangeCategory}
        //                                             className="form-control"
        //                                             required="required"
        //                                             data-error="Vui lòng chọn loại Tour."
        //                                         >
        //                                             <option value="" selected>---- Chọn Loại Tour ---</option>
        //                                             {categoryList.map((category) => (
        //                                                 <option key={category.id} value={category.id}>{category.name}</option>
        //                                             ))}
        //                                         </select>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="row">
        //                                 <br />
        //                                 <div className="col-8 flex-center">
        //                                     <input
        //                                         type="submit"
        //                                         className="btn btn-success btn-save pt-1 btn-block"
        //                                         value="Update Tour"
        //                                     />


        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </form>

        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // </div>

        <div>
            <h2>Edit Tour</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={tour.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="slot">Slot</label>
                    <input type="number" className="form-control" id="slot" name="slot" value={tour.slot} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" name="price" value={tour.price} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="beginTrip">Begin Trip</label>
                    <input type="date" className="form-control" id="beginTrip" name="beginTrip" value={tour.beginTrip} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="endTrip">End Trip</label>
                    <input type="date" className="form-control" id="endTrip" name="endTrip" value={tour.endTrip} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" value={tour.description} onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-control" id="category" name="category" value={selectedCategory} onChange={handleChangeCategory}>
                        <option value="">Choose category</option>
                        {categoryList.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                    {tour.imagePublicId && (
                        <CloudinaryContext cloudName="quocvu1202">
                            <AdvancedImage
                                {...imageUrl && <AdvancedImage cldImg={imagePublicId} />}

                                cldImg={{
                                    publicId: tour.imagePublicId,
                                    crop: 'scale',
                                    width: 100,
                                }}
                            />
                        </CloudinaryContext>

                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );


}

export default (EditTour);
