// Import the functions you need from the SDKs you need
// import firebase from 'firebase'
// import * as firebase from "firebase";

import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
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
  update as firebaseDataUpdate,
  get,
  child,
  onValue,
  remove,
  orderByChild, equalTo, once,value ,query,
  serverTimestamp, limitToFirst, limitToLast, orderByValue
} from 'firebase/database'

import { getStorage,
       ref as firebaseStorageRef} from "firebase/storage";
// import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsHf3hXcS7eG7R6aK5ZrTXqGiczUdYh4Q",
  authDomain: "appmusic-db341.firebaseapp.com",
  databaseURL: "https://appmusic-db341-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fomusicapp-12403",
  storageBucket: "appmusic-db341.appspot.com",
  messagingSenderId: "250863214169",
  appId: "1:250863214169:android:2856e353eb614ee8b6db48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseDatabase = getDatabase();
const firebaseStorage = getStorage();
const provider = new GoogleAuthProvider();

export {
  auth,
  firebaseDatabase,
  firebaseDatabaseRef,
  firebaseDatabaseSet,
  firebaseDataUpdate,
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
  signOut,
  firebaseStorage,
  firebaseStorageRef,
  orderByChild, equalTo, once,value,query,limitToLast, limitToFirst, orderByValue

}
