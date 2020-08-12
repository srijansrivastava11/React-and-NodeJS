(function IIFE() {
  const cartHTML = `<section class="shopping-cart">
                        <div class="title">
                          Inventory Store
                        </div>
                        <div class="logout">
                          <form action="javascript:void(0);" method="POST">
                            <input type="hidden" name="username" id="username"/>
                            <button class="logout" type="submit">Logout</button>
                          </form>
                        </div>
                        <section class="addNew">
                        <input class="to-add-name" name="title" placeholder="Enter Name"/>
                        <input class="to-add-quantity" name="quantity" placeholder="Enter Quantity" value="0"/>
                        <button class="addItem" type="button">Add</button>
                        </section>
                        <div id="inventory-error"></div>
                        <div class="products"></div>
                      </section>`;

  //Render items
  function renderItems() {
    fetch('/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
      })
      .then( response => {
            return response.json();
      }).then( response => {
        console.log(response);
        let products = response;
        const list = document.querySelector('.products');
        //Dynamic HTML in products list
        for(product in products) {
          if(products[product] != null) {
              let listdata = document.createElement('div');
              listdata.innerHTML += `<div class="item" id="${product}">
                <div class="buttons">
                  <b class="delete-btn" value="X" data-id="${product}">X</b>
                </div>

                <div class="description">
                  <span>${products[product].title}</span>
                </div>

                <input type="text" placeholder="Enter Quantity" class="quantity" data-id="${product}" contenteditable="true" name="quantity" value="${products[product].quantity}">
                <button class="update" data-id="${product}">Update</button>`;
                list.appendChild(listdata);
            }
        }
      });
  }

  //Check if valid logged in cookie
  fetch('/cookieCheck', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then( response => {
          return response.json();
    }).then( response => {
        if(response.msg == 'login success!') {
            document.querySelector('.form').style.display = 'none';
            const inventoryHTML = document.querySelector('.inventory');
            inventoryHTML.innerHTML = cartHTML;
            document.getElementById('username').value = response.username;
            renderItems();
        }
    });

  const loginButton = document.querySelector('.submit');
  document.querySelector('.submit').addEventListener('click', () => {
  const username = document.querySelector('.username').value;
  if(!username){
    loginButton.disabled = true;
  } else {
    loginButton.disabled = false;
  }

  //Loader
  const loader = document.createElement('div');
  loader.innerHTML =`<div class="loader">Loading....</div>`;
  loginButton.appendChild(loader);

  //Enable login button on username
  document.querySelector('.username').addEventListener("keyup", event => {
    loginButton.disabled = false;
  });

  //Login validation
  fetch('/session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( { username } ),
    })
    .then( response => {
          return response.json();
    }).then( response => {
      if(response.data) {
          document.querySelector('.form').style.display = 'none';
          document.querySelector('.loader').style.display = 'none';
          const inventoryHTML = document.querySelector('.inventory');
          inventoryHTML.innerHTML = cartHTML;
          document.getElementById('username').value = response.username;
          renderItems();
      } else if(response.error) {
        document.querySelector('.loader').remove();
        const errorHtml = document.getElementById('error');
        errorHtml.innerHTML =`<div class="error">${response.error}</div>`;
      }
      else{
        loginButton.disabled = true;
        document.querySelector('.loader').remove();
        document.querySelector('.shopping-cart').style.display = 'none';
      }
    });
});

//response error function
function responseError(response) {
    if(response.ok) {
        return response.json();
    }
    return response.json()
        .then( err => Promise.reject(err) );
}

//Click event on buttons
document.addEventListener('click', function (event) {

  //delete item
  if(event.target.classList.contains('delete-btn')) {

          let itemId = event.target.dataset.id;

          fetch(`/items/${itemId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify( { 'eventType': 'deleteItem' } ),
            })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( responseError )
            .then( data => {
                console.log(data);
                let productDiv = document.getElementById(itemId);
                productDiv.parentNode.removeChild(productDiv);
            })
            .catch( err => {
                console.log(err.error);
            });
        }

  //add item
  if(event.target.classList.contains('addItem')){

    const toAdd = document.querySelector('.to-add-name');
    const quant = document.querySelector('.to-add-quantity');
         const title = toAdd.value;
         const quantity = quant.value;

        if(title && quantity && quantity >= 0) {

            fetch(`/items/`, {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify( {title,quantity} )
            })
                .catch( () => Promise.reject( { error: 'network-error' }) )
                .then( responseError)
                .then( data => {
                  //Append item div
                  let productDiv = document.querySelector('.products');
                  let listdata = document.createElement('div');
                  listdata.innerHTML += `<div>
                                   <div class="item" id="${data.itemId}">
                                     <div class="buttons">
                                       <b class="delete-btn" value="X" data-id="${data.itemId}">X</b>
                                     </div>

                                     <div class="description">
                                       <span>${data.product.title}</span>
                                     </div>

                                     <input type="text" placeholder="Enter Quantity" class="quantity" data-id="${data.itemId}" contenteditable="true" name="quantity" value="${data.product.quantity}">
                                     <button class="update" data-id="${data.itemId}">Update</button>
                                    </div>
                                  </div>`;
                  console.log(listdata);
                  productDiv.appendChild(listdata);
                  toAdd.value="";
                  quant.value="";

                })
                .catch( err => {
                    console.log(err.error);
                });
        }

  }
  //update item quantity on update click
  if(event.target.classList.contains('update')){
      let itemId = event.target.dataset.id;

      let quantity = parseInt(document.body.querySelector(`.quantity[data-id="${itemId}"]`).value, 10);
      let updateBtn = document.querySelector('.update[data-id="${itemId}"]');
      if(updateBtn) {
        updateBtn.innerHTML = 'Loading...';
      }
      if(quantity > 0) {
        fetch(`/items/${itemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( { quantity, 'eventType': 'updateQuantity' } ),
          })
          .catch( () => Promise.reject( { error: 'network-error' }) )
          .then( responseError )
          .then( data => {
              if(data.quantity) {
                document.body.querySelector(`.quantity[data-id="${itemId}"]`).value = data.quantity;
                updateBtn.innerHTML = 'Update';
              }
              else {
                const errorHtml = document.getElementById('inventory-error');
                errorHtml.innerHTML =`<div class="error">${data.err}</div>`;
              }
          })
          .catch( err => {
              console.log(err.error);
          });
      }
  }

  //Logout functionality
  if(event.target.classList.contains('logout')){
      document.querySelector('.shopping-cart').remove();
      document.querySelector(".form").style.display = "block";
      document.querySelector('.loader').remove();
  }
});


})();
