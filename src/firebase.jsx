import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber 
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyA-3qJuzV7oDVvK1iyA3amh_YefSfj19yM",
//   authDomain: "gitproject-7a8e3.firebaseapp.com",
//   projectId: "gitproject-7a8e3",
//   storageBucket: "gitproject-7a8e3.appspot.com",
//   messagingSenderId: "702921604602",
//   appId: "1:702921604602:web:174346469f70c6b242b843"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber, 
  collection,
  query,
  where,
  getDocs
};
