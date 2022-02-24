import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Button,
	CardGroup,
} from "reactstrap";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Tops() {
	const [collections, setCollections] = useState([]);

	async function getCollections() {
		const res = await axios.get("http://localhost:4000/collections");
		const data = await res.data;
		console.log(data);
		setCollections(data);
	}

	useEffect(() => {
		getCollections();
	}, []);

	return (
		<>
			<h1>Tops</h1>
			<CardGroup>
				{collections.map((collection) => {
					return (
						<Card>
							<CardImg
								alt="Card image cap"
								src={collection.image}
								top
								width="100%"
							/>
							<CardBody>
								<CardTitle tag="h5">
									Card title
								</CardTitle>
								<CardSubtitle
									className="mb-2 text-muted"
									tag="h6"
								>
									Card subtitle
								</CardSubtitle>
								<CardText>{`${collection.name} ${collection.type}`}</CardText>
								<Button>Button</Button>
							</CardBody>
						</Card>
					);
				})}
			</CardGroup>
		</>
	);
}
