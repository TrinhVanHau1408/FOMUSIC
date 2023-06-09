import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions } from "react-native";
import { icons, images } from '../../constants'
import { useDispatch, useSelector } from "react-redux";
import { playNextTrack, playPreviousTrack, setCurrentPlay, togglePlayback } from "../../redux/slices/playerSlice";
import TrackPlayer, {
    State,
    usePlaybackState,
    useProgress,
    Event,
    useTrackPlayerEvents
} from 'react-native-track-player'
const heigtScreen = Dimensions.get('window').height;

export default function ControlMusic({ song, handleNavigator }) {

    const {currentPlay} = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const playBackState = usePlaybackState();
    // Alert.alert('Control',songName + ' '+ songImg + ' ' + artistName)
    const handleSkipPrevious = () =>  dispatch(playPreviousTrack());
    const handlePause = () => dispatch(togglePlayback({playBackState}));
    const handleSkipNext = () => dispatch(playNextTrack());

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        console.log('PlaybackTrackChanged')
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artwork, artist, lyrics } = track || {};
            // const currentQueue = await TrackPlayer.getQueue();

           dispatch(setCurrentPlay(track));


           
            // dispatch(setHeart(true));
        }
    });
    return (
        // <View>
        <View style={styles.container}>
            <View style={styles.controlMusic}>
               <TouchableOpacity onPress={handleNavigator}>
               <View style={{ overflow: 'hidden' }}>
                    <Image style={styles.imgMusic} source={(currentPlay &&currentPlay.artwork)? {uri:currentPlay.artwork}: images.demo} />
                </View>
               </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={styles.infoNameMusic}>{currentPlay && currentPlay.title}</Text>
                    <Text
                        style={styles.infoNameArtist}
                    >{ currentPlay && currentPlay.artist}</Text>
                </View>
                

                <View style={styles.control} >
                    <TouchableOpacity
                        style={styles.controlIcon}
                        onPress={handleSkipPrevious}
                    >
                        <Image source={icons.skipPreControl} style={{ height: 20, width: 30, tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.controlIcon}
                        onPress={handlePause}
                    >
                        <Image source={(playBackState != State.Playing)?icons.play:icons.pause} style={{ height: 60, width: 60, tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSkipNext}
                    >
                        <Image source={icons.skipNextControl} style={{ height: 20, width: 30, tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        marginHorizontal: 2,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: '99%',
        height: 150,
        backgroundColor: '#8950F8',
    },

    controlMusic: {
        borderColor: 'black',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 4,
    },

    imgMusic: {
        height: 68,
        width: 70,
        borderRadius: 10,
    },

    info: {
        textAlign: 'left',
        flex: 0.8,
        marginLeft: -5,
    },

    infoNameMusic: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.5,
        marginBottom: 2,
    },
    infoNameArtist: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 13,
        marginLeft: 3,
        width: '70%',
    },

    control: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    controlIcon: {
        marginRight: 8,
        paddingHorizontal: 4,
        paddingVertical: 4,
        overflow: 'hidden',
    },
});
