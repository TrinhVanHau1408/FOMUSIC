import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, images, colors } from '../constants'
import ControlDetatilPalylist from '../components/playlist/ControlDetatilPlaylist'
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';
import { readDataFirebase } from '../firebase/controllerDB'
import Album from './Album'
const music = [
    {
        title: 'Lovely',
        artist: 'Billie Eilish',
        songImg: images.imgLovely,
        // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
        duration: 2 * 60 + 53,
        id: '1',
    },
    {
        title: 'Understand',
        artist: 'Keshi',
        songImg: images.imgUnderstand,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '2',
        track_number: '2'
    }, {
        title: 'Snooze',
        artist: 'SZA',
        songImg: images.imgSZATout,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '3',
        track_number: '3'
    }, {
        title: 'If you',
        artist: 'BigBang',
        songImg: images.imgIfYou,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '4',
        track_number: '4'
    }, {
        title: 'Shoong',
        artist: 'Teayang',
        songImg: images.imgSZATout,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '5',
        track_number: '5'
    }, {
        title: 'Die For You',
        artist: 'The Weeknd',
        songImg: images.imgDieForYou,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '6',
        track_number: '6'
    },
    {
        title: 'double take',
        artist: 'dhruv',
        songImg: images.imgDoubleTakeL,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '7',
        track_number: '7'
    }
]


export default function DetailAlbum({ navigation, route }) {
    console.log('DETAIL ALBUM SCREEN')
    const { albumSelected } = route.params;
    console.log('ALBUM PARAMS: ', albumSelected);

    // const dataAlbum = album.find((artist) => artist.id == id);
    const [isVisible, setIsVisible] = useState(false);
    // const [currAlbum, setCurrAlbum] = useState({ ...albumSelected });

    const [idSong, setIdSong] = useState(0);
    const [songs, setSongs] = useState()
    const [albumSong, setAlbumSong] = useState();

    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);

    }

    useEffect(() => {
        const getSongs = async () => {
            const res = await readDataFirebase('songs')
            setSongs(res)

            console.log('ALBUM GET SONGS: ', res)
        }
        getSongs()
    }, [])

    const getAllSongsByAlbum = async () => {
        // console.log('currAlbum: ', currAlbum)
        const songAlbumIds = albumSelected.songIds;

        const song = []
        for (const songId in songAlbumIds) {

              console.log('ALBUM SONG ID: ',songId); // In ra các khóa (keys)

            const data = await readDataFirebase(`songs/${songId}`)

            song.push({ key: songId, ...data });
        }

        console.log("My song: ", song)

        setAlbumSong(song);
    }

    useEffect(() => {
        // console.log(playlist);
        //  if (playlist) console.log(playlist.songs);

        // console.log('SONGS IN ALBUM: ', currAlbum.songIds);
        getAllSongsByAlbum();

    }, [albumSelected.songIds, albumSelected])

    const song = []
    for (const songId in albumSelected.songIds) {
        console.log('SONG ID IN CURRALBUM.SONGIDS: ', songId)
        
    }
    
    // console.log('songIds: ', songId)

    console.log('CURR ALBUM: ', albumSelected)
    console.log('ALBUM SONG: ', albumSong)

    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1 }}>
            <HeaderApp title={'Album'} iconLeft={icons.arrowBack} iconRight={icons.option} goBack={goBack} />
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <View style={{ marginRight: 11 }}>
                        <Image source={{ uri: albumSelected.imgUrl }} style={styles.img} />
                    </View>
                    <View>
                        <Text>Album</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.black }}>{albumSelected.name}</Text>
                        <Text style={{ marginBottom: 11, fontWeight: 'bold', color: colors.black }}>{albumSelected.artist}</Text>
                        <Text>{music.length} songs</Text>
                    </View>
                </View>
            </View>
            <ControlDetatilPalylist />
            <View style={styles.line}></View>
            {/* <View style={{ marginTop: 28 }}> */}
            <FlatList
                style={{ marginTop: 28, marginBottom: 150 }}
                data={albumSong&&[...albumSong].reverse()}
                renderItem={({ item, index }) =>
                    <MyLike
                        id={`${index + 1}`}
                        // idSongSelected={idSong}
                        songName={item.title}
                        songImg={item.artwork}
                        artistName={item.artist}
                        isLike={item.isLiked}
                        index={index}
                        songs={albumSong&&[...albumSong].reverse()}
                        handleLayout={handleLayout}
                    />}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
            />

            {isVisible && <ControlMusic song={music.find(({ id }) => id === idSong)} />}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 25,
        marginBottom: 27,
        marginLeft: 30,
        // backgroundColor: colors.black
    },
    containerImg: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Montserrat',
        // backgroundColor: colors.primary


    },
    img: {
        height: 160,
        width: 160,
        // borderRadius: 20,
        // borderWidth: 2,
        // borderColor: colors.primary,
        resizeMode: 'cover',
        shadowColor: '#171717',
        elevation: 5

    },
    line: {
        height: 3,
        width: '100%',
        borderColor: '#EDEDED',
        elevation: 4,
        marginTop: 28
    },
})