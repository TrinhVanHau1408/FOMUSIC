import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { colors, icons, images } from '../constants'
import TitleAlbum from '../components/misc/TitleAlbum'
import SquareAlbum from '../components/misc/SquareAlbum'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbumByAlbumIds, getPopularRelease, setAlbum } from '../redux/slices/artistSlice'
import { ScrollView } from 'react-native-gesture-handler'
// import { differenceInBusinessDays } from 'date-fns'

export default function Artist({ navigation, route }) {
  const { artist } = route.params;
  const { albums, popularRelease } = useSelector((state) => state.artist);
  const dispatch = useDispatch();
  // const dataArtist = music.find((artist) => artist.id == id);
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }
  console.log('albums', albums)

  useEffect(() => {
    if (artist) {
      const albumIds = []
      console.log("album", artist.albums)
      for (let key in artist.albums) {
        console.log("key", key)

        albumIds.push(key);

      }
      dispatch(getAllAlbumByAlbumIds({ albumIds: albumIds }))
    }
  }, [artist])

  useEffect(() => {
    if (albums) {
      const songIds = [];
      // for (let songId in albums[albums.length - 1].songIds) {
      console.log('songId', albums[albums.length - 1].songIds)
      for (let songId in albums[albums.length - 1].songIds) {
        songIds.push(songId);
      }

      dispatch(getPopularRelease({ songIds: songIds }))
    }
  }, [albums])

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View>
      <HeaderApp title={'Artist'} iconLeft={icons.arrowBack} iconRight={icons.follow} goBack={goBack} />
      <View>
        <Image source={icons.musicNote1} style={{ position: 'absolute', top: 95, left: -10, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
        <Image source={icons.musicNote2} style={{ position: 'absolute', top: 105, right: -7, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
      </View>
      <View style={styles.infoArtist}>
        <Image source={artist.photoUrl ? { uri: artist.photoUrl } : images.demo} style={{ height: 140, width: 140, borderRadius: 100 }} />
        <Text style={styles.pageName}>{artist.name}</Text>
        <View style={styles.pageFollower}>
          <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 500 }}>Followers</Text>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 500 }}>123,890,567</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <ScrollView style={styles.containerPlaylist}>
        <View style={{ }}>
          <TitleAlbum name={'Album'} />
          <FlatList
            data={albums && albums}
            renderItem={({ item }) =>
              <SquareAlbum id={item.key} name={item.name} img={item.imgUrl} handleButton={handleButton} />}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{}}>
          <TitleAlbum name={'Popular Releases'} />
          <FlatList
            data={popularRelease && popularRelease}
            renderItem={({ item }) =>
              <SquareAlbum id={item.key} name={item.name} img={item.artwork} handleButton={handleButton} />}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
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