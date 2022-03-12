import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	useState,
	useLayoutEffect,
	useRef,
	useCallback,
	useEffect,
} from "react";
import { setCart } from "../../../actions/cart";
import axiosMethod from "../../../middlewares/axios";
import "../../../assets/styles/detail.css";

export default function Detail() {
	const dispatch = useDispatch();
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
	const firstUpdate = useRef(true);

	const handleMinus = () => {
		setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
	};

	const handlePlus = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const handleQtyChange = (e) => {};

	//post cart
	const postCart = useCallback(() => {
		async function axiosCart() {
			const data = await axiosMethod("cart", "post", {
				id: productId,
				qty,
				size: checked,
			});
			const cartQty = data.cart.reduce((a, b) => {
				return a + b.qty;
			}, 0);
			dispatch(setCart(cartQty, data));
			return data;
		}
		axiosCart();
	}, [productId, checked, qty, dispatch]);

	useLayoutEffect(() => {
		if (firstUpdate) {
			firstUpdate.current = false;
			return;
		}
		postCart();
	}, [postCart]);

	const handleAddCart = (e) => {
		e.preventDefault();
		postCart();
	};

	const handleModalImage = (e) => {
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
									<button className="btn btn-dark btn-cart d-block mb-3">
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
