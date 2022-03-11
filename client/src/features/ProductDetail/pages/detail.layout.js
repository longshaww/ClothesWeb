import { Outlet, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../assets/styles/collections.nav.css";
export default function DetailLayout() {
	const { id } = useParams();
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
							to={`/collections/${id}`}
							className="nav-link disabled text-muted"
						>
							{id}
						</Link>
					</BreadcrumbItem>
				</div>
			</Breadcrumb>
			<Outlet />
		</div>
	);
}
