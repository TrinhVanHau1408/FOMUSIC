import {
    firebaseStorage,
    firebaseStorageRef
} from './connectDB'

import { getDownloadURL, uploadBytes } from 'firebase/storage'

const getUrl = async (path) => {
    const request = await firebaseStorageRef(firebaseStorage, path)
    const url = await getDownloadURL(request)
    return url
}

const uploadFileStorage = async (pathFireBase, file) => {
    try {
        const fileRef = firebaseStorageRef(firebaseStorage, pathFireBase)
        const rep = await uploadBytes(fileRef, file)
        const url = await getDownloadURL(fileRef)
        return url
    }
    catch (error) {
        console.log("ERROR", error)
        return null
    }

}

export { getUrl, uploadFileStorage }

