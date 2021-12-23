const users = [];

const joinUser = (id, username, room) => {
	let tempUser = { id, username, room };
	users.push(tempUser);
	return users;
};
