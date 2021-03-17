import { hot } from "react-hot-loader/root";
import React, { useState } from "react";

export default hot(App) = () => {
	const [counter, setCounter] = useState(0);

	return (
		<>
			<div>{counter}</div>
			<button onClick={() => setCounter((prev) => prev + 1)}>
				Increment
			</button>
		</>
	);
};
