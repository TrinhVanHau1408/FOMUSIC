
import {  auth,
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
    signOut,} from "./connectDB"
import { remove } from 'firebase/database'

const readDataFirebase = async ( path) => {
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
  
  const writeDataFirebase = async ( path, id, data) => {
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
  
  const deleteDataFirebase = async ( path ) => {
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
    readDataFirebase,
    writeDataFirebase,
    deleteDataFirebase
}