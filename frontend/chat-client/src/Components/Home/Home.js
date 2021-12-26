import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ socket }) {
	const [username, setusername] = useState("");
	const [roomName, setroomName] = useState("");

	const sendMessage = () => {
		if (username !== "" && roomName !== "") {
			socket.emit("joinRoom", { username, roomName });
		} else {
			alert("Please fill Proper details");
			setusername("");
			setroomName("");
		}
	};

	return (
		<div className="homepage">
			<h1>Welcome to ChatApp</h1>
			<input
				placeholder="Input your user name"
				value={username}
				onChange={(e) => setusername(e.target.value)}
			></input>
			<input
				placeholder="Input the room name"
				value={roomName}
				onChange={(e) => setroomName(e.target.value)}
			></input>
			<Link to={`/chat/${roomName}/${username}`}>
				<button onClick={sendMessage}>Join</button>
			</Link>
		</div>
	);
}
