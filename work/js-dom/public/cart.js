(function IIFE() {

  const addButton = document.querySelector('.addItem');
  const newTaskEl = document.querySelector('.to-add');
  const list = document.querySelector('.products');

  //Dynamic HTML in products list
  var listdata = ``;
  for(product in products) {
    var listdata = document.createElement('div');
    listdata.innerHTML += `<div class="item" id="${product}">
      <div class="buttons">
        <b class="delete-btn" value="X">X</b>
      </div>

      <div class="description">
        <span>${products[product].title}</span>
      </div>

      <div class="quantity">
        <button class="minus-btn" type="button" name="button">
          <b>-</b>
        </button>
        <span class="productQuantity">${products[product].quantity}</span>
        <button class="plus-btn" type="button" name="button">
          <b>+</b>
        </button>
      </div>`;
      list.appendChild(listdata);
  }
  
  //Click event on buttons
  list.addEventListener('click', function (event) {

    //remove item from list
    if(event.target.classList.contains('delete-btn')) {
      if (event.target.closest('.item')) {
        let id = event.target.closest('.item').id;
        event.target.closest('.item').parentNode.remove(event.target.parentNode);
        products.splice(id, 1);
        console.log(products);
     }
    }

    //quantity increment
    if(event.target.classList.contains('plus-btn')) {

      let id = event.target.closest('.item').id;

      let item = document.getElementById(id);
      let quantity = parseInt(item.querySelector('.productQuantity').innerHTML, 10) + 1;
      item.querySelector('.productQuantity').innerHTML = quantity;
      products[id].quantity = quantity;
      console.log(products[id]);
      console.log(quantity);
   }

   //quantity decrement
   if(event.target.classList.contains('minus-btn')) {

    let id = event.target.closest('.item').id;

    let item = document.getElementById(id);
    let quantity = parseInt(item.querySelector('.productQuantity').innerHTML, 10);
    quantity = isNaN(quantity) ? 0 : quantity;
    if(quantity > 0){
      quantity--;
      item.querySelector('.productQuantity').innerHTML = quantity;
      products[id].quantity = quantity;
      console.log(products[id]);
      console.log(quantity);
    }
  }
  });


//Add new Item
  addButton.addEventListener('click', function (event) {
    // get item to add
    const text = newTaskEl.value;
    products.push({'title': text, 'quantity': 0});
    let count = products.length - 1;
    // add new div
    const toAdd = document.createElement('div');

    toAdd.innerHTML =`
                    <div class="item" id="${count}">
                      <div class="buttons">
                        <b class="delete-btn" value="X">X</b>
                      </div>


                      <div class="description">
                        <span>${text}</span>
                      </div>

                      <div class="quantity">
                      <button class="minus-btn" type="button" name="button">
                        <b>-</b>
                      </button>
                      <span class="productQuantity">${products[product].quantity}</span>
                      <button class="plus-btn" type="button" name="button">
                          <b>+</b>
                      </button>
                      </div>`
    list.appendChild(toAdd);
    // clear text from input
    newTaskEl.value = '';
    addButton.disabled = true;
  });
  addButton.disabled = true;

  //Add button disabled if no value
  newTaskEl.addEventListener('keyup', function (event) {
    const text = event.target.value;
    addButton.disabled = !text;
  });

})();
