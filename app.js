// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
console.log(app);