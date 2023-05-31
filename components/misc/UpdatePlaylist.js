import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions, Animated, } from "react-native";
import { colors, icons, images, sizes } from '../../constants'
import { readDataFirebase, writeDataFirebase, updateDataPlaylistsFirebase } from "../../firebase/controllerDB";
import { serverTimestamp } from 'firebase/database'
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import { getDataAsyncStorage } from "../../utilities/AsyncStorage";
import { pick, types, isCancel } from 'react-native-document-picker'
import { uploadFileStorage } from "../../firebase/controllerStorage";


const heigtScreen = Dimensions.get('window').height;

export default function UpdatePlaylist({ id, handleNavigator,
    height = heigtScreen * 0.5,
    type
}) {
    const [namePlaylist, setNamePlaylist] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [imageName, setImageName] = React.useState('')
    const [imageUrl, setImageUrl] = React.useState()

    const translateY = React.useState(new Animated.Value(heigtScreen * 0.5))[0];

    React.useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [])

    const handleUpdatePlaylist = async () => {
        if (!(namePlaylist != '' && description != '' && imageName == '')) {
            try {
                const wiriteData = {
                    // name: namePlaylist,
                    // description: description,
                    // imageUrl: urlFireBase,
                    modifyAt: serverTimestamp(),
                }
                let flags = 1

                if (type == 'name') {
                    if (namePlaylist) {
                        wiriteData['name'] = namePlaylist
                    }
                    else {
                        flags = 0
                    }
                }

                if (type == 'description') {
                    if (description) {
                        wiriteData['description'] = description
                    }
                    else {
                        flags = 0
                    }
                }
                if (type == 'image') {
                    if (imageUrl) {
                        const result = await fetch(imageUrl)
                        const blob = await result.blob()
                        const urlFireBase = await uploadFileStorage(`images/${imageName}`, blob)
                        wiriteData['imageUrl'] = urlFireBase
                    }
                    flags = 0
                }
                if (flags) {
                    try {
                        const rep = await updateDataPlaylistsFirebase(`playlists/${id}`, wiriteData)
                        if (rep) {
                            handleNavigator(false)
                        }
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
                else {
                    alert("Chưa có thông tin")
                }
            }
            catch (err) {
                alert('Error', err)
            }
        }
        else {
            alert('Vui lòng điền thông tin cần chỉnh sửa')
        }
    }
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
        } catch (err) {
            if (isCancel(err)) {
                console.log("User cancelled upload", err)
            }
            else {
                console.log(err)
            }
        }
        console.log("button pressed");
    }
    if (type == 'name') {
        return (
            <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
                <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                    onPress={() => handleNavigator(false)}
                    activeOpacity={1.0} />
                <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                    <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                        <MyInput placeholder={"Tên playlist mới"} icon={icons.userCircle} setState={setNamePlaylist} valueState={namePlaylist} />
                    </View>
                    <View >
                        <MyButton title="Cập nhật" handleNavigator={handleUpdatePlaylist} />
                    </View>
                    <View style={{ flex: 1, height: 10 }}></View>
                </Animated.View>
            </View>
        )
    }
    if (type == 'description') {
        return (
            <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
                <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                    onPress={() => handleNavigator(false)}
                    activeOpacity={1.0} />
                <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                    <View style={{ marginLeft: 15, marginRight: 15 }}>
                        <MyInput placeholder={"Mô tả về playlist"} icon={icons.userCircle} setState={setDescription} valueState={description} />
                    </View>
                    <View >
                        <MyButton title="Cập nhật" handleNavigator={handleUpdatePlaylist} />
                    </View>
                    <View style={{ flex: 1, height: 10 }}></View>
                </Animated.View>
            </View>
        );
    }
    if (type == 'image') {
        return (
            <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
                <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                    onPress={() => handleNavigator(false)}
                    activeOpacity={1.0} />
                <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                    <View style={{ marginLeft: 35, marginRight: 35, marginTop:30 }}>
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
                        <MyButton title="Cập nhật" handleNavigator={handleUpdatePlaylist} />
                    </View>
                    <View style={{ flex: 1, height: 10 }}></View>
                </Animated.View>
            </View>
        );
    }

    return (
        <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                onPress={() => handleNavigator(false)}
                activeOpacity={1.0} />
            <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
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
                    <MyButton title="Cập nhật" handleNavigator={handleUpdatePlaylist} />
                </View>
                <View style={{ flex: 1, height: 10 }}></View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '40%',
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
