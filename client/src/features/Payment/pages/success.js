import globalStateAndAction from '../../../container/global.state.action';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axiosMethod from '../../../middlewares/axios';
import Toast from '../../../utils/toast';
import BillComponent from '../../../components/Bill/bill';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function PaymentSuccess({ setCart }) {
    const [cookies] = useCookies(['user']);
    const { payment } = useParams();
    const customer = JSON.parse(localStorage.getItem('customer'));
    const voucher = localStorage.getItem('voucher');
    const [bill, setBill] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        async function postBill() {
            const billParam = searchParams.get('bill');
            if (!bill._id && billParam) {
                const bill = await axiosMethod(`bill/${billParam}`, 'get');
                if (bill.success) {
                    return setBill(bill.body);
                }
            }
            if (voucher) {
                customer.voucherID = voucher;
                try {
                    const updateQty = await axiosMethod(
                        `voucher/updateState/${voucher}`,
                        'put',
                        {
                            userID : cookies.user.id,
                        },
                        {
                            authorization: `Bearer ${cookies.accessToken}`,
                        }
                    );

                    if (updateQty.success) {
                        localStorage.removeItem('voucher');
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            if (customer) {
                customer.paymentMethod = payment;
            }
            const res = await axiosMethod('bill', 'post', customer);
            if (res.success) {
                setSearchParams({ bill: res.body._id });
                setBill(res.body);
                Toast.fire({
                    title: 'Thanh toán thành công',
                    icon: 'success',
                });
                localStorage.removeItem('customer');
            }
            const cart = await axiosMethod('cart', 'get');
            if (cart.success) {
                setCart(cart.cartQty, cart, cart.cartTotal);
            }
        }
        postBill();
    }, []);
    return <>{Object.keys(bill).length > 0 && <BillComponent bill={bill} />} </>;
}

export default globalStateAndAction(PaymentSuccess);
