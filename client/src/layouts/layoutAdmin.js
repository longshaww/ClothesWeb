import NavbarAppAdmin from '../components/navbars/navbarAdmin/navbarAdmin';
import '../assets/styles/admin/layoutadmin.css';
import Sidebar from '../components/navbars/navbarAdmin/sideBarAdmin';
import { Outlet } from 'react-router-dom';
export default function LayoutAdmin() {
    return (
        <div className="container-fluid p-0">
            <NavbarAppAdmin />
            <div className="responsive">
                <Sidebar />
                <div className="p-5" style={{ width: '88%' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
