import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ socket }) {
	const [username, setusername] = useState("");
	const [roomname, setroomname] = useState("");

	const sendMessage = () => {
		if (username !== "" && roomname !== "") {
			console.log({ username, roomname });
			socket.emit("joinRoom", { username, roomname });
		} else {
			alert("Please fill Proper details");
			setusername("");
			setroomname("");
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
				value={roomname}
				onChange={(e) => setroomname(e.target.value)}
			></input>
			<Link to={`/chat/${roomname}/${username}`}>
				<button onClick={sendMessage}>Join</button>
			</Link>
		</div>
	);
}
