import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions, Animated, FlatList } from "react-native";
import { colors, icons, images, sizes } from '../../constants'
import { readDataFirebase, writeDataFirebase } from "../../firebase/controllerDB";
import { serverTimestamp } from 'firebase/database'
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import { getDataAsyncStorage } from "../../utilities/AsyncStorage";

const heigtScreen = Dimensions.get('window').height;

export default function CreatePlaylist({ song, handleNavigator,
    height = heigtScreen * 0.5,
}) {
    const [namePlaylist, setNamePlaylist] = React.useState('')
    const [description, setDescription] = React.useState('')
    const translateY = React.useState(new Animated.Value(heigtScreen * 0.5))[0];

    React.useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [])

    const handleCreatePlaylist = async () => {
        if (namePlaylist != '' && description != '') {
            try {
                const userId = await getDataAsyncStorage('userUid')
                const wiriteData = {
                    name: namePlaylist,
                    description: description,
                    userId: userId,
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/images%2Fplaylist-nhacque.jpg?alt=media&token=55e26d2a-ae72-47fd-a838-3ce6b3725d8f',
                    songs: {
                    },
                    createdAt: serverTimestamp(),
                    modifyAt: serverTimestamp(),
                }
                try {
                    const rep = await writeDataFirebase('playlists', wiriteData)
                    if (rep) {
                        handleNavigator(false)
                    }
                }
                catch (e) {
                    console.log(e)
                }
            }
            catch (err) {
                alert('Error', err)
            }
        }
        else {
            alert('Vui lòng điền thông tin của playlist')
        }
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
                <View >
                    <MyButton title="Tạo playlist" handleNavigator={handleCreatePlaylist} />
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
