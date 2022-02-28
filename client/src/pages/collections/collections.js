import { Outlet } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import TopsAddForm from "../../features/components/tops/tops.addform";

export default function Collections() {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);
	return (
		<div>
			<h2>Collections</h2>

			<div>
				<Button color="dark" onClick={toggle}>
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
				</Modal>
			</div>
			<Outlet />
		</div>
	);
}
