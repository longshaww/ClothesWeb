import NavbarApp from "../components/navbar/navbar";
// import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
	return (
		<div>
			<NavbarApp />
			<div className="container">
				<Outlet />
			</div>
		</div>
	);
}
