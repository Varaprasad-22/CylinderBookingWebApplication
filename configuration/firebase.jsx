// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//Auth connection
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-3qJuzV7oDVvK1iyA3amh_YefSfj19yM",
  authDomain: "gitproject-7a8e3.firebaseapp.com",
  projectId: "gitproject-7a8e3",
  storageBucket: "gitproject-7a8e3.firebasestorage.app",
  messagingSenderId: "702921604602",
  appId: "1:702921604602:web:174346469f70c6b242b843"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//intialize services 
const auth=getAuth(app)
const db=getFirestore(app)

export {auth,db}