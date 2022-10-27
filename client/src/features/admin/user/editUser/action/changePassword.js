export default function EditInfoUser({ infoUser, idUser, accessToken, setDataDetail }) {
    return (
        <>
            <div className="p-5 shadow mx-3" style={{ flex: 1 }}>
                <h3 className="text-center">Sữa Thông Tin</h3>
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
