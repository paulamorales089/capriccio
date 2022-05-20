import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProducts } from "./functions/products";
import { createFirebaseCart, getFirebaseCart } from "./functions/cart";

import { addProductToCart, getMyLocalCart, currencyFormat} from "../utils";

const productSection = document.getElementById("products"); 
const categoryFilter = document.getElementById("category");
const orderFilter = document.getElementById("order");

let userLogged = undefined;
let products = [];
let cart = [];

async function loadProducts() {
  
    const firebaseProducts = await getProducts(db);
    productSection.innerHTML = "";
    firebaseProducts.forEach(product => {
        renderProduct(product);       
    });
    
     products = firebaseProducts;
}

function renderProduct(item) {
    const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href", `../product.html?id=${item.id}`);

    const coverImage = item.images ? item.images[0] : "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";

    const isProductAddedToCart = cart.some((productCart) => productCart.id === item.id);

     const productButtonCart = isProductAddedToCart ? `<button id="gallery__img_button" disabled>Added to car</button>`:
    `<button id="gallery__img_button">Add to car</button>`;

    product.innerHTML = `
    <div class="gallery__item">
    <img src="${coverImage}" alt="" class="gallery__img">
    <h2 class="gallery__img_name">${item.name}</h2>
    <h2 class="gallery__img_price">${currencyFormat(item.price)}</h2>
    </div>
    
  `;
    
  productSection.appendChild(product);

  const button = document.createElement("div");
  button.innerHTML= `${productButtonCart}`

  
  productSection.appendChild(button);

  // const productCartButton = document.querySelector(".gallery__img_button");

  const productCartButton = document.getElementById("gallery__img_button");


  productCartButton.addEventListener("click", async (e) =>{
    e.preventDefault();
     console.log("clicked!");
    
    cart.push(item);
    addProductToCart(cart);

    if (userLogged) {
      await createFirebaseCart(db, userLogged.uid, cart);      
    }

    productCartButton.setAttribute("disabled", true);
    productCartButton.innerText = "Added to car";

  });
}

// async function addProductToCart(){
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// function getMyLocalCart (){
//   const myCart = localStorage.getItem("cart");
//   return myCart ? JSON.parse(myCart) : [];
// }

function filterBy () {
  const newCategory = categoryFilter.value;
  const newOrder = orderFilter.value;

  let filteredProducts = [];
  
//RRODUCT FILTER
  if (newCategory !== "") {    
      filteredProducts = products.filter((product) => product.category === newCategory);    
    }else{
      filteredProducts = products;
    }
//PRICE FILTER
    if (newOrder === "up") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);      
    }

    if (newOrder === "down") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);      
    }

    productSection.innerHTML = "";    
    filteredProducts.forEach(product => {
      renderProduct(product);
    });    
  
}

categoryFilter.addEventListener("change", e =>{
  filterBy();
});

orderFilter.addEventListener("change", e =>{
  filterBy();
});


onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    userLogged = user;
    console.log(userLogged)
    cart = await getFirebaseCart(db, userLogged.uid);
      // ...
  } else {
    cart = getMyLocalCart();
    // User is signed out
    // ...
  }
  loadProducts();
});



