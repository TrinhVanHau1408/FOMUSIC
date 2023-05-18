import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, FlatList, Image } from 'react-native'
import HeaderApp from '../components/header/HeaderApp'
import RowBoxTranfer from '../components/box/RowBoxTranfer'
import RowBoxTitle from '../components/box/RowBoxTitle';
import TitleAlbum from '../components/misc/TitleAlbum';
import SquareAlbum from '../components/misc/SquareAlbum';
import ControlMusic from '../components/misc/ControlMusic';
import BoxTranfer from '../components/box/BoxTranfer';
import { images, icons, colors } from '../constants';
 
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
  },{
    title: 'Snooze',
    artist: 'SZA',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '3',
    track_number: '3'
  },{
    title: 'If you',
    artist: 'BigBang',
    songImg: images.imgIfYou,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '4',
    track_number: '4'
  },{
    title: 'Shoong',
    artist: 'Teayang',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '5',
    track_number: '5'
  },{
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
 

export default function Home({ navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const [idSong, setIdSong] = useState(0);
    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);

    }
    const handleNavigatorPlaying = () => {
        navigation.navigate('Playing');
    }
    return (
        <View style={styles.container}>
         <ScrollView>
         <HeaderApp title={'Home'} />
            <View>
                <Image source={icons.musicNote1} style={{ position: 'absolute', left: 0, top: -55, height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
                <Image source={icons.musicNote2} style={{ position: 'absolute', right: 0, top: -55, height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
            </View>
            <View style={styles.content}>
                <TitleAlbum name={'TRENDING & HOT'} />
                {/* <RowBoxTranfer style={styles.tranfer} /> */}
                <BoxTranfer />
            </View>

            <View style={{ marginTop: 10, marginLeft: 20 }}>
                <View >
                    <TitleAlbum name={'TOP CHARTS'} />
                    <FlatList
                        data={music}
                        renderItem={({ item }) =>
                            <SquareAlbum
                                id={item.id}
                                name={item.title}
                                img={item.songImg}
                                handleLayout={handleLayout} />}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View >
                    <TitleAlbum name={'RECENTLY PLAYED'} />
                    <FlatList
                        data={music}
                        renderItem={({ item }) =>
                            <SquareAlbum
                                id={item.id}
                                name={item.title}
                                img={item.songImg}
                                handleLayout={handleLayout} />}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
         </ScrollView>
            {isVisible && <ControlMusic song={dataLike.find(({ id }) => id === idSong)} handleNavigator={handleNavigatorPlaying} />}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {

        marginHorizontal: 20,
    }
})
