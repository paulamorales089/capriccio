// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createUser, login } from "./src/scripts/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyq5I-p-HFzoYTJGaTK9Pp0DuPE9E73DU",
  authDomain: "cappricioydelizia.firebaseapp.com",
  projectId: "cappricioydelizia",
  storageBucket: "cappricioydelizia.appspot.com",
  messagingSenderId: "63313256749",
  appId: "1:63313256749:web:232fca19fbe975b615b3a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

  const createUserForm = document.getElementById("createUserForm");
  const loginForm = document.getElementById("loginForm");

  //CREAR USUARIO SUBMIT
  createUserForm.addEventListener("submit", e => {
    e.preventDefault();

    // aqui entro al elemento y obtengo su contenido
    const name = createUserForm.name.value;
    const lastname = createUserForm.lastname.value;
    const email = createUserForm.email.value;
    const password = createUserForm.password.value;

    createUser(name, lastname, email, password);

  });

  //CREAR LOGIN SUBMIT
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    login(email, password);
    //console.log("LOGIN!");

  });


  