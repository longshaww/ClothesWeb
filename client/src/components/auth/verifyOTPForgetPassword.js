import '../../assets/styles/resetPassword.css';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Toast from '../../utils/toast';
import axiosMethod from '../../middlewares/axios';
import { useNavigate } from 'react-router-dom';
export default function VerifyOTPForgetPassword() {
    const navigate = useNavigate();
    const [disable, setDisable] = useState(true);
    const [searchParam, setSearchParam] = useSearchParams();
    const [otp, setOTP] = useState('');

    useEffect(() => {
        if (otp.length === 4) {
            return setDisable(false);
        }
        return setDisable(true);
    }, [otp]);
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        return setOTP(value);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const email = searchParam.get('email');
            setDisable(true);
            const endPoint = `authJWT/verifyOTPForgetPassword`;
            const model = {
                email: decodeURIComponent(email),
                otp,
            };
            console.log(model);
            const data = await axiosMethod(endPoint, 'POST', model);
            if (data.success) {
                Toast.fire({
                    icon: 'success',
                    title: 'Xác Nhận Thành Công',
                });
                const cryptoOTP = data.body;

                return navigate(`/account/resetNewPassword?email=${encodeURIComponent(email)}&code=${cryptoOTP}`);
            }
            return resetState();
        } catch (err) {
            resetState();
            return Toast.fire({
                icon: 'error',
                title: 'OTP KHÔNG HỢP LỆ',
            });
        }
    };
    const resetState = () => {
        setDisable(true);
        setOTP('');
    };
    return (
        <div>
            <div className="d-flex justify-content-center ">
                <div className="col-sm-6    ">
                    <div className="p-5 shadow box-resetPassword ">
                        <div className="heading-resetPassword  d-flex justify-content-center align-items-center">
                            <div className="iconHeading"></div>
                            <div className="textHeading flex-grow-1">
                                <h1 className="text-center">Nhập Mã OTP</h1>
                            </div>
                        </div>
                        <div>
                            <div className="form-group row d-flex justify-content-center mt-4">
                                <div className="col-sm-9">
                                    <input
                                        maxLength={4}
                                        onChange={handleChange}
                                        value={otp}
                                        type="text"
                                        className="form-control form-control-md"
                                        name="otp"
                                        placeholder="OTP"
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-dark button-resetPassword"
                                    onClick={handleClick}
                                    disabled={disable}
                                >
                                    XÁC NHẬN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
