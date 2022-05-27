import NavbarAppAdmin from "../components/navbars/navbarAdmin/navbarAdmin";
// import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div>
			<NavbarAppAdmin />
			<Outlet />
		</div>
	);
}
