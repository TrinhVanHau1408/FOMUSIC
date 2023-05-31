import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { colors, icons, images } from '../constants'
import RectangleAlbum from '../components/misc/RectangleAlbum'
import ControlDetatilPalylist from '../components/playlist/ControlDetatilPlaylist'
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';
import { useDispatch, useSelector } from 'react-redux'
import { readDataFirebase } from '../firebase/controllerDB'
import { getPlayLists } from '../redux/slices/playlistsSlice'
import Edit from '../components/misc/Edit'
import AddSongPlaylists from '../components/misc/AddSongPlaylists'

// const music = [
//   {
//     title: 'Lovely',
//     artist: 'Billie Eilish',
//     songImg: images.imgLovely,
//     // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
//     duration: 2 * 60 + 53,
//     id: '1',
//   },
//   {
//     title: 'Understand',
//     artist: 'Keshi',
//     songImg: images.imgUnderstand,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '2',
//     track_number: '2'
//   }, {
//     title: 'Snooze',
//     artist: 'SZA',
//     songImg: images.imgSZATout,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '3',
//     track_number: '3'
//   }, {
//     title: 'If you',
//     artist: 'BigBang',
//     songImg: images.imgIfYou,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '4',
//     track_number: '4'
//   }, {
//     title: 'Shoong',
//     artist: 'Teayang',
//     songImg: images.imgSZATout,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '5',
//     track_number: '5'
//   }, {
//     title: 'Die For You',
//     artist: 'The Weeknd',
//     songImg: images.imgDieForYou,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '6',
//     track_number: '6'
//   },
//   {
//     title: 'double take',
//     artist: 'dhruv',
//     songImg: images.imgDoubleTakeL,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '7',
//     track_number: '7'
//   }
// ]
export default function DetailPlaylist({ navigation, route }) {
  const { id } = route.params;
  const { loading, error, playlists } = useSelector((state) => state.playlists)
  // const dataPlaylist = music.find((artist) => artist.id == id);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [isAddmusic, setIsAddmusic] = useState(false);
  const [idSong, setIdSong] = useState(0);
  const [songs, setSongs] = useState()
  const [details, setDetails] = useState(playlists[id])
  const [music, setMusic] = useState()

  const dispatch = useDispatch()

  const handleAddmusic = (status) => {
    setIsAddmusic(status)
    setIsVisibleEdit(!status)
    dispatch(getPlayLists({}))
    // setDetails(playlists[id])
  }

  const sigleEdit = [
    {
      icon: icons.listAdd,
      title: 'Thêm bài hát',
      handle: handleAddmusic
    },
    {
      icon: icons.search,
      title: 'Tìm kiếm bài hát trong playlists',
      handle: null
    }
  ]

  React.useEffect(() => {
    const getSongs = async () => {
      const res = await readDataFirebase('songs')
      setSongs(res)
      // console.log(res)
    }
    getSongs()
  }, [])
  React.useEffect(() => {
    setDetails(playlists[id])
    // console.log("Thái",playlists[id])
  }, [playlists[id]])

  // React.useEffect(() => {
  //   // console.log(details.songs)
  //   if (songs) {
  //     if (!details.songs) {
  //       setMusic([])
  //     }
  //     else {
  //       const data = []
  //       // console.log(songs)
  //       var flag = 1
  //       for (key in details.songs) {
  //         data.push({
  //           title: songs[key].name,
  //           artist: songs[key].artist,
  //           songImg: songs[key].imgUrl,
  //           id: flag,
  //           key: key
  //         })
  //         flag = flag + 1
  //       }
  //       setMusic(data)
  //     }
  //   }

  // }, [details])

  React.useEffect(() => {
    // console.log(details.songs)
    if (songs) {
      if (!details.songs) {
        setMusic([])
      }
      else {
        const data = []
        // console.log(songs)
        var flag = 1
        for (key in details.songs) {
          data.push({
            title: songs[key].name,
            artist: songs[key].artist,
            songImg: songs[key].imgUrl,
            id: flag,
            key: key
          })
          flag = flag + 1
        }
        setMusic(data)
      }
    }

  }, [songs, details])

  const handleNavigator = () => {
    setIsVisibleEdit(true)
  }

  const handleLayout = (id) => {
    setIsVisible(true);
    setIdSong(id);

  }

  const handleLayoutEdit = () => {
    setIsVisibleEdit(false);
  }
  // console.log(playlists[id])

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1 }}>

      <HeaderApp title={'Playlist'} iconLeft={icons.arrowBack} iconRight={icons.option} goBack={goBack} handleNavigator={handleNavigator} />
      <View style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25,
        // alignContent: 'center',
        // backgroundColor: colors.primary
      }}>
        <RectangleAlbum id={id} name={details.name} img={{ uri: details.imageUrl }} isPlaylist={true} isDetailPlaylist={true} />
      </View>
      <ControlDetatilPalylist />
      <View style={styles.line}></View>
      {/* <View style={{ marginTop: 28 }}> */}
      {music ? <FlatList
        style={{ marginTop: 28, marginBottom: 150 }}
        data={music}
        renderItem={({ item, index }) =>
          <MyLike
            id={ index + 1}
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
      /> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      }

      {isVisible && <ControlMusic song={music.find(({ id }) => id === idSong)} />}
      {isVisibleEdit && <Edit handleNavigator={handleLayoutEdit} height={null} edit={sigleEdit} />}
      {isAddmusic && <AddSongPlaylists songs={songs} handleNavigator={handleAddmusic} musiced={details.songs} keylist={id}/>}

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