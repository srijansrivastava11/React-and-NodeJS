const users = {};

function addUser({ username }) {
    users[username] = username;
}

function removeUser({ username }) {
    delete users[username];
}

const userData = {
    users,
    addUser,
    removeUser
};

module.exports = userData;
