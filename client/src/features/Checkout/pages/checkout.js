import globalStateAndAction from "../../../container/global.state.action";
import { Link, Outlet } from "react-router-dom";
import "../../../assets/styles/checkout.css";
import { useCookies } from "react-cookie";

function Checkout({ cart }) {
	const cartStore = cart.cartStore;
	const cartTotalPrice = cart.cartTotalPrice;
	const [cookies] = useCookies(["user"]);

	return (
		<div className="container pe-5 my-5">
			<div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
				<div className="col col-left pe-5 pt-5">
					<Outlet />
				</div>
				<div className="col col-right ps-5 pt-5 rounded shadow">
					<table className="table">
						<tbody>
							{cartStore.cart &&
							cartStore.cart.length > 0 ? (
								cartStore.cart.map((item, index) => {
									return (
										<tr key={index}>
											<td className="cart-product-img">
												<img
													src={
														item._id
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
														{item.qty}
													</span>
													<div className="fw-bold">{`${item.total},000đ`}</div>
												</div>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td className="text-center">
										Không có sản phẩm
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<div className="row py-3 border-bottom">
						<div className="col d-flex justify-content-center">
							<input
								type="text"
								className="form-control voucher-input"
								placeholder="Mã giảm giá"
							></input>
						</div>
						<div className="col-3">
							<button className="btn btn-secondary">
								Sử dụng
							</button>
						</div>
					</div>
					<div className="row py-3 border-bottom">
						<div className="col d-flex justify-content-start">
							<p className="fs-5">Khách hàng thân thiết</p>
						</div>
						<div className="col-3">
							{cookies.user ? (
								<div className="fw-bold fs-5">
									{cookies.user.information.name}
								</div>
							) : (
								<button className="btn btn-dark">
									Đăng nhập
								</button>
							)}
						</div>
					</div>
					<table className="table table-borderless">
						<tbody>
							<tr>
								<td>Tạm tính</td>
								<td>{cartTotalPrice},000đ</td>
							</tr>
							<tr className="border-bottom">
								<td>Phí vận chuyển</td>
								<td>--</td>
							</tr>
							<tr>
								<td>Tổng cộng</td>
								<td>{cartTotalPrice},000đ</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default globalStateAndAction(Checkout);
