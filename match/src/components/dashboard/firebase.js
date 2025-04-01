// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9XhVGb5zOxlVemwsRqpDVyOlIe1va7s4",
  authDomain: "uni-match-beta.firebaseapp.com",
  databaseURL: "https://uni-match-beta-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uni-match-beta",
  storageBucket: "uni-match-beta.firebasestorage.app",
  messagingSenderId: "126239984967",
  appId: "1:126239984967:web:e5ffc7887c046abec7d062",
  measurementId: "G-6WX0T9KP5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)