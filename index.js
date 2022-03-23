const user = {
    nombrecito: "paula",
    correito: "paulitaLaMasBonita@gmail.com",
    mascotica: "m",
    status: "con ganas de dejar la carrera"
}

console.log("User Data: " + user.nombrecito + "," + user.correito + "," + user.mascotica + "," + user.status);




const products = [
    {
        name: "Cupcakes de chocolate",
        price: 25000,
        description: "6 unidades",
        stock: 12,
        image: "../images/chocolate1.png"
    },

    {
        name: "Bombones de chocolate",
        price: 45000,
        description: "24 unidades",
        stock: 15,
        image: "../images/chocolate2.png"
    },

    {
        name: "Donas de chocolate",
        price: 20000,
        description: "6 unidades",
        stock: 20,
        image: "../images/chocolate3.png"
    },

    {
        name: "Barras de chocolate",
        price: 15000,
        description: "1 unidad",
        stock: 30,
        image: "../images/chocolate4.png"
    },

    {
        name: "Pastel de chocolate",
        price: 50000,
        description: "1 unidad",
        stock: 0,
        image: "../images/chocolate5.png"
    },

    {
        name: "Brownies de chocolate",
        price: 12000,
        description: "4 unidad",
        stock: 22,
        image: "../images/chocolate6.png"
    }
]

console.log("productos de precio mayor o igual a 25000: ");
for (let index = 0; index < products.length; index++) {
   if (products[index].price >=25000) {
       console.log(products[index].name);       
   }
    
}

console.log("productos sin stock: ");
for (let index = 0; index < products.length; index++) {
   if (products[index].stock <=0) {
       console.log(products[index].name);       
   }
    
}

/*cosas locas*/

const carritoCompra = document.getElementById("shop");

function shopProducts(){
    carritoCompra.innerHTML ="";

    for (let index = 0; index < products.length; index++) {
        carritoCompra.appendChild(render(products[index]));        
    }    
}

function render(products) {

    //se crea el div
    let item = document.createElement("div");
    item.className = "galery__item";

    //mostrar la verraca imagen
    let image = document.createElement("img");
    image.className = "galery__img";
    image.src = products.image;

    let name = document.createElement("h1");
    name.innerHTML = products.name;

    let price = document.createElement("h1");
    price.innerHTML = products.price;    

    item.appendChild(image);
    item.appendChild(name);
    item.appendChild(price);
    return item;    
}

shopProducts();