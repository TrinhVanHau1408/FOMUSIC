import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, ToastAndroid, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { colors, icons, images } from '../constants'
import RectangleAlbum from '../components/misc/RectangleAlbum'
import ControlDetatilPalylist from '../components/playlist/ControlDetatilPlaylist'
import MyLike from '../components/like/MyLikeLong';
import ControlMusic from '../components/misc/ControlMusic';
import { useDispatch, useSelector } from 'react-redux'
import { readDataFirebase, writeDataFirebase } from '../firebase/controllerDB'
import { setPlayLists } from '../redux/slices/playlistsSlice'
import Edit from '../components/misc/Edit'
import RequestAddSongs from '../components/misc/RequestAddSongs'
import { isFulfilled } from '@reduxjs/toolkit'
import DeleteSongPlaylists from '../components/misc/DeleteSongPlaylist'
import DeleteSong from '../components/misc/DeleteSong'
import PopupMenu from '../components/popup/PopupMenu'
import PopupAddSong from '../components/popup/PopupAddSong'
import PopupDelele from '../components/popup/PopupDelele'


export default function DetailPlaylist({ navigation, route }) {
  const { playlist } = route.params;
  const dispatch = useDispatch()
  const { playlists } = useSelector((state) => state.playlists)
  // const dataPlaylist = music.find((artist) => artist.id == id);
  const [currPlaylist, setCurrPlaylist] = useState({ ...playlist }); // playlis là [{}] nên destruct bỏ []
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [isAddmusic, setIsAddmusic] = useState(false);
  const [idSong, setIdSong] = useState(0);
  const [songs, setSongs] = useState()
  // const [details, setDetails] = useState(playlists[id])
  const [mySongs, setMySongs] = useState()
  const [mySongSelected, setMySongSelectd] = useState({})
  



  const [isVisiblePopupMenuIcon, setIsVisiblePopupMenuIcon] = useState(false);
  const [isVisiblePopupAddSong, setIsVisiblePopupAddSong] = useState(false);
  const [isVisiblePopupMenuLongLick, setIsVisiblePopupMenuLongLick] = useState(false);
  const [isVisiblePopupDelete, setIsVisiblePopupDelete] = useState(false)
  const handleOpenPopupMenuIcon = () => {
    setIsVisiblePopupMenuIcon(true);
  }

  const handleOpenPopupAddSong = () => {
    setIsVisiblePopupAddSong(true)
  }

  const handleOpenPopupDelete = () => {
    setIsVisiblePopupDelete(true)
  }

  const menuCLickIcon = [
    {
      icon: icons.listAdd,
      title: 'Thêm bài hát',
      handle: handleOpenPopupAddSong
    }
  ]


   const menuLongClick = [
    {
      icon: icons.listAdd,
      title: 'Xóa bài hát',
      handle: handleOpenPopupDelete
    },
  ]

  const handleAddSong = async (songPicked) => {
    const platlistId = currPlaylist.key;

    const objSongIdPicks = songPicked.reduce(function (acc, value) {
      acc[value] = "";
      return acc;
    }, {});

    const dataSongs = { ...currPlaylist.songs, ...objSongIdPicks }
    console.log('songIdPicks handleAdd 134', dataSongs)

    try {
      const resAddSong = await writeDataFirebase(`playlists/${platlistId}`, dataSongs, 'songs')

      if (resAddSong) {

        let indexPlaylist = -1;

        const updatedDataArray = playlists.map((obj, index) => {
          // console.log("obj", obj)
          if (obj.key === currPlaylist.key) {

            indexPlaylist = index;
            return {
              ...obj,
              songs: dataSongs
            };
          }
          return obj;
        });

        console.log('dispatch(setPlayLists', updatedDataArray)
        setCurrPlaylist(updatedDataArray[indexPlaylist])
        dispatch(setPlayLists(updatedDataArray))




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

  const handleLongPressOneSong = (songIdSelected) => {
    setIsVisiblePopupMenuLongLick(true);
    const songSelected = mySongs.filter(({key}) => key === songIdSelected)[0];
    setMySongSelectd(songSelected)
  }

  const handleCheckDeleteSongSuccess = (songIdDelete) => {
    const songsIds= currPlaylist.songs;
    delete songsIds[songIdDelete];

    console.log('handleDeleteSongInPlaylist songsIds')
    console.log(songsIds)
    setCurrPlaylist({...currPlaylist, songs: songsIds})
    dispatch(setPlayLists([...playlists, currPlaylist]))
  }
  //............................
  // const sigleLongEdit = [
  //   {
  //     icon: icons.listAdd,
  //     title: 'Xóa bài hát',
  //     handle: handlePopupDeleteMySong
  //   },
  // ]

  useEffect(() => {
    const getSongs = async () => {
      const res = await readDataFirebase('songs')
      setSongs(res)
      // console.log(res)
    }
    getSongs()
  }, [])

  const getAllSongByPlaylist = async () => {
    console.log('92', currPlaylist)
    const songIds = currPlaylist.songs;

    const song = []
    for (const songId in songIds) {
      // console.log(id); // In ra các khóa (keys)
      const data = await readDataFirebase(`songs/${songId}`)

      song.push({ key: songId, ...data });
    }

    // console.log("My song: ", song)

    setMySongs(song);
  }

  useEffect(() => {
    // console.log(playlist);
    //  if (playlist) console.log(playlist.songs);

    console.log('songs add', currPlaylist.songs);
    getAllSongByPlaylist();

  }, [currPlaylist.songs, currPlaylist])


 
  
 

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1 }}>

      <HeaderApp title={currPlaylist.name} iconLeft={icons.arrowBack} iconRight={icons.option} goBack={goBack} handleNavigator={handleOpenPopupMenuIcon} />
      <View style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25,
      }}>
        <RectangleAlbum id={playlist.key} name={playlist.name} artwork={playlist.imageUrl} isPlaylist={true} isDetailPlaylist={true} />
      </View>
      <ControlDetatilPalylist />
      <View style={styles.line}></View>
      {/* <View style={{ marginTop: 28 }}> */}
      {mySongs ? <FlatList
        style={{}}
        data={[...mySongs].reverse()}
        renderItem={({ item, index }) =>
          <MyLike
            id={item.key}
            songName={item.name}
            songImg={item.artwork}
            artistName={item.artist}
            isLike={item.isLiked}
            index={index}
          
            handleLongClick={handleLongPressOneSong}
          />}
          
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      /> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      }


      {/* <View style={{ flex: 1, height: 100 }}></View> */}

      {/* { isVisible && <ControlMusic song={music.find(({ id }) => id === idSong)} /> }
  { isVisibleEdit && <Edit handleNavigator={handleLayoutEdit} height={null} edit={sigleEdit} /> }
  { isVisibleLongEdit && <Edit handleNavigator={handleLayoutLongEdit} height={null} edit={sigleLongEdit} /> }
  { isAddmusic && <RequestAddSongs title={"Xong"} handlePopup={handlePopupAdd} handleRequestNext={handleAddMySong} /> }

  {/* Để làm sao */ }
      {/* {isDelete && <DeleteSongPlaylists title={"Xong"} songed={currPlaylist.songs} handleNavigator={handleOutlineDelete} handleRequestNext={handleDeleteMySong} />} */}
      {/* isDeleteMySong && <DeleteSong idPlaylist={currPlaylist.key} setCurrPlaylist={setCurrPlaylist} currPlaylist={currPlaylist} idSong={songIdSelected} title={'mySongs'} handlePopup={handlePopupDeleteMySong} height={null} /> */}

      <PopupMenu
        menu={menuCLickIcon}
        isVisiblePopup={isVisiblePopupMenuIcon}
        setIsVisiblePopup={setIsVisiblePopupMenuIcon} />
      <PopupAddSong
        playlist={currPlaylist}
        isVisiblePopup={isVisiblePopupAddSong}
        setMySongPlaylist= {setCurrPlaylist}
        setIsVisiblePopup={setIsVisiblePopupAddSong}
        handleClickButtonCreate={handleAddSong} />

      <PopupMenu 
        menu = {menuLongClick}
        isVisiblePopup={isVisiblePopupMenuLongLick}
        setIsVisiblePopup={setIsVisiblePopupMenuLongLick}
      />
      {/* //parentNode, playlistSeclected, isVisiblePopup, setIsVisiblePopup */}
      <PopupDelele 
        parentNode={`playlists/${currPlaylist.key}/songs/`}
        Seclected = {mySongSelected}
        isVisiblePopup={isVisiblePopupDelete}
        setIsVisiblePopup={setIsVisiblePopupDelete}
        handleCheckDeleleSuccess = {handleCheckDeleteSongSuccess}
        />
    </View >
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