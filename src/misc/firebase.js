// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getStorage} from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD6m7Lv3gUfuxcxzA_W_w3OTOhHU5lu4E",
  authDomain: "chat-app-d15ea.firebaseapp.com",
  databaseURL: "https://chat-app-d15ea-default-rtdb.firebaseio.com",
  projectId: "chat-app-d15ea",
  storageBucket: "chat-app-d15ea.appspot.com",
  messagingSenderId: "46517526525",
  appId: "1:46517526525:web:a2a4a5f43bc49f5ec3c394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database=getDatabase(app);
export const storage=getStorage(app);