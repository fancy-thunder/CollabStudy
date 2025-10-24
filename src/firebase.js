// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGCXeFX-p6Y6_KQmRSDmwn3lGMS38GuMw",
    authDomain: "ai-tutor-6f43d.firebaseapp.com",
    projectId: "ai-tutor-6f43d",
    storageBucket: "ai-tutor-6f43d.appspot.com", // fixed typo: .app -> .appspot.com
    messagingSenderId: "728486013",
    appId: "1:728486013:web:056e6e7d44cbc580efe114",
    measurementId: "G-9PZWRVECLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);




export const setupRecaptcha = (containerId = "recaptcha-container") => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId, // should be containerId, not auth
    {
      size: "invisible",
      callback: (response) => {
        console.log("Recaptcha solved");
      },
    },
    auth // pass auth as third argument
  );
};

// ✅ Helper function to send OTP
export const sendOTP = async (phoneNumber) => {
  if (!window.recaptchaVerifier) {
    setupRecaptcha();
  }
  const appVerifier = window.recaptchaVerifier;
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};