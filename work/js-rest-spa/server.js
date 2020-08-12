'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const products = require('./public/data/product.json');
const cookieParser = require('cookie-parser');
const utils = require('./utils');

app.use(cookieParser());


app.use(bodyParser.json());

app.use(express.static('./public'));

//Check if there is sid cookie on client side and then check if users object has that cookie as username
app.get('/cookieCheck', function(req, res) {
  let cookieCheck = req.cookies.sid;
  if(cookieCheck) {
    //if util.users contains the cookie value
    if (Object.values(utils.users).indexOf(cookieCheck) > -1) {
        res.send({msg: "login success!", username: cookieCheck, data: products});
    }
    //if cookie value is not found in utils.user
    else {
      res.send({err: "Cookie doesn't match"});
    }
  }
  //if cookie doesn't exist at all
  else {
    res.send({err: "Cookie not found"});
  }
});

//Login functionality and validation
app.post('/session', function(req, res) {
  const username = req.body.username;
  const dog = username.includes("dog");
  console.log('Cookies: ', req.cookies)

  if (!username ) {
    res.status(400).json({ error: `'Username' property is required`});

  } else if (dog || /\s/.test(username)) {
     res.status(400).json({ error: `Bad Login`});
   }
  else {
    //set sid cookie
    res.cookie('sid', username );
    //update username serverside
    utils.addUser({ username });
    res.send({msg: "login success!", data: products});
  }
});

//Logout functionality
app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {
    const { username } = req.body;
    if ( username ) {
        utils.removeUser({ username });
        res.clearCookie('sid', username);
    }
    res.send({msg: "logout success!"});

});

//Update or delete item
app.post('/items/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    if(req.body.eventType) {
         let quantity = req.body.quantity
         switch(req.body.eventType) {
             case 'updateQuantity':
                 if(products[itemId]) {
                     products[itemId].quantity = quantity;
                     res.json({quantity: products[itemId].quantity});
                 } else {
                    res.json({err: "Can't update quantity of removed product"});
                 }
                 break;
              case 'deleteItem':
                  delete products[itemId];
                  res.json({msg: 'success', products: products});
                  break;
             default:
                 res.json(products[itemId]);
                 break;
         }
    }
    else {
      res.json({error: 'Wrong event triggered'});
    }
});

//Get items
app.get('/items/', (req, res) => {
    res.json(products);
});

//Add item to the list
app.post('/items/', express.json(), (req, res) => {
    const { title,quantity } = req.body;
    if(!title) {
        res.status(400).json({ error: 'missing-name' });
        return;
    }
    if(Object.values(products).title===title) {
        console.log("duplicate");
        res.status(409).json({ error: 'duplicate' });
        return;
    }
    let itemId = products.length;
    products[itemId] = req.body;

    res.json({itemId, product: products[itemId]});
});


app.listen(3000, () => console.log('http://localhost:3000/') );
