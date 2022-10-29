import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Toast from '../../utils/toast';
import { validateNewPassword } from '../../utils/functionValidate';
import '../../assets/styles/changePassword.css';
import axiosMethod from '../../middlewares/axios';
import { useNavigate } from 'react-router-dom';
export default function ResetNewPassword() {
    const [password, setPassword] = useState({
        newPassword: {
            showPassword: false,
            value: '',
        },
        verifyPassword: {
            showPassword: false,
            value: '',
        },
    });
    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const flag = event.target.type === 'password' ? false : true;
        setPassword({
            ...password,
            [event.target.name]: {
                showPassword: flag,
                value: value,
            },
        });
    };
    const handleClickShowHidePassword = (namePassword) => {
        const value = password[namePassword].value;
        let flag = password[namePassword].showPassword;
        setPassword({
            ...password,
            [namePassword]: {
                showPassword: !flag,
                value,
            },
        });
    };
    const handleClick = async () => {
        try {
            const flag = validateNewPassword(password);
            if (typeof flag === 'string') {
                Toast.fire({
                    title: flag,
                    icon: 'error',
                });
                return resetState();
            }
            const email = decodeURIComponent(searchParam.get('email'));
            const code = searchParam.get('code');
            const model = {
                email,
                password: password.newPassword.value,
                verifyNewPassword: password.verifyPassword.value,
                cryptoOTP: code,
            };
            const endPoint = 'authJWT/veriyOTPForgetPasswordStep2';
            const data = await axiosMethod(endPoint, 'POST', model);

            Toast.fire({
                title: 'Đổi mật khẩu thành công',
                icon: 'success',
            });
            resetState();
            return navigate('/');
        } catch (err) {
            Toast.fire({
                title: 'OTP hết hạn',
                icon: 'failed',
            });
            return  window.location.replace(`${process.env.HOSTPORTFE}/account/resetPassword`);;
        }
    };
    const resetState = () => {
        setPassword({
            newPassword: {
                showPassword: false,
                value: '',
            },
            verifyPassword: {
                showPassword: false,
                value: '',
            },
        });
    };
    return (
        <div>
            <div className="d-flex justify-content-center ">
                <div className="col-sm-6    ">
                    <div className="p-5 shadow box-resetPassword ">
                        <div className="heading-resetPassword  d-flex justify-content-center align-items-center">
                            <div className="textHeading flex-grow-1">
                                <h1 className="text-center">Đặt Lại Mật Khẩu</h1>
                            </div>
                        </div>
                        <div>
                            <div className="form-group row d-flex justify-content-center mt-4">
                                <div className="col-sm-9 password_container">
                                    <input
                                        type={
                                            password.newPassword.showPassword ? 'text' : 'password'
                                        }
                                        id="inputPassword"
                                        className="form-control form-control-md password_container"
                                        name="newPassword"
                                        placeholder="Nhập Mật Khẩu Mới"
                                        value={password.newPassword.value}
                                        onChange={handleChange}
                                    />
                                    <i
                                        className="eyeIcon"
                                        onClick={() => handleClickShowHidePassword('newPassword')}
                                    >
                                        {password.newPassword.showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </i>
                                </div>
                                <div className="col-sm-9 mt-3 password_container">
                                    <input
                                        type={
                                            password.verifyPassword.showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        id="inputPassword"
                                        className="form-control form-control-md "
                                        name="verifyPassword"
                                        placeholder="Xác Nhận Lại Mật Khẩu"
                                        value={password.verifyPassword.value}
                                        onChange={handleChange}
                                    />
                                    <i
                                        className="eyeIcon"
                                        onClick={() =>
                                            handleClickShowHidePassword('verifyPassword')
                                        }
                                    >
                                        {password.verifyPassword.showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </i>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-dark button-resetPassword"
                                    onClick={handleClick}
                                >
                                    TIẾP THEO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
