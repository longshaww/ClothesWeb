import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setCart } from "../../../actions/cart";
import axiosMethod from "../../../middlewares/axios";
import "../../../assets/styles/detail.css";
import Toast from "../../../utils/toast";

export default function Detail() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartCount = useSelector((state) => state.cart.cartCount);
	const [productDetail, setProductDetail] = useState();
	const [imageIndex, setImageIndex] = useState(0);
	const { id } = useParams();

	useEffect(() => {
		async function fetchProductDetail() {
			const data = await axiosMethod(`product/${id}`, "get");
			setProductDetail(data);
			return data;
		}
		fetchProductDetail();
	}, [id]);

	let productSize;
	let productId;

	if (productDetail) {
		productSize = [...productDetail.size].reverse();
		productId = productDetail._id;
	}
	const [checked, setChecked] = useState("M");
	const [qty, setQty] = useState(1);

	const handleMinus = () => {
		setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
	};

	const handlePlus = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const handleQtyChange = (e) => {};

	//post cart
	async function postCart() {
		const data = await axiosMethod("cart", "post", {
			id: productId,
			qty,
			size: checked,
		});
		const cartQty = data.cart.reduce((a, b) => {
			return a + b.qty;
		}, 0);
		const cartTotal = data.cart.reduce((a, b) => {
			return a + b._id.price * b.qty;
		}, 0);
		dispatch(setCart(cartQty, data, cartTotal));
		Toast.fire({
			title: "Thêm vào giỏ hàng thành công",
			icon: "success",
		});
		return data;
	}

	const handleCheckout = () => {
		if (cartCount === 0) {
			return Toast.fire({
				title: "Bạn chưa có sản phẩm nào trong giỏ hàng",
				icon: "warning",
			});
		}
		navigate("/checkout");
	};

	const handleAddCart = () => {
		postCart();
	};

	const handleModalImage = () => {
		alert("hello");
	};

	return (
		<>
			{productDetail && (
				<>
					<div className="container">
						<div className="row row-cols-1 row-cols-lg-2">
							<div className="col">
								<img
									src={
										productDetail.description
											.imageList[imageIndex]
									}
									onClick={handleModalImage}
									alt=""
									className="img-fluid"
								></img>
								<div className="gallery d-flex">
									{productDetail.description.imageList.map(
										(item, index) => {
											return (
												<img
													key={index}
													onClick={() =>
														setImageIndex(
															index
														)
													}
													src={item}
													alt=""
													className="border ms-1 mt-1"
												></img>
											);
										}
									)}
								</div>
							</div>
							<div className="col">
								<h4>{productDetail.nameProduct}</h4>
								<h6 className="mb-3">
									{productDetail.price},000đ
								</h6>
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
													checked ===
													item.sizeName
												}
												onChange={() =>
													setChecked(
														item.sizeName
													)
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
										onChange={handleQtyChange}
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
									<button
										onClick={handleAddCart}
										className="btn btn-dark btn-cart d-block mb-3"
									>
										Thêm vào giỏ hàng
									</button>
									<button
										onClick={handleCheckout}
										className="btn btn-dark btn-cart d-block mb-3"
									>
										Thanh toán
									</button>
								</div>
								<div className="product-description">
									<p className="fs-6 fw-bold text-decoration-underline pb-3 border-bottom">
										Mô tả sản phẩm
									</p>
									<p className="fs-6 pb-3 border-bottom">
										CHINH SÁCH GIAO HÀNG & ĐỔI TRẢ
										HÀNG
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
			)}
		</>
	);
}
