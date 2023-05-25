import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { colors, icons, images } from '../constants'
import RectangleAlbum from '../components/misc/RectangleAlbum'
import ControlDetatilPalylist from '../components/playlist/ControlDetatilPlaylist'
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';
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
export default function DetailPlaylist({ navigation, route }) {
  const { id } = route.params;
  const dataPlaylist = music.find((artist) => artist.id == id);
  const [isVisible, setIsVisible] = useState(false);

  const [idSong, setIdSong] = useState(0);
  const handleLayout = (id) => {
    setIsVisible(true);
    setIdSong(id);

  }

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderApp title={'Playlist'} iconLeft={icons.arrowBack} iconRight={icons.option} goBack={goBack} />
      <View style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25,
        // alignContent: 'center',
        // backgroundColor: colors.primary
      }}>
        <RectangleAlbum id={1} name={dataPlaylist.title} img={dataPlaylist.songImg} isPlaylist={true} isDetailPlaylist={true} />
      </View>
      <ControlDetatilPalylist />
      <View style={styles.line}></View>
      {/* <View style={{ marginTop: 28 }}> */}
      <FlatList
        style={{ marginTop: 28, marginBottom: 150 }}
        data={music}
        renderItem={({ item, index }) =>
          <MyLike
            id={item.id}
            idSongSelected={idSong}
            songName={item.title}
            songImg={item.songImg}
            artistName={item.artist}
            isLike={item.isLiked}
            index={index}
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
  line: {
    height: 3,
    width: '100%',
    borderColor: '#EDEDED',
    elevation: 4,
    marginTop: 28
  },
})