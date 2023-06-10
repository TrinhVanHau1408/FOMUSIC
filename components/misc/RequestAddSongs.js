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
import { readDataFirebaseWithChildCondition } from "../../firebase/controllerDB";
import { convertObjectToArray } from "../../utilities/Object";

const heigtScreen = Dimensions.get('window').height;

export default function AddSongPlaylists({ handleNavigator, handleRequestNext,
    height = null,
    title,
    songed = {}
}) {
    const [inputSearch, setInputSearch] = useState('')
    const [songs, setSongs] = useState()
    const[filterSongs, setFilterSongs] = useState([]);
    const [allsongs, setallsongs] = useState()
    const translateY = useState(new Animated.Value(heigtScreen * 0.5))[0];
    const [songAdded, setSongsAdded] = useState({})
    const [isNext, setIsNext] = useState(false)
    const [isFlatlist, setIsFlatlist] = useState()
    const [songIdPicks, setSongIdPicks] = useState([]);


    const getSongs = async () => {
        const snapshotSongs = await readDataFirebase('songs')
        const convertArraySong = convertObjectToArray(snapshotSongs);
        setSongs(convertArraySong)
        setFilterSongs(convertArraySong)
    }


    // Xử lý pick song

    const handlePickSong = (songIdPick) => {

        console.log("requestAddsong ")
        // kiểm tra xem songPickId đã có trong songPickIds chua
        // nếu chưa thì add vào songPickIds

        if (songIdPicks.includes(songIdPick)) {
            console.log("đã có rồi")

            // Xóa songId
            setSongIdPicks(
                songIdPicks.filter( songId => songId != songIdPick)
            )
            ToastAndroid.show('Đã chọn', ToastAndroid.SHORT);
        } else {
            console.log("Cần thêm mới")

            // Thêm song Id
            setSongIdPicks([...songIdPicks, songIdPick])
            ToastAndroid.show('Đã bỏ chọn', ToastAndroid.SHORT);
        }

        console.log("mang song id pick: ", songIdPicks);
      
    }

    const getSongInput =  (inputSearch) => {

        inputSearch = inputSearch.toLowerCase();
        // Lọc theo tên bài hát or tên nghệ sĩ
        //  // normalize("NFD").replace(/[\u0300-\u036f]/g, "") => convert thành chữ không chứa các dấu
        const filterSong = songs.filter(({name, artist}) => (
            name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputSearch)
            || artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputSearch)
            ))
        // console.log('filterSong: ', filterSong)
        setFilterSongs(filterSong)
    }

    useEffect(() => {
        if (inputSearch == '') {
            getSongs()
        }
        else {
            getSongInput(inputSearch)
           
        }
    }, [inputSearch])

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
                            data={filterSongs}
                            renderItem={({ item, index }) => {
                                if (item) {
                                    return (<MyAdd
                                        songId={item.key}
                                        songName={item.name}
                                        songImg={ item.artwork}
                                        artistName={item.artist}
                                        isLike={item.isLiked}
                                        songIdPicks= {songIdPicks}
                                        handleAdd={handlePickSong}
                                    />)
                                }
                            }
                            }
                            keyExtractor={(item, index) => index}
                            showsVerticalScrollIndicator={false}
                        /> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="blue" />
                        </View>}
                </View>
                <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10 }}
                        onPress={() => handleRequestNext(songIdPicks)}>
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
