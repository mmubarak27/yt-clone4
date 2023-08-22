// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWvjm0eLzeBu9K5SIBUtFVI2qbUKygMOQ",
  authDomain: "yt-clone-bc219.firebaseapp.com",
  projectId: "yt-clone-bc219",
  storageBucket: "yt-clone-bc219.appspot.com",
  messagingSenderId: "1046066644705",
  appId: "1:1046066644705:web:11d0ff9d230c6add5d99a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timestamp = serverTimestamp();

export { app, db, auth, timestamp, provider };
