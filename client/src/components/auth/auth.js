import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import axiosMethod from "../../middlewares/axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Toast from "../../utils/toast";
import "../../assets/styles/auth.css";
function Auth() {
	const [cookies, setCookie, removeCookie] = useCookies([
		"user",
		"accessToken",
	]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// click submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (email === "" || password === "") {
				Toast.fire({
					title: "Vui lòng nhập tài khoản và mật khẩu",
					icon: "warning",
				});
			} else {
				const res = await axiosMethod("authJWT/login", "POST", {
					email,
					password,
				});
				if (res.success === true) {
					const info = await jwtDecode(res.accessToken);
					setCookie("user", info, { path: "/" });
					setCookie("accessToken", res.accessToken, {
						path: "/",
					});
					Toast.fire({
						title: "Đăng nhập thành công",
						icon: "success",
					});
				}
			}
		} catch (err) {
			Toast.fire({
				title: "Tài khoản hoặc mật khẩu không đúng",
				icon: "warning",
			});
		}
	};
	const handleClickLogOut = async () => {
		try {
			const res = await axiosMethod("authJWT/logout", "POST");
			if (res.success === true) {
				removeCookie("user", { path: "/" });
				removeCookie("accessToken", { path: "/" });
				Toast.fire({
					title: "Đăng xuất thành công",
					icon: "success",
				});
			}
		} catch (err) {
			Toast.fire({
				title: "Có gì đó không đúng ~ !",
				icon: "error",
			});
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
						height: "180px",
						padding: "20px 15px",
					}}
				>
					<div id="cart-container" className="px-3">
						<h6 className="text-center">TÀI KHOẢN</h6>
						<hr className="mt-2"></hr>
						<Link to="/user">
							<div className="mt-1">
								<span>Tài khoản của tôi</span>
							</div>
						</Link>

						<Link to="/admin/dashboard">
							{cookies.user.isAdmin ? (
								<div className="mt-1">
									<span>Quản lý</span>
								</div>
							) : null}
						</Link>

						<div className="mt-1">
							<a href="#!">
								<span onClick={handleClickLogOut}>
									Đăng xuất
								</span>
							</a>
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
				style={{ cursor: "pointer" }}
				onClick={handleClick}
				aria-describedby={id}
				variant="contained"
				className="mt-1"
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

export default Auth;
