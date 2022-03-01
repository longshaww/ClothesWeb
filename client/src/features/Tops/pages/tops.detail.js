import { useLocation } from "react-router-dom";

export default function TopsDetail() {
	const location = useLocation();
	const { topName, topImage } = location.state;
	return (
		<>
			<h1>Detail</h1>
			<img src={topImage} alt=""></img>
			<div>{topName}</div>
		</>
	);
}
