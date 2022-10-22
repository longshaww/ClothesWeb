import { useState, useEffect } from 'react';
import axiosMethod from '../../middlewares/axios';
import VoucherComponent from '../../components/voucher/voucher.component';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
export default function VoucherMe() {
    const [myVoucher, setMyVoucher] = useState([]);
    const [cookies] = useCookies(['user']);
    useEffect(() => {
        async function getMyVoucher() {
            const myVoucher = await axiosMethod(`voucher/myVoucher/${cookies.user.id}`);
            if (myVoucher.success) {
                setMyVoucher(myVoucher.body);
            }
        }
        getMyVoucher();
    }, []);
    return (
        <>
            {myVoucher?.length > 0 ? (
                myVoucher.map((voucher, index) => {
                    return (
                        <div key={index}>
                            <VoucherComponent voucher={voucher} allowCopy={true} />
                        </div>
                    );
                })
            ) : (
                <div className="text-center p-5 shadow rounded-3">
                    <h3 className="text-danger">Bạn chưa có voucher</h3>
                    <Link to="/collections/sale" className="fs-5 text-primary">
                        Săn voucher ?
                    </Link>
                </div>
            )}
        </>
    );
}
