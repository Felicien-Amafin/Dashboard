import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDuZPnlKJFgzhgVeW0ItOAixJIa5mwWyMk",
  authDomain: "dashboard-700d3.firebaseapp.com",
  projectId: "dashboard-700d3",
  storageBucket: "dashboard-700d3.firebasestorage.app",
  messagingSenderId: "568229419669",
  appId: "1:568229419669:web:508ec9b5294342aed1999c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);