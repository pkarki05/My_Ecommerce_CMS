// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0yFt_Gmk7thlrLhhWkNcf0LArXizX0dI",
  authDomain: "e-commerce-project-learning.firebaseapp.com",
  projectId: "e-commerce-project-learning",
  storageBucket: "e-commerce-project-learning.appspot.com",
  messagingSenderId: "527736303622",
  appId: "1:527736303622:web:3f19540b72bc6db2509387",
  measurementId: "G-YFZW810T2C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
