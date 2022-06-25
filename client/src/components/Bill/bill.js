import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../../assets/styles/bill.css";
import { formatPrice } from "../../utils/format.price";

const BillComponent = ({ bill }) => {
	return (
		<div className="col-md-12">
			<div className="row d-flex justify-content-center py-3 my-3">
				<div className="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3 mb-0">
					<div className="row p-3">
						<div className="col-xs-6 col-sm-6 col-md-6">
							<div className="receipt-left">
								<img
									className="img-fluid rounded-circle"
									style={{
										width: "80px",
										height: "80px",
									}}
									alt="iamgurdeeposahan"
									src="https://www.kindpng.com/picc/m/650-6505340_html5-icon-traveloka-hd-png-download.png"
								/>
							</div>
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 text-right">
							<div className="receipt-right">
								<h5>HighClub</h5>
								<p>
									0966615566
									<i className="fa fa-phone"></i>
								</p>
								<p>
									support@highclub.vn
									<i className="fa fa-envelope-o"></i>
								</p>
								<p>
									04 Phạm Ngũ Lão, Phường Nguyễn Thái
									Bình, Quận 1, Thành phố Hồ Chí Minh
									<i className="fa fa-location-arrow"></i>
								</p>
							</div>
						</div>
					</div>

					<div className="row p-3">
						<div className="col-xs-6 col-sm-6 col-md-6 text-left">
							{bill.userID ? (
								<div className="receipt-right">
									<h5>
										{bill.userID.information.name}
									</h5>
									<p>
										<b>Mobile :</b>
										{
											bill.userID.information
												.phoneNumber
										}
									</p>
									<p>
										<b>Email :</b>
										{bill.userID.email}
									</p>
								</div>
							) : (
								<div className="receipt-right">
									{bill.deliveryID && (
										<>
											<h5>
												{
													bill.deliveryID
														.nameCustomer
												}
											</h5>
											<p>
												<b>Mobile :</b>
												{
													bill.deliveryID
														.phoneNumber
												}
											</p>
											{bill.deliveryID
												.email && (
												<p>
													<b>Email :</b>
													{
														bill
															.deliveryID
															.email
													}
												</p>
											)}
										</>
									)}
								</div>
							)}
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6">
							<div className="receipt-left">
								<h3>INVOICE #ID bill</h3>
							</div>
						</div>
					</div>

					<div className="table-responsive">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>Products</th>
									<th>Quantiy</th>
									<th>Size</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
								{bill.listProduct.length &&
									bill.listProduct.map((el) => (
										<tr>
											<td>
												<div className="row">
													<div className="col-md-auto">
														<img
															src={
																el
																	._id
																	.description
																	.imageList[0]
															}
															className="img-fluid rounded-circle border border-dark"
															style={{
																width: "50px",
																height: "50px",
															}}
															alt=""
														/>
													</div>
													<div className="ms-2 col">
														{
															el
																._id
																.nameProduct
														}
													</div>
												</div>
											</td>
											<td>{el.qty}</td>
											<td>{el.size}</td>
											<td>
												{formatPrice(
													el.sum
												)}
											</td>
										</tr>
									))}

								<tr>
									<td
										colSpan={3}
										className="text-end"
									>
										<div>Status</div>
									</td>
									<td>
										<div>
											{bill.status ? (
												<CheckCircleOutlineIcon
													className="text-success"
													size={25}
												/>
											) : (
												<HighlightOffIcon
													className="text-danger"
													size={25}
												/>
											)}
										</div>
									</td>
								</tr>

								<tr>
									<td
										colSpan={3}
										className="text-end"
									>
										<div>Shipping</div>
									</td>
									<td>
										<div>
											{formatPrice(
												bill.shippingFee
											)}
										</div>
									</td>
								</tr>

								{bill.voucherID && (
									<tr>
										<td
											colSpan={3}
											className="text-end"
										>
											<div>Discount</div>
										</td>
										<td>
											<div>
												{
													bill.voucherID
														.discount
												}
												%
											</div>
										</td>
									</tr>
								)}
								<tr>
									<td
										colSpan={3}
										className="text-end"
									>
										<div>Sub total</div>
									</td>
									<td>
										<div>
											{formatPrice(
												bill.subTotal
											)}
										</div>
									</td>
								</tr>
								<tr>
									<td
										colSpan={3}
										className="text-end"
									>
										<div>Total</div>
									</td>
									<td>
										<div>
											{formatPrice(bill.total)}
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="row">
						<div className="receipt-header receipt-header-mid receipt-footer">
							<div className="col-xs-8 col-sm-8 col-md-8 text-left">
								<div className="receipt-right">
									<p>
										<b>Date :</b>
										Ngay
									</p>
									<h5
										style={{
											color: " rgb(140, 140, 140)",
										}}
									>
										Thanks you for choosen our
										service !
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BillComponent;
