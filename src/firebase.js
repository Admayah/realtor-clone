// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXPa20yg7Lv5jatS82_vPBw59sk02zdBw",
  authDomain: "realtor-clone-a1b87.firebaseapp.com",
  projectId: "realtor-clone-a1b87",
  storageBucket: "realtor-clone-a1b87.appspot.com",
  messagingSenderId: "1095396342243",
  appId: "1:1095396342243:web:125ad91ea8ed51282508d6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()