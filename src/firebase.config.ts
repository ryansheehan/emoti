import * as firebase from "firebase/app";

// app initialization
const firebaseApp: firebase.app.App = firebase.initializeApp({
  apiKey: "AIzaSyC135_nGDK-X6nNAExvMx0mmhR4z_wWX1Y",
  authDomain: "emotivent.firebaseapp.com",
  databaseURL: "https://emotivent.firebaseio.com",
  projectId: "emotivent",
  storageBucket: "emotivent.appspot.com",
  messagingSenderId: "849150329110"
}, "emotivent");

export default firebaseApp;


