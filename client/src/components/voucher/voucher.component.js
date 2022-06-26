import { formatPrice } from "../../utils/format.price";
import moment from "moment";
import Toast from "../../utils/toast";

export default function VoucherComponent({ voucher }) {
	const onCopyCodeClick = (id) => {
		navigator.clipboard.writeText(id);
		Toast.fire({ title: "Lấy mã thành công", icon: "success" });
	};
	return (
		<div className="d-flex justify-content-center mt-3">
			<div className="p-4 shadow w-75 rounded-3 border">
				<div className="text-center text-danger">
					<h3>Voucher giảm {voucher.discount}%</h3>
				</div>
				<div className="row pt-2">
					<div className="col-6 col-lg-4">
						<div className="fw-bold fs-5">
							Mã {voucher._id}
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
