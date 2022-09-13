function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

let allClients = [];
function getpreviousvalues() {
  if (localStorage.allOfClients) {
    allClients = JSON.parse(localStorage.allOfClients);
  }
}
function signup() {
  let newClients = {
    firstname: fnam.value,
    surname: snam.value,
    email: emai.value,
    password: pass.value,
    allCarts: [],
    priceOfCurrentCart: [],
  };
  let email = emai.value;
  let password = pass.value;
  let emailRGEX = /^([\S]+)([@][a-z]{2,6})([.][a-z]{2,5})$/;
  let passRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  let emailResult = emailRGEX.test(email);
  let passResult = passRGEX.test(password);
  emailtext.innerHTML = "";
  passwordtext.innerHTML = "";
  document.getElementById("pass").style.borderColor = "black";
  document.getElementById("emai").style.borderColor = "black";
  if (
    fnam.value == "" ||
    snam.value == "" ||
    emai.value == "" ||
    pass.value == ""
  ) {
    passwordtext.innerText = "Please Kindly input all fields";
  } else if (emailResult == false) {
    emailtext.innerHTML = "(Please enter a valid email!)";
    document.getElementById("emai").style.borderColor = "red";
  } else if (passResult == false) {
    passwordtext.innerHTML =
      "(Password should have at least one Upper case,a Lower case and a number and contain 8 characters!)";
    document.getElementById("pass").style.borderColor = "red";
  } else {
    allClients.push(newClients);
    location.assign("signin.html");
  }

  localStorage.allOfClients = JSON.stringify(allClients);
  console.log(allClients);
}



function get() {
  if (localStorage.adminPage) {
    admin = JSON.parse(localStorage.adminPage);
  }
  let admin = {
    addedProducts: [],
    orders: [],
  };
  localStorage.adminPage = JSON.stringify(admin);
}



function signin() {
  Email = emai.value;
  Password = pass.value;
  var found = false;
  if (Email == "young" && Password == "alhaji") {
    return location.assign("adminhomepage.html");
  }
  if (localStorage.allOfClients) {
    allClients = JSON.parse(localStorage.allOfClients);
  }
  for (let i = 0; i < allClients.length; i++) {
    if (Email == allClients[i].email && Password == allClients[i].password) {
      localStorage.indexes = JSON.stringify(i);
      var found = true;
    }
  }
  if (found == false) {
    activate.innerText = "Invalid Email or Invalid Password";
  } else {
    location.assign("home.html");
    emai.value = "";
    pass.value = "";
  }
}

function adminboard() {
  if (localStorage.adminPage) {
    admin = JSON.parse(localStorage.adminPage);
  }
  if (localStorage.allOfClients) {
    allClients = JSON.parse(localStorage.allOfClients);
    allClients.map((item, i) => (users.innerHTML = allClients.length));
  } else {
    users.innerHTML = 0;
  }
}

let addedProducts = [];
getpreviousproducts = () => {
  allAddedItems = JSON.parse(localStorage.adminPage).addedProducts;
  if (allAddedItems) {
    addedProducts = allAddedItems;
  }
};


addBtn = () => {
  admin = JSON.parse(localStorage.adminPage);
  let eachProducts = {
    itemImage: base64String,
    itemName: itemNam.value,
    itemPrice: parseInt(itemPric.value),
    itemDetails: itemDetail.value,
  };
  if (itemImag.value == "" || itemNam.value == "" || itemPric.value == "") {
    success.innerText = "Kindly fill in all fields";
  } else {
    addedProducts.push(eachProducts);
    admin.addedProducts = addedProducts;
    localStorage.adminPage = JSON.stringify(admin);
    itemImag.value = "";
    itemNam.value = "";
    itemPric.value = "";
    itemDetail.value = "";
    success.innerText = "Item added Successfully";
  }
};


let base64String = "";
function encodeImageFileAsURL() {
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    base64String = reader.result;
    console.log("RESULT", reader.result);
  };
  reader.readAsDataURL(file);
}


viewproducts = () => {
  allAddedItems = JSON.parse(localStorage.adminPage).addedProducts;
  allAddedItems.map((item, i) => {
    disp.innerHTML += `<div class="display">
        <div class="card">
            <img class="img" src=${item.itemImage}>${item.itemName} <br> $${item.itemPrice}
            <button class="btn btn-primary w-100 mainbackcolor" onclick="deleteProduct(${i})">Delete</button>
        </div>
    </div> `;
  });
  if (allAddedItems.length == 0) {
    disp.innerHTML = `You Currently do have any Products in the store.<br>Proceed to Add Products to include New products to the Store`;
  }
  console.log(allAddedItems);
};

const deleteProduct = (inde) => {
  allAddedItems = JSON.parse(localStorage.adminPage).addedProducts;
  let filteredArray = allAddedItems.filter((item, ind) => inde != ind);
  allAddedItems = filteredArray;
  admin = JSON.parse(localStorage.adminPage);
  admin.addedProducts = allAddedItems;
  localStorage.adminPage = JSON.stringify(admin);
  location.reload();
};


const homepage = () => {
  i = JSON.parse(localStorage.indexes);
  allClients = JSON.parse(localStorage.allOfClients);
  allAddedItems = JSON.parse(localStorage.adminPage).addedProducts;
  allAddedItems.map((item, i) => {
    disp.innerHTML += `<div class="display">
        <div class="card">
            <img class="img" src=${allAddedItems[i].itemImage}>${allAddedItems[i].itemName} <br> $${allAddedItems[i].itemPrice}
            <button class="detailsbutton" onclick="details(${i})">Details</button>
            <button class="btn btn-primary w-100 mainbackcolor" onclick="addToCart(${i})">Add to Cart</button>
        </div>
    </div> `;
    console.log(allClients[i]);
  });
  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  currentClientCarts.map(
    (item, i) => (cartNo.innerHTML = currentClientCarts.length)
  );
};


const details = (deindex) => {
  console.log(deindex);
  localStorage.detailsindex = deindex;
  location.assign("detailspage.html");
};

let allCarts = [];
const detailspage = () => {
  i = JSON.parse(localStorage.indexes);

  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  if (currentClientCarts) {
    allCarts = currentClientCarts;
  }

  allClients = JSON.parse(localStorage.allOfClients);
  allAddedItems = JSON.parse(localStorage.adminPage).addedProducts;
  deindex = JSON.parse(localStorage.detailsindex);
  let filteredDetails = allAddedItems.find((item, i) => deindex == i);
  allAddedItems = filteredDetails;
  console.log(filteredDetails, i);
  disp.innerHTML = `<div class="display">
<div class='detailtext'>Details</div>
        <div>
            <img class="img automargin" src=${filteredDetails.itemImage}></div>  <div class='detailtext'>${filteredDetails.itemName}</div>
             $${filteredDetails.itemPrice}<br>
        ${filteredDetails.itemDetails} <br>
        <button class="btn btn-primary w-50 mainbackcolor automargin" onclick="addToCart(${deindex})">Add to Cart</button> 
        <button class="btn btn-primary w-50 mainbackcolor automargin" onclick="back()">Back to Products</button><br><br>
    </div> `;
  console.log(i);
};


const back = () => {
  window.history.back();
};


const addToCart = (cartindex) => {
  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  for (let i = 0; i < currentClientCarts.length; i++) {
    if (currentClientCarts[cartindex] == currentClientCarts[i]) {
      return (success.innerHTML = "Item already in Cart");
    }
  }
  allAddedItems = JSON.parse(localStorage.adminPage).addedProducts;
  let filteredCarts = allAddedItems.find((item, ind) => cartindex == ind);
  filteredCarts.quantity = parseInt(1);
  filteredCarts.tprice = parseInt(
    filteredCarts.itemPrice * filteredCarts.quantity
  );
  allCarts = filteredCarts;
  i = JSON.parse(localStorage.indexes);
  allClients = JSON.parse(localStorage.allOfClients);
  console.log(allCarts);
  allClients[i].allCarts.push(allCarts);
  localStorage.allOfClients = JSON.stringify(allClients);
  console.log(allClients[i].allCarts);
  success.innerHTML = "Item added to Cart";

  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  currentClientCarts.map(
    (item, i) => (cartNo.innerHTML = currentClientCarts.length)
  );
};



let total = 0;
cartpage = () => {
  disp.innerHTML = "";
  i = JSON.parse(localStorage.indexes);
  allClients = JSON.parse(localStorage.allOfClients);
  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  priceOfCurrentCart = JSON.parse(localStorage.allOfClients)[i]
    .priceOfCurrentCart;
  currentClientCarts.map((item, i) => {
    disp.innerHTML += `<div class="display">
        <div class="card">
            <img class="img" src=${item.itemImage}>${item.itemName} <br>
             $${item.itemPrice}
            <input type="number" name="" id="itemQuantit${i}" min="1" placeholder="Quantity" value=${currentClientCarts[i].quantity} style="width: 20%;
             border:2px solid deepskyblue;" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >=48 && event.charCode <=57))" onchange="changeQuantity(${i})">
            <button class="btn btn-primary w-100 mainbackcolor" onclick="deleteCart(${i})">Remove</button>
        </div>
    </div> `;
    currentClientCarts[i].tprice =
      currentClientCarts[i].itemPrice * currentClientCarts[i].quantity;
    total += currentClientCarts[i].tprice;
    totalPrice.innerHTML = `Total Price = $${total} `;
    console.log(currentClientCarts);
    console.log(currentClientCarts[i].tprice);
    console.log(total);
  });
  if (currentClientCarts.length > 0) {
    checkout.innerHTML = `<button class="btn btn-primary w-50 mainbackcolor" onclick="checkoutGoods()">Checkout</button>`;
  } else {
    checkout.innerHTML = `You Currently have no items in your Cart<br><br><br><br<br>
							<button class="btn btn-primary w-50 mainbackcolor automargin" onclick="back()">
							Back to Home</button><br>
							<br><br<br><br><br<br><br><br<br><br><br`;
  }
  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  currentClientCarts.map(
    (item, i) => (cartNo.innerHTML = currentClientCarts.length)
  );
  allClients[i].priceOfCurrentCart = total;
  localStorage.allOfClients = JSON.stringify(allClients);
  console.log(allClients[i].priceOfCurrentCart);
};



const changeQuantity = (qtIndex) => {
  total = 0;
  i = JSON.parse(localStorage.indexes);
  allClients = JSON.parse(localStorage.allOfClients);
  priceOfCurrentCart = JSON.parse(localStorage.allOfClients)[i]
    .priceOfCurrentCart;
  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  let quantity = document.getElementById(`itemQuantit${qtIndex}`).value;
    currentClientCarts[qtIndex].quantity = parseInt(quantity);
    currentClientCarts[qtIndex].tprice =
      currentClientCarts[qtIndex].itemPrice * parseInt(quantity);
    allClients[i].allCarts = currentClientCarts;
    localStorage.allOfClients = JSON.stringify(allClients);
    currentClientCarts.map((each, i) => {
      total += currentClientCarts[i].tprice;
    });
    totalPrice.innerHTML = `Total Price = $${total} `;
    checkout.innerHTML = `<button class="btn btn-primary w-50 mainbackcolor" onclick="checkoutGoods()">Checkout</button>`;
    allClients[i].priceOfCurrentCart = total;
    localStorage.allOfClients = JSON.stringify(allClients);
};


const deleteCart = (inde) => {
  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  let filteredArray = currentClientCarts.filter((item, ind) => inde != ind);
  currentClientCarts = filteredArray;
  allClients = JSON.parse(localStorage.allOfClients);
  allClients[i].allCarts = currentClientCarts;
  localStorage.allOfClients = JSON.stringify(allClients);
  location.reload();
};


const checkoutGoods = () => {
  location.assign("checkout.html");
};


const checkoutPage = () => {
  i = JSON.parse(localStorage.indexes);
  allClients = JSON.parse(localStorage.allOfClients);
  priceOfCurrentCart = JSON.parse(localStorage.allOfClients)[i]
    .priceOfCurrentCart;
  currentClientCarts = JSON.parse(localStorage.allOfClients)[i].allCarts;
  currentClientCarts.map((item, i) => {
    disp.innerHTML += `<div>
        <div>
            ${item.itemName} x${item.quantity}
            <span class='tp'>
             $${item.tprice}
             </span>
        </div>
    </div> `;
  });
  tot.innerHTML = `Total Payment= $${priceOfCurrentCart}`;
  allClients[i].allCarts = [];
  localStorage.allOfClients = JSON.stringify(allClients);

  console.log(currentClientCarts);
};

function home() {
  location.assign("home.html");
}

const out = () => {
  location.assign("signin.html");
};
