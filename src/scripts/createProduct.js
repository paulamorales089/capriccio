// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// IMPORT MY THINGS
import firebaseConfig from "../utils/firebase";
import { addProduct, upLoadImages } from "./functions/addProduct";


 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const storage = getStorage(app);


const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("createProductForm");

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




  

