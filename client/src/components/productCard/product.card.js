import { Card, CardImg, CardBody, CardGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchCollections } from "../../actions/collections";
import { useDispatch } from "react-redux";

export default function RenderDependOnCollection(collections, endpoint) {
	const dispatch = useDispatch();
	if (endpoint) {
		dispatch(fetchCollections(endpoint));
	}
	return (
		<>
			<CardGroup>
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ">
					{collections.map((collection) => {
						return (
							<Card
								key={collection._id}
								className="col border-0 "
							>
								<CardImg
									alt="Card image cap"
									src={
										collection.description
											.imageList[0]
									}
									width="100%"
								/>
								<CardBody>
									<div className="text-center">
										<p>{`${collection.nameProduct}`}</p>
										<p className="text-muted">
											{`${collection.description.price}.000đ`}
										</p>
									</div>
									<Link
										to={`/product/${collection._id}`}
										state={{
											productName:
												collection.nameProduct,
											productImage:
												collection
													.description
													.imageList[0],
										}}
										className="stretched-link"
									></Link>
								</CardBody>
							</Card>
						);
					})}
				</div>
			</CardGroup>
			{!collections.length && <h2>Oops there is no products ~!</h2>}
		</>
	);
}
