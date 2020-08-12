const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const storage = require('./storage');
const {
    v4: uuidv4
} = require('uuid');

app.use(express.static('./build'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//For login , setting error messages and sending JSON-formatted data
app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    if ((typeof username === 'undefined') || (username === "") || (username.includes(' '))) {
        res.status(404).json({
            error: 'Not Found: missing-name'
        });
        return;
    }
   if(username.includes('dog')) {
        res.status(403).json({
            error: "Forbidden: Invalid Username"
        });
        return;
    }
    // cookie to store a sid (holding a uuid) to track if a user is logged in
    const sid = uuidv4();
    storage.users[sid] = username;
    res.cookie('sid', sid);
    res.json({ 'username': username});

});

//Checking logged in users status
app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }

    if (!storage.users[sid]) {
        res.clearCookie('sid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }

    res.status(200).json({ username: storage.users[sid] });

});

//Logout functionality with error messages and deleting users from cookies
app.delete('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[sid]) {
        res.clearCookie('sid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    delete storage.users[sid];
    res.status(200).json({ message: 'Logout success!' });
    return;
});

//Get all Active users
app.get('/availableUser', (req, res) => {

    const sid = req.cookies.sid;
    if (!sid || !storage.users[sid]) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[sid]) {
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    availusernames = [];

    Object.values(storage.availableUsers).map(item => availusernames.push({ 'name': storage.users[item.id] }));

    if (availusernames.length == 0) {
        res.status(400).json({
            error: "No user is available for chat"
        });
        return
    }

    res.json(availusernames);
});

//Add users and messages returned by the same call
app.post('/availableUser', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[sid]) {
        res.clearCookie('sid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }

    for (let i = 0; i < storage.availableUsers.length; i++) {
        if (sid === storage.availableUsers[i].id) {
            res.json({});
            return;
        }
    }
     storage.availableUsers.push({ 'id': sid });
    if(!storage.chatMessages.chats) {
      storage.chatMessages = {
          "chats": [
              {
                  'username': "Admin Bot",
                  'message': "Welcome to the chat room. Please type your message",
                  'timestamp': new Date().toLocaleString()
              }
          ]
      };
    }
    res.json({})
});

//Getting chat messages for required sid and setting error messages
app.get('/message', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[sid]) {
        res.clearCookie('sid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    res.json(storage.chatMessages);
});

//Chat message returned in JSON-formatted data and setting required error messages
app.post('/message', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    const msg = req.body.message;
    if (!sid) {
        res.status(401).json({
            error: 'Unauthorized User'
        });
        return;
    }
    if (!storage.users[sid]) {
        res.clearCookie('sid');
        res.status(403).json({
            error: 'User does not exist'
        });
        return;
    }
    if (msg === null || msg.match(/^ *$/)) {
        res.status(400).json({
            error: "Please enter message"
        });
        return
    }

    username = storage.users[sid];

    message = req.body.message;
    const timestamp = new Date().toLocaleString();

    storage.chatMessages.chats.push({
        'username': username,
        'message': message,
        'timestamp': timestamp
    });
    res.json({
        'message': 'Message send sucessfully'
    });
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
