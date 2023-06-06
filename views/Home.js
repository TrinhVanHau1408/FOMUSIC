import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacityBase, TouchableOpacity } from 'react-native'
import HeaderApp from '../components/header/HeaderApp'
import RowBoxTranfer from '../components/box/RowBoxTranfer'
import RowBoxTitle from '../components/box/RowBoxTitle';
import TitleAlbum from '../components/misc/TitleAlbum';
import SquareAlbum from '../components/misc/SquareAlbum';
import ControlMusic from '../components/misc/ControlMusic';
import BoxTranfer from '../components/box/BoxTranfer';
import { images, icons, colors } from '../constants';
import TitleText from '../components/forgotPassword.js/TitleText';
import { getAllPlaylistByUserId } from '../redux/slices/playlistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { filterObject } from '../utilities/Object';
import { Text } from 'react-native-svg';
import { usePlaybackState } from 'react-native-track-player';
import { getHistorySong } from '../redux/slices/songSlice';
import { addRankingSongListen, getRankingCurrentWeek } from '../redux/slices/rankingSlice';
import { setTracks, settracks, setupPlayMusic, togglePlayback } from '../redux/slices/playerSlice';
const music = [
    {
        name: 'Lovely',
        artist: 'Billie Eilish',
        artwork: images.imgLovely,
        // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
        duration: 2 * 60 + 53,
        id: '1',
    },
    {
        name: 'Understand',
        artist: 'Keshi',
        artwork: images.imgUnderstand,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '2',
        track_number: '2'
    }, {
        name: 'Snooze',
        artist: 'SZA',
        artwork: images.imgSZATout,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '3',
        track_number: '3'
    }, {
        name: 'If you',
        artist: 'BigBang',
        artwork: images.imgIfYou,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '4',
        track_number: '4'
    }, {
        name: 'Shoong',
        artist: 'Teayang',
        artwork: images.imgSZATout,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '5',
        track_number: '5'
    }, {
        name: 'Die For You',
        artwork: 'The Weeknd',
        songImg: images.imgDieForYou,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '6',
        track_number: '6'
    },
    {
        name: 'double take',
        artist: 'dhruv',
        artwork: images.imgDoubleTakeL,
        // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
        duration: 2 * 60,
        id: '7',
        track_number: '7'
    }
]

// 1685232000000 = 28/05/2022
//1684627200000 = 21/05/2023
export default function Home({ navigation }) {
    const playBackState = usePlaybackState();
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state) => state.user)
    const {historySongs} = useSelector((state) => state.song)
    const {playlists} = useSelector((state) => state.playlists)
    const {ranking} = useSelector((state) => state.ranking)
    const [isVisible, setIsVisible] = useState(false);
    const [idSong, setIdSong] = useState(0);
    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);

    }
    const handleNavigatorPlaying = (id, songs) => {
        console.log(songs)

            dispatch(setTracks(songs));
            dispatch(setupPlayMusic());
            
            console.log(ranking)
       
       
        // if (!loading && error == null) {
        //     dispatch(getAllPlaylistByUserId({userId: '4QoEok3ghdXH7DmJJzomMyjeryT2'}));

        //     console.log("fillter playlist: ", playlists && filterObject(playlists,'name','Demo'));
        // }
        // console.log("fillter playlist: ", playlists && filterObject(playlists,'name','Demo'));
        // dispatch(getRankingCurrentWeek());
        // dispatch(filterObject(getAllPlaylistByUserId()))
        navigation.navigate('Playing');
       
    }

  

    useEffect(()=>{
        dispatch(getHistorySong({userId: '4QoEok3ghdXH7DmJJzomMyjeryT2'}));
        dispatch(getRankingCurrentWeek());
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('BXH') }}
                >
                    <HeaderApp title={'Home'} />
                </TouchableOpacity>
                <View>
                    <Image source={icons.musicNote1} style={{ position: 'absolute', top: -55, left: -15,  resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
                    <Image source={icons.musicNote2} style={{ position: 'absolute', top: -55, right: -7, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.content}
                        onPress={() => { navigation.navigate('BXH') }}
                    >
                        <TitleAlbum
                            type={1}
                            name={'TRENDING & HOT'} />
                    </TouchableOpacity>

                    {/* <RowBoxTranfer style={styles.tranfer} /> */}
                    <BoxTranfer />
                </View>

                <View style={{ marginLeft: 20 }}>
                    <View >
                        <TitleAlbum 
                            type={2}
                            name={'TOP CHARTS'} />
                        <FlatList
                            data={ranking&&ranking}
                            renderItem={({ item }) =>
                                <SquareAlbum
                                    id={item.id}
                                    name={item.title}
                                    artwork={item.artwork}
                                    songs = {ranking}
                                    handleNavigator={handleNavigatorPlaying}/>}
                            keyExtractor={(item, index) => index}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <View style={(playBackState != null && playBackState != 'idle')&&styles.marginBottomControl}>
                        <TitleAlbum 
                            type={3}
                            name={'RECENTLY PLAYED'} />
                        <FlatList
                            data={historySongs&&historySongs}
                            renderItem={({ item }) =>
                                <SquareAlbum
                                    id={item.id}
                                    name={item.name}
                                    artwork={item.artwork}
                                    songs = {historySongs}
                                    // handleLayout={handleLayout}
                                    handleNavigator={handleNavigatorPlaying}
                                     />}
                            keyExtractor={(item, index) => index}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
            {(playBackState != null && playBackState != 'idle') && <ControlMusic song={music.find(({ id }) => id === idSong)} handleNavigator={handleNavigatorPlaying} />}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {

        marginHorizontal: 20,
    },
    marginBottomControl: {
        marginBottom: 160
    }
})
