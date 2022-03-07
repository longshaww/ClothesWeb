import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../../../assets/styles/detail.css";

export default function Detail() {
	const location = useLocation();
	const { product } = location.state;
	const productSize = [...product.size].reverse();
	const [checked, setChecked] = useState("M");
	const [qty, setQty] = useState(1);

	const handleMinus = () => {
		setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
	};

	const handlePlus = () => {
		setQty((prevQty) => prevQty + 1);
	};

	return (
		<>
			<div className="container">
				<div className="row row-cols-1 row-cols-lg-2">
					<div className="col">
						<img
							src={product.description.imageList[0]}
							alt=""
							className="img-fluid"
						></img>
					</div>
					<div className="col">
						<h4>{product.nameProduct}</h4>
						<h6 className="mb-3">{product.price},000đ</h6>
						<div className="d-flex mb-4">
							{productSize.map((item, index) => (
								<div
									key={index}
									id="radio-list"
									className="me-3"
								>
									<input
										type="radio"
										checked={
											checked === item.sizeName
										}
										onChange={() =>
											setChecked(item.sizeName)
										}
									></input>
									{item.sizeName}
								</div>
							))}
						</div>
						<div className="d-inline-flex shadow rounded quantity mb-4">
							<button
								onClick={handleMinus}
								className="btn btn-light"
							>
								-
							</button>
							<input
								className="form-control border-0 text-center"
								value={qty}
							></input>
							<button
								onClick={handlePlus}
								className="btn btn-light"
							>
								+
							</button>
						</div>
						<div className="wrap-btn">
							<button className="btn btn-dark btn-cart d-block mb-3">
								Thêm vào giỏ hàng
							</button>
							<button className="btn btn-dark btn-cart d-block mb-3">
								Thanh toán
							</button>
						</div>
						<div className="product-description">
							<p className="fs-6 fw-bold text-decoration-underline pb-3 border-bottom">
								Mô tả sản phẩm
							</p>
							<p className="fs-6 pb-3 border-bottom">
								CHINH SÁCH GIAO HÀNG & ĐỔI TRẢ HÀNG
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<h4 className=" pb-3 border-bottom text-center">
					SẢN PHẨM LIÊN QUAN
				</h4>
			</div>
		</>
	);
}
