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
import React, { useEffect } from "react";

export default function Tops({ tops, fetchTops }) {
	// const [collections, setCollections] = useState([]);

	// async function getCollections() {
	// 	const res = await axios.get("http://localhost:4000/collections");
	// 	const data = await res.data;
	// 	console.log(data);
	// 	setCollections(data);
	// }

	console.log(tops);
	useEffect(() => {
		fetchTops();
	}, [fetchTops]);

	return (
		<>
			<h1>Tops</h1>
			<CardGroup>
				{tops.map((top) => {
					return (
						<Card>
							<CardImg
								alt="Card image cap"
								src={top.image}
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
								<CardText>{`${top.name} ${top.type}`}</CardText>
								<Button>Button</Button>
							</CardBody>
						</Card>
					);
				})}
			</CardGroup>
			{!tops.length && <h2>Oops there is no products ~!</h2>}
		</>
	);
}
