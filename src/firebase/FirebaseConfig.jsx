// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVYejDa1Edp-n0r9Hh3fVhi9Gd34SU1e4",
  authDomain: "e-shopify-f7dbe.firebaseapp.com",
  projectId: "e-shopify-f7dbe",
  storageBucket: "e-shopify-f7dbe.appspot.com",
  messagingSenderId: "959749922879",
  appId: "1:959749922879:web:7e4b479fbd190d8d40588a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app); // Pass the Firebase app instance to getFirestore
const auth = getAuth(app); // Pass the Firebase app instance to getAuth

export { fireDB, auth };
