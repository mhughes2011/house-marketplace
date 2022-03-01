import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh4B4xE-rO1TiDG-wQhoqOOxuivnx70l8",
  authDomain: "house-marketplace-app-f2220.firebaseapp.com",
  projectId: "house-marketplace-app-f2220",
  storageBucket: "house-marketplace-app-f2220.appspot.com",
  messagingSenderId: "749634202166",
  appId: "1:749634202166:web:eba45affc041c7a0730697"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()