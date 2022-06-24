import globalStateAndAction from "../../../container/global.state.action";
import "../../../assets/styles/cart.detail.css";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef } from "react";
import axiosMethod from "../../../middlewares/axios";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Toast from "../../../utils/toast";

function Cart({ cart, setCart }) {
	const cartCount = cart.cartCount;
	const cartStore = cart.cartStore;
	const cartTotalPrice = cart.cartTotalPrice;

	const handleDelClick = (productId) => {
		deleteCart(productId._id);
	};
	async function deleteCart(productId) {
		const data = await axiosMethod(`cart/${productId}`, "delete", {
			id: productId,
		});
		if (data.success) {
			setCart(data.cartQty, data, data.cartTotal);
			Toast.fire({
				title: "Đã xóa sản phẩm khỏi giỏ hàng",
				icon: "success",
			});
		}
	}

	return (
		<>
			<Breadcrumb className="bg-light">
				<div className="container">
					<BreadcrumbItem className="d-inline-block">
						<Link to="/" className="nav-link">
							Trang chủ
						</Link>
					</BreadcrumbItem>
					<BreadcrumbItem className="d-inline-block">
						<span to="#" className="nav-link text-muted">
							Giỏ hàng {`(${cartCount})`}
						</span>
					</BreadcrumbItem>
				</div>
			</Breadcrumb>
			<div className="container">
				<div className="text-center mb-4">
					<h2>Giỏ hàng của bạn</h2>
					<p className="m-0">
						Có {cartCount} sản phẩm trong giỏ hàng
					</p>
					<div>___________________________</div>
				</div>
				<div className="row">
					<div className="col">
						<table className="table">
							<tbody>
								{cartStore.cart &&
								cartStore.cart.length > 0 ? (
									cartStore.cart.map(
										(item, index) => {
											return (
												<tr key={index}>
													<td className="cart-product-img">
														<img
															src={
																item
																	._id
																	.description
																	.imageList[0]
															}
															alt=""
															className="border"
														></img>
													</td>
													<td className="cart-product-content">
														<p className="cart-name-size">
															<Link
																to={`/product/${item._id._id}`}
																className="d-block"
															>
																{
																	item
																		._id
																		.nameProduct
																}
															</Link>
															<span>
																{
																	item.size
																}
															</span>
														</p>
														<div className="d-flex justify-content-between cart-price-qty">
															<span className="cart-qty">
																{
																	item.qty
																}
															</span>
															<div className="fw-bold">
																{`${item.total},000đ`}
															</div>
														</div>
														<div className="cart-btn-del">
															<ClearIcon
																onClick={() =>
																	handleDelClick(
																		item._id
																	)
																}
															></ClearIcon>
														</div>
													</td>
												</tr>
											);
										}
									)
								) : (
									<tr>
										<td className="text-center">
											Không có sản phẩm
										</td>
									</tr>
								)}
							</tbody>
						</table>
						<div className="row">
							<div className="col-5">
								<h5>Ghi chú đơn hàng</h5>
								<div class="form-floating">
									<textarea
										class="form-control"
										placeholder="Ghi chú"
										id="note-text-area"
									></textarea>
									<label for="note-text-area">
										Ghi chú
									</label>
								</div>
							</div>
							<div className="col">
								<h5>Chính sách mua hàng</h5>
								<ul class="list-privacy">
									<li>
										Khách hàng có thể đổi size sản
										phẩm trong vòng 3 NGÀY kể từ
										lúc nhận được sản phẩm. Phí
										ship 2 chiều để đổi size là
										60k (chỉ đổi 01 lần duy nhất).
									</li>
									<li>
										Đối với sản phẩm bị lỗi ( Đứt
										nút, vấy bẩn, lỗi sản
										xuất,...) bạn vui lòng chụp
										lại phần lỗi và gửi cho Team
										mình check lại và tiến hành
										đổi sản phẩm mới cho bạn hen
										🥰 - Chi phí đổi sản phẩm sẽ
										do Team mình thanh toán ạ.
									</li>
									<li>
										Chỉ đổi size trong trường hợp
										sản phẩm còn size/ hàng. Không
										nhận trả sản phẩm/hoàn
										tiền/đổi sang sản phẩm khác.
									</li>
									<li>
										Các sản phẩm mua trong dịp
										Sale không hổ trợ đổi size,
										đổi mẫu. Chỉ đổi nếu có lỗi từ
										phía nhà sản xuất.
									</li>
									<li>
										Chỉ đổi trả sản phẩm còn
										bill,còn tag.
									</li>
									<li>
										Đơn hàng trên 1 triệu, vui
										lòng chuyển khoản trước 50%
										qua số tài khoản: 📷
										Techcombank 19036662605013 Chủ
										tài khoản TRẦN NHƯ HẢO Chi
										Nhánh Văn Thánh ——-——— Thông
										tin chuyển khoản : tên bạn +
										sđt (+ mã đơn HC... ) Sau khi
										nhận được chuyển khoản
										HIGHCLUB sẽ tiến hành gọi xác
										nhận và làm đơn. Xin cảm ơn !
										Trong thời điểm hiện tại do
										ảnh hưởng của Covid-19, thời
										gian giao hàng có thể thay đổi
										khiến bạn nhận được hàng lâu
										hơn so với thời gian dự kiến.
										Rất mong quý khách hàng thông
										cảm
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-4">
						<div className="right-card p-3 border rounded shadow">
							<h4 className="border-bottom py-2">
								Thông tin đơn hàng
							</h4>
							<p className="py-2 border-bottom fw-bold">
								Tổng tiền:
								<span className="float-end text-danger">
									{`${cartTotalPrice},000đ`}
								</span>
							</p>
							<p>
								Phí vận chuyển sẽ được tính ở trang
								thanh toán. Bạn cũng có thể nhập mã giảm
								giá ở trang thanh toán.
							</p>
							{cartStore.cart &&
							cartStore.cart.length === 0 ? (
								<button
									className="btn btn-danger button-card mb-2"
									disabled
								>
									Thanh toán
								</button>
							) : (
								<Link to="/checkout">
									<button className="btn btn-danger button-card mb-2">
										Thanh toán
									</button>
								</Link>
							)}
							<p className="text-center">
								<Link
									to="/collections"
									className="text-dark text-center"
								>
									<ReplyIcon></ReplyIcon>
									Tiếp tục mua hàng
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default globalStateAndAction(Cart);
