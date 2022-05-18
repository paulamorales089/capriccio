import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseCart, currencyFormat } from "./functions/cart";

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");
let cart = [];

function loadCart(cart) {
    let total = 0;
    cart.forEach(product => {
        renderProduct(product);
        total += parseInt(product.price);
    });

    totalSection.innerText = currencyFormat(total);
};

function renderProduct(product){
    const productCart = document.createElement("li");
    productCart.className = "product";
    productCart.innerHTML = `
        <img src="${product.images[0]}" class="product_image">
        <h2 class="product_name">${product.name}</h2>
        <h3 class="product_price">${currencyFormat(product.price)}</h3>
        <button class="product_delete">Remove product</button>
    `;

    cartSection.appendChild(productCart);

}

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;      
      cart = await getFirebaseCart(db, userLogged.uid);
      console.log(cart)
        // ...
    } else {
      cart = getMyLocalCart();
      // User is signed out
      // ...
    }
   
    loadCart();

  });