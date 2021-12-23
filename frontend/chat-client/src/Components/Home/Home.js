import React from "react";
import "./Home.css";

export default function Home() {
	return (
		<div className="home-wrapper">
			<h1 className="home-heading">Chat App</h1>
			<div className="create-join">
				<h2>Welcome to Chat-app</h2>
				<button className="btn">Create Room</button>
				<button className="btn">Join Room</button>
			</div>
		</div>
	);
}
