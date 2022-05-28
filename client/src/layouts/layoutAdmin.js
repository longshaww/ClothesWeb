import NavbarAppAdmin from "../components/navbars/navbarAdmin/navbarAdmin";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navbars/navbarAdmin/sideBarAdmin";
import "../assets/styles/admin/layoutadmin.css"
export default function Layout() {
  return (
    <div>
      <NavbarAppAdmin />
	  <div className="container">
	  		<Sidebar />	  
			 <Outlet/>
	  </div>
    </div>
  );
}
