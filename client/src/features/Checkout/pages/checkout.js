import globalStateAndAction from '../../../container/global.state.action';
import { Link, Outlet } from 'react-router-dom';
import '../../../assets/styles/checkout.css';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Toast from '../../../utils/toast';
import axiosMethod from '../../../middlewares/axios';
import { useNavigate } from 'react-router-dom';
import { returnPercentSale, returnMoneySale } from '../../../utils/returnHTML';

function Checkout({ cart, setTotal }) {
    const navigate = useNavigate();
    const cartStore = cart.cartStore;
    const cartTotalPrice = cart.cartTotalPrice;
    const total = cart.total;
    const customer = localStorage.getItem('customer');
    const [cookies] = useCookies(['user']);
    const [voucher, setVoucher] = useState({
        voucherList: [],
        voucherInput: '',
        voucherState: false,
    });
    const shippingFee = 35;
    useEffect(() => {
        const userCookie = cookies?.user?.id;
        if (!userCookie) {
            return;
        }
        async function myVoucher() {
            const myVouchers = await axiosMethod(
                `voucher/myVoucher/${cookies?.user?.id}`,
                'get',
                null,
                {
                    authorization: `Bearer ${cookies.accessToken}`,
                }
            );

            if (myVouchers.success) {
                Toast.fire({
                    title: `Bạn đang sở hữu ${myVouchers?.body?.length} voucher`,
                    icon: 'success',
                });
                return setVoucher({ ...voucher, voucherList: myVouchers.body });
            }
        }
        return myVoucher();
    }, []);
    useEffect(() => {
        if (cartTotalPrice && cartTotalPrice === 0) {
            navigate('/');
            return Toast.fire({
                title: 'Bạn chưa có sản phẩm nào trong giỏ hàng',
                icon: 'error',
            });
        }
        setTotal(cartTotalPrice + shippingFee);
    }, [cartTotalPrice]);

    const handleSubmitVoucher = async () => {
        if (voucher.voucherState) {
            return Toast.fire({
                title: 'Bạn đã áp mã rồi',
                icon: 'error',
            });
        }
        if (!voucher.voucherInput) {
            return Toast.fire({
                title: 'Bạn chưa chọn voucher',
                icon: 'error',
            });
        }
        if (!cookies.user) {
            return Toast.fire({
                title: 'Bạn phải đăng nhập để áp dụng voucher',
                icon: 'warning',
            });
        }
        try {
            const applyVoucher = await axiosMethod(
                'voucher/apply',
                'post',
                {
                    amount: cartTotalPrice,
                    code: voucher.voucherInput,
                },

                {
                    authorization: `Bearer ${cookies.accessToken}`,
                }
            );
            if (applyVoucher.success) {
                Toast.fire({
                    title: 'Áp dụng voucher thành công',
                    icon: 'success',
                });
            }
            if (customer) {
                localStorage.setItem(
                    'customer',
                    JSON.stringify({
                        ...JSON.parse(customer),
                        total: total - applyVoucher.body.discount,
                    })
                );
            }
            localStorage.setItem('voucher', voucher.voucherInput);
            setVoucher({
                ...voucher,
                voucherState: !voucher.voucherState,
            });
            setTotal(total - applyVoucher.body.discount);
        } catch (err) {
            return Toast.fire({
                title: err.response.data.message,
                icon: 'error',
            });
        }
    };

    return (
        <div className="container pe-5 my-5">
            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
                <div className="col col-left pe-5 pt-5">
                    <Outlet />
                </div>
                <div className="col col-right ps-5 pt-5 rounded shadow">
                    <table className="table">
                        <tbody>
                            {cartStore.cart && cartStore.cart.length > 0 ? (
                                cartStore.cart.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="cart-product-img">
                                                <img src={item.img} alt="" className="border"></img>
                                            </td>
                                            <td className="cart-product-content">
                                                <p className="cart-name-size">
                                                    <Link
                                                        to={`/product/${item._id._id}`}
                                                        className="d-block"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <span>{item.size}</span>
                                                </p>
                                                <div className="d-flex justify-content-between cart-price-qty">
                                                    <span className="cart-qty">{item.qty}</span>
                                                    <div className="fw-bold">{`${item.total.toLocaleString()},000đ`}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td className="text-center">Không có sản phẩm</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="row py-3 border-bottom">
                        <div className="col d-flex justify-content-center">
                            <select
                                className="form-control voucher-input"
                                value={voucher.voucherInput}
                                onChange={(e) =>
                                    setVoucher({
                                        ...voucher,
                                        voucherInput: e.target.value,
                                    })
                                }
                            >
                                <option value="">Chọn voucher</option>
                                {voucher.voucherList.length > 0 &&
                                    voucher.voucherList.map(({ _id, discount }) => {
                                        return <option value={_id}>Giảm {discount}%</option>;
                                    })}
                            </select>
                        </div>
                        <div className="col-3">
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={handleSubmitVoucher}
                            >
                                Sử dụng
                            </button>
                        </div>
                    </div>

                    {cookies.user && (
                        <>
                            <div className="row py-3 border-bottom">
                                <div className="col d-flex justify-content-start">
                                    <p className="ml-2">Khách hàng thân thiết</p>
                                </div>
                                <div className="col-5">{cookies.user.information.name}</div>
                            </div>
                        </>
                    )}
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>Tạm tính</td>
                                <td>
                                    {cartTotalPrice.toLocaleString()}
                                    ,000đ
                                </td>
                            </tr>
                            {cookies.user && (
                                <>
                                    <tr>
                                        <td>Giảm phần trăm theo mức thành viên</td>
                                        <td>{returnPercentSale(cookies?.user?.vip)}%</td>
                                    </tr>
                                </>
                            )}

                            <tr className="border-bottom">
                                <td>Phí vận chuyển</td>
                                <td>{shippingFee.toLocaleString()},000đ</td>
                            </tr>
                            <tr>
                                <td>Tổng cộng</td>
                                <td>
                                    {cookies.user
                                        ? returnMoneySale(
                                              total,
                                              cookies?.user?.vip
                                          ).toLocaleString()
                                        : total.toLocaleString()}
                                    ,000đ
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default globalStateAndAction(Checkout);
