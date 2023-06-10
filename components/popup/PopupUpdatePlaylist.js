import { View, Text, Modal, TouchableWithoutFeedback, FlatList, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, icons } from '../../constants'
import MyInput from '../misc/MyInput'
import MyButton from '../misc/MyButton';
import { useSelector, useDispatch } from 'react-redux';
import { serverTimestamp } from 'firebase/database';
import { deleteDataFirebase, updateDataPlaylistsFirebase } from '../../firebase/controllerDB';
import { getAllPlaylistByUserId } from '../../redux/slices/playlistsSlice';
export default function PopupUpdatePlaylist({ isVisiblePopup, setIsVisiblePopup, playlistSeclected }) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user)
    const { playlists } = useSelector((state) => state.playlists)
    const { key, name, description, imageUrl } = playlistSeclected;
    const [namePlayist, setNamePlaylist] = useState('');
    const [descriptionPlaylist, setDescriptionPlaylist] = useState('');
    const [imgUrl, setImgeUrl] = useState('')
    const [imgUrlNewPlaylist, setImgUrlNewPlaylist] = useState('');
    const [imgNameNewPlaylist, setImgNameNewPlaylist] = useState('')

    useEffect(() => {

        if (playlistSeclected) {
            setNamePlaylist(name);
            setDescriptionPlaylist(description);
            setImgeUrl(imageUrl);
        }
    }, [playlistSeclected])


    const handleUpdatePlaylist = async () => {
        const checkNameExist = playlists.find(({ name }) => name === namePlayist)
        if (namePlayist != '') {
            console.log('checkNameExist', checkNameExist)
            if (checkNameExist == undefined) {

                if (imgUrlNewPlaylist) {
                    const result = await fetch(imageUrl)
                    const blob = await result.blob()
                    const urlFireBase = await uploadFileStorage(`images/${imgNameNewPlaylist}`, blob)
                    setImgeUrl(urlFireBase);
                   
                }

                let updatePlaylist;
                if (imageUrl) {
                    updatePlaylist = {
                        name: namePlayist,
                        description: descriptionPlaylist,
                        imageUrl: imgUrl,
                        modifyAt: serverTimestamp(),
                    }
                } else {
                    updatePlaylist = {
                        name: namePlayist,
                        description: descriptionPlaylist,
                        modifyAt: serverTimestamp(),
                    }
                }

                const responeUpdatePlaylist = await updateDataPlaylistsFirebase(`playlists/${key}`, updatePlaylist);
                if (responeUpdatePlaylist) {
                    dispatch(getAllPlaylistByUserId({userId: user.uid}))
                }
                if (responeUpdatePlaylist) {
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

    const handleDeltePlaylist = async () => {
        try {
            const resDeletePalylist = deleteDataFirebase(`playlist/${key}`)
            ToastAndroid.show(`Xóa thành công ${name}`, ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show(`Xóa không thành công ${name}`, ToastAndroid.SHORT);
        }
    }
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
                                {
                                    imgUrl && <Image source={{ uri: imgUrl }} style={{ height: 100, width: 100, marginRight: 20, borderRadius: 10 }} />
                                }
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