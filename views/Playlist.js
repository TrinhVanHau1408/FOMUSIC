import { View, Text, FlatList, Alert, StyleSheet } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import RectangleAlbum from '../components/misc/RectangleAlbum'
import { icons, images } from '../constants'

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
export default function Playlis({navigation, route}) {
    const { id } = route.params;
    const handleButton = () => {
        Alert.alert('Test', 'Library playlist');
    }
    const goBack = () => {
        navigation.goBack();
    }

    const handleNavigatorDetailPlaylist = (id) => {
        navigation.navigate('DetailPlaylist', {id: id});
    }
    return (
        <View>
            <HeaderApp
                title={'Playlist'}
                iconLeft={icons.arrowBack}
                iconRight={icons.option}
                goBack={goBack} />
            <View style={styles.container}>
                <FlatList
                    data={music}
                    renderItem={({ item }) =>
                        <RectangleAlbum
                            id={item.id}
                            name={item.title}
                            img={item.songImg}
                            handleButton={handleButton}
                            isPlaylist={true} 
                            handleNavigator={handleNavigatorDetailPlaylist}/>}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={{ flex: 1, height: 100 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})