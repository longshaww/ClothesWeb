import { Card, CardImg, CardBody, CardGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchCollections } from "../../actions/collections";
import { pagination } from "../../actions/pagination";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../actions/pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function RenderDependOnCollection(
	collections,
	endpoint,
	filter,
	pag
) {
	const dispatch = useDispatch();
	const page = useSelector((state) => state.pagination.page);
	const handlePagination = (event, value) => {
		dispatch(setPage(value));
	};

	if (!pag && !filter) {
		dispatch(fetchCollections(endpoint));
	}

	if (pag) {
		dispatch(pagination(endpoint, pag));
	}
	if (filter) {
		dispatch(fetchCollections(endpoint, filter));
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
											product: collection,
										}}
										className="stretched-link"
									></Link>
								</CardBody>
							</Card>
						);
					})}
				</div>
			</CardGroup>
			{collections.length ? (
				<div className="d-flex justify-content-center p-3 m-3">
					<Stack spacing={2}>
						<Pagination
							onChange={handlePagination}
							page={page}
							size="large"
							variant="outlined"
							count={7}
							color="secondary"
						/>
					</Stack>
				</div>
			) : (
				<h2>Oops there is no products ~!</h2>
			)}
		</>
	);
}
