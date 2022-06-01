import { Link } from "react-router-dom";
import "../../../assets/styles/admin/product.css";
import Chart from "../dashboard/chart";
import { productData } from "../dashboard/dummyData";
import { Publish } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import axios from "axios";
export default function DetailProduct() {
  let { id } = useParams();
  const [inputs, setInputs] = useState({
		nameProduct: "",
		price: "",
		collections: "",
		sizeM: "",
		sizeL: "",
    sizeXL :"",
    image1 : "",
    image2: ""
	});
  const [dataDetail, setDataDetail] = useState({});
  const [cookies] = useCookies();
  const getData = async () => {
    const endpoint = `${process.env.REACT_APP_API_URL}admin/products/detailProduct/${id}`;

    const { data } = await axios.get(endpoint, {
      headers: {
        authorization: "Bearer " + cookies.accessToken,
      },
    });

    setDataDetail(data.customData);
  };

  const handleSubmit = async (event) => {
		event.preventDefault();
		// const data = await axiosMethod("auth/register", "post", inputs);
		// console.log(inputs);
	};

	const handleChange = (event) => {
		setInputs((values) => ({ ...values}));
    console.log(inputs)
	};

  useEffect(() => {
    getData();
  }, [dataDetail]);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">SẢN PHẨM</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <img src={dataDetail.image1} alt="" />
          <img src={dataDetail.image2} alt="" />
        </div>
        <div className="productTopRight">
          <div>
            <div className="productInfoTop">
              <img src={dataDetail.image1} alt="" className="productInfoImg" />
              <h3 className="productName">{dataDetail.nameProduct}</h3>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <h3 className="productInfoKey">Loại:</h3>
                <h3 className="productInfoValue">{dataDetail.collection}</h3>
              </div>
              <div className="productInfoItem">
                <h3 className="productInfoKey">Giá:</h3>
                <h3 className="productInfoValue">{dataDetail.price},000 </h3>
              </div>
              <div className="productInfoItem">
                <h3 className="productInfoKey">SIZE M </h3>
                <h3 className="productInfoValue">{dataDetail.sizeM}</h3>
              </div>
              <div className="productInfoItem">
                <h3 className="productInfoKey">SIZE L </h3>
                <h3 className="productInfoValue">{dataDetail.sizeL}</h3>
              </div>
              <div className="productInfoItem">
                <h3 className="productInfoKey">SIZE XL</h3>
                <h3 className="productInfoValue">{dataDetail.sizeXL}</h3>
              </div>
              <div className="">
                <h3 className="productInfoKey">Mô tả</h3>
                <h3>{dataDetail.description}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Tên Sản Phẩm</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                name="nameProduct"
                placeholder="Email"
                value={dataDetail.nameProduct}
                onChange={handleChange}

              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputPassword4">Giá</label>
              <input
                type="number"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
                name="price"
                value={dataDetail.price}
                onChange={handleChange}

              />
            </div>
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Loại</label>
            <select id="inputState" class="form-control">
              <option selected>Loại Sản Phẩm</option>
              <option value="621c506fbae8653bcb4564ac">Tops</option>
              <option value="6295e2c2edafd2b5ebe66cd3">NewArrivals</option>
              <option value="621c50e0bae8653bcb4564b4">Accessories</option>
              <option value="621c50c7bae8653bcb4564b3">Outerwears</option>
              <option value="621c50c7bae8653bcb4564b3">Bottoms</option>
            </select>
          </div>
          <div class="form-row col-12 d-flex mt-2">
          <div class="form-group col-md-1">
            <label for="inputEmail4">SIZE M</label>
            <input
              type="number"
              class="form-control"
              id="inputEmail4"
              placeholder="qty"
              name="sizeM"
              value={dataDetail.sizeM}
              onChange={handleChange}

            />
          </div>

          <div class="form-group col-md-1">
            <label for="inputEmail4">SIZE L</label>
            <input
              type="number"
              class="form-control"
              id="inputEmail4"
              placeholder="qty"
              name="sizeL"
              value={dataDetail.sizeL}
              onChange={handleChange}

            />
            
          </div>
          <div class="form-group col-md-1">
            <label for="inputEmail4">SIZE XL</label>
            <input
              type="number"
              class="form-control"
              id="inputEmail4"
              name="sizeXL"
              placeholder="qty"
              value={dataDetail.sizeXL}
              onChange={handleChange}

            />
            
          </div>
          </div>
          <div className="d-flex">
          <div class="mb-3 col-md-2">
                     <label for="formFile" class="form-label">Hình Trước</label>
                     <input
                type="text"
                class="form-control"
                id="inputEmail4"
                name="nameProduct"
                placeholder="Email"
                value={dataDetail.nameProduct}
                onChange={handleChange}

              />
          </div>  
          <div class="mb-3 col-md-2">
                     <label for="formFile" class="form-label">Hình Sau</label>
                     <input
                type="text"
                class="form-control"
                id="inputEmail4"
                name="nameProduct"
                placeholder="Email"
                value={dataDetail.nameProduct}
                onChange={handleChange}

              />
          </div>  
          </div>
       



          <button type="submit" class="btn btn-primary mt-3">
          Cập Nhật
          </button>
        </form>
      </div>
     
    </div>
  );
}
