import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Popover from "@mui/material/Popover";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import globalStateAndAction from "../../container/global.state.action";
import {
	useState,
	useEffect,
	useRef,
	useCallback,
	useLayoutEffect,
} from "react";
import axiosMethod from "../../middlewares/axios";

function PopupCart({ cart, setCart }) {
	//Get state from redux
	const cartCount = cart.cartCount;
	const cartStore = cart.cartStore;
	const cartTotalPrice = cart.cartTotalPrice;

	//Local state
	const [anchorEl, setAnchorEl] = useState(null);
	const firstUpdate = useRef(true);

	//Get Cart at the first

	useEffect(() => {
		async function getCart() {
			const data = await axiosMethod("cart", "get");
			const cartQty = data.cart.reduce((a, b) => {
				return a + b.qty;
			}, 0);

			const cartTotal = data.cart.reduce((a, b) => {
				return a + b._id.price * b.qty;
			}, 0);
			setCart(cartQty, data, cartTotal);
		}
		getCart();
	}, [setCart]);

	//Handle Delete Cart

	const deleteCart = useCallback(
		(productId) => {
			async function axiosCart() {
				const data = await axiosMethod(
					`cart/${productId}`,
					"delete",
					{
						id: productId,
					}
				);
				const cartQty = data.cart.reduce((a, b) => {
					return a + b.qty;
				}, 0);
				const cartTotal = data.cart.reduce((a, b) => {
					return a + b._id.price * b.qty;
				}, 0);
				setCart(cartQty, data, cartTotal);
				return data;
			}
			axiosCart();
		},
		[setCart]
	);

	useLayoutEffect(() => {
		if (firstUpdate) {
			firstUpdate.current = false;
			return;
		}
		deleteCart();
	}, [deleteCart]);

	// Cart handle
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	//Cart Delete Event
	const handleDelClick = (productId) => {
		deleteCart(productId._id);
	};

	//MUI Cart Open handle

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<Badge badgeContent={cartCount} color="primary">
			<ShoppingCartIcon
				onClick={handleClick}
				aria-describedby={id}
				variant="contained"
			></ShoppingCartIcon>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<Box
					sx={{
						width: 450,
						height: 300,
					}}
				>
					<div id="cart-container" className="py-3 px-4">
						<div className="p-2 mb-3 mx-1  border border-1 rounded bg-light text-center">
							Giỏ hàng
						</div>
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
																to={`product/${item._id._id}`}
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
											Không có sp
										</td>
									</tr>
								)}
							</tbody>
						</table>
						<div className="cart-view-total ">
							<table className="table table-borderless">
								<tbody>
									<tr>
										<td className="text-start">
											TỔNG TIỀN
										</td>
										<td className="text-end text-danger fw-bold fs-5">
											{`${cartTotalPrice},000đ`}
										</td>
									</tr>
									<tr>
										<td>
											<Link to="/cart">
												<button className="btn btn-dark py-2">
													Xem giỏ hàng
												</button>
											</Link>
										</td>
										<td>
											<Link to={`/checkout`}>
												<button className="btn btn-dark py-2">
													Thanh toán
												</button>
											</Link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</Box>
			</Popover>
		</Badge>
	);
}

export default globalStateAndAction(PopupCart);
