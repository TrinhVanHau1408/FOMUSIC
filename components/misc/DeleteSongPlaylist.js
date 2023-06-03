import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions, Animated, FlatList, ActivityIndicator, ToastAndroid } from "react-native";
import { colors, icons, images, sizes } from '../../constants'
import { readDataFirebase, writeDataFirebase, deleteDataFirebase } from "../../firebase/controllerDB";
import { serverTimestamp } from 'firebase/database'
import MyAdd from "./MyAdd";
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import CreatePlaylist from "./CreatePlaylist";
import { getDataAsyncStorage } from "../../utilities/AsyncStorage";

const heigtScreen = Dimensions.get('window').height;

export default function     DeleteSongPlaylists({ handleNavigator, handleRequestNext,
    height = null,
    title,
    songed = {}
}) {
    const [inputSearch, setInputSearch] = useState('')
    const [songs, setSongs] = useState()
    const translateY = useState(new Animated.Value(heigtScreen * 0.5))[0];
    const [songAdded, setSongsAdded] = useState({})
    const [isNext, setIsNext] = useState(false)
    const [ isFlatlist, setIsFlatlist] = useState()

    const getSongs = async () => {
        const rep = await readDataFirebase('songs')
        // console.log(rep)
        const data = Object.keys(rep).map(key => {
            const check = key in songed
            if (check)
                return {
                    title: rep[key].name,
                    artist: rep[key].artist,
                    songImg: rep[key].imgUrl,
                    key: key,
                    status: true
                }
        })
        const ischeck = data.every((element) => element === undefined)
        if(ischeck)
        {
            setSongs([])
        }
        else
        {
            setSongs(data)
        }
        // console.log(data)
    }

    const handleAdd = (id, index, status) => {
        const dataSong = [...songs]
        dataSong[index].status = !status
        setSongs(dataSong)
        if (status) {
            const dataSongAdded = { ...songAdded }
            dataSongAdded[id] = ""
            ToastAndroid.show('Đã xóa', ToastAndroid.SHORT);
            setSongsAdded(dataSongAdded)
        }
        else {
            const dataSongAdded = { ...songAdded }
            delete dataSongAdded[id]
            setSongsAdded(dataSongAdded)
        }
    }

    useEffect(() => {
        getSongs()
    }, [])

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        height = null
    }, [])

    return (
        <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%', zIndex: 10 }}>
            <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                onPress={() => handleNavigator(false)}
                activeOpacity={1.0} />
            <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                    <MyInput placeholder={"Search"} icon={icons.search} setState={setInputSearch} valueState={inputSearch} />
                </View>
                <View>
                    {songs ? 
                    <FlatList
                        style={{ marginTop: 28, marginBottom: 15, height: 275 }}
                        data={songs}
                        renderItem={({ item, index }) => {
                            if (item) {
                                return (<MyAdd
                                    id={item.key}
                                    songName={item.title}
                                    songImg={{ uri: item.songImg }}
                                    artistName={item.artist}
                                    isLike={item.isLiked}
                                    index={index}
                                    status={item.status}
                                    handleAdd={handleAdd}
                                />)
                            }
                        }
                        }
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                    />:
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="blue" />
                        </View>}
                </View>
                <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10 }}
                        onPress={() => handleRequestNext(true, songAdded)}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>{title}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: 15 }}></View>
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: "10%",
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
