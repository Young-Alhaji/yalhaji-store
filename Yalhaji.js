function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



let allClients=[]
	function getpreviousvalues(){
		if(localStorage.allOfClients){
			 allClients=JSON.parse(localStorage.allOfClients)
		}
	}
	function signup(){
		let newClients={
			firstname:fnam.value,
			surname:snam.value,
			email:emai.value,
			password:pass.value,
			allCarts:[],
			priceOfCurrentCart:[]
		}
			let email=emai.value
			let password=pass.value
			 let emailRGEX= /^([\S]+)([@][a-z]{2,6})([.][a-z]{2,5})$/
			 let passRGEX=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  let emailResult =emailRGEX.test(email) 
  let passResult = passRGEX.test(password)
  emailtext.innerHTML=''
  passwordtext.innerHTML=''
  document.getElementById("pass").style.borderColor = "black";
  document.getElementById("emai").style.borderColor = "black";
  if (fnam.value==''||snam.value==''||emai.value==''||pass.value==''){
			passwordtext.innerText=('Please Kindly input all fields')
		}
    else if(emailResult==false){
  	emailtext.innerHTML=('(Please enter a valid email!)')
  	document.getElementById("emai").style.borderColor = "red";
  	
}
else if(passResult==false){
		passwordtext.innerHTML=('(Password should have at least one Upper case,a Lower case and a number!)')
		document.getElementById("pass").style.borderColor = "red";
}
else{
	allClients.push(newClients)
			location.assign('signin.html')
}

localStorage.allOfClients=JSON.stringify (allClients)
		console.log(allClients)
	}

	

function signin(){
		 Email=emai.value
		 Password=pass.value
		var found =false
		if(Email=='ayoola'&& Password=='demilade'){
			return location.assign("adminhomepage.html")
		}
		 allClients=JSON.parse(localStorage.allOfClients)
		 for (let i = 0; i<allClients.length ; i++) {
		 	if(Email==allClients[i].email && Password==allClients[i].password){
		 		localStorage.indexes=JSON.stringify(i)
		 		var found=true
		 	}
		 }
		 if (found==false){
		 		activate.innerText=('Invalid Email or Invalid Password')
		 	}else{
		 		location.assign('home.html')
		 		emai.value=''
		 		pass.value=''
		 	}
	}


	function adminboard(){
		activate.innerHTML=`<button class="btn btn-primary w-80 mainbackcolor" onclick="activateDashboard()">Activate Dashboard</button>`
		if(localStorage.adminPage){
			 admin=JSON.parse(localStorage.adminPage)
			 activate.innerHTML=''
		}
		allClients=JSON.parse(localStorage.allOfClients)
		allClients.map((item,i)=>
			users.innerHTML= allClients.length)
	}

		function activateDashboard(){
		let admin={
			addedProducts:[],
			orders:[]
		}
		localStorage.adminPage=JSON.stringify (admin)
		console.log(admin)
		activate.innerHTML='Admin activated Successfully!'

	}





	let addedProducts=[]
 		 getpreviousproducts=()=>{
			
 			allAddedItems=JSON.parse(localStorage.adminPage).addedProducts
 			if(allAddedItems){
 			 addedProducts=allAddedItems
 			}
 	}
 		 addBtn=()=>{
 	
 			admin=JSON.parse(localStorage.adminPage)
 			let eachProducts={
 				itemImage:base64String,
 				itemName:itemNam.value,
 				itemPrice:parseInt(itemPric.value),
 				itemDetails:itemDetail.value
 			}
 			if(itemImag.value==''||itemNam.value==''||itemPric.value==''){
 				success.innerText=('Kindly fill in all fields')
 			}
 			else{	
 				addedProducts.push(eachProducts)
 				admin.addedProducts = addedProducts
 				localStorage.adminPage = JSON.stringify(admin);
 				itemImag.value=''
 				itemNam.value=''
 				itemPric.value=''
 				itemDetail.value=''
 				success.innerText=('Item added Successfully')
 			}
 		}
 				let base64String=''
 		function encodeImageFileAsURL() {
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
  	base64String=reader.result
    console.log('RESULT', reader.result)
  }
  reader.readAsDataURL(file);
}

viewproducts=()=>{
	allAddedItems=JSON.parse(localStorage.adminPage).addedProducts
	allAddedItems.map((item,i)=>{
			disp.innerHTML+=`<div class="display">
        <div class="card">
            <img class="img" src=${allAddedItems[i].itemImage}>${allAddedItems[i].itemName} <br> $${allAddedItems[i].itemPrice}
            <button class="btn btn-primary w-100 mainbackcolor" onclick="deleteProduct(${i})">Delete</button>
        </div>
    </div> `
	})
	if(allAddedItems.length==0){
		disp.innerHTML=`You Currently do have any Products in the store.<br>Proceed to Add Products to include New products to the Store`
	}
	console.log(allAddedItems)
	
}

const deleteProduct = (inde)=>{
	allAddedItems=JSON.parse(localStorage.adminPage).addedProducts
    let filteredArray =allAddedItems.filter((item,ind)=>inde!=ind)
    allAddedItems = filteredArray
    admin=JSON.parse(localStorage.adminPage)
    admin.addedProducts = allAddedItems
    localStorage.adminPage = JSON.stringify(admin)
    location.reload()
}

const homepage=()=>{
	i=JSON.parse(localStorage.indexes)
 	allClients=JSON.parse(localStorage.allOfClients)
allAddedItems=JSON.parse(localStorage.adminPage).addedProducts
	allAddedItems.map((item,i)=>{
			disp.innerHTML+=`<div class="display">
        <div class="card">
            <img class="img" src=${allAddedItems[i].itemImage}>${allAddedItems[i].itemName} <br> $${allAddedItems[i].itemPrice}
            <button class="detailsbutton" onclick="details(${i})">Details</button>
            <button class="btn btn-primary w-100 mainbackcolor" onclick="addToCart(${i})">Add to Cart</button>
        </div>
    </div> `
    console.log(allClients[i])
	})	
	currentClientCarts=JSON.parse(localStorage.allOfClients)[i].allCarts
	currentClientCarts.map((item,i)=>
			cartNo.innerHTML= currentClientCarts.length)	
}

const details=(deindex)=>{
	console.log(deindex)
	localStorage.detailsindex=deindex
	 location.assign('detailspage.html')
}


let allCarts=[]
const detailspage=()=>{
	i=JSON.parse(localStorage.indexes)

currentClientCarts=JSON.parse(localStorage.allOfClients)[i].allCarts
 			if(currentClientCarts){
 			 allCarts=currentClientCarts
 			}

 	allClients=JSON.parse(localStorage.allOfClients)
allAddedItems=JSON.parse(localStorage.adminPage).addedProducts
deindex=JSON.parse(localStorage.detailsindex)
 let filteredDetails =allAddedItems.find((item,i)=>deindex==i)
 allAddedItems = filteredDetails
 console.log(filteredDetails,i)
disp.innerHTML=`<div class="display">
<div class='detailtext'>Details</div>
        <div>
            <img class="img automargin" src=${filteredDetails.itemImage}></div>  <div class='detailtext'>${filteredDetails.itemName}</div>
             $${filteredDetails.itemPrice}<br>
        ${filteredDetails.itemDetails} <br>
        <button class="btn btn-primary w-50 mainbackcolor automargin" onclick="addToCart(${deindex})">Add to Cart</button> 
        <button class="btn btn-primary w-50 mainbackcolor automargin" onclick="back()">Back to Products</button><br><br>
    </div> `
    console.log(i)
}
const back=()=>{
	window.history.back()
}

const addToCart=(cartindex)=>{
 	allAddedItems=JSON.parse(localStorage.adminPage).addedProducts
 	let filteredCarts =allAddedItems.find((item,ind)=>cartindex==ind)
 	filteredCarts.quantity=parseInt(1)
 	allCarts=filteredCarts
 	i=JSON.parse(localStorage.indexes)
	allClients=JSON.parse(localStorage.allOfClients)
	console.log(allCarts)
 	allClients[i].allCarts.push(allCarts)
 	localStorage.allOfClients=JSON.stringify(allClients)
 	console.log(allClients[i].allCarts)
 	success.innerHTML='Item added to Cart'
 	
 	currentClientCarts=JSON.parse(localStorage.allOfClients)[i].allCarts
	currentClientCarts.map((item,i)=>
			cartNo.innerHTML= currentClientCarts.length)
}


cartpage=()=>{
	let total=0;
	i=JSON.parse(localStorage.indexes)
	allClients=JSON.parse(localStorage.allOfClients)
	currentClientCarts=JSON.parse(localStorage.allOfClients)[i].allCarts
	currentClientCarts.map((item,i)=>{
			disp.innerHTML+=`<div class="display">
        <div class="card">
            <img class="img" src=${currentClientCarts[i].itemImage}>${currentClientCarts[i].itemName} <br>
             $${currentClientCarts[i].itemPrice}
            <input type="number" name="" id="itemQuantit" placeholder="Quantity" value="1" style="width: 20%;
             border:2px solid deepskyblue;" onkeypress="changeQuantity(${i})">
            <button class="btn btn-primary w-100 mainbackcolor" onclick="deleteCart(${i})">Remove</button>
        </div>
    </div> `
    total += (currentClientCarts[i].itemPrice*currentClientCarts[i].quantity);
    console.log()
    totalPrice.innerHTML=`Total Price = $${total} `
	})
	if (currentClientCarts.length>0){
		checkout.innerHTML= `<button class="btn btn-primary w-25 mainbackcolor" onclick="checkout(${i})">Checkout</button>`
	}else{
		checkout.innerHTML=`You Currently have no items in your Cart<br><br><br><br<br>
							<button class="btn btn-primary w-50 mainbackcolor automargin" onclick="back()">
							Back to Home</button><br>
							<br><br<br><br><br<br><br><br<br><br><br`
	}	
	console.log(currentClientCarts)
	currentClientCarts=JSON.parse(localStorage.allOfClients)[i].allCarts
	currentClientCarts.map((item,i)=>
			cartNo.innerHTML= currentClientCarts.length)
}

const deleteCart = (inde)=>{
	currentClientCarts=JSON.parse(localStorage.allOfClients)[i].allCarts
    let filteredArray =currentClientCarts.filter((item,ind)=>inde!=ind)
    currentClientCarts = filteredArray
    allClients=JSON.parse(localStorage.allOfClients)
    allClients[i].allCarts= currentClientCarts
    localStorage.allOfClients=JSON.stringify(allClients)
    location.reload()
}



