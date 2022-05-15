import { db } from "./app";
import { getProducts } from "./functions/products";

const productSection = document.getElementById("products"); 
const categoryFilter = document.getElementById("category");

const orderFilter = document.getElementById("order");

let products = [];

async function loadProducts() {
    const firebaseProducts = await getProducts(db);
    productSection.innerHTML = "";
    firebaseProducts.forEach(product => {
        renderProduct(product);

        products = firebaseProducts;
       
    });
   
}

function renderProduct(item) {
    const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href", `./product.html?productId=${item.id}`);

    const coverImage = item.images ? item.images[0] : "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";

    product.innerHTML = `<div class="gallery__item">
    <img src="${coverImage}" alt="" class="gallery__img">
    <h2 class="gallery__img_name">${item.name}</h2>
    <h2 class="gallery__img_price">$${item.price}</h2>
    <button class="gallery__img_button">Add to car</button>
  </div>`;

  productSection.appendChild(product);
}

function filterBy (){
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
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);      
    }

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

loadProducts();