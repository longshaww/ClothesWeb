import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from 'reactstrap';
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
        <Navbar expand="md" light>
            <Link to="/">
                <div id="center-logo" className="mt-4">
                    <img id="logo" src={Logo} alt="" className="logo-Img"></img>
                </div>
            </Link>
            <NavbarToggler onClick={toggle} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className="m-auto" navbar>
                    <NavItem>
                        <Link to="/" className="nav-link">
                            TRANG CHỦ
                        </Link>
                    </NavItem>
                    <NavItem className="sub-nav">
                        <Link to="/categories/new-arrivals" className="nav-link ">
                            DANH MỤC SẢN PHẨM
                            <i class="bx bx-chevron-down"></i>
                        </Link>
                        <div className="sub-nav-content">
                            <NavItem>
                                <Link to="/categories/new-arrivals" className="sub-nav-link">
                                    NEW ARRIVALS
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/categories/tops" className="sub-nav-link">
                                    TOPS
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/categories/bottoms" className="sub-nav-link">
                                    BOTTOMS
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/categories/outerwears" className="sub-nav-link">
                                    OUTERWEARS
                                </Link>
                            </NavItem>
                        </div>
                    </NavItem>
                    <NavItem>
                        <Link to="/categories/accessories" className="nav-link">
                            ACCESSORIES
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/categories/sale" className="nav-link">
                            VOUCHER
                        </Link>
                    </NavItem>
                    <NavItem className="mx-2">
                        <PostFilterForm />
                    </NavItem>
                    <NavItem className="px-2 ms-1">
                        <PopupCart></PopupCart>
                    </NavItem>
                    <NavItem className="px-1">
                        <Auth />
                    </NavItem>
                    {cookies.user && (
                        <NavItem>
                            <div className="fs-5 fw-bold">{cookies.user.information.name}</div>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
}
