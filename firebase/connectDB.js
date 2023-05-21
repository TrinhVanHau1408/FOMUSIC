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
  get,
  child,
  onValue,
  remove,

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

const readDataFirebase = async (firebaseDatabase, path) => {
  try {
    const dbRef = firebaseDatabaseRef(firebaseDatabase);
    const snapshot = await get(child(dbRef, path))

    console.log("read data firebase successfully")
    // console.log(snapshot)

    return snapshot
  }
  catch (error) {
    console.log("ERROR", error)
    return null
  }
}

const writeDataFirebase = async (firebaseDatabase, path, id, data) => {
  try {
    await firebaseDatabaseSet(firebaseDatabaseRef(firebaseDatabase, `${path}/${id}`), data);
    console.log("save data firebase successfully")
    return true;
  }
  catch (err) {
    console.log("save data firebase failed", err);
    return false;
  }

}

const deleteDataFirebase = async (firebaseDatabase, path) => {
  try {
    const dbRef = firebaseDatabaseRef(firebaseDatabase, path)
    await remove(dbRef)
    console.log('delete data firebase successfully')
    return true
  }
  catch(err)
  {
    console.log('delete data firebase failed', err)
    return false
  }
}

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
  signOut,
  readDataFirebase,
  writeDataFirebase,
  deleteDataFirebase

}
