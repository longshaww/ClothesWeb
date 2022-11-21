import NavbarAppAdmin from '../components/navbars/navbarAdmin/navbarAdmin';

import '../assets/styles/admin/layoutadmin.css';
import Sidebar from '../components/navbars/navbarAdmin/sideBarAdmin';
import { Outlet } from 'react-router-dom';
export default function LayoutAdmin() {
    return (
        <div className="container">
            <NavbarAppAdmin />
            <div className="respon">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}
