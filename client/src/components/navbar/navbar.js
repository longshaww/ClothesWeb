import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from "reactstrap";
import Logo from "../../assets/images/hyperX.jpeg";
import "../../assets/styles/customize.navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import globalStateAndAction from "../../container/global.state.action";
import { useDispatch } from "react-redux";
import { setSearchInput } from "../../actions/collections";
import PostFilterForm from "./search";
function NavbarApp() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const dispatch = useDispatch();

	function handleFilterChange(newFilter) {
		dispatch(setSearchInput(newFilter.search));
	}

	return (
		<Navbar expand="md" light>
			<Link to="/">
				<div id="center-logo">
					<img
						id="logo"
						src={Logo}
						alt=""
						className="rounded-circle"
					></img>
					<p id="brand-name" className="text-dark fs-3 fw-bold">
						HyperX™
					</p>
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
						<PostFilterForm onSubmit={handleFilterChange} />
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}

export default globalStateAndAction(NavbarApp);
