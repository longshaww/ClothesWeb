import { useLocation } from "react-router-dom";

export default function Detail() {
	const location = useLocation();
	const { productName, productImage } = location.state;
	return (
		<>
			<h1>Detail</h1>
			<img src={productImage} alt=""></img>
			<div>{productName}</div>
		</>
	);
}
