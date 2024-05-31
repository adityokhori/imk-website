import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw8MWMZxqmUDBS6HWkNC0PM0-6KPV0Csw",
  authDomain: "imk-ebook.firebaseapp.com",
  projectId: "imk-ebook",
  storageBucket: "imk-ebook.appspot.com",
  messagingSenderId: "630676650733",
  appId: "1:630676650733:web:1a836c6cced56623756ae4",
  measurementId: "G-Y1E9C72W40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);