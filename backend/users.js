const users = [];

function joinUser(id, username, room) {
	let tempUser = { id, username, room };
	users.push(tempUser);
	return users;
}

function disconnectUser(id) {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

module.exports = {
	users,
	joinUser,
	disconnectUser,
};
