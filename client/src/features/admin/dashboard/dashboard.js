import Chart from "../dashboard/chart"
import FeaturedInfo from "../dashboard/featuredInfo";
import { userData } from "../dashboard/dummyData";
import WidgetSm from "../dashboard/widgetSm";
import WidgetLg from "../dashboard/widgetLg";
import "../../../assets/styles/admin/home.css"
function Dashboard() {
	return (
		<div className="home">
		  <FeaturedInfo />
		  <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
		  <div className="homeWidgets">
			<WidgetSm/>
			<WidgetLg/>
		  </div>
		</div>
	  );
}

export default Dashboard;