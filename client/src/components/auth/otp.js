import "../../assets/styles/otp.css";
import { useState } from 'react';
import Toast from '../../utils/toast';
import axiosMethod from "../../middlewares/axios";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function VerifyOtp() {
  let emailRegister = JSON.parse(localStorage.getItem('emailRegister'));
  emailRegister = emailRegister.substring(emailRegister.lastIndexOf("@")-3);
  const {id} = useParams();
  const navigate = useNavigate();
  const [digitOtp,setDigitOtp] = useState({
    number1 : "",
    number2: "",
    number3:"",
    number4:""
  })
  const handleChange = (event)=>{
    const value = event.target.value;
    setDigitOtp({
      ...digitOtp,
      [event.target.name]: value,
    });
  }
  const handleVerify = async () =>{
     if(digitOtp.number1 === ""||digitOtp.number2===""||digitOtp.number3===""||digitOtp.number4===""){
        Toast.fire({
            title: "Vui Lòng Nhập Đầy Đủ Thông Tin",
            icon: "error",
          });

     }
     else
     {
        try{
            const otp = Number(digitOtp.number1 + digitOtp.number2 + digitOtp.number3 + digitOtp.number4);
            const data = {
                userId : id,
                otp
            }
            const result = await axiosMethod("authJWT/verifyOTP","post",data);
            if(result.success)
            {
                Toast.fire({
                    title: "Đăng Ký Thành Công",
                    icon: "success",
                  });
                  navigate(`/`);
            }
            else
            {
                Toast.fire({
                    title: "OTP hết hạn",
                    icon: "error",
                  });
                  navigate(`/account/register`)
            }
        }
        catch(err)
        {
            console.log("vao")
            Toast.fire({
                title: "Đã có lỗi xảy ra",
                icon: "error",
              });
        }
     }
  }
  return (
    <>
      <div class="container  d-flex justify-content-center align-items-center" style={{marginTop:"150px"}}>
        <div class="position-relative">
          <div class="card p-2 text-center">
            <h6>Xác thực mã OTP</h6>
            <div>
              {" "}
              <span>Mã xác thực đã được gửi qua</span> <small>****{emailRegister}</small>{" "}
            </div>
            <div
              id="otp"
              class="inputs d-flex flex-row justify-content-center mt-2"
            >
              {" "}
              <input
                class="m-2 text-center form-control rounded"
                type="text"
                id="first"
                name="number1"
                value={digitOtp.number1}
                onChange={handleChange}
                maxLength="1"
              />{" "}
              <input
                class="m-2 text-center form-control rounded"
                type="text"
                id="second"
                name="number2"
                value={digitOtp.number2}
                onChange={handleChange}
                maxLength="1"
              />{" "}
              <input
                class="m-2 text-center form-control rounded"
                type="text"
                id="third"
                name="number3"
                value={digitOtp.number3}
                onChange={handleChange}
                maxLength="1"
              />{" "}
              <input
                class="m-2 text-center form-control rounded"
                type="text"
                id="fourth"
                name="number4"
                value={digitOtp.number4}
                onChange={handleChange}
                maxLength="1"
              />{" "}
            </div>
            <div class="mt-4">
              {" "}
              <button class="btn btn-dark px-4 validate" type="button" onClick={handleVerify}>
                 Xác Thực
              </button>{" "}
              <a href="#!" className="mt-2">Gửi Lại Mã Xác Thực</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
