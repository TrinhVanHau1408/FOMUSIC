import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions, Animated, FlatList, ToastAndroid } from "react-native";
import { colors, icons, images, sizes } from '../../constants'
import { readDataFirebase, writeDataFirebase } from "../../firebase/controllerDB";
import { serverTimestamp } from 'firebase/database'
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import { getDataAsyncStorage } from "../../utilities/AsyncStorage";
import { pick, types, isCancel } from 'react-native-document-picker'
import { uploadFileStorage } from "../../firebase/controllerStorage"
import { useDispatch, useSelector } from 'react-redux'

const heigtScreen = Dimensions.get('window').height;

export default function CreatePlaylist({ song, handleNavigator, handleOutside,
    height = heigtScreen * 0.5,
}) {
    const { loading, error, playlists } = useSelector((state) => state.playlists)
    const [namePlaylist, setNamePlaylist] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState()
    const translateY = useState(new Animated.Value(heigtScreen * 0.5))[0]
    const [imageName, setImageName] = useState('')

    const selectFile = async () => {
        try {
            const res = await pick({
                type: [types.images]
            })
            // const result = await fetch(res[0].uri)
            // const blog = await result.blob()
            // // console.log(blog)
            // // const file = await RNFS.readFile('content://com.android.providers.media.documents/document/image%3A17', 'base64')
            // // console.log(file)
            // await uploadFileStorage(`images/${res[0].name}`, blog)

            setImageName(res[0].name)
            setImageUrl(res[0].uri)
            ToastAndroid.show('Upload image successfully', ToastAndroid.SHORT);
        } catch (err) {
            if (isCancel(err)) {
                console.log("User cancelled upload", err)
            }
            else {
                console.log(err)
            }
        }
        // console.log("button pressed");
    }

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [])

    const handleCreatePlaylist = async () => {
        console.log("handleCreatePlaylist")
        if (namePlaylist != '') {
            const check = Object.keys(playlists).find(key => playlists[key].name.toLowerCase() === namePlaylist.toLowerCase())
            if(!check)
            {
                try {
                    var urlFireBase = 'https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/images%2Fplaylist-nhacque.jpg?alt=media&token=55e26d2a-ae72-47fd-a838-3ce6b3725d8f'
                    if(imageUrl)
                    {
                        const result = await fetch(imageUrl)
                        const blob = await result.blob()
                        urlFireBase = await uploadFileStorage(`images/${imageName}`, blob)
                    }
                    const userId = await getDataAsyncStorage('userUid') // user
                    const wiriteData = {
                        name: namePlaylist,
                        description: description,
                        userId: userId,
                        imageUrl: urlFireBase,
                        songs: song,
                        createdAt: serverTimestamp(),
                        modifyAt: serverTimestamp(),
                    }
                    try {
                        const rep = await writeDataFirebase('playlists', wiriteData)
                        if (rep) {
                            handleNavigator(false)
                            ToastAndroid.show('Successful', ToastAndroid.SHORT);
                        }
                        else {
                            ToastAndroid.show('Failed', ToastAndroid.SHORT);
                        }
                    }
                    catch (e) {
                        console.log(e)
                        ToastAndroid.show('Failed', ToastAndroid.SHORT);
                    }
                }
                catch (err) {
                    console.log('Error', err)
                    ToastAndroid.show('Failed', ToastAndroid.SHORT);
                }
            }
            else
            {
                Alert.alert("Tên playlist đã tồn tại")

            }
        }
        else {
            Alert.alert('Vui lòng điền thông tin của playlist')
        }
    }


    return (
        <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                onPress={() => handleNavigator(false)}
                activeOpacity={1.0} />
            <View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                    <MyInput placeholder={"Tên playlist"} icon={icons.userCircle} setState={setNamePlaylist} valueState={namePlaylist} />
                </View>
                <View style={{ marginLeft: 15, marginRight: 15 }}>
                    <MyInput placeholder={"Mô tả về playlist"} icon={icons.userCircle} setState={setDescription} valueState={description} />
                </View>
                <View style={{ marginLeft: 35, marginRight: 35 }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'rgba(0, 0, 255,0.6)',
                        borderRadius: 20, display: 'flex', justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,

                    }}
                        onPress={selectFile} >
                        {
                            imageUrl && <Image source={{ uri: imageUrl }} style={{ height: 40, width: 40, marginRight: 20 }} />
                        }
                        <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>{imageName ? imageName : "Hình ảnh"}</Text>
                    </TouchableOpacity>
                </View>

                <View >
                    <MyButton title="Tạo playlist" handleNavigator={handleCreatePlaylist} />
                </View>
                <View style={{ flex: 1, height: 10 }}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '20%',
        marginHorizontal: 2,
        borderRadius: 30,
        borderRadius: 30,
        width: '99%',
        maxHeight: heigtScreen * 0.5,
        backgroundColor: 'rgba(255, 255, 255,1)',
        translateY: - heigtScreen * 0.5,
        zIndex: 1
    },

    liststyle: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row'
    }

});
