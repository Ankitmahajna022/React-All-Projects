import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, } from "firebase/firestore";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4rCwYOpMTxAetoDpmdZHxCEeAPnf1hkU",
  authDomain: "chat-box-react-36822.firebaseapp.com",
  projectId: "chat-box-react-36822",
  storageBucket: "chat-box-react-36822.firebasestorage.app",
  messagingSenderId: "502637400556",
  appId: "1:502637400556:web:061acf708fb61c10c830c9",
  measurementId: "G-27EGE4PWDR"
};


export const app = initializeApp(firebaseConfig);
export const store= getFirestore(app);
export const auth = getAuth(app);
