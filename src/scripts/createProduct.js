import { storage, db  } from "./app";
import { addProduct, upLoadImages } from "./functions/addProduct";

const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("create Product Form :)");

    const name = createProductForm.name.value;
    const description = createProductForm.description.value;
    const price = createProductForm.price.value;
    const category = createProductForm.category.value;
    const images = createProductForm.images.files;

    let gallery = []

    if (images.length) {
        //VAMOS A SUBIR LAS IMAGENES A FIRESTORE
        const upLoadedImages = await upLoadImages(storage, [...images]);   
        
        gallery = await Promise.all(upLoadedImages); 

    }


    const newProduct =  {
        name,       
        description,
        price,
        category,
        images: gallery,
    }; 
    
    await addProduct(db, newProduct);
});




  

