import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOsxrNK4SRyWh0OQ268O3qIttkUQ5m49Q",
    authDomain: "immo-89c1d.firebaseapp.com",
    projectId: "immo-89c1d",
    storageBucket: "immo-89c1d.appspot.com",
    messagingSenderId: "395902372438",
    appId: "1:395902372438:web:b36a5a601b822611c8c9f7",
    measurementId: "G-THZ51XTCCN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage };
export const db = firebaseApp.firestore();