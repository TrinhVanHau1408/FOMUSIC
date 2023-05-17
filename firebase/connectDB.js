// Import the functions you need from the SDKs you need
// import firebase from 'firebase'
// import * as firebase from "firebase";

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  sendEmailVerification,
  signOut
 } from 'firebase/auth';
import { 
  getDatabase, 
  set as firebaseDatabaseSet, 
  ref as firebaseDatabaseRef,
  get ,
  child,
  onValue,

  serverTimestamp 
} from 'firebase/database'
// import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACLFEd6H8r6fwnFMLVLy5Dl1rzcPPn5WI",
  authDomain: "fomusicapp-12403.firebaseapp.com",
  databaseURL: "https://fomusicapp-12403-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fomusicapp-12403",
  storageBucket: "fomusicapp-12403.appspot.com",
  messagingSenderId: "65137084903",
  appId: "1:65137084903:android:f4be90f05ec799b0e11542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseDatabase = getDatabase();
const provider = new GoogleAuthProvider();
export {
  auth,
  firebaseDatabase,
  firebaseDatabaseRef,
  firebaseDatabaseSet,
  get,
  child,
  onValue,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  serverTimestamp,
  provider,
  signInWithRedirect,
  sendEmailVerification,
  signOut
  
}
