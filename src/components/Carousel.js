import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function Carousel({ data }) {
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			window.addEventListener("resize", handleResize);
		};
	});
	const slideRef = useRef(null);
	const [currentImage, setCurrentImage] = useState(0);
	const length = data.length;

	const [mouseDown, setMouseDown] = useState(false);
	const [startX, setStartX] = useState(null);

	const handleInteractionStart = (e) => {
		setMouseDown(true);
		if (e.type === "mousedown")
			setStartX(e.pageX - slideRef.current.offsetLeft);
		else if (e.type === "touchstart")
			setStartX(
				e.nativeEvent.touches[0].pageX - slideRef.current.offsetLeft
			);
	};

	const handleMouseLeave = (e) => {
		setMouseDown(false);
	};

	const handleInteractionEnd = (e) => {
		setMouseDown(false);
		const event = e.type === "touchend" ? e.changedTouches[0] : e;
		if (startX === event.pageX - slideRef.current.offsetLeft) return;
		if (
			event.pageX - slideRef.current.offsetLeft <
			slideRef.current.offsetWidth / 4
		) {
			slideRef.current.style.transitionDuration = "0.2s";
			slideRef.current.style.transitionTimingFucntion = "ease-in-out";
			slideRef.current.style.transform = `translateX(${
				slideRef.current.offsetWidth * (currentImage + 1)
			}px)`;
			setCurrentImage((prev) =>
				currentImage === data.length - 1 ? 0 : prev + 1
			);
		} else if (
			event.pageX - slideRef.current.offsetLeft >
			(slideRef.current.offsetWidth * 3) / 4
		) {
			slideRef.current.style.transitionDuration = "0.2s";
			slideRef.current.style.transitionTimingFucntion = "ease-in-out";
			slideRef.current.style.transform = `translateX(-${
				slideRef.current.offsetWidth * (currentImage - 1)
			}px)`;
			setCurrentImage((prev) =>
				currentImage === 0 ? data.length - 1 : prev - 1
			);
		} else {
			slideRef.current.style.transitionDuration = "0.2s";
			slideRef.current.style.transitionTimingFucntion = "ease-in-out";
			slideRef.current.style.transform = `translateX(-${
				slideRef.current.offsetWidth * currentImage
			}px)`;
		}
	};

	const handleInteraction = (e) => {
		if (!mouseDown) return;
		const event = e.type === "mousemove" ? e : e.nativeEvent.touches[0];
		slideRef.current.style.transitionDuration = "0.0s";
		slideRef.current.style.transitionTimingFucntion = "ease-in-out";
		slideRef.current.style.transform = `translateX(-${
			slideRef.current.offsetWidth * currentImage -
			(event.pageX - slideRef.current.offsetLeft - startX)
		}px)`;
	};

	const nextImage = () => {
		setCurrentImage(currentImage === length - 1 ? 0 : (prev) => prev + 1);
	};

	const prevImage = () => {
		setCurrentImage(currentImage === 0 ? length - 1 : (prev) => prev - 1);
	};

	useLayoutEffect(() => {
		slideRef.current.style.transitionDuration = "0.7s";
		slideRef.current.style.transitionTimingFucntion = "ease-in-out";
		slideRef.current.style.transform = `translateX(-${
			slideRef.current.offsetWidth * currentImage
		}px)`;
	}, [currentImage, dimensions]);

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

				<div className="slider-container">
					<div
						ref={slideRef}
						className="img-container"
						onMouseDown={handleInteractionStart}
						onMouseMove={handleInteraction}
						onMouseLeave={handleMouseLeave}
						onMouseUp={handleInteractionEnd}
						onTouchStart={handleInteractionStart}
						onTouchMove={handleInteraction}
						onTouchEnd={handleInteractionEnd}
					>
						{data.map((item, index) => {
							return (
								<div key={index} className="data-container">
									<img
										key={index}
										className="slide"
										src={item.imageURL}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="selector-dots">
				{data.map((_, index) => {
					return (
						<div
							key={index}
							className={
								index === currentImage ? "dot selected" : "dot"
							}
							onClick={() => setCurrentImage(index)}
						/>
					);
				})}
			</div>
		</>
	);
}
export default Carousel;
