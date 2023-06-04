import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions, Animated, FlatList, ActivityIndicator } from "react-native";
import { colors, icons, images, sizes } from '../../constants'
import { readDataFirebase, writeDataFirebase, deleteDataFirebase } from "../../firebase/controllerDB";
import { serverTimestamp } from 'firebase/database'
import MyAdd from "./MyAdd";
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import { getDataAsyncStorage } from "../../utilities/AsyncStorage";

const heigtScreen = Dimensions.get('window').height;

export default function AddSongPlaylists({ songs, handleNavigator,
    height = null,
    musiced,
    keylist
}) {
    const [inputSearch, setInputSearch] = React.useState('')
    const [music, setMusic] = React.useState()
    const [musicEd, setMusicEd] = React.useState(musiced)
    const [songsResult, setSongResult] = React.useState(songs)
    const translateY = React.useState(new Animated.Value(heigtScreen * 0.5))[0];

    const handleAdd = async (status, id) => {
        try {
            if (status) {
                const rep = await deleteDataFirebase(`playlists/${keylist}/songs/${id}`)
                var new_musicEd = musicEd
                delete musicEd[id]
                setMusicEd(new_musicEd)
                // console.log(new_musicEd, "Xóa")
                // var song_result = songsResult
                // delete s
                // console.log(music, "Xóa")
            }
            else {
                const rep = await writeDataFirebase(`playlists/${keylist}/songs`, "", id)

                // console.log(music, "Thêm")
                // console.log(rep)
                var new_musicEd = { ...musicEd }
                new_musicEd[id] = ""
                console.log("Thêm", new_musicEd)
                setMusicEd(new_musicEd)
            }

            const data = []
            // console.log(songs)
            for (key in songsResult) {
                data.push({
                    title: songs[key].name,
                    artist: songs[key].artist,
                    songImg: songs[key].imgUrl,
                    key: key,
                    status: musicEd ? key in musicEd : false
                })
            }
            setMusic(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        height = null
    }, [])

    React.useEffect(() => {
        const data = []
        // console.log(songs)
        for (key in songsResult) {
            data.push({
                title: songs[key].name,
                artist: songs[key].artist,
                songImg: songs[key].imgUrl,
                key: key,
                status: musicEd ? key in musicEd : false
            })
        }
        // console.log(data, "Thái")
        // console.log(musicEd)
        setMusic(data)

    }, [ ])

    // console.log(music, "Thái")


    return (
        <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                onPress={() => handleNavigator(false)}
                activeOpacity={1.0} />
            <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                    <MyInput placeholder={"Search"} icon={icons.search} setState={setInputSearch} valueState={inputSearch} />
                </View>
                <View>
                    {music ? <FlatList
                        style={{ marginTop: 28, marginBottom: 15, height: 300 }}
                        data={music}
                        renderItem={({ item, index }) =>
                            <MyAdd
                                id={item.key}
                                songName={item.title}
                                songImg={item.songImg}
                                artistName={item.artist}
                                isLike={item.isLiked}
                                index={index}
                                status={item.status}
                                handleAdd={handleAdd}
                            />}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                    /> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="blue" />
                        </View>}
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
