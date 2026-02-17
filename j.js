/* ====== Get Product ID from URL ====== */
const params = new URLSearchParams(window.location.search); // gets the query string
// console.log(params);

const id = Number(params.get("id")); // convert ?id=0 (string) to number
const ind =id-1;
// Validate the ID
if (isNaN(id)) {
    alert("Invalid product ID!");
    location.href = "index.html"; // redirect to homepage
}

let products = [];

// Fetch products.json
const xhr = new XMLHttpRequest();
xhr.open("GET", "products.json");
xhr.send();

xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200){
        products = JSON.parse(xhr.responseText);

        if(isNaN(id) || id < 0 || id > products.length){
            alert("Invalid product ID!");
            location.href = "index.html";
            return;
        }

        loadProduct();
        showDescription();
        setActiveTab(0);
        createThumbnails();
    }
};

/* ====== Load Product Details ====== */
function loadProduct(){
    const p = products[ind];
    document.querySelector(".product-name").textContent = `$${p.name}`;
    document.querySelector(".product-price").textContent = `$${p.price}`;
    document.querySelector(".foot-desc").textContent = `SKU: ${p.sku} | Category: ${p.type}`;

    const mainImg = document.getElementById("main-img");
    mainImg.src = p.images[0] || ""; // default main image
}

/* ====== Create Thumbnails ====== */
function createThumbnails(){
    const p = products[ind];
    const thumbsContainer = document.getElementById("thumbnails");
    thumbsContainer.innerHTML = "";

    p.images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("thumb-img");
        if(index === 0) img.style.borderColor = "#ff4d4d";

        img.addEventListener("mouseenter", () => {
            document.getElementById("main-img").src = src;
            document.querySelectorAll(".thumb-img").forEach(t => t.style.borderColor = "transparent");
            img.style.borderColor = "#ff4d4d";
        });

        thumbsContainer.appendChild(img);
    });
}

/* ====== Tabs ====== */
const buttons = document.querySelectorAll(".description-btns button");
const content = document.querySelector(".content");

function setActiveTab(index){
    buttons.forEach(btn => btn.classList.remove("active"));
    buttons[index].classList.add("active");
    content.classList.remove("show");
    setTimeout(()=> content.classList.add("show"), 50);
}

function showDescription(){
    content.innerHTML = `<p>${products[ind].description}</p>`;
}

function showInfo(){
    const p = products[ind];
    content.innerHTML = `
        <p>
            <strong>Weight:</strong> ${p.weight || "N/A"}<br>
            <strong>Dimensions:</strong> ${p.dimensions || "N/A"}<br>
            <strong>Materials:</strong> ${p.materials || "N/A"}<br>
            <strong>Colors:</strong> ${p.colors?.join(", ") || "N/A"}<br>
            <strong>Sizes:</strong> ${p.sizes?.join(", ") || "N/A"}
        </p>
    `;
}

function showReviews(){
    const p = products[ind];
    content.innerHTML = `<p>${p.reviews?.length ? p.reviews.join("<br>") : "No reviews yet ⭐⭐⭐⭐⭐"}</p>`;
}

buttons[0].addEventListener("click", () => { showDescription(); setActiveTab(0); });
buttons[1].addEventListener("click", () => { showInfo(); setActiveTab(1); });
buttons[2].addEventListener("click", () => { showReviews(); setActiveTab(2); });

/* ====== Add to Cart ====== */
const cartBtn = document.querySelector(".add-cart");
cartBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = products[ind].id;
    const found = cart.find(item => item.id === productId);

    if(found){
        found.qty += 1;
    } else {
        cart.push(products[ind]);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartBtn.innerText = "Added ✔";
    setTimeout(() => cartBtn.innerText = "Add to Cart", 1200);
});




//fav

let fav_items = JSON.parse(localStorage.getItem("fav_items")) || [];
const favicon = document.getElementById("fav-count");

const found = fav_items.find(item => item.id === id);

if (found) {
  favicon.classList.remove("fa-regular");
  favicon.classList.add("fa-solid");
}




const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) ||
  JSON.parse(sessionStorage.getItem("loggedInUser"));


favicon.addEventListener("click", () => {

  if (!loggedInUser) {
    alert("You have to login first");
    return;
  }

  let fav_items = JSON.parse(localStorage.getItem("fav_items")) || [];

  const productId = products[ind].id;

  const found = fav_items.find(item => item.id === productId);
//   console.log(found);
  
if (found) {
  fav_items = fav_items.filter(item => item.id !== productId);
    favicon.classList.remove("fa-solid");
    favicon.classList.add("fa-regular");

    console.log("removed from favorites ✔");

} else {
//   fav_items.push({ id: productId });
     fav_items.push(products[ind]); //all product details not only id
    //  console.log(products[ind]);
     
    favicon.classList.remove("fa-regular");
    favicon.classList.add("fa-solid");
    console.log("Added to favorites ✔");
}

  localStorage.setItem("fav_items", JSON.stringify(fav_items));

});
