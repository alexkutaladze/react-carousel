import React from "react";

const Arrow = ({ direction, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={direction === "right" ? "arrow-right" : "arrow-left"}
			style={{
				width: 50,
				height: 50,
				borderRadius: 25,
				background: "#000",
			}}
		>
			<div style={direction === "right" ? styles.right : styles.left} />
		</div>
	);
};

export default Arrow;

const styles = {
	right: {
		width: 0,
		height: 0,
		borderTop: "15px solid transparent",
		borderBottom: "15px solid transparent",
		borderLeft: "15px solid white",
		marginLeft: "15%",
	},
	left: {
		width: 0,
		height: 0,
		borderTop: "15px solid transparent",
		borderBottom: "15px solid transparent",
		borderRight: "15px solid white",
		marginRight: "15%",
	},
};
