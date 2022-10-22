import { Outlet } from 'react-router-dom';
import SideBarUser from '../features/infoUser/sideBar';

export default function LayoutUser() {
    return (
        <>
            <div className="mainContent-theme ">
                <div className="layout-info-account">
                    <div className="title-infor-account text-center mt-5">
                        <h1>Tài khoản của bạn </h1>
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-2">
                                <SideBarUser />
                            </div>
                            <div className="col">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
