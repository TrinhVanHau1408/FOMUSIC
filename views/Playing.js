import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TrackPlayer, {
    State,
    usePlaybackState,
    useProgress,
    Event,
    useTrackPlayerEvents
} from 'react-native-track-player'
import RNFS from 'react-native-fs';
import Slider from '@react-native-community/slider';
import { colors, icons, images } from '../constants';
import HeaderApp from '../components/header/HeaderApp';
import Comments from '../components/comment/Comments';

import {
    addTracks,
    changeRepeatMode,
    playNextTrack,
    playPreviousTrack,
    settracks,
    setupPlayMusic,
    togglePlayback,
    getCurrentHeartPlaying,
    setHeart,
    setCurrentPlay
} from '../redux/slices/playerSlice';
import { reactHeartSong } from '../redux/slices/songSlice';
import PlayingMore from './PlayingMore';
import { getDataAsyncStorage, removeDataAsyncStorage, saveDataAsyncStorage } from '../utilities/AsyncStorage';
import { da } from 'date-fns/locale';
import { addRankingSongListen } from '../redux/slices/rankingSlice';

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
const Playing = ({ navigation, route }) => {

    const { songId } = route.params

    const { repeatMode, isHeart, currentPlay } = useSelector((state) => state.player);

    const [song, setSong] = useState({});
    const [isComment, setIsComment] = useState(false)
    const [toggleMore, setToggleMore] = useState(false);
    const [isPoupLyrics, setIsPopupLyrics] = useState(false)
    const [isDownloadAudio, setIsDownloadAudio] = useState(false);
    const [isDownloadImg, setIsDownloadImg] = useState(false);
    const [listDownLoad, setListDownLoad] = useState([]);
    const [download, setDownload] = useState({});
    const dispatch = useDispatch();
    const playBackState = usePlaybackState();
    const progress = useProgress();
    const goBack = () => {
        navigation.goBack()
        setToggleMore(false);
    }

    const handleToggleMore = () => {
        setToggleMore(true);
    }


    React.useEffect(() => {
        dispatch(getCurrentHeartPlaying())
    }, [dispatch])

    // console.log(songId)
    // useEffect(() => {

    //     // dispatch(settracks(tracks));
    //     // dispatch(setupPlayMusic());
    //     // addEventListeners();
    //     // console.log("fff", repeatMode)
    //     // console.log("setup: ", playBackState)
    //     if (playBackState == "idle") {
    //         setUpOpenApp();
    //     }
    // }, [])

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        // console.log('PlaybackTrackChanged')
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artwork, artist, lyrics } = track || {};
            // const currentQueue = await TrackPlayer.getQueue();

            dispatch(setCurrentPlay(track));




            // console.log('track', track)
            dispatch(setHeart(true));
        }
    });
    // console.log("Thái", currentPlay)

    // const addEventListeners = () => {
    //     TrackPlayer.addEventListener('playback-queue-ended', playNextTrack());
    //   };

    const downloadAudio = () => {
        const audioUrl = currentPlay.url;
        const folderPathAudio = Platform.OS === 'android' ? RNFS.ExternalDirectoryPath + '/Musics' : RNFS.DocumentDirectoryPath + '/Musics';
        const audioFilePath = `${folderPathAudio}/${currentPlay.title.replace(' ', '_')}.mp3`;

        RNFS.mkdir(folderPathAudio).then(() => {
            RNFS.downloadFile({
                fromUrl: audioUrl,
                toFile: audioFilePath,
                begin: (res) => {
                    console.log('Download audioUrl has begun');
                },
                progress: (res) => {
                    const percentage = (res.bytesWritten / res.contentLength) * 100;
                    console.log(`Download audioUrl progress: ${percentage}%`);
                },
            })
                .promise.then((res) => {
                    setIsDownloadAudio(true);
                    console.log('Download audioUrl complete');
                    console.log(`File saved at: ${audioFilePath}`);
                    setIsDownloadAudio(true);
                    setDownload({...download, url: audioFilePath})
                })
                .catch((error) => {
                    console.log('Download error:', error);
                });
        }).catch((error) => {
            console.log('Failed to create directory:', error);
        });
    }

    const downloadImg = () => {
        const imgUrl = currentPlay.artwork; // URL of the file to be downloaded
        const folderPathImg = Platform.OS === 'android' ? RNFS.ExternalDirectoryPath + '/Images' : RNFS.DocumentDirectoryPath + '/Images';
        const imageFilePath = `${folderPathImg}/${currentPlay.title.replace(' ', '_')}.jpg`;

        RNFS.mkdir(folderPathImg).then(() => {
            RNFS.downloadFile({
                fromUrl: imgUrl,
                toFile: imageFilePath,
                begin: (res) => {
                    console.log('Download imgUrl has begun');
                },
                progress: (res) => {
                    const percentage = (res.bytesWritten / res.contentLength) * 100;
                    console.log(`Download imgUrl progress: ${percentage}%`);
                },
            })
                .promise.then((res) => {
                    console.log('Download imgUrl complete');
                    console.log(`Image saved at: ${imageFilePath}`);
                    setIsDownloadImg(true);
                    setDownload({...download, artwork: imageFilePath})
                })
                .catch((error) => {
                    console.log('Download error:', error);
                });
        }).catch((error) => {
            console.log('Failed to create directory:', error);
        });

    }
    const handleDownload = () => {
       
        downloadAudio();
        downloadImg();

     

        

    }

    const readDown = async() => {
        
        try {
            const listDownLoadSaved = await  getDataAsyncStorage('download');
            console.log('getDataAsyncStorage(download)', listDownLoadSaved)
            if (listDownLoadSaved) {
                setListDownLoad(listDownLoadSaved)
            }
           
           
            
        }  catch {

        }
       
          
         

    }

    const remove = async () => {
        await removeDataAsyncStorage('download');
    }

    useEffect(() => {
        // readDown()
        // remove();
        if (isDownloadAudio && isDownloadImg) {
            // console.log("dddd", currentPlay)
            readDown()
            const currentDownload = {
                ...download,
                key: currentPlay.id,
                title: currentPlay.title, 
                lyrics: currentPlay.lyrics, 
                artist: currentPlay.artist,
                duration: currentPlay.duration,
            };


            const tempListDownLoad = listDownLoad;
         
            if (tempListDownLoad.length != []) {
             
                saveDataAsyncStorage('download',[...listDownLoad,currentDownload ] )
               
              
            } else {
                
                saveDataAsyncStorage('download', [currentDownload] )
               
            }
            
           
        }
       return () => {
        setListDownLoad([]);
       }
    }, [isDownloadAudio, isDownloadImg])

   
    return (
        <View style={styles.container}>

            <HeaderApp
                title={'Playing'}
                iconLeft={icons.arrowBack}
                iconRight={icons.more}
                goBack={goBack}
                handleNavigator={handleToggleMore} />

            {/* ImageSong */}
            <View style={styles.contentContainer}>


                <Image style={styles.ImageSong} source={(currentPlay && currentPlay.artwork) ? { uri: currentPlay.artwork } : images.demo} />

                <Text style={styles.TextSong}>
                    {currentPlay && currentPlay.title}
                </Text>
                <Text style={styles.TextArtist}>
                    {currentPlay && currentPlay.artist}
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
                    <TouchableOpacity onPress={() => dispatch(reactHeartSong({ songId: 'song1', userId: 'userId' }))}>
                        <Image
                            source={isHeart ? icons.heart : icons.unHeart}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDownload()}>
                        <Text>Download</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => remove()}>
                        <Text>xóa Download</Text>

                    </TouchableOpacity>
                </View>
            </View>

            {/* Lyrics */}

            {/* <View style={styles.lyricContainer}>

                <View >
                    <TouchableOpacity  >
                        <View style={{ display: 'flex', justifyContent: 'center' }}>
                      
                            <View style={{ flex: 1 }}>
                                <Text style={styles.TextLyrics}>
                                    {song && song.lyrics}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View> */}

            <TouchableOpacity onPress={() => setIsPopupLyrics(true)} style={[styles.lyricContainer, { backgroundColor: 'red' }]}>

                <Modal
                    animationType="slide"

                    visible={isPoupLyrics}

                >

                    <TouchableWithoutFeedback onPressOut={() => setIsPopupLyrics(false)}>


                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15 }}>

                            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.TextLyrics, { textAlign: 'center' }]}>
                                    {currentPlay && currentPlay.lyrics}
                                </Text>
                            </View>
                        </View>



                    </TouchableWithoutFeedback>

                </Modal>


            </TouchableOpacity>
            {toggleMore && <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
                <PlayingMore setToggleMore={setToggleMore} setComments={setIsComment} />
            </View>}

            {/* comment */}

            {isComment && <Modal animationType='slide'
                transparent={true}
                visible={isComment}>
                <Comments setIsComment={setIsComment} songId={songId} />
            </Modal>
            }
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
        lineHeight: 15,
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
    },
    centeredView:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView:
    {
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5
    }


});
const setFullLyrics = async (e) => {

}
export default Playing;