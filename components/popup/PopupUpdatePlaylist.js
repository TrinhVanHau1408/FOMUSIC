import { View, Text, Modal, TouchableWithoutFeedback, FlatList, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pick, types, isCancel } from 'react-native-document-picker'
import { colors, icons, images } from '../../constants'
import MyInput from '../misc/MyInput'
import MyButton from '../misc/MyButton';
import { useSelector, useDispatch } from 'react-redux';
import { serverTimestamp } from 'firebase/database';
import { updateDataFirebase, } from '../../firebase/controllerDB';
import { getAllPlaylistByUserId } from '../../redux/slices/playlistsSlice';
import { uploadFileStorage } from '../../firebase/controllerStorage'
export default function PopupUpdatePlaylist({ isVisiblePopup, setIsVisiblePopup, playlistSeclected }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const { playlists } = useSelector((state) => state.playlists)
    const { key, name, description, imageUrl } = playlistSeclected;
    const [namePlayist, setNamePlaylist] = useState('');
    const [descriptionPlaylist, setDescriptionPlaylist] = useState('');
    const [imgUrl, setImgeUrl] = useState('')
    const [imgUrlNewPlaylist, setImgUrlNewPlaylist] = useState('');
    const [imgNameNewPlaylist, setImgNameNewPlaylist] = useState('')
    // console.log('playlistSeclected', playlistSeclected)
    useEffect(() => {

        if (playlistSeclected) {
            setNamePlaylist(name);
            setDescriptionPlaylist(description);
            setImgeUrl(imageUrl);
        }
    }, [playlists, playlistSeclected])


    const handleUpdatePlaylist = async () => {

        let checkNameExist = null

        if (namePlayist !== name) {
            checkNameExist = playlists.find(({ name }) => name === namePlayist)
        }

        if (namePlayist != '') {
            console.log('checkNameExist', checkNameExist)
            if (checkNameExist == undefined) {

                let urlFireBase = '';

                if (imgUrlNewPlaylist != '') {
                    const result = await fetch(imgUrlNewPlaylist)
                    const blob = await result.blob()
                    console.log('uploadFileStorageimgNameNewPlaylis', imgNameNewPlaylist)
                    urlFireBase = await uploadFileStorage(`images/${imgNameNewPlaylist}`, blob)
                    console.log('urlFireBase', urlFireBase)
                    setImgeUrl(urlFireBase);
                    


                }


                if (urlFireBase != '') {
                    console.log('imgUrl != imageUrl &&  imgUrl', imgUrl)
                    updatePlaylist = {
                        name: namePlayist,
                        description: descriptionPlaylist,
                        imageUrl: urlFireBase,
                        modifyAt: serverTimestamp(),
                    }

                    // console.log('updatePlaylist', updatePlaylist)
                } else {
                    console.log('else imgUrl != imageUrl &&  imgUrl')
                    updatePlaylist = {
                        name: namePlayist,
                        description: descriptionPlaylist,
                        modifyAt: serverTimestamp(),
                    }
                }

                const responeUpdatePlaylist = await updateDataFirebase(`playlists/${key}`, updatePlaylist);

                if (responeUpdatePlaylist) {
                    // console.log('updatePlaylist', updatePlaylist)
                    dispatch(getAllPlaylistByUserId({ userId: user.uid }))
                    ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
                    setIsVisiblePopup(false);

                }

            } else {
                // Name trùng
                // Tên đã tồn tại
                ToastAndroid.show('Tên này đã tồn tại', ToastAndroid.SHORT);
            }

        } else {
            // Name == '' 
            ToastAndroid.show('Vui lòng nhập tên cho playlist', ToastAndroid.SHORT);
        }
    }

    const hanleUploadImg = async () => {
        try {
            const res = await pick({
                type: [types.images]
            })

            setImgNameNewPlaylist(res[0].name)
            setImgUrlNewPlaylist(res[0].uri)
            console.log('res[0].name: ', res[0].name + " " + res[0].uri)
            ToastAndroid.show('Upload image successfully', ToastAndroid.SHORT);
        } catch (err) {
            if (isCancel(err)) {
                console.log("User cancelled upload", err)
            }
            else {
                console.log(err)
            }
        }
    }

    // const handleDeltePlaylist = async () => {
    //     try {
    //         const resDeletePalylist = deleteDataFirebase(`playlist/${key}`)
    //         ToastAndroid.show(`Xóa thành công ${name}`, ToastAndroid.SHORT);
    //     } catch (e) {
    //         ToastAndroid.show(`Xóa không thành công ${name}`, ToastAndroid.SHORT);
    //     }
    // }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisiblePopup}

        >

            <TouchableWithoutFeedback
                onPressOut={() => setIsVisiblePopup(false)}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.container}>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: colors.primary }}>Cập nhật playlist</Text>
                        </View>
                        <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                            <MyInput placeholder={"Tên playlist mới"} icon={icons.userCircle} valueState={namePlayist} setState={setNamePlaylist} />
                        </View>
                        <View style={{ marginLeft: 15, marginRight: 15 }}>
                            <MyInput placeholder={"Mô tả về playlist"} icon={icons.userCircle} valueState={descriptionPlaylist} setState={setDescriptionPlaylist} />
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                            <TouchableOpacity style={{

                                borderRadius: 20, display: 'flex', justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,

                            }}
                                onPress={hanleUploadImg}
                            >

                                <View style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                    {
                                        <Image source={imgUrlNewPlaylist ? { uri: imgUrlNewPlaylist } : (imgUrl ? { uri: imgUrl } : images.demo)} style={(imgUrlNewPlaylist || imgUrl) ? { height: 150, width: 150, borderRadius: 20 } : { height: 60, width: 60 }} />
                                    }
                                    {
                                        (imgUrlNewPlaylist || imageUrl) && <View style={{ height: 150, width: 150, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={icons.cameraEdit} style={{ height: 60, width: 60, }} />
                                        </View>

                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                            <MyButton title={'Cập nhật'} handleButton={handleUpdatePlaylist} />
                        </View>
                    </View>
                </View>

            </TouchableWithoutFeedback>

        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: 'auto',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 20,





    },

    liststyle: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row'
    }
});