import React, { useState, useEffect } from "react";
import axios from "axios";
// import form from "bootstrap";
import "./css/AddCategory.css";

const apiCate = "http://localhost:8088/api/category";

const CateForm = () => {
  const [cateName, setCateName] = useState("");

  const handleSubmit = (e) => {
    // tạo mới Cate
    const newCategory = {
      name: cateName,
    };
    axios
      .post(apiCate + '/create', newCategory)
      .then((response) => {
        console.log(response.data);
        alert('Lưu thông tin thành công!');
        // Reset form
        setCateName('');
      })
      .catch((error) => {
        console.log(error);
        alert('Lỗi khi lưu thông tin Loại Tour ');
      });

  };



  return (
    <div className="row ">
      <div className="col-lg-7 mx-auto">
        <a href="/category" class="btn btn-primary" role="button" data-bs-toggle="button">Trở Về</a>
        <div className="card mt-2 mx-auto p-4 bg-light">
          <div className="card-body bg-light">
            <h1>ADD NEW CATEGORY TOUR</h1>

            <div className="container">
              <form
                className="form-control"
                id="category-form"
                onSubmit={handleSubmit}
              >
                <div className="controls">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="form_name">Loại Tour</label>
                        <input
                          type="text"
                          name="name"
                          value={cateName}
                          onChange={(e) => setCateName(e.target.value)}
                          className="form-control"
                          placeholder="Nhập tên *"
                          required="required"
                          data-error="HotelName is required."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <div className="col-md-12">
                  <input
                    type="submit"
                    className="btn btn-success btn-save pt-2 btn-block"
                    value="Lưu Loại Tour"
                  />
                </div>
              </form>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default CateForm;

//Chưa lưu được, dự định lưu sẽ lưu các trường như name; addressSecond_id, addressSecond_id lưu ward
//Link: https://www.youtube.com/watch?v=vUkj_i2gqpU&list=PL1oBBulPlvs84AmRmT-_3dGz4KHYuINsj&index=12

