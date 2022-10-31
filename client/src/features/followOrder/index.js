import BillComponent from '../../components/Bill/bill';
import { useState, useEffect } from 'react';
import axiosMethod from '../../middlewares/axios';
import Toast from '../../utils/toast';

export default function FollowOrder() {
    const [idOrder, setOrder] = useState('');
    const [dataBill, setDataBill] = useState(null);
    const [disable, setDisable] = useState(true);
    useEffect(() => {
        if (idOrder.length > 23) {
            return setDisable(false);
        }
        return setDisable(true);
    }, [idOrder]);
    const handleChange = (e) => {
        setOrder(e.target.value);
    };
    const handleClick = async (e) => {
        try {
            const data = await axiosMethod(`bill/${idOrder}`, 'get');
            if (data.success) {
                return await setDataBill(data.body);
            }
        } catch (err) {
            setDataBill(null);
            return Toast.fire({
                title: 'Không Tìm Thấy Đơn Hàng',
                icon: 'error',
            });
        }
    };
    return (
        <div>
            <div>
                <div className="col-4 mx-auto mt-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập Mã Đơn Hàng"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={idOrder}
                            onChange={handleChange}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleClick}
                                disabled={disable}
                            >
                                Tìm Kiếm
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="mx-auto" style={{ width: '50%' }} />
                <div>{dataBill && <BillComponent bill={dataBill} />}</div>
            </div>
        </div>
    );
}
