import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCA1uT2IwQuRB25W9b0th01O6wkxcZv4RE",
    authDomain: "hitalent-846dd.firebaseapp.com",
    projectId: "hitalent-846dd",
    storageBucket: "hitalent-846dd.appspot.com",
    messagingSenderId: "159221205988",
    appId: "1:159221205988:web:5b5d7d6bde4c4adb5095f1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export{ db, googleAuthProvider, facebookAuthProvider, firebase };