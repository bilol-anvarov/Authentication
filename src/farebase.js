// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf_AJUXcxVBUVri1isdQqyVooTBhIrOLk",
  authDomain: "woven-nimbus-414714.firebaseapp.com",
  projectId: "woven-nimbus-414714",
  storageBucket: "woven-nimbus-414714.appspot.com",
  messagingSenderId: "516346387957",
  appId: "1:516346387957:web:89611852b405dddb96d4bc",
  measurementId: "G-HENMVL5540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
 