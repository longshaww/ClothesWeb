import { useState, useEffect } from 'react';
import axiosMethod from '../../middlewares/axios';
import '../../assets/styles/register.css';
import {
    isDate,
    checkIsValidName,
    validatePhoneNumber,
    ValidateEmail,
    validatePassword,
} from '../../utils/functionValidate';
import Toast from '../../utils/toast';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const radio = [
    {
        value: true,
        name: 'Nam',
    },
    { value: false, name: 'Nữ' },
];

export default function Register() {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
    });
    const [checkedGender, setCheckedGender] = useState(true);
    const [disable, setDisable] = useState(true);
    const handleChange = (event) => {
        const value = event.target.value;
        setInputs({
            ...inputs,
            [event.target.name]: value,
        });
    };
    useEffect(() => {
        if (
            inputs.name !== '' &&
            inputs.dateOfBirth !== '' &&
            inputs.address !== '' &&
            inputs.phoneNumber !== '' &&
            inputs.email !== '' &&
            inputs.password !== ''
        ) {
            return setDisable(false);
        }
        return setDisable(true);
    }, [inputs]);
    const validate = () => {
        if (
            inputs.name === '' ||
            inputs.dateOfBirth === '' ||
            inputs.address === '' ||
            inputs.phoneNumber === '' ||
            inputs.email === '' ||
            inputs.password === ''
        ) {
            Toast.fire({
                title: 'Vui Lòng Nhập Đầy Đủ Thông Tin',
                icon: 'error',
            });
            return false;
        }
        if (!isDate(inputs.dateOfBirth)) {
            Toast.fire({
                title: 'Nhập Sai Ngày Sinh',
                icon: 'error',
            });
            return false;
        }
        if (checkIsValidName(inputs.name)) {
            Toast.fire({
                title: 'Nhập Sai Tên',
                icon: 'error',
            });
            return false;
        }
        if (!validatePhoneNumber(inputs.phoneNumber)) {
            Toast.fire({
                title: 'Nhập Sai Số',
                icon: 'error',
            });
            return false;
        }
        if (!ValidateEmail(inputs.email)) {
            Toast.fire({
                title: 'Nhập Sai Email',
                icon: 'error',
            });
            return false;
        }
        if (!validatePassword(inputs.password)) {
            Toast.fire({
                title: 'Tăng Độ Bảo Mật Cho Tài Khoản, ( > 6 kí tự)',
                icon: 'error',
            });
            return false;
        }
        return true;
    };
    const resetState = () => {
        setDisable(true);
        setInputs({
            name: '',
            dateOfBirth: '',
            address: '',
            phoneNumber: '',
            email: '',
            password: '',
        });
        setCheckedGender(true);
    };
    const handleClicKRegister = async () => {
        if (validate()) {
            try {
                const data = {
                    ...inputs,
                    gender: checkedGender,
                };
                setDisable(true);
                const result = await axiosMethod(`authJWT/register`, 'post', data);
                MySwal.fire({
                    title: <p>Chuyển Đến Xác Thực OTP</p>,
                    didOpen: () => {
                        MySwal.showLoading();
                    },
                    timer: 1000,
                }).then(() => {
                    if (result.success === true) {
                        localStorage.setItem('emailRegister', JSON.stringify(result.data.email));
                        Toast.fire({
                            title: 'Đăng Ký Thành Công',
                            icon: 'success',
                        });
                        navigate(`/account/verify/${result.data.userId}`);
                    } else {
                        resetState();
                        Toast.fire({
                            title: 'Tài Khoản Đã Tồn Tại',
                            icon: 'error',
                        });
                    }
                });
            } catch (err) {
                resetState();
                Toast.fire({
                    title: 'Đã xảy ra lỗi',
                    icon: 'error',
                });
            }
        }
    };
    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-5 col-xs-12 wrapbox-heading-account">
                        <div className="header-page clearfix">
                            <h1>Tạo tài khoản</h1>
                        </div>
                    </div>
                    <div className="col-md-2 col-xs-12 wrapbox-heading-account">
                        <div className="vr"></div>
                    </div>

                    <div className="col-md-4 col-xs-12 wrapbox-content-account ">
                        <div className="userbox">
                            <form id="create_customer">
                                <input name="form_type" type="hidden" value="create_customer" />
                                <input name="utf8" type="hidden" value="✓" />

                                <div id="form-last_name" className="clearfix large_form">
                                    <label className="label icon-field">
                                        <i className="icon-login icon-user "></i>
                                    </label>
                                    <input
                                        required=""
                                        type="text"
                                        name="name"
                                        value={inputs.name}
                                        placeholder="Họ Tên "
                                        id="last_name"
                                        className="text"
                                        onChange={handleChange}
                                        size="30"
                                    />
                                </div>
                                <div id="form-first_name" className="clearfix large_form">
                                    <label className="label icon-field">
                                        <i className="icon-login icon-user "></i>
                                    </label>
                                    <input
                                        required=""
                                        type="text"
                                        name="address"
                                        value={inputs.address}
                                        placeholder="Địa Chỉ"
                                        id="first_name"
                                        className="text"
                                        onChange={handleChange}
                                        size="30"
                                    />
                                </div>
                                <div id="form-first_name" className="clearfix large_form">
                                    <label className="label icon-field">
                                        <i className="icon-login icon-user "></i>
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.phoneNumber}
                                        name="phoneNumber"
                                        placeholder="Số điện thoại"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div id="form-gender" className="clearfix large_form">
                                    {radio.map((el, index) => {
                                        return (
                                            <>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    onChange={() => setCheckedGender(el.value)}
                                                    checked={checkedGender === el.value}
                                                />
                                                <label htmlFor="genderData">{el.name}</label>
                                            </>
                                        );
                                    })}
                                </div>
                                <div id="form-birthday" className="clearfix large_form">
                                    <label className="label icon-field">
                                        <i className="icon-login icon-envelope "></i>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="mm/dd/yyyy"
                                        value={inputs.dateOfBirth}
                                        name="dateOfBirth"
                                        id="birthday"
                                        className="text"
                                        size="30"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div id="form-email" className="clearfix large_form">
                                    <label className="label icon-field">
                                        <i className="icon-login icon-envelope "></i>
                                    </label>
                                    <input
                                        required=""
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={inputs.email}
                                        id="email"
                                        className="text"
                                        size="30"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div
                                    id="form-password"
                                    className="clearfix large_form large_form-mr10"
                                >
                                    <label className="label icon-field">
                                        <i className="icon-login icon-shield "></i>
                                    </label>
                                    <input
                                        required=""
                                        type="password"
                                        placeholder="Mật khẩu"
                                        name="password"
                                        value={inputs.password}
                                        id="password"
                                        className="password text"
                                        size="30"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="clearfix large_form sitebox-recaptcha">
                                    This site is protected by reCAPTCHA and the Google
                                    <a
                                        href="https://policies.google.com/privacy"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Privacy Policy
                                    </a>
                                    and{' '}
                                    <a
                                        href="https://policies.google.com/terms"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Terms of Service
                                    </a>{' '}
                                    apply.
                                </div>
                                <div className="d-flex justify-content-center mb-5">
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        style={{
                                            width: '100px',
                                            height: '50px',
                                        }}
                                        onClick={handleClicKRegister}
                                        disabled={disable}
                                    >
                                        Đăng Ký
                                    </button>
                                </div>

                                <input
                                    id="4cccc71233ec42179ffac3f5603bd6a6"
                                    name="g-recaptcha-response"
                                    type="hidden"
                                    value="03AGdBq243-FgvuXuycaVql40BwwdNRFD17L68tYRqBrus0Ie0tmFWMzOwy91JN0y8ygCCdCjTS-AUuEjwO2Kn05OmILT90agk9yGEKiWjlcEfrvcNBxTilT-6j4Fqpf8lIZiCJ4g2T01BeOC0e5FHVlvX8M7ZSo8cedJsWdYxZAelckF77e13oUHvFhiWgvlDXIeCafbrDxBQJVUbnweK5ZLZVKYjAKjrbvw2iDeovk6b2mkecd-s7HFt-7u_Ptp8XC7PDkL7muGtjh-Mxudf58w-Zmhsa4DVFbrC1-R-eiLQsEd_mhwjslBqsjhvZGUGh2bJbqDpl20hQB1XEPKTY0Rd1yYB4FqDEcZfOm8GiRJgVTo44JaeHAYNVBMhQKnfaDj7L_pTDUa2KnIuilmCw2rIuqzHvOBqzj03ajyht4Ys3834xEEN4BktFl2dkWXdNLT9HgbeYph45huMFBEaYNtngtcyxQNcMJnNiyTxaNnHfVzn5urIvjvd65QhZ_IMALfvc058hsej"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
