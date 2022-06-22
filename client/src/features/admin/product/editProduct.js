import { useState } from "react";
export default function EditProduct({ infoProduct }) {
  const [inputs, setInputs] = useState(infoProduct);
  const handleChangeEditProduct = () => {
    console.log("vao");
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
                name="nameRestaurant"
                placeholder={infoProduct.nameProduct}
                value={inputs.nameProduct}
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
                  name="priceService"
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
                  name="priceService"
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
                  name="priceService"
                  value={inputs.sizeXL}
                  onChange={handleChangeEditProduct}
                  className="userUpdateInput"
                  style={{ width: "100px" }}
                />
              </div>
            </div>
            <div className="userUpdateItem">
              <label>Giá</label>
              <input
                type="number"
                placeholder={infoProduct.price}
                name="priceService"
                value={inputs.price}
                onChange={handleChangeEditProduct}
                className="userUpdateInput"
              />
            </div>
            <div className="userUpdateItem">
              <label>Mô Tả Sản Phẩm</label>

              <textarea
                name="descriptionRestaurant"
                style={{ width: "500px", height: "200px" }}
                value={infoProduct.description}
                onChange={handleChangeEditProduct}
              />
            </div>
            <button className="userUpdateButton mt-5" type="button">
              Cập NHật
            </button>
          </div>
          <div className="userUpdateRight">
            <div class="form-group">
                <div>
                <label for="exampleFormControlFile1">Example file input</label>
              <input
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
                </div>
                <div className="mt-4">
                <label for="exampleFormControlFile1">Example file input</label>
              <input
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
              />
                </div>
            
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
