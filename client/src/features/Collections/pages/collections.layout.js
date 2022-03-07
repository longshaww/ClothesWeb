import { Outlet, useLocation } from "react-router-dom";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { useState } from "react";
// import TopsAddForm from "../../Tops/components/tops.addform";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../assets/styles/collections.nav.css";
export default function CollectionsLayout() {
	// const [modal, setModal] = useState(false);
	// const toggle = () => setModal(!modal);
	const location = useLocation();
	let param = location.pathname.split("/");
	if (param.length > 2) {
		param = param[2].toUpperCase();
	} else {
		param = param[1].toUpperCase();
	}
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
							to={`/collections/${param}`}
							className="nav-link disabled text-muted"
						>
							{param}
						</Link>
					</BreadcrumbItem>
				</div>
			</Breadcrumb>

			<div className="container">
				<div className="border-bottom border-dark mt-4">
					<h1>{param}</h1>
				</div>
				{/* <Button color="dark" onClick={toggle}>
					Add Products
				</Button>
				<Modal centered isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>
						Thêm sản phẩm
					</ModalHeader>
					<ModalBody>
						<TopsAddForm></TopsAddForm>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={toggle}>
							Close
						</Button>
						<Button color="primary" onClick={toggle}>
							Send
						</Button>
					</ModalFooter>
				</Modal> */}

				<Outlet />
			</div>
		</div>
	);
}
