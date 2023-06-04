import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer, {
    State,
    usePlaybackState,
    useProgress,
    Event,
    useTrackPlayerEvents
} from 'react-native-track-player'
import Slider from '@react-native-community/slider';
import { colors, icons, images } from '../constants';
import HeaderApp from '../components/header/HeaderApp';

import { 
    addTracks, 
    changeRepeatMode, 
    playNextTrack, 
    playPreviousTrack, 
    settracks, 
    setupPlayMusic, 
    togglePlayback,
    getCurrentHeartPlaying, 
    setHeart} from '../redux/slices/playerSlice';
import {reactHeartSong} from '../redux/slices/songSlice';
import PlayingMore from './PlayingMore';
const tracks = [
    {
        id: 'song1',
        url: 'https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/CoAyCuaAnhAy-BaoAnh-9430793.mp3?alt=media&token=87f57b10-8516-4731-aae0-9639dc522d95',
        title: 'Cô ấy của anh ấy',
        artist: 'Bảo anh',
        artwork: 'https://avatar-ex-swe.nixcdn.com/song/share/2023/05/08/c/d/3/9/1683532965535.jpg',
        duration: 260.4
    },
    {
        id: 'song2',
        url: 'https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/NguMotMinh-HIEUTHUHAINegavKewtiie-8267763.mp3?alt=media&token=1a42c7e1-df87-49d1-aca6-24d67bcc61b8',
        title: 'Ngủ một mình',
        artist: 'HieuThuHai',
        artwork: 'https://i.ytimg.com/vi/STjzkjnLlZ4/maxresdefault.jpg',
        duration: 181
    },
    {
        id: 'song3',
        url: 'https://c1-ex-swe.nixcdn.com/NhacCuaTui2039/KhongBietNenVuiHayBuon-BaoAnhTao-9430785.mp3',
        title: 'Không Biết nên vui hay buon',
        artist: 'Bảo anh',
        artwork: 'https://vtv1.mediacdn.vn/zoom/640_400/562122370168008704/2023/5/20/photo1684549884795-16845498850022120292642.jpg',
        duration: 181
    },
]

const timeString = (seconds) => {
    if (seconds < 0) {
        return '00:00'
    };
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds.toFixed(0)).padStart(2, '0')}`;
}

const setUpOpenApp = async () => {
    try {
        const currentTrackIndex = await TrackPlayer.getCurrentTrack();
        if (currentTrackIndex != null) {
            const getTrackCurrent = await TrackPlayer.getTrack(currentTrackIndex);

            if (getTrackCurrent != null) {
                const { 
                    title,
                    artist,
                    artwork } = getTrackCurrent;

                setSong({
                    title,
                    artist,
                    artwork
                })
            }
        }
    } catch {

    }

}
const Playing = ({ navigation }) => {

    const { repeatMode, isHeart } = useSelector((state) => state.player);
    const { songs } = useSelector((state) => state.song);
    const [song, setSong] = useState({});
    const [toggleMore, setToggleMore] = useState(false);
    const dispatch = useDispatch();
    const playBackState = usePlaybackState();
    const progress = useProgress();
    const goBack = () => {
        setToggleMore(false);
    }

    const handleToggleMore = () => {
        setToggleMore(true);
    }


    React.useEffect(() => {
        dispatch(getCurrentHeartPlaying())
      }, [dispatch])
    

    useEffect(() => {

        dispatch(settracks(tracks));
        dispatch(setupPlayMusic());
        // addEventListeners();
        console.log("fff", repeatMode)
        console.log("setup: ", playBackState)
        if (playBackState == "idle") {
            setUpOpenApp();
        }
    }, [])
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artwork, artist } = track || {};
            console.log("artwork ", artwork);

            setSong({
                title,
                artist,
                artwork
            })

            dispatch(setHeart(true));
        }
    });

    // const addEventListeners = () => {
    //     TrackPlayer.addEventListener('playback-queue-ended', playNextTrack());
    //   };

    return (
        <View style={styles.container}>

            <HeaderApp
                title={'Playing'}
                iconLeft={icons.arrowBack}
                iconRight={icons.option}
                goBack={goBack}
                handleNavigator={handleToggleMore} />

            {/* ImageSong */}
            <View style={styles.contentContainer}>

                <Image style={styles.ImageSong} source={(song && song.artwork) ? { uri: song.artwork } : images.demo} />

                <Text style={styles.TextSong}>
                    {song && song.title}
                </Text>
                <Text style={styles.TextArtist}>
                    {song && song.artist}
                </Text>
            </View>

            {/* PlayingMusic */}
            <View style={styles.audioPlayerContainer}>
                <Slider
                    style={{ alignSelf: 'stretch', height: 10 }}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.primary}
                    thumbTintColor={colors.primary}
                    onSlidingComplete={async value => {
                        await TrackPlayer.seekTo(value);
                    }}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'stretch',
                    paddingHorizontal: 10,
                    marginTop: 2

                }}>
                    <Text style={styles.TextTimeSong} >
                        {timeString(progress.position)}
                    </Text>
                    <Text style={styles.TextTimeSong}>
                        {timeString(progress.duration - progress.position)}
                    </Text>
                </View>
                <View style={styles.playingMusicContainer}>

                    <TouchableOpacity onPress={() => dispatch(playPreviousTrack())}>
                        <Image
                            source={icons.skipPre}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(togglePlayback({ playBackState }))}>
                        <Image
                            source={playBackState == State.Playing ? icons.pause : icons.play}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(playNextTrack())} >
                        <Image
                            source={icons.skipNext}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', paddingHorizontal: 30 }}>
                    <TouchableOpacity onPress={() => dispatch(changeRepeatMode())}>
                        <Image style={(repeatMode == 'off') ? styles.iconLoopOff : (styles.iconLoop)}
                            source={repeatMode == 'track' ? icons.loop1 : icons.loopAll}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(reactHeartSong({songId:'song1', userId:'userId'}))}>
                        <Image
                            source={isHeart?icons.heart:icons.unHeart}
                        />
                        
                    </TouchableOpacity>
                </View>
            </View>

            {/* Lyrics */}
            <View style={styles.lyricContainer}>

                <View >
                    <TouchableOpacity  >
                        <View style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* <View style={{ height: 3, width: 40, backgroundColor: "#FFFFFF" }}></View> */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.TextLyrics}>
                                    Lyrics
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {toggleMore && <View style={{ position: 'absolute', height: '100%', width: '100%'}}>
                <PlayingMore setToggleMore={setToggleMore}/>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'relative',
        backgroundColor: '#ffffff',
    },
    headerContainer:
    {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: '5%'
    },
    contentContainer: {
        flex: 10,
        justifyContent: 'flex-start',
    },
    audioPlayerContainer: {
        flex: 8,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '25%',
        maginTop: '80%',
    },
    playingMusicContainer:
    {
        flexDirection: 'row',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        height: '20%',

    },
    lyricContainer:
    {
        flex: 10,

        position: 'absolute',
        top: '90%',
        height: '70%',
        width: '90%',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'flex-start',
        backgroundColor: '#C1C1C1',
        borderRadius: 30
    },
    TextContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'center'
    },
    playButtonContainer: {
        backgroundColor: '#FFF',
        borderColor: '#8950F8',
        borderWidth: 4,
        width: 70,
        height: 70,
        borderRadius: 64,
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 32,
        // shadowColor: '#5D3F6A',
        // shadowRadius: 30,
        // shadowOpacity: 0.5,
    },
    IconBack:
    {
        marginTop: 34,
        marginLeft: 23,
        width: 24,
        height: 24,
        // padding: 4,

    },
    IconMore:
    {
        width: 42,
        height: 42,
        // left: 305px;
        // top: 25px;
    },
    // ImageContainer:
    // {
    //     flex: 5,
    //     alignItems: 'center',
    // },
    ImageSong:
    {
        width: 297,
        height: 305,
        resizeMode: 'cover',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 30,
        borderWidth: 4,
        borderColor: '#8950F8',
        shadowColor: '#D9D9D9',
        shadowOpacity: 0.25,
        shadowOffset: { height: 4 },

    },
    TextTimeSong:
    {
        fontFamily: 'Montserrat',
        // fontStyle: normal,
        fontWeight: '700',
        fontSize: 13,
        lineHeight: 16,
        // textAlign: 'center',
        color: '#555454',
        lineHeight: 14
    },
    TextSong:
    {
        fontFamily: 'Montserrat',
        // fontStyle: normal,
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 29,
        textAlign: 'center',
        color: colors.primary,
        paddingTop: '3%'
    },
    TextArtist:
    {
        fontFamily: 'Montserrat',
        // fontStyle: normal,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 17,
        /* identical to box height */

        textAlign: 'center',

        color: '#555454',
    },
    TextLyrics:
    {
        fontFamily: 'Montserrat',
        // fontStyle: normal,
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 15,
        textAlign: 'left',
        color: colors.black,
    },
    iconLoop: {
        height: 28,
        width: 28,
        tintColor: colors.primary,
    },
    iconLoopOff: {
        height: 28,
        width: 28,
        tintColor: colors.black,
    }


});
const setFullLyrics = async (e) => {

}
export default Playing;