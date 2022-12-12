import { NavbarToggler, Collapse, Nav, NavItem, Navbar, Container } from 'reactstrap';
import Logo from '../../../assets/images/hyperX.jpeg';
import '../../../assets/styles/customize.navbar.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PostFilterForm from './search';
import { useDispatch } from 'react-redux';
import { setHeightNav } from '../../../actions/layout';
import PopupCart from '../../cart/cart';
import Auth from '../../auth/auth';
import { useCookies } from 'react-cookie';
import { useWindowSize } from '../../../CustomHook/useWindowResize';
import 'boxicons';
export default function NavbarApp() {
    //State define
    const [isOpen, setIsOpen] = useState(false);
    //Navbar toggle
    const toggle = () => setIsOpen(!isOpen);
    const [cookies] = useCookies(['user']);
    //=========START== Calculate nav height -->store redux =======
    const size = useWindowSize();
    const [height, setHeight] = useState(0);
    const ref = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, [size?.width]);
    useEffect(() => {
        height > 0 && dispatch(setHeightNav(height));
    }, [height]);
    //=========END== Calculate nav height -->store redux =======

    return (
        <div ref={ref} className="header-custom">
            <div style={{ backgroundColor: 'white' }} className="m-nav">
                <div className="container-fluid">
                    <Navbar style={{ backgroundColor: 'white' }} light expand="lg">
                        <div className="d-flex justify-content-between">
                            <NavbarToggler onClick={toggle} />
                            <Link className="d-block d-lg-none " to="/">
                                <img id="logo" src={Logo} alt="" className="logo-Img"></img>
                            </Link>
                        </div>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="me-auto align-items-lg-center" navbar>
                                <NavItem className="d-none d-lg-block ">
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
                                    <Link to="/" className="nav-link ">
                                        Địa chỉ cửa hàng
                                        <i className="bx bx-chevron-down"></i>
                                    </Link>
                                    <div className="sub-nav-content">
                                        <NavItem>
                                            <Link to="/" className="sub-nav-link">
                                                155 Sư Vạn Hạnh, P13, Q10
                                            </Link>
                                        </NavItem>
                                    </div>
                                </NavItem>

                                <NavItem className="sub-nav">
                                    <div className="nav-link" style={{ pointer: 'cursor' }}>
                                        Tiện ích
                                        <i className="bx bx-chevron-down"></i>
                                    </div>
                                    <div className="sub-nav-content">
                                        <NavItem>
                                            <Link to="/followOrder" className="sub-nav-link">
                                                Theo Dõi Đơn Hàng
                                            </Link>
                                        </NavItem>
                                    </div>
                                </NavItem>
                                {/* VOUCHER */}
                            </Nav>
                            <Nav navbar style={{ backgroundColor: 'white' }}>
                                <NavItem className="mr-2">
                                    <PostFilterForm />
                                </NavItem>
                                <div className="d-flex mt-lg-0 mt-3 align-items-center">
                                    <NavItem className="mr-2" style={{ listStyle: 'none' }}>
                                        <PopupCart></PopupCart>
                                    </NavItem>
                                    <NavItem style={{ listStyle: 'none' }}>
                                        <Auth />
                                    </NavItem>
                                    {cookies.user && (
                                        <NavItem className="mr-2">
                                            {cookies.user.information?.name}
                                        </NavItem>
                                    )}
                                </div>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            </div>
        </div>
    );
}
