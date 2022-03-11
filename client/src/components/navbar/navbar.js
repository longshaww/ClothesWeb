import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from "reactstrap";
import Logo from "../../assets/images/hyperX.jpeg";
import "../../assets/styles/customize.navbar.css";
import {
	useState,
	useEffect,
	useRef,
	useCallback,
	useLayoutEffect,
} from "react";
import axiosMethod from "../../middlewares/axios";
import { Link } from "react-router-dom";
import globalStateAndAction from "../../container/global.state.action";
import PostFilterForm from "./search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Popover from "@mui/material/Popover";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";

function NavbarApp({ cartCount, cartStore, setCart }) {
	//State define
	const [isOpen, setIsOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const firstUpdate = useRef(true);

	//Get Cart at the first

	useEffect(() => {
		async function getCart() {
			const data = await axiosMethod("cart", "get");
			const cartQty = data.cart.reduce((a, b) => {
				return a + b.qty;
			}, 0);
			setCart(cartQty, data);
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
				setCart(cartQty, data);
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

	//Navbar toggle

	const toggle = () => setIsOpen(!isOpen);

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
		<Navbar expand="md" light>
			<Link to="/">
				<div id="center-logo">
					<img
						id="logo"
						src={Logo}
						alt=""
						className="rounded-circle"
					></img>
					<p id="brand-name" className="text-dark fs-3 fw-bold">
						HyperX™
					</p>
				</div>
			</Link>
			<NavbarToggler onClick={toggle} />

			<Collapse isOpen={isOpen} navbar>
				<Nav className="m-auto" navbar>
					<NavItem>
						<Link
							to="/collections/new-arrivals"
							className="nav-link"
						>
							NEW ARRIVALS
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/collections/tops" className="nav-link">
							TOPS
						</Link>
					</NavItem>
					<NavItem>
						<Link
							to="/collections/bottoms"
							className="nav-link"
						>
							BOTTOMS
						</Link>
					</NavItem>
					<NavItem>
						<Link
							to="/collections/outerwears"
							className="nav-link"
						>
							OUTERWEARS
						</Link>
					</NavItem>
					<NavItem>
						<Link
							to="/collections/accessories"
							className="nav-link"
						>
							ACCESSORIES
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/collections/sale" className="nav-link">
							SALE
						</Link>
					</NavItem>
					<NavItem>
						<PostFilterForm />
					</NavItem>
					<NavItem>
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
									<div
										id="cart-container"
										className="py-3 px-4"
									>
										<div className="p-2 mb-3 mx-1  border border-1 rounded bg-light text-center">
											Giỏ hàng
										</div>
										<table className="table">
											<tbody>
												{cartStore.cart &&
												cartStore.cart
													.length > 0 ? (
													cartStore.cart.map(
														(
															item,
															index
														) => {
															return (
																<tr
																	key={
																		index
																	}
																>
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
																				{
																					item
																						._id
																						.price
																				}
																				,000đ
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
															Không
															có sp
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
															TỔNG
															TIỀN
														</td>
														<td className="text-end">
															Total
														</td>
													</tr>
													<tr>
														<td>
															<button className="btn btn-dark py-2">
																Xem
																giỏ
																hàng
															</button>
														</td>
														<td>
															<button className="btn btn-dark py-2">
																Thanh
																toán
															</button>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</Box>
							</Popover>
						</Badge>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default globalStateAndAction(NavbarApp);
