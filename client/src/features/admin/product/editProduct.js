import { useState } from "react";
import Toast from "../../../utils/toast";
import axios from "axios"
export default function EditProduct({ infoProduct,idProduct,accessToken,setDataDetail}) {
  const [inputs, setInputs] = useState(infoProduct);
  const options = [
    { id: "621c506fbae8653bcb4564ac", typeName: "Tops" },
    { id: "621c50a7bae8653bcb4564b1", typeName: "Bottoms" },
    { id: "621c50c7bae8653bcb4564b3", typeName: "Outerwears" },
    { id: "621c50e0bae8653bcb4564b4", typeName: "Accessories" },
    { id: "6295e2c2edafd2b5ebe66cd3", typeName: "NewArrivals" },
  ];
  const handleChangeEditProduct = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };
  const handleChangeSelectBox = (e) =>setInputs({...inputs,idCollection : e.target.value,collection : null})
  const handleClick = async () => {
    try{
      if(inputs.nameProduct === ""|| inputs.price === ""|| inputs.sizeM === ""
          ||  inputs.sizeL === ""||  inputs.sizeXL === "" || inputs.description === "")
      { 
         Toast.fire({
          title: "Vui Lòng Điền Đầy Đủ Thông Tin",
          icon: "error",
        });
      }
      else
      { 
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}admin/products/editProduct/${idProduct}`,inputs,{
          headers: {
            authorization: "Bearer " + accessToken,
          },
        });
        if(data.success){
           setDataDetail(data.customData);
           Toast.fire({
            title: "Cập Nhật Thành Công",
            icon: "success",
          });

        }
      }
    }
    catch(err)
    { 

    }
 
  };
  return (
    <>
      <div className="userUpdate">
        <span className="userUpdateTitle">Sản Phẩm</span>
        <form className="userUpdateForm">
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Tên Sản Phẩm</label>
              <input
                type="text"
                name="nameProduct"
                placeholder={infoProduct.nameProduct}
                value={inputs.nameProduct}
                onChange={handleChangeEditProduct}
                className="userUpdateInput"
              />
            </div>
            <div className="userUpdateItem  mt-4" style={{width: '250px'}}>
              <select className="form-select" value={inputs.idCollection} onChange={handleChangeSelectBox}>
              {options.map(item => {
                  return (<option key={item.id} value={item.id}>{item.typeName}</option>);
              })}
              </select>
            </div>
         
            <div className="userUpdateItem">
              <label>Giá</label>
              <input
                type="number"
                placeholder={infoProduct.price}
                name="price"
                value={inputs.price}
                onChange={handleChangeEditProduct}
                className="userUpdateInput"
              />
            </div>
            <div className="d-flex">
              <div className="userUpdateItem">
                <label>Size M </label>
                <input
                  type="number"
                  placeholder={infoProduct.sizeM}
                  name="sizeM"
                  value={inputs.sizeM}
                  onChange={handleChangeEditProduct}
                  className="userUpdateInput"
                  style={{ width: "100px" }}
                />
              </div>
              <div className="userUpdateItem" style={{ marginLeft: "20px" }}>
                <label>Size L </label>
                <input
                  type="number"
                  placeholder={infoProduct.sizeL}
                  name="sizeL"
                  value={inputs.sizeL}
                  onChange={handleChangeEditProduct}
                  className="userUpdateInput"
                  style={{ width: "100px" }}
                />
              </div>
              <div className="userUpdateItem" style={{ marginLeft: "20px" }}>
                <label>Size XL </label>
                <input
                  type="number"
                  placeholder={infoProduct.sizeXL}
                  name="sizeXL"
                  value={inputs.sizeXL}
                  onChange={handleChangeEditProduct}
                  className="userUpdateInput"
                  style={{ width: "100px" }}
                />
              </div>
            </div>
            <div className="userUpdateItem">
              <label>Mô Tả Sản Phẩm</label>

              <textarea
                name="description"
                style={{ width: "500px", height: "200px" }}
                value={inputs.description}
                onChange={handleChangeEditProduct}
              />
            </div>
            <button
              className="userUpdateButton mt-5"
              onClick={handleClick}
              type="button"
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
