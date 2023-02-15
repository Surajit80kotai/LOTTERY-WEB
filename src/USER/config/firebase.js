import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCa1V2-KkaQd7-9ne1U9Rnh47labqL2lqk",
    authDomain: "webauth-9d5fa.firebaseapp.com",
    projectId: "webauth-9d5fa",
    storageBucket: "webauth-9d5fa.appspot.com",
    messagingSenderId: "950766581154",
    appId: "1:950766581154:web:d77234ec4142a33e292efb"
};

initializeApp(firebaseConfig);
export const auth = getAuth()
export const google = new GoogleAuthProvider()
export const facebook = new FacebookAuthProvider()