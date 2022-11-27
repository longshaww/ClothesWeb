import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../../assets/styles/changePassword.css';
import { validateNewPassword } from '../../utils/functionValidate';
import Toast from '../../utils/toast';
import axios from 'axios';
import { useCookies } from 'react-cookie';
export default function ChangePassword() {
    const [password, setPassword] = useState({
        oldPassword: {
            showPassword: false,
            value: '',
        },
        newPassword: {
            showPassword: false,
            value: '',
        },
        verifyPassword: {
            showPassword: false,
            value: '',
        },
    });
    const [disable, setDisable] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'accessToken']);
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
    useEffect(() => {
        if (
            password.oldPassword.value !== '' &&
            password.newPassword.value !== '' &&
            password.verifyPassword.value !== ''
        ) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [password]);
    const handleClickChangePassword = async () => {
        try {
            const flag = validateNewPassword(password);
            if (typeof flag === 'string') {
                Toast.fire({
                    title: flag,
                    icon: 'error',
                });
                return resetState();
            }
            const model = {
                oldPassword: password.oldPassword.value,
                password: password.newPassword.value,
                verifyNewPassword: password.verifyPassword.value,
            };
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}user/changePassword`,
                model,
                {
                    headers: {
                        authorization: 'Bearer ' + cookies.accessToken,
                    },
                }
            );
            if (!data.success) {
                Toast.fire({
                    title: 'Mật khẩu cũ không đúng',
                    icon: 'error',
                });
                return resetState();
            }

            Toast.fire({
                title: 'Đổi mật khẩu thành công',
                icon: 'success',
            });
            return resetState();
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const resetState = () => {
        setPassword({
            oldPassword: {
                showPassword: false,
                value: '',
            },
            newPassword: {
                showPassword: false,
                value: '',
            },
            verifyPassword: {
                showPassword: false,
                value: '',
            },
        });
        setDisable(true);
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
    return (
        <div className="p-5">
            <div className="row justify-content-center">
                <div className="d-flex justify-content-center  m-title">ĐỔI MẬT KHẨU</div>

                <div className="row mb-3">
                    <div>
                        <h1> Thêm mật khẩu </h1>
                        <div className="tk-R8Z">
                            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-sm-8 mt-4">
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                                Mật Khẩu Cũ
                            </label>
                            <div className="col-sm-9 password_container">
                                <input
                                    type={password.oldPassword.showPassword ? 'text' : 'password'}
                                    id="inputPassword"
                                    className="form-control form-control-md"
                                    name="oldPassword"
                                    autoComplete="off"
                                    value={password.oldPassword.value}
                                    onChange={handleChange}
                                />

                                <i
                                    className="eyeIcon"
                                    onClick={() => handleClickShowHidePassword('oldPassword')}
                                >
                                    {password.oldPassword.showPassword ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </i>
                            </div>
                        </div>
                        <div className="form-group row mt-3">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                                Mật Khẩu Mới
                            </label>
                            <div className="col-sm-9 password_container">
                                <input
                                    autoComplete="off"
                                    type={password.newPassword.showPassword ? 'text' : 'password'}
                                    className="form-control form-control-md"
                                    id="inputPassword"
                                    name="newPassword"
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
                        </div>
                        <div className="form-group row mt-3">
                            <label htmlFor="inputPassword" className="col-sm-3">
                                Xác Nhận Lại Mật Khẩu
                            </label>
                            <div className="col-sm-9 password_container">
                                <input
                                    autoComplete="off"
                                    type={
                                        password.verifyPassword.showPassword ? 'text' : 'password'
                                    }
                                    className="form-control form-control-md "
                                    id="inputPassword"
                                    name="verifyPassword"
                                    value={password.verifyPassword.value}
                                    onChange={handleChange}
                                />
                                <i
                                    className="eyeIcon"
                                    onClick={() => handleClickShowHidePassword('verifyPassword')}
                                >
                                    {password.verifyPassword.showPassword ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-dark"
                        onClick={handleClickChangePassword}
                        disabled={disable}
                    >
                        <p className="text-resetPassword">Đổi Mật Khẩu</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
