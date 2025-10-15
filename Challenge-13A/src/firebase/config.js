// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);
const dbRT = getDatabase(app);

export {app, auth, db, dbRT};