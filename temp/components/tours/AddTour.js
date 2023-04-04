import React, { useState } from 'react';
import axios from 'axios';
/*
function AddTour() {

  const apiCategory = "http://localhost:8088/api/category";
  const apiTour = "http://localhost:8088/api/tour/list";

  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState('');
  const [slot, setSlot] = useState('');
  const [price, setPrice] = useState('');
  const [beginTrip, setBeginTrip] = useState('');
  const [endTrip, setEndTrip] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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


  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
          name: name,
          slot: slot,
          price: price,
          beginTrip: beginTrip,
          endTrip: endTrip,
          description: description,
          imageUrl: imageUrl,
          category_id: 1 // Replace with the actual category ID
      };
      try
      {
          const response = await axios.post('http://localhost:8088/api/tour/create', data);
          console.log(response.data);
      } catch (error)
      {
          console.log(error);
      }
  };

  return (
      <div>
          <div className="row ">
              <div className="col-lg-7 mx-auto">
                  <a href="/tour" class="btn btn-primary" role="button" data-bs-toggle="button">Trở Về</a>
                  <div className="card mt-2 mx-auto p-4 bg-light">
                      <div className="card-body bg-light">
                          <h1>ADD NEW TOUR</h1>
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
                                                  <label for="form_name">Thêm Tour Mới</label>
                                                  <input
                                                      type="text"
                                                      name="name"
                                                      value={name}
                                                      onChange={(e) => setName(e.target.value)}
                                                      className="form-control"
                                                      placeholder="Nhập tên Tour"
                                                      required="required"
                                                      data-error="Tour name is required."
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-group">
                                                  <label for="form-address">Địa Chỉ *</label>
                                                  <input
                                                      type="text"
                                                      name="address"
                                                      className="form-control"
                                                      value={addressSecondName}
                                                      onChange={(e) => setAddressSecondName(e.target.value)}
                                                      placeholder="Số nhà/Đường *"
                                                      required="required"
                                                      data-error="Address is required."
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-group">
                                                  <label for="form-phone">Số Điện Thoại*</label>
                                                  <input
                                                      type="number"
                                                      name="phone"
                                                      className="form-control"
                                                      value={addressPhone}
                                                      onChange={(e) => setAddressPhone(e.target.value)}
                                                      placeholder="Số điện thoại *"
                                                      required="required"
                                                      data-error="SĐT không được trống."
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-group">
                                                  <label for="selectCity">Tỉnh/Thành phố</label>
                                                  <select
                                                      id="selectCity"
                                                      name="Tỉnh"
                                                      value={selectedCity}
                                                      onChange={handleChangeCity}
                                                      className="form-control"
                                                      required="required"
                                                      data-error="Vui lòng chọn tỉnh."
                                                  >
                                                      <option value="" selected>
                                                          ---- Chọn Tỉnh/Thành Phố ---
                                                      </option>
                                                      {cityList.map((city) => (
                                                          <option key={city.id} value={city.id}>
                                                              {city.name}
                                                          </option>
                                                      ))}
                                                  </select>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="row">

                                          <div className="col-md-6">
                                              <div className="form-group">
                                                  <label for="form_need">Quận/Huyện</label>
                                                  <select
                                                      value={selectedDistrict}
                                                      onChange={handleChangeDistrict}
                                                      id="form_need"
                                                      name="need"
                                                      className="form-control"
                                                  >
                                                      <option value="">---Chọn Quận/Huyện---</option>{" "}
                                                      {districtList.map((district) => (
                                                          <option key={district.id} value={district.id}>
                                                              {district.name}
                                                          </option>
                                                      ))}
                                                  </select>
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="form-group">
                                                  <label for="form_need">Phường/Xã</label>
                                                  <select
                                                      value={selectedWard}
                                                      onChange={(e) => setSelectedWard(e.target.value)}
                                                      className="form-control"
                                                  >
                                                      <option value="">---Chọn Phường/Xã---</option>{" "}
                                                      {wardList.map((ward) => (
                                                          <option key={ward.id} value={ward.id}>
                                                              {ward.name}
                                                          </option>
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

          <h2>Add Tour</h2>
          <form onSubmit={handleSubmit}>
              <label>
                  Name:
                  <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <br />
              <label>
                  Slot:
                  <input type="number" value={slot} onChange={(event) => setSlot(event.target.value)} />
              </label>
              <br />
              <label>
                  Price:
                  <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
              </label>
              <br />
              <label>
                  Begin Trip:
                  <input type="datetime-local" value={beginTrip} onChange={(event) => setBeginTrip(event.target.value)} />
              </label>
              <br />
              <label>
                  End Trip:
                  <input type="datetime-local" value={endTrip} onChange={(event) => setEndTrip(event.target.value)} />
              </label>
              <br />
              <label>
                  Description:
                  <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
              </label>
              <br />
              <label>
                  Image URL:
                  <input type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
              </label>
              <br />
              <button type="submit">Add Tour</button>
          </form>
      </div>
  );
}

export default AddTour;
*/

import { useState } from 'react';
import { Cloudinary } from '@cloudinary/base';
import { UploadApiResponse, UploadResponse } from '@cloudinary/base/actions/upload/upload-response';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryContext } from 'cloudinary-react';

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: '<your_cloud_name>',
        apiKey: '<your_api_key>',
        apiSecret: '<your_api_secret>',
    },
});

function UploadImage() {
    const [image, setImage] = useState < File | null > (null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files)
        {
            setImage(event.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        if (image)
        {
            const uploadResponse = await cloudinary.upload(image, {
                upload_preset: '<your_upload_preset>',
            }) as UploadApiResponse & UploadResponse;
            setImageUrl(uploadResponse.secure_url);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload</button>
            {imageUrl && (
                <CloudinaryContext cloudName="<your_cloud_name>">
                    <AdvancedImage cldImg={{ publicId: imageUrl }} />
                </CloudinaryContext>
            )}
        </div>
    );
}
