// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs_eExXuiCt3vSBUdqbNQMY7PSfNt5Bd8",
  authDomain: "parcial-2-9c6db.firebaseapp.com",
  projectId: "parcial-2-9c6db",
  storageBucket: "parcial-2-9c6db.firebasestorage.app",
  messagingSenderId: "835383583053",
  appId: "1:835383583053:web:46359b9fc5549663cf5704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, db};