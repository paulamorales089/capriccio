// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



//IMPORT CREAT USER AND LOGIN 
import { createUser, login, addUserToDatabase } from "./functions/auth";

import firebaseConfig from "../utils/firebase";


  const createUserForm = document.getElementById("createUserForm");
  const loginForm = document.getElementById("loginForm");

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore(app);
    const storage = getStorage(app);

  

  //CREAR USUARIO SUBMIT
  createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // aqui entro al elemento y obtengo su contenido
    const name = createUserForm.name.value;
    const lastName = createUserForm.lastName.value;
    const email = createUserForm.email.value;
    const password = createUserForm.password.value;

    const newUser = {
      name, 
      lastName,
      email,
      password,
      isAdmin: false,
    };

    const userCreated = await createUser(auth, newUser);
    await addUserToDatabase(db, userCreated.uid, newUser);
    console.log(userCreated);    

    alert(`Wellcome, ${name}`);
  });

  
  //CREAR LOGIN SUBMIT
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    login(auth, email, password);

    //RECUPERAR INFROMACION ADICIONAL DEL USUARIO
    if (user.isAdmin){
      location.href-"./createProduct.html";
    }else{
      location.href="./products.html";
    }
    
  });


  