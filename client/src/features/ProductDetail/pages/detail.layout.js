import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../assets/styles/collections.nav.css";
export default function DetailLayout() {
	const location = useLocation();
	const { product } = location.state;
	return (
		<div>
			<Breadcrumb className="bg-light">
				<div className="container">
					<BreadcrumbItem className="d-inline-block">
						<Link to="/" className="nav-link">
							Trang chủ
						</Link>
					</BreadcrumbItem>
					<BreadcrumbItem className="d-inline-block">
						<Link to="/collections" className="nav-link">
							Danh mục
						</Link>
					</BreadcrumbItem>
					<BreadcrumbItem className="d-inline-block">
						<Link
							to={`/collections/${product.nameProduct}`}
							className="nav-link disabled text-muted"
						>
							{product.nameProduct}
						</Link>
					</BreadcrumbItem>
				</div>
			</Breadcrumb>
			<Outlet />
		</div>
	);
}
