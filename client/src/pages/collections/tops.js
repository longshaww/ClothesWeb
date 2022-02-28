import { Card, CardImg, CardBody, CardGroup } from "reactstrap";
import { connect } from "react-redux";
import { fetchTops, setTops, addedTops } from "../../actions/tops";
import { Link } from "react-router-dom";

function Tops({ tops, fetchTops }) {
	fetchTops();

	return (
		<>
			<h1>Tops</h1>
			<CardGroup>
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ">
					{tops.map((top) => {
						return (
							<Card
								key={top._id}
								className="col border-0 "
							>
								<CardImg
									alt="Card image cap"
									src={top.description.imageList[0]}
									width="100%"
								/>
								<CardBody>
									<div className="text-center">
										<p>{`${top.nameProduct}`}</p>
										<p className="text-muted">
											{`${top.description.price}`}
										</p>
									</div>
									<Link
										to={`/collections/tops/${top._id}`}
										state={{
											topName: top.nameProduct,
											topImage:
												top.description
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
			{!tops.length && <h2>Oops there is no products ~!</h2>}
		</>
	);
}
const mapStateToProps = (state) => {
	return {
		tops: state.tops.list,
	};
};

const mapActionToProps = (dispatch) => ({
	setTops: (data) => dispatch(setTops(data)),
	fetchTops: () => dispatch(fetchTops()),
	addedTops: (data) => dispatch(addedTops(data)),
});

export default connect(mapStateToProps, mapActionToProps)(Tops);
