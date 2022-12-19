import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../utils/toast';
import moment from 'moment';
import { isDate, checkIsValidName, validatePhoneNumber } from '../../utils/functionValidate';
import EditIcon from '@mui/icons-material/Edit';
import jwtDecode from 'jwt-decode';
import { Divider } from 'antd';
const radio = [
    {
        value: true,
        name: 'Nam',
    },
    { value: false, name: 'Nữ' },
];

export default function User() {
    const [data, setData] = useState(null);
    const [checkedGender, setCheckedGender] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'accessToken']);
    const [inputs, setInputs] = useState({
        name: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: true,
        address: '',
    });
    const [disable, setDisable] = useState(true);
    const validate = () => {
        if (
            inputs.name === '' ||
            inputs.dateOfBirth === '' ||
            inputs.address === '' ||
            inputs.phoneNumber === ''
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

        return true;
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}user/getUser/${cookies.user.id}`,
                    {
                        headers: {
                            authorization: 'Bearer ' + cookies.accessToken,
                        },
                    }
                );
                const customData = {
                    name: data.user.information.name,
                    phoneNumber: data.user.information.phoneNumber,
                    dateOfBirth: moment(data.user.information.dateOfBirth).format('MM/DD/YYYY'),
                    gender: data.user.information.gender,
                    address: data.user.information.address,
                    email: data.user.email,
                };
                setData(customData);
                setInputs(customData);
                setCheckedGender(customData.gender);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);
    const handleChange = (event) => {
        const value = event.target.value;
        setInputs({
            ...inputs,
            [event.target.name]: value,
        });
    };
    const handleEditUser = async () => {
        if (validate()) {
            try {
                const dataCustom = {
                    ...inputs,
                    gender: checkedGender,
                };
                const { data } = await axios.put(
                    `${process.env.REACT_APP_API_URL}user/editUser/${cookies.user.id}`,
                    dataCustom,
                    {
                        headers: {
                            authorization: 'Bearer ' + cookies.accessToken,
                        },
                    }
                );
                if (data.success === true) {
                    const info = await jwtDecode(data.accessToken);
                    setCookie('user', info, { path: '/' });
                    setCookie('accessToken', data.accessToken, {
                        path: '/',
                    });
                    const customData = {
                        name: info.information.name,
                        phoneNumber: info.information.phoneNumber,
                        dateOfBirth: moment(info.information.dateOfBirth).format('MM/DD/YYYY'),
                        gender: info.information.gender,
                        address: info.information.address,
                        email: info.email,
                    };
                    setDisable(!disable);
                    setData(customData);
                    setInputs(customData);
                    setCheckedGender(customData.gender);

                    Toast.fire({
                        title: 'Sửa Thông Tin Thành Công',
                        icon: 'success',
                    });
                }
            } catch (err) {
                Toast.fire({
                    title: 'Đã xảy ra lỗi',
                    icon: 'error',
                });
            }
        }
    };
    const onClickEdit = () => {
        setDisable(!disable);
    };
    return (
        <>
            {data !== null ? (
                <div className="p-5">
                    <div className=" text-center">
                        <span className="m-title"> THÔNG TIN TÀI KHOẢN CỦA BẠN</span>
                        <button className="ml-1" onClick={onClickEdit}>
                            <EditIcon />
                        </button>
                    </div>
                    <Divider></Divider>
                    <div className="row">
                        <form>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={inputs.name}
                                onChange={handleChange}
                                placeholder="Tên"
                                disabled={disable}
                            />

                            <div className="form-group mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    value={inputs.phoneNumber}
                                    maxLength="10"
                                    onChange={handleChange}
                                    placeholder="SĐT"
                                    disabled={disable}
                                />
                            </div>
                            <div className="d-flex mt-2">
                                {radio.map((el, index) => {
                                    return (
                                        <>
                                            <input
                                                type="radio"
                                                name="gender"
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                                onChange={() => setCheckedGender(el.value)}
                                                checked={checkedGender === el.value}
                                                disabled={disable}
                                            />
                                            <label htmlFor="genderData">{el.name}</label>
                                        </>
                                    );
                                })}
                            </div>
                            <div className="form-group mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Ngày Sinh"
                                    name="dateOfBirth"
                                    value={inputs.dateOfBirth}
                                    onChange={handleChange}
                                    disabled={disable}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formGroupExampleInput2"
                                    name="address"
                                    value={inputs.address}
                                    onChange={handleChange}
                                    placeholder="Địa Chỉ"
                                    disabled={disable}
                                />
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleEditUser}
                                    disabled={disable}
                                    type="button"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
