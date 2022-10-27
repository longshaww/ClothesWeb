import { useState } from 'react';
import Toast from '../../../../../utils/toast';
import moment from 'moment';
import axios from 'axios';
export default function EditInfoUser({ infoUser, idUser, accessToken, setDataDetail }) {
    const [inputs, setInputs] = useState(infoUser);
    const options = [
        { id: 0, typeName: 'Đồng' },
        { id: 1, typeName: 'Bạc' },
        { id: 2, typeName: 'Vàng' },
        { id: 3, typeName: 'Bạch Kim' },
    ];
    const optionsGender = [
        { id: true, typeName: 'Nam' },
        { id: false, typeName: 'Nữ' },
    ];
    const optionsRole = [
        { id: 0, typeName: 'Khách Hàng' },
        { id: 1, typeName: 'Nhân Viên' },
    ];
    const handleChangeEditProduct = (e) => {};
    const handleClick = async () => {};
    return (
        <>
            <div className="newUserForm">
                <div className="newUserItem">
                    <label>Tên Người Dùng</label>
                    <input
                        type="text"
                        name="nameUser"
                        className="form-control"
                        value={inputs.information.name}
                    />
                </div>
                <div className="newUserItem ">
                    <label>Loại</label>
                    <select className="form-control">
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
                        value={inputs.moneyPayed}
                        name="price"
                    />
                </div>
                <div className="newUserItem">
                    <label>Giới Tính</label>
                    <select className="form-control">
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
                    <input
                        className="form-control"
                        type="text"
                        name="dateOfBirth"
                        value={moment(inputs.information.dateOfBirth).format()}
                    />
                </div>
                <div className="newUserItem">
                    <label>Địa Chỉ</label>
                    <input
                        className="form-control"
                        type="text"
                        name="address"
                        value={inputs.information.address}
                    />
                </div>
                <div className="newUserItem">
                    <label>Bộ Phận</label>
                    <select className="form-control">
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
                    <button type="button" className="btn btn-success">
                        Tạo
                    </button>
                </div>
            </div>
        </>
    );
}
