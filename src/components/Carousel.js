import React, { useState, useRef } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function Carousel({ data }) {
	const slideRef = useRef(null);
	const [currentImage, setCurrentImage] = useState(0);
	const [direction, setDirection] = useState(null);
	const length = data.length;

	console.log(slideRef);

	const nextImage = () => {
		setDirection("right");
		setCurrentImage(currentImage === length - 1 ? 0 : (prev) => prev + 1);
	};

	const prevImage = () => {
		setDirection("left");
		setCurrentImage(currentImage === 0 ? length - 1 : (prev) => prev - 1);
	};

	if (!Array.isArray(data) || data.length <= 0) {
		return null;
	}

	return (
		<>
			<div className="carousel">
				<FaArrowAltCircleLeft
					className="arrow-left"
					onClick={prevImage}
				/>
				<FaArrowAltCircleRight
					className="arrow-right"
					onClick={nextImage}
				/>
				{data.map((item, index) => {
					return (
						<div
							ref={index === currentImage ? slideRef : null}
							key={index}
							className={
								index === currentImage
									? "slide active"
									: direction === "left"
									? "slide left"
									: "slide right"
							}
							draggable
							onDrag={(event) => {
								console.log(event.clientX);
								slideRef.current.style.marginLeft = 100;
							}}
						>
							{index === currentImage && (
								<img
									src={item.imageURL}
									alt="image"
									className="carousel-img"
								/>
							)}
						</div>
					);
				})}
			</div>
			<div className="selector-dots">
				{data.map((item, index) => {
					return (
						<div
							key={index}
							className={
								index === currentImage ? "dot selected" : "dot"
							}
							onClick={() => setCurrentImage(index)}
						></div>
					);
				})}
			</div>
		</>
	);
}
export default Carousel;
