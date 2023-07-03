// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO2yxn5ciLK1fg5bprI7MszUz7ee6Clt0",
  authDomain: "todolist-firebase-8cf9e.firebaseapp.com",
  projectId: "todolist-firebase-8cf9e",
  storageBucket: "todolist-firebase-8cf9e.appspot.com",
  messagingSenderId: "277531139736",
  appId: "1:277531139736:web:e8b785f6d323b13122baed",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
