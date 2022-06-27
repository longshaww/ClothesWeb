import { Outlet } from "react-router-dom";
import SideBarUser from "../features/infoUser/sideBar";

export default function LayoutUser() {
	return (
		<>
			<div class="mainContent-theme ">
				<div class="layout-info-account">
					<div class="title-infor-account text-center mt-5">
						<h1>Tài khoản của bạn </h1>
					</div>
					<div class="container mt-5">
						<div class="row">
							<div class="col-2">
								<SideBarUser />
							</div>
							<div class="col">
								<Outlet />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
