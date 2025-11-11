// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeDaHC-xIQOYp5ZbxWtbsdu-lmHGrDSXQ",
  authDomain: "svelte-firebase-85bd6.firebaseapp.com",
  projectId: "svelte-firebase-85bd6",
  storageBucket: "svelte-firebase-85bd6.firebasestorage.app",
  messagingSenderId: "526438364379",
  appId: "1:526438364379:web:60289492b13428b6b508fe",
  measurementId: "G-2YL8CW4ZK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app)
export const db= getFirestore(app)
export const storage= getStorage(app);