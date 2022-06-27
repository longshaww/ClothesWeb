import { formatPrice } from "../../utils/format.price";
import moment from "moment";
import Toast from "../../utils/toast";
import axios from "axios";
import { useCookies } from "react-cookie";
export default function VoucherComponent({ voucher }) {
	const [cookies] = useCookies(["user"]);
	const onCopyCodeClick = async (id) => {
		if (!cookies.user) {
			return Toast.fire({
				title: "Bạn phải đăng nhập để lấy voucher",
				icon: "warning",
			});
		}
		try {
			const getVoucher = await axios({
				url: `${process.env.REACT_APP_API_URL}voucher/getVoucher`,
				method: "post",
				headers: {
					user: cookies.user.id,
				},
				data: {
					code: id,
				},
			});
			if (getVoucher.data.success) {
				navigator.clipboard.writeText(id);
				Toast.fire({ title: "Lấy mã thành công", icon: "success" });
			}
		} catch (err) {
			Toast.fire({ title: err.response.data.message, icon: "error" });
		}
	};
	return (
		<div className="d-flex justify-content-center mt-3">
			<div className="p-4 shadow w-75 rounded-3 border">
				<div className="text-center text-danger">
					<h3>Voucher giảm {voucher.discount}%</h3>
				</div>
				<div className="row pt-2">
					<div className="col-6 col-lg-4">
						<div className="fw-bold fs-5 text-center">
							Số lượng {voucher.qty}
						</div>
						<img
							src="https://ngaymoi24h.vn/upload/images/AN-09-04/An-05-05/voucher.png"
							className="img-fluid rounded"
						/>
					</div>
					<div className="col px-4 py-2 rounded-3 border">
						<h4 className="text-center">Thông tin</h4>
						<div className="fs-5 text-center">
							<p>
								{`Voucher giảm
											${formatPrice(voucher.discount)} cho đơn
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
								<div>
									{moment(voucher.dateStart).format(
										"ll"
									)}
								</div>
								<div>
									{moment(voucher.dateEnd).format(
										"ll"
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center mt-3">
					<button
						className="btn btn-dark"
						onClick={() => onCopyCodeClick(voucher._id)}
					>
						Lấy mã
					</button>
				</div>
			</div>
		</div>
	);
}
