import { formatPrice } from '../../utils/format.price';
import moment from 'moment';
import Toast from '../../utils/toast';
import { useCookies } from 'react-cookie';
import axiosMethod from '../../middlewares/axios';
export default function VoucherComponent({ voucher, allowCopy }) {
    const [cookies] = useCookies(['user']);

    const onCopyCodeClick = async (id) => {
        if (!cookies.user) {
            return Toast.fire({
                title: 'Bạn phải đăng nhập để lấy voucher',
                icon: 'warning',
            });
        }
        if (allowCopy) {
            navigator.clipboard.writeText(id);
            return Toast.fire({
                title: 'Sao chép mã thành công',
                icon: 'success',
            });
        }
        try {
            const getVoucher = await axiosMethod(
                'voucher/getVoucher',
                'post',
                {
                    code: id,
                },
                { user: cookies.user.id }
            );
            if (getVoucher.success) {
                navigator.clipboard.writeText(id);
                Toast.fire({ title: 'Lấy mã thành công', icon: 'success' });
            }
        } catch (err) {
            Toast.fire({ title: err.response.data.message, icon: 'error' });
        }
    };
    return (
        <>
            {moment().diff(moment(voucher.dateStart), 'days') >= 0 &&
            moment(voucher.dateEnd).diff(moment(), 'days') >= 0 ? (
                <div className="d-flex justify-content-center mt-3">
                    <div className="p-4 shadow w-75 rounded-3 border">
                        <div className="text-center text-danger">
                            <h3>Voucher giảm {voucher.discount}%</h3>
                        </div>
                        <div className="row pt-2">
                            <div className="col-6 col-lg-4">
                                {window.location.pathname.includes('admin') && (
                                    <div className="fw-bold fs-5 text-center">
                                        Số lượng {voucher.qty}
                                    </div>
                                )}

                                <img
                                    src="https://ngaymoi24h.vn/upload/images/AN-09-04/An-05-05/voucher.png"
                                    className="img-fluid rounded"
                                    alt=""
                                />
                            </div>
                            <div className="col px-4 py-2 rounded-3 border">
                                <h4 className="text-center">Thông tin</h4>
                                <div className="fs-5 text-center">
                                    <p>
                                        {`Voucher giảm
											${voucher.discount}% cho đơn
											hàng có giá trị tối thiểu
											${formatPrice(voucher.qualifyAmount)} và
											giảm tối đa
											${formatPrice(voucher.maxDiscount)}`}
                                    </p>
                                </div>
                                <div className="row fs-5">
                                    <div className="col">
                                        <div>Ngày bắt đầu</div>
                                        <div>Ngày kết thúc</div>
                                    </div>
                                    <div className="col text-end">
                                        <div>{moment(voucher.dateStart).format('ll')}</div>
                                        <div>{moment(voucher.dateEnd).format('ll')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                    <div className="fs-2 fw-bold">Voucher đã hết hạn</div>
                </div>
            )}
        </>
    );
}
