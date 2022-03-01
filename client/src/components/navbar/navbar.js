import {
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	DropdownItem,
	NavbarText,
	Navbar,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	Input,
} from "reactstrap";
import Logo from "../../assets/images/hyperX.jpeg";
import { Link } from "react-router-dom";

export default function NavbarApp() {
	return (
		<Navbar expand="md" light className="text-center">
			<Link to="/" className="navbar-brand">
				<img
					src={Logo}
					alt=""
					style={{ width: "3rem", height: "3rem" }}
					className="rounded-circle"
				></img>
			</Link>
			<NavbarToggler onClick={function noRefCheck() {}} />
			<Collapse navbar>
				<Nav className="m-auto" navbar>
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
					<UncontrolledDropdown inNavbar nav>
						<DropdownToggle caret nav>
							Options
						</DropdownToggle>
						<DropdownMenu end>
							<DropdownItem>Option 1</DropdownItem>
							<DropdownItem>Option 2</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>Reset</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
				<NavbarText>
					<Input placeholder="Search"></Input>
				</NavbarText>
			</Collapse>
		</Navbar>
	);
}
