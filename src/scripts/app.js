// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebaseConfig from "../utils/firebase";

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
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
  db,
  storage,
}


