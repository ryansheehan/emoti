import * as firebase from 'firebase/app';
// import 'firebase/database';
// import 'firebase/auth';

// App initialization
const firebaseApp: firebase.app.App = firebase.initializeApp({
  apiKey: "AIzaSyC135_nGDK-X6nNAExvMx0mmhR4z_wWX1Y",
  authDomain: "emotivent.firebaseapp.com",
  databaseURL: "https://emotivent.firebaseio.com",
  //storageBucket: "emotivent.appspot.com",
  //messagingSenderId: "<SENDER_ID>"
}, "emotivent");

export default firebaseApp;

// Database
//export const db = firebaseApp.database();
//export const auth = firebaseApp.auth();

