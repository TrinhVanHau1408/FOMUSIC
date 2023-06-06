import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { colors, icons, images } from '../constants'
import RectangleAlbum from '../components/misc/RectangleAlbum'
import ControlDetatilPalylist from '../components/playlist/ControlDetatilPlaylist'
import MyLike from '../components/like/MyLikeLong';
import ControlMusic from '../components/misc/ControlMusic';
import { useDispatch, useSelector } from 'react-redux'
import { readDataFirebase, writeDataFirebase } from '../firebase/controllerDB'
import { getPlayLists } from '../redux/slices/playlistsSlice'
import Edit from '../components/misc/Edit'
import RequestAddSongs from '../components/misc/RequestAddSongs'
import { isFulfilled } from '@reduxjs/toolkit'
import DeleteSongPlaylists from '../components/misc/DeleteSongPlaylist'
import DeleteSong from '../components/misc/DeleteSong'


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
  const [isDelete, setIsDelete] = useState(false)
  const [isVisibleLongEdit, setIsVisibleLongEdit] = useState(false)
  const [idMusicSelected, setIdMusicSelected] = useState('')
  const [isDeleteSong, setIsDeleteSong] = useState(false)

  const dispatch = useDispatch()

  const handleAddmusic = (status) => {
    setIsAddmusic(status)
    setIsVisibleEdit(!status)
    // dispatch(getPlayLists({}))
  }

  const handleDeletemusic = (status) => {
    setIsDelete(status)
    setIsVisibleEdit(!status)
    dispatch(getPlayLists({}))
  }

  const handleDeleteSong = (status) => {
    setIsDeleteSong(status)
    setIsVisibleLongEdit(!status)
    dispatch(getPlayLists({}))
  }

  const sigleEdit = [
    {
      icon: icons.listAdd,
      title: 'Thêm bài hát',
      handle: handleAddmusic
    },
    {
      icon: icons.listAdd,
      title: 'Xóa bài hát',
      handle: handleDeletemusic
    },
    {
      icon: icons.search,
      title: 'Tìm kiếm bài hát trong playlists',
      handle: null
    }
  ]

  const sigleLongEdit = [
    {
      icon: icons.listAdd,
      title: 'Xóa bài hát',
      handle: handleDeleteSong
    },
  ]

  useEffect(() => {
    const getSongs = async () => {
      const res = await readDataFirebase('songs')
      setSongs(res)
      // console.log(res)
    }
    getSongs()
  }, [])

  useEffect(() => {
    if (songs) {
      if (playlists[id].songs) {
        const new_data = Object.keys(playlists[id].songs).map(key => {
          return {
            key: key,
            isLiked: true,
            artist: songs[key].artistId,
            songImg: { uri: songs[key].imgUrl },
            title: songs[key].name
          }
        })
        // console.log(new_data)
        setMusic(new_data)
      }
      else{
        setMusic([])
      }
    }

  }, [playlists, songs])


  const handleNavigator = () => {
    setIsVisibleEdit(true)
  }

  const handleLayout = (id) => {
    setIsVisible(true);
    setIdSong(id);

  }
  const handleOutlineAdd = (status) => {
    setIsAddmusic(status);
    setIsVisibleEdit(!status);
  }
  const handleAdd = async (status, song) => {
    // console.log(status, song)
    const new_data = { ...playlists[id].songs, ...song }
    try {
      const rep = await writeDataFirebase(`playlists/${id}`, new_data, 'songs')
      if (rep) {
        dispatch(getPlayLists({}))
        setIsVisibleEdit(status)
        setIsAddmusic(!status)
        ToastAndroid.show('Successful', ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      }
    }
    catch (error) {
      console.log(error)
      ToastAndroid.show('Failed', ToastAndroid.SHORT);
    }
  }

  const handleOutlineDelete = (status) => {
    setIsDelete(status);
    setIsVisibleEdit(!status);
  }
  const handleDelete = async (status, song) => {
    const new_data = { ...playlists[id].songs }
    Object.keys(song).map((key) => {
      delete new_data[key]
    }
    )

    try {
      const rep = await writeDataFirebase(`playlists/${id}`, new_data, 'songs')
      if (rep) {
        setIsDelete(!status)
        setIsVisibleEdit(status)
        dispatch(getPlayLists({}))
        ToastAndroid.show('Successful', ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      }
    }
    catch (err) {
      console.log(err)
      ToastAndroid.show('Failed', ToastAndroid.SHORT);
    }

  }

  const handleLongClick = (id) => {
    setIdMusicSelected(id)
    setIsVisibleLongEdit(true)
  }

  const handleLayoutEdit = () => {
    setIsVisibleEdit(false);
  }

  const handleLayoutLongEdit = () => {
    setIsVisibleLongEdit(false);
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
            id={item.key}
            idSongSelected={idSong}
            songName={item.title}
            songImg={item.songImg}
            artistName={item.artist}
            isLike={item.isLiked}
            index={index}
            handleLayout={handleLayout}
            handleLongClick={handleLongClick}
          />}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      /> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      }
       {/* <View style={{ flex: 1, height: 100 }}></View> */}

      {isVisible && <ControlMusic song={music.find(({ id }) => id === idSong)} />}
      {isVisibleEdit && <Edit handleNavigator={handleLayoutEdit} height={null} edit={sigleEdit} />}
      {isVisibleLongEdit && <Edit handleNavigator={handleLayoutLongEdit} height={null} edit={sigleLongEdit} />}
      {isAddmusic && <RequestAddSongs title={"Xong"} songed={playlists[id].songs} handleNavigator={handleOutlineAdd} handleRequestNext={handleAdd} />}
      {isDelete && <DeleteSongPlaylists title={"Xong"} songed={playlists[id].songs} handleNavigator={handleOutlineDelete} handleRequestNext={handleDelete} />}
      {isDeleteSong && <DeleteSong idplaylist={id} idSong={idMusicSelected} title={songs[idMusicSelected]} handleNavigator={handleDeleteSong} height={null} />}
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