import Chart from "../dashboard/chart"
import FeaturedInfo from "../dashboard/featuredInfo";
import { userData } from "../dashboard/dummyData";
import WidgetSm from "../dashboard/widgetSm";
import WidgetLg from "../dashboard/widgetLg";
import "../../../assets/styles/admin/home.css"
import globalStateAndAction from '../../../container/global.state.action';
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useState } from 'react';
function Dashboard({ listDashBoard, setDataDashBoard }) {
	const [cookies] = useCookies(["accessToken"]);
	const [lineChartBill,setLineChartBill] = useState([]);
	const getData = async () => {

		const { data } = await axios.get(`http://localhost:4000/admin/dashboard/getDashBoard`,
			{
				headers: {
					authorization:
						"Bearer " + cookies.accessToken,
				},
			});
		setDataDashBoard(data.data)
		setLineChartBill(data.data.bills.lineChartBill)
	};
	useEffect(() => {
		getData();
	}, [listDashBoard]);

	return (
		<div className="home">
			<FeaturedInfo />
			<Chart data={lineChartBill} title="Money Analytics" grid dataKey="TOTAL" />
			<div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
}
export default globalStateAndAction(Dashboard)
