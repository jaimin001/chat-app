import React, { useState, useEffect } from "react";

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
				<h1>{username}</h1>
				<h2>{roomname}</h2>
			</div>
			<div className="chat-message">
				{messages.map((i) => {
					if (i.username === username) {
						return (
							<div className="message as-sender">
								<p>{i.text}</p>
								<span>{i.username}</span>
							</div>
						);
					} else {
						return (
							<div className="message as-receiver">
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
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
}

export default Chat;
