import Chart from "../dashboard/chart"
import FeaturedInfo from "../dashboard/featuredInfo";
import "../../../assets/styles/admin/home.css"
import globalStateAndAction from '../../../container/global.state.action';
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useState } from 'react';
function Dashboard({ setDataDashBoard }) {
	const [cookies] = useCookies(["accessToken"]);
	const [lineChartBill,setLineChartBill] = useState([]);
	
	useEffect(() => {
		const getData = async () => {
			const endpoint = `${process.env.REACT_APP_API_URL}admin/dashboard/getDashBoard`
			const { data } = await axios.get(endpoint,
				{
					headers: {
						authorization:
							"Bearer " + cookies.accessToken,
					},
				});
			setDataDashBoard(data.data)
			setLineChartBill(data.data.bills.lineChartBill)
		};
		getData();
	}, [cookies.accessToken,setDataDashBoard]);

	return (
		<div className="home mt-5">
			<FeaturedInfo />
			<Chart data={lineChartBill} title="Money Analytics" grid dataKey="TOTAL" />
		</div>
	);
}
export default globalStateAndAction(Dashboard)
