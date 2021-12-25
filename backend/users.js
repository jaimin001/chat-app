const users = [];

const joinUser = (id, username, room) => {
	let tempUser = { id, username, room };
	users.push(tempUser);
	return users;
};

const disconnectUser = (id) => {
	disconnectUser;
	const index = users.findIndex((user) => user.id === id);
	return users.splice(index, 1)[0];
};

module.exports = {
	users,
	joinUser,
	disconnectUser,
};
