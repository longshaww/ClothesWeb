import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosMethod from '../../../middlewares/axios';
import VoucherComponent from '../../../components/voucher/voucher.component';
import { useCookies } from 'react-cookie';

export default function DetailVoucher() {
    const [voucher, setVoucher] = useState({});
    const [cookies] = useCookies(['accessToken']);

    const { id } = useParams();
    useEffect(() => {
        async function getVoucher() {
            const voucher = await axiosMethod(`admin/voucher/${id}`, 'get', null, {
                authorization: 'Bearer ' + cookies.accessToken,
            });
            if (voucher.success) {
                setVoucher(voucher.body);
            }
        }
        getVoucher();
    }, [id]);
    return (
        <>
            {voucher._id && (
                <div style={{ flex: 4 }}>
                    <VoucherComponent voucher={voucher} allowCopy={true} />
                </div>
            )}
        </>
    );
}
