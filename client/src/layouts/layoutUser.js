import { Outlet } from 'react-router-dom';
import SideBarUser from '../features/infoUser/sideBar';
import './index.css';
export default function LayoutUser() {
    return (
        <>
            {/* <div className="mainContent-theme">
                <div className="layout-info-account">
                    <div className="title-infor-account d-flex justify-content-center align-items-center text-center ">
                        <div
                            style={{
                                borderBottom: '1px solid black',
                                width: '120px',
                                fontSize: '15px',
                            }}
                            className="pt-3 pb-2"
                        >
                            Tài khoản của bạn{' '}
                        </div>
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
            </div> */}
            <div className="container-fluid">
                {/* <div className="m-tilte mt-2">
                    <div className="m-title-text">Tài khoản của bạn</div>
                    <div className="m-border-bot"></div>
                </div> */}
                <div className="row mt-5 justify-content-center">
                    <div style={{ minHeight: '500px' }} className="col-2 shadow ">
                        <SideBarUser />
                    </div>

                    <div style={{ minHeight: '500px' }} className="col-9 ml-2 shadow">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
