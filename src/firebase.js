// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdQwKCm0hLLpTvqchGH-gmX8CzNpMfakQ",
  authDomain: "study-3f3a6.firebaseapp.com",
  projectId: "study-3f3a6",
  storageBucket: "study-3f3a6.appspot.com",
  messagingSenderId: "429583684770",
  appId: "1:429583684770:web:1ef29d2ea9490d328173fb",
  databaseURL: "https://study-3f3a6-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


export { auth, db };