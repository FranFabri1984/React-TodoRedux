import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEIlkCDvP81_Kdq6UjVpoW4veSiLNoDeI",
  authDomain: "todoredux-c3c83.firebaseapp.com",
  projectId: "todoredux-c3c83",
  storageBucket: "todoredux-c3c83.appspot.com",
  messagingSenderId: "513524963196",
  appId: "1:513524963196:web:3bbc6b434a1494044ab6f9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
