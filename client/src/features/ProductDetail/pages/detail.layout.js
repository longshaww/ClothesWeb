import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../assets/styles/collections.nav.css";
export default function DetailLayout() {
	const location = useLocation();
	const { product } = location.state;
	return (
		<div>
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/" className="nav-link">
						Trang chủ
					</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<Link to="/collections" className="nav-link">
						Danh mục
					</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<Link
						to={`/collections/${product.nameProduct}`}
						className="nav-link disabled text-muted"
					>
						{product.nameProduct}
					</Link>
				</BreadcrumbItem>
			</Breadcrumb>
			<Outlet />
		</div>
	);
}
