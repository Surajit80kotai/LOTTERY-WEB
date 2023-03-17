import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCvpLqe0Rr5adjlVFf0zS__dFmX4ISRMqU",
    authDomain: "eshac-play.firebaseapp.com",
    projectId: "eshac-play",
    storageBucket: "eshac-play.appspot.com",
    messagingSenderId: "380831248111",
    appId: "1:380831248111:web:780c7e1c41ddc3ce0cb51a",
    measurementId: "G-MDBXDR6582"
};

initializeApp(firebaseConfig);
export const auth = getAuth()
export const google = new GoogleAuthProvider()
export const facebook = new FacebookAuthProvider()