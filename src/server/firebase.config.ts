import {initializeApp} from 'firebase';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// App initialization
const firebaseApp = initializeApp({
  apiKey: "AIzaSyC135_nGDK-X6nNAExvMx0mmhR4z_wWX1Y",
  authDomain: "emotivent.firebaseapp.com",
  databaseURL: "https://emotivent.firebaseio.com",
  //storageBucket: "emotivent.appspot.com",
  //messagingSenderId: "<SENDER_ID>"
}, "emotivent");

// Database
export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

