import {initializeApp} from 'firebase';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC135_nGDK-X6nNAExvMx0mmhR4z_wWX1Y",
  authDomain: "emotivent.firebaseapp.com",
  databaseURL: "https://emotivent.firebaseio.com",
  //storageBucket: "emotivent.appspot.com",
  //messagingSenderId: "<SENDER_ID>"
}, "emotivent");

const db = firebaseApp.database();

export { db };
