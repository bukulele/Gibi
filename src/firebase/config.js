import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0pyiENBNbTsSoauXjXQ53ev8_ee1C__Q",
  authDomain: "action-tracker-a5fd8.firebaseapp.com",
  projectId: "action-tracker-a5fd8",
  storageBucket: "action-tracker-a5fd8.appspot.com",
  messagingSenderId: "804313483654",
  appId: "1:804313483654:web:d0bc3db235e5ddc3e20407",
  measurementId: "G-99FHWZL17E",
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore();

export { firebase, firestore };
