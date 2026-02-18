//nav links
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

/// dark light mode
document.getElementById("theme-toggle").addEventListener("click",function(){
    
   document.getElementById("theme-icon").classList.toggle("fa-moon")
   document.body.classList.toggle("dark-mode")
    // console.log(document.getElementById("theme-icon").classList);
})

//get data APi
// function getProducts(){
//     const xhr = new XMLHttpRequest();
// xhr.open("GET", "products.json");
// xhr.send();

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     const data = JSON.parse(xhr.responseText);
//     // console.log(data);
//     displayProducts(data); 
// }
fetch(`products.json`)
    .then(res => res.json())
    .then(data => {
 // console.log(data)
//  const three = data.slice(0,3)
//  console.log(three);
 
  const saleRow = document.getElementById("saleRow");
  const newRow = document.getElementById("newRow");
  const row = document.getElementById("productsRow");
//     let currentPage =1;
//   const itemsPerPage = 3;

//   function displayItems(){ 
//   const start = (currentPage-1)*itemsPerPage
//   const end = start + itemsPerPage
//   const pageItems = data.slice(start, end)

// document.getElementById("items").innerHTML =pageItems.map(item=>`<p>Item ${item}</p>`).join('');
// // document.getElementById("page-info").innerHTML =`Page ${currentPage}`

// }
//   function prevpg(){
//      if (currentPage >1)
//         currentPage --
//     displayItems();
//   }
//   function nextpg(){
//     if(currentPage * itemsPerPage < data.length){
//         currentPage ++
//         displayItems();
//     }
//   }


  data.forEach(product => {
    row.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="card product-card h-100">
          <div class="img-wrapper position-relative">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
            <span class="discount position-absolute top-0 start-0 rounded-circle d-flex 
             justify-content-center align-items-center p-4 fs-6">%${product.discount || "0"}</span>
          </div>
          <div class="card-body">
            <a href="desc.html?id=${product.id}" class="card-title d-block text-decoration-none fs-5 fw-semibold">
              ${product.name}
            </a>
            <p class="card-text">${product.category}</p>
             <span class="text-decoration-line-through text-muted">$${product.oldPrice || "0.00"}</span>
             <span class="price ms-2 me-5">$${product.price}</span>
             <button id="add_cart" class="btn-main ms-5 px-3 py-2">
              <i class="fa-solid fa-plus"></i>
             </button>
          </div>
        </div>
      </div>
    `;
  });
  data.forEach(product => {
    if (product.oldPrice){
        // console.log(1);
      saleRow.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="card product-card h-100">
          <div class="img-wrapper position-relative">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
            <span class="discount position-absolute top-0 start-0 rounded-circle d-flex 
             justify-content-center align-items-center p-4 fs-6">%${product.discount || "0"}</span>
          </div>
          <div class="card-body">
            <a href="desc.html?id=${product.id}" class="card-title d-block text-decoration-none fs-5 fw-semibold">
              ${product.name}
            </a>
            <p class="card-text">${product.category}</p>
             <span class="text-decoration-line-through text-muted">$${product.oldPrice ||"" }</span>
             <span class="price fs-5 ms-2 me-5">$${product.price}</span>
             <button class="btn-main ms-5 px-3 py-2"
              onclick="addToCart(${product.id})">
              <i class="fa-solid fa-plus"></i>
             </button>
          </div>
        </div>
      </div>
    `;
    }
      else  if (product.new){
        // console.log(1);
      newRow.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="card product-card h-100">
          <div class="img-wrapper position-relative ">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
            <span class="discount position-absolute top-0 start-0 rounded-circle d-flex 
             justify-content-center align-items-center p-4 fs-6">${product.new}</span>
          </div>
          <div class="card-body">
            <a href="desc.html?id=${product.id}" class="card-title d-block text-decoration-none fs-5 fw-semibold">
              ${product.name}
            </a>
            <p class="card-text">${product.category}</p>
             <span class="price fs-5 ms-2 me-5">$${product.price}</span>
             <button class="btn-main ms-5 px-3 py-2"
              onclick="addToCart(${product.id})">
              <i class="fa-solid fa-plus"></i>
             </button>
          </div>
        </div>
      </div>
    `;  
    }
    // else{
    //     noProducts.innerHTML=`Coming Soon`
    // }
  }) //foreach


//filter
    document.getElementById("btn-search").addEventListener("click",function(){
     const searchText = document.getElementById("search").value.trim().toLowerCase();
    //  console.log(searchText);
     x = data.filter(product => product.name.toLowerCase().includes(searchText) );
    //  console.log(x);
    x.forEach(product => {
     document.getElementById("filter").innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="card product-card h-100">
          <div class="img-wrapper position-relative">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
            <span class="discount position-absolute top-0 start-0 rounded-circle d-flex 
             justify-content-center align-items-center p-4 fs-6">%${product.discount ||"0"}</span>
          </div>
          <div class="card-body">
            <a href="desc.html?id=${product.id}" class="card-title d-block text-decoration-none fs-5 fw-bold">
              ${product.name}
            </a>
            <p class="card-text">${product.category}</p>
             <span class="text-decoration-line-through text-muted">$${product.oldPrice || ""}</span>
             <span class="price fs-5 ms-2 me-5">$${product.price}</span>
             <button class="btn-main ms-5 px-3 py-2"
              onclick="addToCart(${product.id})">
              <i class="fa-solid fa-plus"></i>
             </button>
          </div>
        </div>
      </div>
    `;
       })

    //    displayItems()
})



//pagination
//   let currentPage =1;
//   const itemsPerPage = 3;
// function displayItems(){ 
//   const start = (currentPage-1)*itemsPerPage
//   const end = start + itemsPerPage
//   const pageItems = data.slice(start, end)

// document.getElementById("items").innerHTML =pageItems.map(item=>`<p>Item ${item}</p>`).join('');
// document.getElementById("page-info").innerHTML =`Page ${currentPage}`

// }
//   function prevpg(){
//      if (currentPage >1)
//         currentPage --
//     displayItems();
//   }
//   function nextpg(){
//     if(currentPage * itemsPerPage < data.length){
//         currentPage ++
//         displayItems();
//     }
//   }


/* ====== Add to Cart ====== */
document.getElementById("add_cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    console.log(666);
    const found = cart.find(item => item.id === productId);

    if(found){
        found.qty += 1;
    } else {
        cart.push(products[ind]);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartBtn.innerText = "Added ✔";
    // setTimeout(() => cartBtn.innerText = "Add to Cart", 1200);
});

    })//data api fetch 31

// function displayProducts(products) {
//     console.log(products);
//   const row = document.getElementById("productsRow");
//   row.innerHTML = '';

//   products.forEach(product => {
//     row.innerHTML += `
//       <div class="col-lg-4 col-md-6">
//         <div class="card product-card h-100">
//           <div class="img-wrapper position-relative">
//             <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
//             <span class="discount position-absolute top-0 start-0 rounded-circle d-flex 
//              justify-content-center align-items-center p-4 fs-6">%${product.discount}</span>
//           </div>
//           <div class="card-body">
//             <a href="desc.html?id=${product.id}" class="card-title d-block text-decoration-none fs-5 fw-semibold">
//               ${product.name}
//             </a>
//             <p class="card-text">${product.category}</p>
//              <span class="text-decoration-line-through text-muted">$${product.oldPrice}</span>
//              <span class="price ms-2 me-5">$${product.price}</span>
//              <button class="btn-main ms-5 px-3 py-2"
//               onclick="addToCart(${product.id})">
//               <i class="fa-solid fa-plus"></i>
//              </button>
//           </div>
//         </div>
//       </div>
//     `;


//   });
// }



//welcome msg from login
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) 
                   || JSON.parse(sessionStorage.getItem("loggedInUser"));
 const wishlist =  JSON.parse(localStorage.getItem("fav_items"))                
 const cart =  JSON.parse(localStorage.getItem("cart"))                

if (loggedInUser) {

    document.querySelector(".welcome").innerHTML =`Welcome, <span>${loggedInUser.name}</span>`;
    //wishlist count
    document.getElementById("fav").innerText =wishlist.length;

        //cart count
    document.getElementById("cart-count").innerText =cart.length;


    const loginBtn = document.querySelector("#login");
    // loginBtn.innerHTML = `Logout`;
      loginBtn.innerHTML = `Logout <i class="fa-solid fa-right-from-bracket"></i>`;


    loginBtn.addEventListener("click", function () {

        // remove user from storage
        localStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("loggedInUser");

        // hide welcome
        document.querySelector(".welcome").style.display = "none";
        // redirect same page
        loginBtn.href = "index.html";

    });


    


        //show fav list
}


/// cart
//===============================
//CART SIDEBAR
const cartIcon = document.querySelector(".icon-cart");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");

// Open Cart
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
  loadCartItems();
});

// Close Cart
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
}

//===============================
// CART LOGIC
// // ===============================
function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function loadCartItems() {
  const cart = getCartItems();
  cartItemsContainer.innerHTML = "";

  let total = 0;
  let dis = 0;


  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotalSpan.innerText = 0;
    return;
  }

  cart.forEach(item => {
    total += item.price;
    dis += item.oldPrice;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.images[0]}" alt="">
        <div>
          <h6>${item.name}</h6>
        <span class="text-decoration-line-through text-muted">$${item.oldPrice || "0"}</span>
          <span>$${item.price}</span>
        </div>
      </div>
    `;
  });

  cartTotalSpan.innerText = total.toFixed(2);
//   document.querySelector(".diss").innerText= dis-total
}

  



//   }
// };