const app = require("express")();
const socket = require("socket.io");
const cors = require("cors");
const { users, joinUser } = require("./users");
const port = 8000;

app.use(cors());

var server = app.listen(port);
const io = socket(server);

io.on("connection", (socket) => {
	socket.on("joinRoom", ({ username, roomName }) => {
		const currUser = joinUser(socket.id, username, roomName);
		socket.join(currUser.room);

		socket.emit("message", {
			userId: currUser.id,
			username: currUser.username,
			text: `Welcome ${currUser.username}`,
		});

		socket.broadcast.to(currUser.room).emit("message", {
			userId: currUser.id,
			username: currUser.username,
			text: `${currUser.username} has joined the chat`,
		});
	});

	socket.on("chat", (message) => {
		const sender = users.find((user) => user.id === socket.id);
		io.to(sender.room).emit("message", {
			userId: currUser.id,
			username: currUser.username,
			text: message,
		});
	});
});
