import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, SliderComponent, Slider, SliderBase } from 'react-native';
// import Slider from '@react-native-community/slider';
import { colors, icons, images } from '../constants';
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyButton from '../components/misc/MyButton';
import MyNavigation from '../components/misc/MyNavigation';

const Playing = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Image
                        style={{
                            justifyContent: 'flex-start',
                            flex: 0.2
                        }}
                        source={icons.arrowBack}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: 17,
                        lineHeight: 21,
                        color: colors.black,
                    }}>
                    playing
                </Text>
                <TouchableOpacity>
                    <Image
                        style={{ justifyContent: 'flex-end' }}
                        source={icons.more}
                    />
                </TouchableOpacity>
            </View>

            {/* ImageSong */}
            <View style={styles.contentContainer}>
                <Image style={styles.ImageSong}
                    source={images.demo}
                />
                <Text style={styles.TextSong}>
                    Sweetest Pie
                </Text>
                <Text style={styles.TextArtist}>
                    Dua Lipa & Megan Thee Stallion
                </Text>
            </View>

            {/* PlayingMusic */}
            <View style={styles.audioPlayerContainer}>
                <Slider style={{ alignSelf: 'stretch', height: 50, color: colors.primary }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', paddingHorizontal: 10 }}>
                    <Text style={styles.TextTimeSong} >
                        2:30
                    </Text>
                    <Text style={styles.TextTimeSong}>
                        4:30
                    </Text>
                </View>
                <View style={styles.playingMusicContainer}>

                    <TouchableOpacity >
                        <Image
                            source={icons.skipPre}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image
                            source={icons.play}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image
                            source={icons.skipNext}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', paddingHorizontal: 30 }}>
                    <TouchableOpacity>
                        <Image
                            source={icons.loop}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={icons.heart}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Lyrics */}
            <View style={styles.lyricContainer}>
                <TouchableOpacity >
                    <Text style={styles.TextLyrics}>
                        Lyrics
                    </Text>
                </TouchableOpacity>
            </View>
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
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 30,
        borderWidth: 4,
        borderColor: '#8950F8',
        borderStyle: 'solid',
        shadowColor: '#D9D9D9',
        shadowOpacity: 0.25,
        shadowOffset: { height: 4 }
    },
    TextTimeSong:
    {
        fontFamily: 'Montserrat',
        // fontStyle: normal,
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 16,
        // textAlign: 'center',
        color: '#555454',
    },
    TextSong:
    {
        fontFamily: 'Montserrat',
        // fontStyle: normal,
        fontWeight: 700,
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
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 15,
        textAlign: 'left',
        color: colors.black,
    }
});
const setFullLyrics = async (e) => 
{

}
export default Playing;