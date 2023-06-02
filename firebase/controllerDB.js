
import {
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
  signOut,orderByChild, equalTo, query
} from "./connectDB"
import { remove, push, update, set } from 'firebase/database'


const readDataFirebaseWithChildCondition = async (parentNode, nameCodition, valueCodition) => {

  console.log(`Parent node: ${parentNode}, nameCodition: ${nameCodition}, valueCodition: ${valueCodition}`);
  const parentRef = firebaseDatabaseRef(firebaseDatabase, parentNode);

  const queryRef = query(parentRef, orderByChild(nameCodition), equalTo(valueCodition));

  get(queryRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      // console.log('readDataFirebaseWithChildCondition: ', data);
      return {data: data, error: false};
    } else {
      // console.log('Không tìm thấy playlist cho userId này.');
      return {data: null, error: false};
    }
  }).catch((error) => {
    // console.error('Lỗi khi lấy dữ liệu playlist:', error);
    return {data: null, error: true};
  });


  try {
    const parentRef = firebaseDatabaseRef(firebaseDatabase, parentNode);

    const queryRef = query(parentRef, orderByChild(nameCodition), equalTo(valueCodition));
  
    const snapshot = await get(queryRef);

    if (snapshot.exists()) return snapshot.val();
    else return null

  } catch {
    return null;
  }
}

const readDataFirebase = async (path) => {
  try {
    const dbRef = firebaseDatabaseRef(firebaseDatabase);
    const snapshot = await get(child(dbRef, path))

    console.log("read data firebase successfully")
    // console.log(snapshot)

    return snapshot.val()
  }
  catch (error) {
    console.log("ERROR", error)
    return null
  }
}

const writeDataFirebase = async (path, data, id) => {
  try {
    if (id) {
      await firebaseDatabaseSet(firebaseDatabaseRef(firebaseDatabase, `${path}/${id}`), data);
      console.log("save data firebase successfully")
      return true;
    }
    else {
      await push(firebaseDatabaseRef(firebaseDatabase, path), data)
      console.log("save data firebase successfully")
      return true;
    }
  }
  catch (err) {
    console.log("save data firebase failed", err);
    return false;
  }

}

const deleteDataFirebase = async (path) => {
  try {
    const dbRef = firebaseDatabaseRef(firebaseDatabase, path)
    await remove(dbRef)
    console.log('delete data firebase successfully')
    return true
  }
  catch (err) {
    console.log('delete data firebase failed', err)
    return false
  }
}

const updateDataPlaylistsFirebase = async (path, data) => {
  try {
    const dbRef = await firebaseDatabaseRef(firebaseDatabase, path)
    const data_previous = await get(dbRef)
    const data_update =
    {
      name: data.name ? data.name : data_previous.val().name,
      description: data.description ? data.description : (data_previous.val().description ? data_previous.val().description : ''),
      userId: data_previous.val().userId,
      imageUrl: data.imageUrl ? data.imageUrl : (data_previous.val().imageUrl ? data_previous.val().imageUrl : ''),
      songs: data.songs ? data.songs : (data_previous.val().songs ? data_previous.val().songs : {}),
      createdAt: data_previous.val().createdAt,
      modifyAt: serverTimestamp(),
    }
    console.log(data_update)
    firebaseDatabaseSet(dbRef, data_update)
    console.log('update data firebase successfully')
    return true
  }
  catch (err) {
    console.log('Update data firebase failed', err)
    return false
  }
}

export {
  readDataFirebase,
  writeDataFirebase,
  deleteDataFirebase,
  updateDataPlaylistsFirebase,
  readDataFirebaseWithChildCondition
}