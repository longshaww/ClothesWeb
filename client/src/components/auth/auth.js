import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import axiosMethod from "../../middlewares/axios";
import axios from "axios";
import globalStateAndAction from "../../container/global.state.action";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function Auth() {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// click submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		const endpoint = process.env.REACT_APP_API_URL + "auth/login";

		try {
			const res = await axios.post(endpoint, { email, password });
			if (res.data.success === true) {
				const dataUser = res.data.user;
				setCookie("user", dataUser);
			}
		} catch (err) {
			console.log(err);

			alert("Vui lòng nhập lại mật khẩu");
		}
	};
	const handleClickLogOut = async () => {
		const endpoint = process.env.REACT_APP_API_URL + "auth/logout";

		try {
			const res = await axios.post(
				endpoint,
				cookies.user.refreshToken,
				{
					headers: {
						authorization:
							"Bearer " + cookies.user.accessToken,
					},
				}
			);
			if (res.data.success === true) {
				removeCookie("user");
			}
		} catch (err) {
			console.log(err);
		}
	};
	const showAuth = () => {
		if (!cookies.user) {
			return (
				<Box
					sx={{
						width: "338px",
						height: "354px",
						padding: "20px 15px",
					}}
				>
					<div id="cart-container" className="py-0 px-3">
						<div className="text-center" data-metatip="true">
							<h6 style={{ marginBottom: "2px" }}>
								ĐĂNG NHẬP TÀI KHOẢN
							</h6>
							<p className="mt-0">
								<small>
									Nhập email và mật khẩu của bạn
								</small>
							</p>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									id="exampleDropdownFormEmail1"
									placeholder="Email"
									onChange={(e) =>
										setEmail(e.target.value)
									}
								></input>
							</div>
							<div className="form-group mt-3">
								<input
									type="password"
									className="form-control"
									id="exampleDropdownFormPassword1"
									placeholder="Password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								></input>
							</div>
							<div className="footer mt-2">
								<em>
									This site is protected by reCAPTCHA
									and the Google
									<a
										href="https://policies.google.com/privacy"
										target="_blank"
										rel="noreferrer"
									>
										Privacy Policy
									</a>
									and{" "}
									<a
										href="https://policies.google.com/terms"
										target="_blank"
										rel="noreferrer"
										data-metatip="true"
										data-selected="true"
										data-label-id="0"
									>
										Terms of Service
									</a>{" "}
									apply.
								</em>
							</div>
							<div>
								<button
									type="submit"
									style={{ height: "40px" }}
									className="col-12  mt-1  btn btn-secondary btn-sm btn-block"
								>
									ĐĂNG NHẬP
								</button>
							</div>
						</form>
						<div className="text-center">
							<Link to="/account/register">
								Tạo tài khoản
							</Link>
							<Link to="/account/register">
								Bạn đã quên mật khẩu ?
							</Link>
						</div>
					</div>
				</Box>
			);
		} else {
			return (
				<Box
					sx={{
						width: "250px",
						height: "150px",
						padding: "20px 15px",
					}}
				>
					<div id="cart-container" className="px-3">
						<h6 class="text-center">THÔNG TIN TÀI KHOẢN</h6>
						<hr class="mt-2"></hr>
						<div>
							<span>
								{cookies.user.infoUser.fullName
									.firstName +
									" " +
									cookies.user.infoUser.fullName
										.lastName}
							</span>
						</div>
						<div className="mt-1">
							<span>Tài khoản của tôi</span>
						</div>
						<div className="mt-1">
							<span onClick={handleClickLogOut}>
								Đăng xuất
							</span>
						</div>
					</div>
				</Box>
			);
		}
	};
	// HANDLE OPEN TABLE CLOSE TABLE
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	//MUI Cart Open handle
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	return (
		<Badge color="primary">
			<AccountCircleIcon
				onClick={handleClick}
				aria-describedby={id}
				variant="contained"
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "mid",
				}}
			>
				{showAuth()}
			</Popover>
		</Badge>
	);
}

export default globalStateAndAction(Auth);
