import { View, Text, Image, StyleSheet, FlatList, Alert,ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { colors, icons, images } from '../constants'
import TitleAlbum from '../components/misc/TitleAlbum'
import SquareAlbum from '../components/misc/SquareAlbum'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbumByAlbumIds, getPopularRelease, setAlbum } from '../redux/slices/artistSlice'
import { ScrollView } from 'react-native-gesture-handler'
import { followingArtistByUserId, getAllArtistFollowByUserId } from '../redux/slices/userSlice'
import { serverTimestamp } from 'firebase/database'
// import { differenceInBusinessDays } from 'date-fns'

export default function Artist({ navigation, route }) {
  const { artist } = route.params;
  const { albums, popularRelease } = useSelector((state) => state.artist);
  const { follows, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const dataArtist = music.find((artist) => artist.id == id);
  console.log("follows.find(({artistId}) => artistId === artist.key)", follows.find(({artistId}) => artistId === artist.key))
  const [isFollow, setIsFollow] = useState(follows.find(({key, active}) => key === artist.key && active ==true )?true:false);
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }
  console.log('albums', albums)

  useEffect(() => {

    // const checkFollow = follows.filter(({artistId}) => artistId === artist.key);
    // if (checkFollow) {
    //   setIsFollow(true)
    // }
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
    if (albums && albums.songIds) {
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

  const handleToggleFollow = () => {
    console.log('active: !isFollow: ', isFollow)
    dispatch(followingArtistByUserId({userId: user.uid, artistId: artist.key, active: !isFollow, timestamp: serverTimestamp()}))
    dispatch(getAllArtistFollowByUserId({userId: user.uid}))
    console.log('follows: ', follows)
    if (!isFollow) {
      ToastAndroid.show(`Bạn đã theo dõi ${artist.name}`, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(`Bạn đã hủy theo dõi ${artist.name}`, ToastAndroid.SHORT);
    }
    setIsFollow(!isFollow)
   
  }
  return (
    <View>
      <HeaderApp title={'Artist'} 
        iconLeft={icons.arrowBack} 
        iconRight={isFollow?icons.followed:icons.follow} 
        goBack={goBack} 
        handleNavigator={handleToggleFollow} />
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