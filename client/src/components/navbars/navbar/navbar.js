import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from "reactstrap";
import Logo from "../../../assets/images/hyperX.jpeg";
import "../../../assets/styles/customize.navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import PostFilterForm from "./search";
import PopupCart from "../../cart/cart";
import Auth from '../../auth/auth';

export default function NavbarApp() {
	//State define
	const [isOpen, setIsOpen] = useState(false);
	//Navbar toggle
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar expand="md" light>
			
			<Link to="/">
				<div id="center-logo" className="mt-4">
					<img
						id="logo"
						src={Logo}
						alt=""
						className="logo-Img"
					></img>
				</div>
			</Link>
			<NavbarToggler onClick={toggle} />

			<Collapse isOpen={isOpen} navbar>
				<Nav className="m-auto" navbar>
					<NavItem>
						<Link
							to="/collections/new-arrivals"
							className="nav-link"
						>
							NEW ARRIVALS
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/collections/tops" className="nav-link">
							TOPS
						</Link>
					</NavItem>
					<NavItem>
						<Link
							to="/collections/bottoms"
							className="nav-link"
						>
							BOTTOMS
						</Link>
					</NavItem>
					<NavItem>
						<Link
							to="/collections/outerwears"
							className="nav-link"
						>
							OUTERWEARS
						</Link>
					</NavItem>
					<NavItem>
						<Link
							to="/collections/accessories"
							className="nav-link"
						>
							ACCESSORIES
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/collections/sale" className="nav-link">
							SALE
						</Link>
					</NavItem>
					<NavItem>
						<PostFilterForm />
					</NavItem>
					<NavItem>
						<PopupCart></PopupCart>
					</NavItem>
					<NavItem>
						<Auth/>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}
