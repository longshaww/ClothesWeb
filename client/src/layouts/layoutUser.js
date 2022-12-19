import { Outlet } from 'react-router-dom';
import SideBarUser from '../features/infoUser/sideBar';
import './index.css';
export default function LayoutUser() {
    return (
        <>
            <div className="container-fluid px-0">
                <div className="responsive ">
                    <SideBarUser />
                    <div className="p-5" style={{ width: '85%' }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
