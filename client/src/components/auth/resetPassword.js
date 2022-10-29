import '../../assets/styles/resetPassword.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ValidateEmail } from '../../utils/functionValidate';
import { useNavigate } from 'react-router-dom';
import axiosMethod from '../../middlewares/axios';
import Toast from '../../utils/toast';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ResetPassword() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [disable, setDisable] = useState(true);
    const [email, setEmail] = useState('');
    useEffect(() => {
        if (ValidateEmail(email)) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [email]);
    const handleChange = (e) => {
        e.preventDefault();

        const value = e.target.value;
        setEmail(value);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            setDisable(true);
            const endPoint = 'authJWT/forgetPassword';
            const data = await axiosMethod(endPoint, 'POST', { email });
            if (data.success) {
                MySwal.fire({
                    title: <p>OTP ĐÃ ĐƯỢC GỬI ĐẾN EMAIL</p>,
                    didOpen: () => {
                        MySwal.showLoading();
                    },
                    timer: 1000,
                });
                return navigate(
                    `/account/verifyOTPForgetPassword?email=${encodeURIComponent(email)}`
                );
            } else {
                await resetState();
            }
        } catch (error) {
            await resetState();
            Toast.fire({
                title: 'Tài khoản không tồn tại ',
                icon: 'error',
            });
        }
    };
    const resetState = () => {
        setEmail('');
        setDisable(true);
    };
    return (
        <div>
            <div className="d-flex justify-content-center ">
                <div className="col-sm-6    ">
                    <div className="p-5 shadow box-resetPassword ">
                        <div className="heading-resetPassword  d-flex justify-content-center align-items-center">
                            <div className="iconHeading">
                                <Link className="iconLink" to="/">
                                    {' '}
                                    <ArrowBackIcon />
                                </Link>
                            </div>
                            <div className="textHeading flex-grow-1">
                                <h1 className="text-center">Quên Mật Khẩu</h1>
                            </div>
                        </div>
                        <div>
                            <div className="form-group row d-flex justify-content-center mt-4">
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        id="inputPassword"
                                        className="form-control form-control-md"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        placeholder="Nhập Email"
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-dark button-resetPassword"
                                    disabled={disable}
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
