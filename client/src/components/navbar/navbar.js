import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from "reactstrap";
import Logo from "../../assets/images/hyperX.jpeg";
import "../../assets/styles/customize.navbar.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCollections } from "../../actions/collections";
import queryString from "query-string";
import PostFilterForm from "./search";

export default function NavbarApp() {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const dispatch = useDispatch();
	const [filter, setFilter] = useState({ q: "" });
	const collections = useSelector((state) => state.collections.list);
	console.log(collections);

	const unChangeCollection = useRef(collections);
	// const timer = (e) => {
	// 	e.preventDefault();
	// 	unChangeCollection.current = setTimeout(
	// 		() => console.log("unchanged", unChangeCollection),
	// 		2000
	// 	);
	// };
	// useEffect(() => {
	// 	return () => clearTimeout(timer);
	// }, []);

	useEffect(() => {
		const paramsString = queryString.stringify(filter);
		async function fetchData() {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}collections/search/?${paramsString}`
			);
			const data = await res.data;
			dispatch(setCollections(data));
		}
		fetchData();
	}, [filter]);

	function handleFilterChange(newFilter) {
		setFilter({ ...filter, q: newFilter.search });
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
					<NavItem id="searchbar">
						<PostFilterForm onSubmit={handleFilterChange} />
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}
