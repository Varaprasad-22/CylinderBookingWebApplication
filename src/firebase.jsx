import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber // ✅ Add this
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-3qJuzV7oDVvK1iyA3amh_YefSfj19yM",
  authDomain: "gitproject-7a8e3.firebaseapp.com",
  projectId: "gitproject-7a8e3",
  storageBucket: "gitproject-7a8e3.appspot.com",
  messagingSenderId: "702921604602",
  appId: "1:702921604602:web:174346469f70c6b242b843"
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
