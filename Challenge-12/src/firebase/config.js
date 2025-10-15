// Import the functions you need from the SDKs you need+
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuSGqfWY84W-aZlt80oP9uz9g4jCU5oiw",
  authDomain: "authtenticator-1e594.firebaseapp.com",
  projectId: "authtenticator-1e594",
  storageBucket: "authtenticator-1e594.firebasestorage.app",
  messagingSenderId: "491428145335",
  appId: "1:491428145335:web:f21fd20fc21e540a83c532",
  databaseURL: "https://authtenticator-1e594-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);