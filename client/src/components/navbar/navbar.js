import {
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	DropdownItem,
	NavbarText,
	Navbar,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap";

import { Link } from "react-router-dom";

export default function NavbarApp() {
	return (
		<div>
			<Navbar color="light" expand="md" light>
				<NavbarBrand>
					<Link to="/">LOGO</Link>
				</NavbarBrand>
				<NavbarToggler onClick={function noRefCheck() {}} />
				<Collapse navbar>
					<Nav className="me-auto" navbar>
						<NavItem>
							<NavLink>
								<Link to="/collections/tops">TOPS</Link>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink>
								<Link to="/collections/bottoms">
									BOTTOMS
								</Link>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink>
								<Link to="/collections/outerwears">
									OUTERWEARS
								</Link>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink>
								<Link to="/collections/accessories">
									ACCESSORIES
								</Link>
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink>
								<Link to="/collections/sale">SALE</Link>
							</NavLink>
						</NavItem>
						<UncontrolledDropdown inNavbar nav>
							<DropdownToggle caret nav>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Option 1</DropdownItem>
								<DropdownItem>Option 2</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
					<NavbarText>Simple Text</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
}
