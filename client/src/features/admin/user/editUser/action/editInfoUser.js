import { useEffect, useState } from 'react';
import Toast from '../../../../../utils/toast';
import moment from 'moment';
import axios from 'axios';
import { DatePicker, Space } from 'antd';
import { validateRank } from '../../../../../utils/functionValidate';
import { returnMoney } from '../../../../../utils/returnHTML';
export default function EditInfoUser({ infoUser, idUser, accessToken, setDataDetail }) {
    const [inputs, setInputs] = useState(infoUser);
    const [note, setNote] = useState('');
    const dateFormatList = ['DD/MM/YYYY', 'MM/DD/YYYY'];
    const options = [
        { id: 'Bronze', typeName: 'Đồng' },
        { id: 'Silver', typeName: 'Bạc' },
        { id: 'Gold', typeName: 'Vàng' },
        { id: 'Platinum', typeName: 'Bạch Kim' },
    ];
    const optionsGender = [
        { id: true, typeName: 'Nam' },
        { id: false, typeName: 'Nữ' },
    ];
    const optionsRole = [
        { id: 0, typeName: 'Khách Hàng' },
        { id: 1, typeName: 'Nhân Viên' },
    ];
    const handleChangeSelectBoxVip = async (e) => {
        const value = e.target.value;
        const dataMoney = await returnMoney(value);
        await setInputs({ ...inputs, vip: value, moneyPayed: dataMoney.point });
        await setNote(dataMoney.text);
    };
    const handleChangeSelectBoxGender = (e) => {
        e.preventDefault();
        const information = {
            name: inputs.information.name,
            phoneNumber: inputs.information.phoneNumber,
            dateOfBirth: inputs.information.dateOfBirth,
            gender: e.target.value,
            address: inputs.information.address,
        };
        return setInputs({ ...inputs, information });
    };
    const handleChangeSelectBoxRole = (e) => setInputs({ ...inputs, role: e.target.value });
    const handleChangeEditUser = (e) => {
        e.preventDefault();
        if (e.target.name !== 'moneyPayed') {
            const data = {
                ...inputs.information,
                [e.target.name]: e.target.value,
            };
            return setInputs({ ...inputs, information: data });
        }
        return setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await validateRank(inputs.vip, inputs.moneyPayed);
            if (inputs.information.name === '' || inputs.information.name === undefined)
                throw new Error('Tên người dùng không để trống');

            if (typeof inputs.information.dateOfBirth === String) {
                inputs.information.dateOfBirth = moment(inputs.information.dateOfBirth).toDate();
            }

            const endpoint = `${process.env.REACT_APP_API_URL}admin/users/editUser`;
            const { data } = await axios.put(endpoint, inputs, {
                headers: {
                    authorization: 'Bearer ' + accessToken,
                },
            });
            await setDataDetail(data.body);
            return Toast.fire({
                title: 'Cập nhật thành công',
                icon: 'success',
            });
        } catch (err) {
            Toast.fire({
                title: err.message,
                icon: 'error',
            });
        }
    };
    const handleChangeDate = (date) => {
        setInputs({ ...inputs, information: { ...inputs.information, dateOfBirth: date } });
    };
    return (
        <>
            <div className="newUserForm">
                <div className="newUserItem">
                    <label>Tên Người Dùng</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={handleChangeEditUser}
                        value={inputs.information.name}
                    />
                </div>
                <div className="newUserItem ">
                    <label>Loại Thành Viên</label>
                    <select
                        className="form-control"
                        value={inputs.vip}
                        onChange={handleChangeSelectBoxVip}
                    >
                        {options.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.typeName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="newUserItem">
                    <label>Số Tiền Đã Mua</label>
                    <input
                        className="form-control"
                        type="number"
                        min="0"
                        onChange={handleChangeEditUser}
                        value={inputs.moneyPayed}
                        name="moneyPayed"
                    />
                    <p className="ml-2" style={{ color: 'red' }}>
                        <small>{note}</small>
                    </p>
                </div>
                <div className="newUserItem">
                    <label>Giới Tính</label>
                    <select
                        className="form-control"
                        value={inputs.information.gender}
                        onChange={handleChangeSelectBoxGender}
                    >
                        {optionsGender.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.typeName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="newUserItem">
                    <label>Ngày Sinh</label>
                    <div className="user-dateOfBirth">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <DatePicker
                                className="form-control"
                                onChange={handleChangeDate}
                                value={moment(inputs.information.dateOfBirth) || undefined}
                                style={{ width: '100%' }}
                                format={dateFormatList}
                            />
                        </Space>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Địa Chỉ</label>
                    <input
                        className="form-control"
                        type="text"
                        onChange={handleChangeEditUser}
                        name="address"
                        value={inputs.information.address}
                    />
                </div>
                <div className="newUserItem">
                    <label>Bộ Phận</label>
                    <select
                        className="form-control"
                        value={inputs.role}
                        onChange={handleChangeSelectBoxRole}
                    >
                        {optionsRole.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>
                                    {item.typeName}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="text-center mt-5">
                    <button type="button" className="btn btn-success" onClick={handleClick}>
                        Sửa
                    </button>
                </div>
            </div>
        </>
    );
}
