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
    const password = req.body.password;
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
    let sid = '';
    // If user has already logged in before
    if(storage.registeredUsers[username]) {
        sid = storage.registeredUsers[username];
    } else {
        //For first time users
        sid = uuidv4()
        storage.registeredUsers[username] = sid;
        //For first time admin login
        if (password && password != null && storage.admin.username === username && storage.admin.password === password) {
            storage.admin.sid = sid;
        }
        //Contact data empty for first time users
        storage.contacts[sid] = [];
    }
    //If admin loggedin before, assign the same sid
    if (password && storage.admin.username === username && storage.admin.password === password && storage.admin.sid) {
      sid = storage.admin.sid;
    }
    res.cookie('sid', sid);
    storage.users[sid] = username;
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

//Logout functionality with error messages and deleting users from storage
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

// Getting contact details based on current user.
// For admin get all contacts added by all users.
app.get('/contactDetails', (req, res) => {
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
    // for admin
    if(sid === storage.admin.sid) {
      let allContacts = [];
      for (contact in storage.contacts) {
          for(info in storage.contacts[contact]) {
            allContacts.push(storage.contacts[contact][info]);
          }
      }
      // Return all data
      res.json({ contacts: allContacts, username: storage.users[sid] });
    } else {
      // Return data corresponds to logged in user for normal user Sign in
      res.json({ contacts: storage.contacts[sid], username: storage.users[sid] });
    }
});

// Add Contact detail with user id
app.post('/contactDetails', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    const contactInfo = req.body.contactInfo;
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

    username = storage.users[sid];

    storage.contacts[sid].push(contactInfo);
    console.log("Particular", storage.contacts[sid]);
    res.json({
        "msg": "Contact added successfully",
    });
});

// Delete contact data
app.delete('/contactDetails/:id', (req, res) => {
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

  const username = storage.users[sid];

  const id = req.params.id;
  if(!storage.contacts[sid]) {
    return;
   }

   for (contact in storage.contacts) {
       for(info in storage.contacts[contact]) {
         if(storage.contacts[contact][info].id == id) {
           storage.contacts[contact].splice( storage.contacts[contact].findIndex(a => a.id === id) , 1);
         }
       }
     }
    res.json({"contacts": storage.contacts[sid]});
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
