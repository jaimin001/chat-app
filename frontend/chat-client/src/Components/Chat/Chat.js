import React, { useState, useEffect } from "react";
import "./Chat.css";

function Chat({ username, roomname, socket }) {
	const [text, setText] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on("message", (data) => {
			let temp = messages;
			temp.push({
				id: data.id,
				username: data.username,
				text: data.text,
			});
			setMessages([...temp]);
		});
	}, [socket]);

	const sendMessage = () => {
		if (text) {
			socket.emit("chat", text);
			setText("");
		}
	};

	return (
		<div className="chatView">
			<div className="user-name">
				<h1>Name: {username}</h1>
				<h1>Room: {roomname}</h1>
			</div>
			<div className="chat-message">
				{messages.map((i, index) => {
					if (i.username === username) {
						return (
							<div className="message as-sender" key={index}>
								<p>{i.text}</p>
								<span>{i.username}</span>
							</div>
						);
					} else {
						return (
							<div className="message as-receiver" key={index}>
								<p>{i.text} </p>
								<span>{i.username}</span>
							</div>
						);
					}
				})}
			</div>
			<div className="send-message">
				<input
					type="text"
					id="send-message-text"
					placeholder="Message"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							sendMessage();
						}
					}}
				/>
				<button className="send-button" onClick={sendMessage}>
					Send
				</button>
			</div>
		</div>
	);
}

export default Chat;
