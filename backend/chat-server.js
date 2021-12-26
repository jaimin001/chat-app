const app = require("express")();
const socket = require("socket.io");
const cors = require("cors");
const { users, joinUser, disconnectUser } = require("./users");
const port = 8000;

app.use(cors());

var server = app.listen(port);
const io = socket(server);

function get_Current_User(id) {
	return;
}

io.on("connection", (socket) => {
	socket.on("joinRoom", ({ username, roomName }) => {
		joinUser(socket.id, username, roomName);
		const currUser = users[users.length - 1];
		socket.join(currUser.room);
		socket.emit("message", {
			id: currUser.id,
			username: currUser.username,
			text: `Welcome ${currUser.username}`,
		});

		socket.broadcast.to(currUser.room).emit("message", {
			id: currUser.id,
			username: currUser.username,
			text: `${currUser.username} has joined the chat`,
		});
	});

	socket.on("chat", (message) => {
		const sender = users.find((user) => user.id === socket.id);
		io.to(sender.room).emit("message", {
			id: sender.id,
			username: sender.username,
			text: message,
		});
	});

	socket.on("disconnect", () => {
		const delUser = disconnectUser(socket.id);
		if (delUser) {
			io.to(delUser.room).emit("message", {
				id: delUser.id,
				username: delUser.username,
				text: `${delUser.username} has left the room`,
			});
		}
	});
});
