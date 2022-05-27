import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from "reactstrap";


/* 		<Link
							to="/collections/new-arrivals"
							className="nav-link"
						>
							NEW ARRIVALS
						</Link> */
export default function NavbarAppAdmin() {
	return (
        <>
         <div class="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
            <div>
                <div class="logo-header d-flex justify-content-center">
                    <img src="https://file.hstatic.net/200000321771/file/aaa_52e8e5d6a6f244cfa0d459377098da08.png"
                         alt=""
                         class="logo" />
                    <a href="/Admin/Dashboard/Index" class="logo-title">ZOMBIE® OFFICIAL STORE</a>
                </div>
                <div class="pl-4 pr-4">
                    <ul class="list-unstyled components mb-5">
                        <li class="tq">
                            <a href="/Admin/Dashboard/Index" class="">Tổng quan</a>
                        </li>
                        <li class="sp">
                            <a href="#SanPhamMenu"
                               data-toggle="collapse"
                               aria-expanded="false"
                               class="dropdown-toggle">Sản phẩm</a>
                            <ul class="collapse list-unstyled" id="SanPhamMenu">
                                <li class="allsp">
                                    <a href="/Admin/Products/Index">Tất cả sản phẩm</a>
                                </li>
                                <li class="addsp">
                                    <a href="/Admin/Products/create">Thêm sản phẩm</a>
                                </li>
                            </ul>
                        </li>
                        <li class="d-bill">
                            <a href="/Admin/Bills">Đơn hàng</a>
                        </li>

                       
                        <li class="d-user">
                            <a href="/Admin/Users">Người dùng</a>
                        </li>
                        <li class="d-xs">
                            <a href="/home">Xem cửa hàng</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
    <div class="content-top">
        <div class="header-left">
            <h4 class="hello-user">
                <span> QUẢN LÝ BÁN HÀNG</span>
            </h4>

            <div class="real-time">
                <div id="MyClockDisplay" class="clock" onload="showTime()"></div>
                <div id="today">29/05/2022</div>
            </div>
        </div>
        <div class="header-right">
            <div class="icon-user">
                <img src="https://colorlib.com/polygon/cooladmin/images/icon/avatar-01.jpg"
                     alt="" />
                <div class="icon-user-fullname">@Request.Cookies["fullname"].Value</div>
                <div class="icon-user-dropdown">
                    <span class="box-triangle">
                        <svg viewBox="0 0 20 9" role="presentation">
                            <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                  fill="#ffffff"></path>
                        </svg>
                    </span>
                    <div class="info-user">
                        <img class="avt-user"
                             src="https://colorlib.com/polygon/cooladmin/images/icon/avatar-01.jpg"
                             alt="" />
                        <div class="info-user-login">
                            <div class="info-fullName">@Request.Cookies["fullname"].Value</div>
                            <div class="info-email">@Request.Cookies["email"].Value</div>
                        </div>
                    </div>
                    <div class="user-logout">
                        <a href="/info"><i class="bx bxs-user"></i> Thông tin</a>
                        <a href="/login/signout">
                            <i class="bx bxs-log-out"></i> Đăng xuất
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
         </>
    )
}
