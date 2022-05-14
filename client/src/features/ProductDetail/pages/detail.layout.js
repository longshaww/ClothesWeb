import { Outlet, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../assets/styles/collections.nav.css";
import { useEffect } from 'react';
import { useState } from 'react';
import axiosMethod from "../../../middlewares/axios";
export default function DetailLayout() {
	const { id } = useParams();
	const [productDetail, setProductDetail] = useState();
	useEffect(() => {
		async function fetchProductDetail() {
			const data = await axiosMethod(`product/${id}`, "get");
			setProductDetail(data.nameProduct);
			return data;
		}
		fetchProductDetail();
	}, [id]);


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
						{productDetail}
						</Link>
					</BreadcrumbItem>
				</div>
			</Breadcrumb>
			<Outlet />
		</div>
	);
}
