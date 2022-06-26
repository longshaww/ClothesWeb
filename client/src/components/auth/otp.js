import "../../assets/styles/otp.css";
import { useEffect, useState } from "react";
import Toast from "../../utils/toast";
import axiosMethod from "../../middlewares/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function VerifyOtp() {
	let emailRegister = JSON.parse(localStorage.getItem("emailRegister"));
	const [email, setEmail] = useState();

	const { id } = useParams();
	const [digitOtp, setDigitOtp] = useState({
		number1: "",
		number2: "",
		number3: "",
		number4: "",
	});
	const navigate = useNavigate();
	useEffect(() => {
		if (!emailRegister) {
			return navigate("/");
		}
		setEmail(
		
				emailRegister.substring(emailRegister.lastIndexOf("@") - 3)

		);
	}, [emailRegister,navigate]);

	const handleChange = (event) => {
		const value = event.target.value;
		setDigitOtp({
			...digitOtp,
			[event.target.name]: value,
		});
	};
	const handleVerify = async () => {
		if (
			digitOtp.number1 === "" ||
			digitOtp.number2 === "" ||
			digitOtp.number3 === "" ||
			digitOtp.number4 === ""
		) {
			Toast.fire({
				title: "Vui Lòng Nhập Đầy Đủ Thông Tin",
				icon: "error",
			});
		} else {
			try {
				const otp = Number(
					digitOtp.number1 +
						digitOtp.number2 +
						digitOtp.number3 +
						digitOtp.number4
				);
				const data = {
					userId: id,
					otp: otp,
				};
				const result = await axiosMethod(
					"authJWT/verifyOTP",
					"post",
					data
				);
				if (result.success) {
					Toast.fire({
						title: "Đăng Ký Thành Công",
						icon: "success",
					});
					navigate(`/`);
				} else {
					Toast.fire({
						title: "OTP Không Đúng",
						icon: "error",
					});
					navigate(`/account/register`);
				}
			} catch (err) {
				Toast.fire({
					title: "OTP hết hạn",
					icon: "error",
				});
				navigate(`/account/register`);
			}
		}
	};
  const handleReSendOTP = async ()=>{
    try{
     const data = {
         userId : id,
         email: emailRegister
     }
       const result = await axiosMethod("authJWT/resendOTP","post",data);
       if(result.success)
       {
         Toast.fire({
           title: "Gửi Mã Thành Công",
           icon: "success",
         });
       }
       else
       {
         Toast.fire({
           title: "Gửi Mã Thất Bại",
           icon: "error",
         });
       }
       
    }
    catch(err)
    {
     Toast.fire({
       title: "Đã Xảy Ra Lỗi",
       icon: "error",
     });
     navigate(`/account/register`)
    }
 }
	return (
		<>
			<div
				className="container  d-flex justify-content-center align-items-center"
				style={{ marginTop: "150px" }}
			>
				<div className="position-relative">
					<div className="card-3 p-2 text-center">
						<h6>Xác thực mã OTP</h6>
						<div>
							<span>Mã xác thực đã được gửi qua</span>{" "}
							<small>****{email}</small>
						</div>
						<div
							id="otp"
							className="inputs d-flex flex-row justify-content-center mt-2"
						>
							<input
								className="m-2 text-center form-control rounded"
								type="text"
								id="first"
								name="number1"
								value={digitOtp.number1}
								onChange={handleChange}
								maxLength="1"
							/>
							<input
								className="m-2 text-center form-control rounded"
								type="text"
								id="second"
								name="number2"
								value={digitOtp.number2}
								onChange={handleChange}
								maxLength="1"
							/>
							<input
								className="m-2 text-center form-control rounded"
								type="text"
								id="third"
								name="number3"
								value={digitOtp.number3}
								onChange={handleChange}
								maxLength="1"
							/>
							<input
								className="m-2 text-center form-control rounded"
								type="text"
								id="fourth"
								name="number4"
								value={digitOtp.number4}
								onChange={handleChange}
								maxLength="1"
							/>
						</div>
						<div className="mt-4">
							<button
								className="btn btn-dark px-4 validate"
								type="button"
								onClick={handleVerify}
							>
								Xác Thực
							</button>
              <div className="mt-2">
              <a onClick={handleReSendOTP} >
								Gửi Lại Mã Xác Thực
							</a>
              </div>
					
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
