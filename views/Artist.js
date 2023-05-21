import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { colors, icons, images } from '../constants'
import TitleAlbum from '../components/misc/TitleAlbum'
import SquareAlbum from '../components/misc/SquareAlbum'
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
export default function Artist({ navigation, route }) {
  const { id } = route.params;
  const dataArtist = music.find((artist) => artist.id == id);
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View>
      <HeaderApp title={'Artist'} iconLeft={icons.arrowBack} iconRight={icons.follow} goBack={goBack} />
      <View>
        <Image source={icons.musicNote1} style={{ position: 'absolute', top: 95, left: -15, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
        <Image source={icons.musicNote2} style={{ position: 'absolute', top: 105, right: -7, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
      </View>
      <View style={styles.infoArtist}>
        <Image source={dataArtist.songImg} style={{ height: 187, width: 187, borderRadius: 100 }} />
        <Text style={styles.pageName}>{dataArtist.artist}</Text>
        <View style={styles.pageFollower}>
          <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 500 }}>Followers</Text>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 500 }}>123,890,567</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.containerPlaylist}>
        <View style={{ marginTop: 20}}>
          <TitleAlbum name={'Album'} />
          <FlatList
            data={music}
            renderItem={({ item }) =>
              <SquareAlbum id={item.id} name={item.title} img={item.songImg} handleButton={handleButton} />}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{ marginTop: 15}}>
          <TitleAlbum name={'Popular Releases'} />
          <FlatList
            data={music}
            renderItem={({ item }) =>
              <SquareAlbum id={item.id} name={item.title} img={item.songImg} handleButton={handleButton} />}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoArtist: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat',
  },
  pageName: {

    marginTop: 9,
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.black
  },
  pageFollower: {
    marginTop: 17,
    marginBottom: 29,
  },
  line: {
    height: 3,
    width: '100%',
    borderColor: '#EDEDED',
    elevation: 4,
  },
  containerPlaylist: {
    marginLeft: 20,
  }
})