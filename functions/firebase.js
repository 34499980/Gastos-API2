// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJBXrm_vFWN-zpjuY6EHCQVPfYWtWE740",
  authDomain: "gastosdiarios-e2f45.firebaseapp.com",
  projectId: "gastosdiarios-e2f45",
  storageBucket: "gastosdiarios-e2f45.appspot.com",
  messagingSenderId: "436280068960",
  appId: "1:436280068960:web:ad9f396c062286f4a8ac05",
  measurementId: "G-XL8PN6CYMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);