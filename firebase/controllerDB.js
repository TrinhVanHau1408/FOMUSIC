
import {
  auth,
  firebaseDatabase,
  firebaseDatabaseRef,
  firebaseDatabaseSet,
  get,
  child,
  serverTimestamp,
  orderByChild, equalTo, query, firebaseDataUpdate
} from "./connectDB"
import { remove, push, update, set } from 'firebase/database'


const readDataFirebaseWithChildCondition = async (parentNode, nameCodition, valueCodition) => {


  // try {
  // console.log(`Parent node: ${parentNode}, nameCodition: ${nameCodition}, valueCodition: ${valueCodition}`);

    const parentRef = firebaseDatabaseRef(firebaseDatabase, parentNode);

    const queryRef = query(parentRef, orderByChild(nameCodition), equalTo(valueCodition));
  
    try {
      const snapshot = await get(queryRef);
      return snapshot.val();

    } catch (error) {
      console.log("Lỗi khi truy vấn dữ liệu:", error);
      return null;
    }
  //   // const snapshot = await get(parentRef, orderByChild(nameCodition), equalTo(valueCodition));
  //   const snapshot = await get(queryRef);
  //   console.log("readDataFirebaseWithChildCondition",snapshot)
  //   if (snapshot.exists()) return snapshot.val();

  //   else return null

  // } catch {
  //   return null;
  // }
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

const updateDataFirebase = async (path, data) => {
  try {
    const updateRef = firebaseDatabaseRef(firebaseDatabase, path);
    await firebaseDataUpdate(updateRef, data);
    return true;
  } catch(e) {
    return false;
  }
}
const updateDataPlaylistsFirebase = async (path, data) => {
  try {
    const dbRef = firebaseDatabaseRef(firebaseDatabase, path)
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
  readDataFirebaseWithChildCondition,
  updateDataFirebase
}