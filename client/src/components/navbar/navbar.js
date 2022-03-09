import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from "reactstrap";
import Logo from "../../assets/images/hyperX.jpeg";
import "../../assets/styles/customize.navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import globalStateAndAction from "../../container/global.state.action";
import { useDispatch } from "react-redux";
import { setSearchInput } from "../../actions/collections";
import PostFilterForm from "./search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Popover from "@mui/material/Popover";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";

function NavbarApp({ cartCount }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const dispatch = useDispatch();

	function handleFilterChange(newFilter) {
		dispatch(setSearchInput(newFilter.search));
	}

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
						<PostFilterForm onSubmit={handleFilterChange} />
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
										className="py-3 px-2"
									>
										<div className="p-2 mb-3 mx-3 border border-1 rounded bg-light text-center">
											Giỏ hàng
										</div>
										<div id="list-product">
											<div
												id="product-item"
												className=" p-3 d-flex align-items-center border-bottom"
											>
												<div id="cart-product-img">
													<img
														src="https://product.hstatic.net/200000280689/product/9675830be6aa2af473bb_6c2f087617c5425d9178b0105dcd3557_master.jpg"
														alt=""
														className="border"
													/>
												</div>
												<div
													id="cart-product-content"
													className=" d-flex flex-grow-1 px-2 ms-3 justify-content-between"
												>
													<div className="cart-product-center d-flex flex-column">
														<span className="cart-name fw-bold ">
															productName
														</span>
														<span className="cart-size mb-3 ">
															productSize
														</span>
														<span className="cart-qty">
															1
														</span>
													</div>
													<div className="cart-product-right d-flex flex-column">
														<div className="cart-del-btn">
															<button
																type=""
																className="btn mb-4"
															>
																<ClearIcon />
															</button>
														</div>
														<span className="cart-price fw-bold">
															Price
														</span>
													</div>
												</div>
											</div>
										</div>
										<div
											id="cart-bottom"
											className="p-2 m-2 d-flex flex-column"
										>
											<div className="cart-total d-flex justify-content-between">
												<p className="fs-7">
													TỔNG TIỀN
												</p>
												<p className="text-danger fw-bold">
													Total Price
												</p>
											</div>
											<div className="bottom-cart-button d-flex justify-content-between ">
												<button className="btn btn-dark">
													Xem giỏ hàng
												</button>
												<button className="btn btn-dark">
													Thanh toán
												</button>
											</div>
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
