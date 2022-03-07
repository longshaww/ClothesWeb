import { useState, useEffect } from "react";
import "../../assets/styles/go.to.top.css";
import slide_up from "../../assets/images/slide_up.svg";

export default function GoToTop() {
	const [showGoToTop, setShowGoToTop] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 200) {
				setShowGoToTop(true);
			} else {
				setShowGoToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{showGoToTop && (
				<a className="go-to-top" href={"#brand-name"}>
					<img id="slide-up" src={slide_up} alt=""></img>
				</a>
			)}
		</>
	);
}
