import "../../../assets/styles/admin/featuredInfo.css";
import globalStateAndAction from "../../../container/global.state.action";
import { useState } from "react";
import { useEffect } from "react";

function FeaturedInfo({ listDashBoard }) {
	const [infoQty, setInfoQty] = useState({
		qtyProduct: 0,
		qtyBill: 0,
		qtyUser: 0,
	});
	useEffect(() => {
		setInfoQty(() => ({
			qtyProduct: listDashBoard.qtyProduct,
			qtyBill: listDashBoard.qtyBill,
			qtyUser: listDashBoard.qtyUser,
		}));
	}, [listDashBoard]);
	return (
		<div className="featured">
			<div className="featuredItem">
				<span className="featuredTitle">TỔNG SẢN PHẨM</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">
						{infoQty.qtyProduct}
					</span>
				</div>
				<span className="featuredSub">SẢN PHẨM</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">TỔNG ĐƠN TRONG THÁNG</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">
						{infoQty.qtyBill}
					</span>
				</div>
				<span className="featuredSub">ĐƠN HÀNG</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">TỔNG KHÁCH HÀNG</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">
						{infoQty.qtyUser}
					</span>
				</div>
				<span className="featuredSub">KHÁCH HÀNG</span>
			</div>
		</div>
	);
}
export default globalStateAndAction(FeaturedInfo);
