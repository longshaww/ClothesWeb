import { useState, useEffect } from "react";
import axiosMethod from "../../middlewares/axios";
import VoucherComponent from "../voucher/voucher.component";
import { useCookies } from "react-cookie";
import BillComponent from "./bill.component";
import  axios  from 'axios';
import { Link } from 'react-router-dom';
export default function BillMe() {
	const [listBill, setListBill] = useState(null);
	const [cookies] = useCookies(["user,accessToken"]);
	useEffect(() => {
		async function getListBillMe() {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_URL}user/getBillUser/${cookies.user.id}`,
				{
					headers: {
						authorization:
							"Bearer " + cookies.accessToken,
					},
				}
			);			
			if (data.success) {
				setListBill(data.listBill);
			}
		}
		getListBillMe();
	}, []);
	return (
		<>
			{listBill!== null?
				listBill.map((el) => {
					return <BillComponent bill={el} />;
				}):
				<div className="text-center p-5 shadow rounded-3">
					<h3 className="text-danger">Bạn Chưa Có Đơn Hàng Nào</h3>
					<Link
						to="/collections/new-arrivals?page=1"
						className="fs-5 text-primary"
					>
						Sắm Đồ Thôi Nào ?
					</Link>
				</div>}
		</>
	);
}
