import { NavbarToggler, Collapse, Nav, NavItem, Navbar, Container, NavbarBrand } from 'reactstrap';
import Logo from '../../../assets/images/hyperX.jpeg';
import '../../../assets/styles/customize.navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostFilterForm from './search';
import PopupCart from '../../cart/cart';
import Auth from '../../auth/auth';
import { useCookies } from 'react-cookie';
import 'boxicons';
export default function NavbarApp() {
    //State define
    const [isOpen, setIsOpen] = useState(false);
    //Navbar toggle
    const toggle = () => setIsOpen(!isOpen);
    const [cookies] = useCookies(['user']);
    return (
        <div className="header-custom">
            <div className="announcement bg-dark " style={{ height: '30px' }}>
                <Container className="text-center text-white p-1 d-flex justify-content-center">
                    Khuyến mãi 20% nhân ngày 20/10
                </Container>
            </div>
            <div style={{ backgroundColor: 'white' }} className="m-nav">
                <div className="container-fluid">
                    <Navbar style={{ backgroundColor: 'white' }} light expand="lg">
                        <div className="d-lg-none  me-auto mb-2">
                            <Link to="/">
                                <img id="logo" src={Logo} alt="" className="logo-Img"></img>
                            </Link>
                        </div>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="me-auto" navbar>
                                <NavItem className="d-sm-none d-xs-none  d-lg-block d-xl-block">
                                    <Link to="/">
                                        <img id="logo" src={Logo} alt="" className="logo-Img"></img>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/" className="nav-link">
                                        Trang chủ
                                    </Link>
                                </NavItem>
                                {/* DANH MỤC */}
                                <NavItem className="sub-nav">
                                    <Link to="/categories/new-arrivals" className="nav-link ">
                                        Danh mục sản phẩm
                                        <i className="bx bx-chevron-down"></i>
                                    </Link>
                                    <div className="sub-nav-content">
                                        <NavItem>
                                            <Link
                                                to="/categories/new-arrivals"
                                                className="sub-nav-link"
                                            >
                                                Sản phẩm mới︱ NEW ARRIVALS
                                            </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to="/categories/tops" className="sub-nav-link">
                                                Áo︱TOPS
                                            </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to="/categories/bottoms" className="sub-nav-link">
                                                Quần︱ BOTTOMS
                                            </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link
                                                to="/categories/outerwears"
                                                className="sub-nav-link"
                                            >
                                                Áo khoác︱ OUTERWEARS
                                            </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link
                                                to="/categories/accessories"
                                                className="sub-nav-link"
                                            >
                                                Phụ kiện︱ ACCESSORIES
                                            </Link>
                                        </NavItem>
                                    </div>
                                </NavItem>
                                {/* ĐỊA CHỈ */}
                                <NavItem className="sub-nav">
                                    <Link to="/address" className="nav-link ">
                                        Địa chỉ cửa hàng
                                        <i className="bx bx-chevron-down"></i>
                                    </Link>
                                    <div className="sub-nav-content">
                                        <NavItem>
                                            <Link to="/address" className="sub-nav-link">
                                                155 Sư Vạn Hạnh, P13, Q10
                                            </Link>
                                        </NavItem>
                                    </div>
                                </NavItem>
                                {/* VOUCHER */}
                                <NavItem>
                                    <Link to="/collections/sale" className="nav-link">
                                        Mã giảm giá
                                    </Link>
                                </NavItem>
                            </Nav>
                            <Nav navbar style={{ backgroundColor: 'white' }}>
                                <NavItem className="mr-2">
                                    <PostFilterForm />
                                </NavItem>
                                <NavItem className="mr-2" style={{ listStyle: 'none' }}>
                                    <PopupCart></PopupCart>
                                </NavItem>
                                <NavItem style={{ listStyle: 'none' }}>
                                    <Auth />
                                </NavItem>
                                {cookies.user && (
                                    <NavItem className="mr-2">
                                        <div className="fs-5 fw-bold">
                                            {cookies.user.information.name}
                                        </div>
                                    </NavItem>
                                )}
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        </div>
    );
}
