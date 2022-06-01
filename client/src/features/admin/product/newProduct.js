import "../../../assets/styles/admin/newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>  
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Tên Sản Phẩm</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addProductItem">
          <label>Giá</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Size M</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Size L</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Size XL</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Loại</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Tạo</button>
      </form>
    </div>
  );
}
