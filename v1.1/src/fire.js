import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDUVAzvl_j0R0ChB_14mzV7pLQhd4_csYE",
    authDomain: "mindeater-c7922.firebaseapp.com",
    databaseURL: "https://mindeater-c7922.firebaseio.com",
    projectId: "mindeater-c7922",
    storageBucket: "mindeater-c7922.appspot.com",
    messagingSenderId: "114380967771"
};

const fire = firebase.initializeApp(config);

export default fire;