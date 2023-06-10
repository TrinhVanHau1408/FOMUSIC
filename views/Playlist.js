import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import RectangleAlbum from '../components/misc/RectangleAlbumLong'
import Edit from '../components/misc/Edit'
import CreatePlaylist from '../components/misc/CreatePlaylist'
import { icons, images } from '../constants'
import { ScrollView } from 'react-native-gesture-handler'
import { getAllPlaylistByUserId, getPlayLists } from '../redux/slices/playlistsSlice';
import { useDispatch, useSelector } from 'react-redux'
import { serverTimestamp } from 'firebase/database'
import UpdatePlaylist from '../components/misc/UpdatePlaylist'
import DeletePlaylists from '../components/misc/DeletePlaylists'
import RequestAddSongs from '../components/misc/RequestAddSongs'
import AddSongPlaylists from '../components/misc/RequestAddSongs'
import { writeDataFirebase } from '../firebase/controllerDB'
import DeleteSongPlaylists from '../components/misc/DeleteSongPlaylist'
import { filterObject } from '../utilities/Object'
import PopupAddSong from '../components/popup/PopupAddSong'
import PopupCreateNewPlaylist from '../components/popup/PopupCreateNewPlaylist'
import PopupMenu from '../components/popup/PopupMenu'
import { uploadFileStorage } from '../firebase/controllerStorage'
import PopupUpdatePlaylist from '../components/popup/PopupUpdatePlaylist'
import PopupDelele from '../components/popup/PopupDelele'



export default function Playlist({ navigation, route }) {
  // const { playlists } = route.params
  // const { loading, error, playlists } = useSelector((state) => state.playlists)
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)
  const { playlists } = useSelector((state) => state.playlists)

  // console.log('playlists', playlists)
  const [isVisiblePopupMenu, setIsVisiblePopupMenu] = useState(false);
  const [isVisiblePoupAddSong, setIsVisiblePoupAddSong] = useState(false);
  const [isVisiblePoupCreateNewPlaylist, setIsVisiblePoupCreateNewPlaylist] = useState(false);
  const [isVisiblePopupUpdatePlaylist, setIsVisiblePopupUpdatePlaylist] = useState(false);
  const [isVisiblePopupDeletePlaylist, setIsVisiblePopupDeletePlaylist] = useState(false);
  const [isVisiblePopupMenuLongClick, setIsVisiblePopupMenuLongClick] = useState(false);
  const [infoNewPlaylist, setInfoNewPlaylist] = useState({}); // name, description, imgUrl

  const [isCreatNewPlaylistSucces, setIsCreatNewPlaylistSuccess] = useState(false);
  // const [descriptionNewPlaylist, setDescriptionNewPlaylist] = useState('');
  const [imgUrlNewPlaylist, setImgUrlNewPlaylist] = useState('');
  const [imgNameNewPlaylist, setImgNameNewPlaylist] = useState('');
  const [songIdPicked, setSongIdPicked] = useState([]);
  const [playlistSeclected, setPlaylistSeclected] = useState({});

  // Mở popup menu icon
  const handleOpenMenuIcon = () => {
    setIsVisiblePopupMenu(true);
  }

  // Mở popup create new playlist
  const handleOpenPopupCreateNewPlaylist = () => {
    setIsVisiblePoupCreateNewPlaylist(true)
    setIsVisiblePopupMenu(false)
  }

  // Tu man hinh them nhac cho playlist ve man hinh nhap thong tin cho playlist moi
  const handleGoBackPopupAddSongToCreateNewPlaylist = () => {
    setIsVisiblePoupAddSong(false);
    setIsVisiblePoupCreateNewPlaylist(true)
  }

  const handlePopupUpdatePlaylist = () => {
    setIsVisiblePopupUpdatePlaylist(true);
  }
  const handlePoupDeletePlaylist = () => {
    setIsVisiblePopupDeletePlaylist(true);
  }
  // 
  // const createNewPlaylistFirebase = async (imgUrlNewPlaylist, imgNameNewPlaylist, userId) => {
  //   // Xử lý ảnh
  //   // Nếu có chọn ảnh
  //   let imageUrl = ''
  //   if (imgUrlNewPlaylist) {
  //     const result = await fetch(imgUrlNewPlaylist)
  //     const blob = await result.blob()
  //     imageUrl = await uploadFileStorage(`images/${imgNameNewPlaylist}`, blob)
  //   } else {
  //     imageUrl = '';
  //   }

  //   const songObject = {};
  //   if (songIdPicked) {

  //     for (const songId of songIdPicked) {
  //       songObject[songId] = '';
  //     }
  //   }
  //   setImgUrlNewPlaylist(imageUrl);
  //   const newPlaylist = {
  //     ...infoNewPlaylist,
  //     userId: userId,
  //     imageUrl: imageUrl,
  //     songs: songObject,
  //     createdAt: serverTimestamp(),
  //     modifyAt: serverTimestamp(),
  //   }

  //   // Thêm dữ liệu newplaylist vào firebase

  //   try {
  //     const responeNewPlaylist = await writeDataFirebase('playlists', newPlaylist);
  //     if (responeNewPlaylist) {
  //       setIsCreatNewPlaylistSuccess(true);
  //       setIsVisiblePoupCreateNewPlaylist(false)
  //       ToastAndroid.show('Tạo playlist mới thành công', ToastAndroid.SHORT);
  //     } else {
  //       ToastAndroid.show('Tạo playlist mới thất bại', ToastAndroid.SHORT);
  //     }
  //   } catch (e) {
  //     ToastAndroid.show('Tạo playlist mới thất bại ' + e.code, ToastAndroid.SHORT);
  //   }
  // }

  const handleOpenPopupAddSong_setInfoNewPlaylist = (namePlaylist, descriptionPlaylist, imgUrlNewPlaylist, imgNameNewPlaylist) => {

    // Set thông tin của playlist mới
    setInfoNewPlaylist({
      ...infoNewPlaylist,
      'name': namePlaylist,
      'description': descriptionPlaylist
    })

    const checkNameExist = playlists.find(({ name }) => name === namePlaylist)

    if (namePlaylist != '') {
      if (!checkNameExist) {
        setImgUrlNewPlaylist(imgUrlNewPlaylist);
        setImgNameNewPlaylist(imgNameNewPlaylist);

        // console.log('handleOpenPopupAddSong_setInfoNewPlaylist - setInfoNewPlaylist: ', namePlaylist + '' + descriptionPlaylist + '' + imgUrlNewPlaylist 
        // + " " + imgNameNewPlaylist);
        // if (infoNewPlaylist != {}) console.log('handleOpenPopupAddSong_setInfoNewPlaylist - setInfoNewPlaylist: ', infoNewPlaylist)
        // Di chuyển qua popup chọn nhạc thêm vào playlist
        setIsVisiblePoupCreateNewPlaylist(false);
        setIsVisiblePoupAddSong(true);
      } else {
        ToastAndroid.show(`Tên ${namePlaylist} đã tồn tại`, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(`Vui lòng nhập tên`, ToastAndroid.SHORT);
    }

  }


  // const hanleCreateNewPlaylist = (namePlaylist, descriptionPlaylist, imgUrlNewPlaylist, imgNameNewPlaylist) => {
  //   setInfoNewPlaylist({
  //     ...infoNewPlaylist,
  //     'name': namePlaylist,
  //     'description': descriptionPlaylist
  //   })

  //   const checkNameExist = playlists.find(({ name }) => name === infoNewPlaylist.name)
  //   if (infoNewPlaylist != {}) {
  //     if (namePlaylist != '') {
  //       console.log("hanleCreateNewPlaylist: ", playlists)





  //       // Kiểm tra xem tên đó đã tổn tại chưa
  //       console.log('Kiểm tra xem tên đó đã tổn tại chưa',checkNameExist)
  //       if (!checkNameExist) {

  //         try {
  //           createNewPlaylistFirebase(imgUrlNewPlaylist, imgNameNewPlaylist, user.uid);
  //           dispatch(getAllPlaylistByUserId({ userId: user.uid }))
  //         } catch {

  //         }

  //       } else {
  //         // Tên đã tồn tại
  //         ToastAndroid.show('Tên này đã tồn tại', ToastAndroid.SHORT);
  //       }
  //     } else {
  //       // Chưa nhập name playlist
  //       ToastAndroid.show('Vui lòng nhập tên cho playlist', ToastAndroid.SHORT);
  //     }
  //   }


  // }

  // const handleCreateNewPlaylistWithSong = (songPicked) => {


  //   setSongIdPicked(songPicked);

  //   const checkNameExist = playlists.find(({ name }) => name === infoNewPlaylist.name)
  //   if (infoNewPlaylist != {}) {
  //     if (infoNewPlaylist.name != '') {
  //       console.log("hanleCreateNewPlaylist: ", playlists)
  //       // Kiểm tra xem tên đó đã tổn tại chưa
  //       console.log(checkNameExist)
  //       if (checkNameExist == undefined) {

  //         try {
  //           createNewPlaylistFirebase(imgUrlNewPlaylist, imgNameNewPlaylist, user.uid);
  //           dispatch(getAllPlaylistByUserId({ userId: user.uid }))
  //           setIsVisiblePoupAddSong(false)
  //         } catch {

  //         }

  //       } else {
  //         // Tên đã tồn tại
  //         ToastAndroid.show('Tên này đã tồn tại', ToastAndroid.SHORT);
  //       }
  //     } else {
  //       // Chưa nhập name playlist
  //       ToastAndroid.show('Vui lòng nhập tên cho playlist', ToastAndroid.SHORT);
  //     }
  //   }

  // }

  const menuIcon = [
    {
      icon: icons.listAdd,
      title: 'Tạo playlist',
      handle: handleOpenPopupCreateNewPlaylist
    }
  ]


  const handleLongPressOnePlaylist = (playlistIdSelected) => {
    setIsVisiblePopupMenuLongClick(true)
    console.log('handleLongPressOnePlaylist', playlistIdSelected)
    const playlistSelected = playlists.filter(({ key }) => key === playlistIdSelected);

    console.log('playlistSelected', playlistSelected)
    // setIsVisiblePopupUpdatePlaylist(true)
    setPlaylistSeclected({ ...playlistSelected[0] })
  }

  /// ------------------------------------------------------------------------------



  const menuLongClick = [
    {

      icon: icons.listAdd,
      title: 'Cập nhật playlist',
      handle: handlePopupUpdatePlaylist

    },
    {
      icon: icons.listAdd,
      title: 'Xóa playlist',
      handle: handlePoupDeletePlaylist
    }
  ]





  const goBack = () => {
    navigation.goBack();
  }

  const handleNavigatorDetailPlaylist = (playlistSelectdId) => {
    const playlist = playlists.filter(({ key }) => key === playlistSelectdId)[0]
    console.log('handleNavigatorDetailPlaylist', playlist[0])
    navigation.navigate('DetailPlaylist', { playlist });
  }






  // const handleDelete = async (status, song) => {
  //   setIsDeleteSong(!status)
  //   setIsLongClick(status)
  //   var new_data = { ...playlists[idSelector].songs }
  //   // console.log(song)
  //   Object.keys(song).map(key => {
  //     delete new_data[key]
  //   })
  //   // console.log(new_data)
  //   try {
  //     const rep = await writeDataFirebase(`playlists/${idSelector}`, new_data, "songs")
  //     console.log(rep)
  //     if (rep) {
  //       ToastAndroid.show('Successful', ToastAndroid.SHORT);
  //       dispatch(getPlayLists({}))
  //     }
  //     else {
  //       ToastAndroid.show('Failed', ToastAndroid.SHORT);
  //     }
  //   }
  //   catch (err) {
  //     console.log(err)
  //     ToastAndroid.show('Failed', ToastAndroid.SHORT);
  //   }
  // }

  return (
    <View style={{ position: 'relative' }}>

      <HeaderApp
        title={'Playlist'}
        iconLeft={icons.arrowBack}
        iconRight={icons.option}
        goBack={goBack}
        handleNavigator={handleOpenMenuIcon} />
      <View style={styles.container}>
        {playlists ?
          <FlatList
            data={[...playlists].reverse()}
            renderItem={({ item, index }) =>
              <RectangleAlbum
                id={item.key}
                name={item.name}
                img={item.imageUrl}
                type={2}
                isPlaylist={true}
                handleNavigator={handleNavigatorDetailPlaylist}
                handleLongPress={handleLongPressOnePlaylist} />}

            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}

          /> :
          <TouchableOpacity onPress={handleOpenPopupCreateNewPlaylist}>
            <Text>Tạo mới</Text>
          </TouchableOpacity>
        }
        {!playlists && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>}

      </View>

      <PopupAddSong
        playlist={infoNewPlaylist}
        infoImg={{ imgUrlNewPlaylist, imgNameNewPlaylist }}
        isVisiblePopup={isVisiblePoupAddSong}
        setIsVisiblePopup={setIsVisiblePoupAddSong}
        handleGoBackPopup={handleGoBackPopupAddSongToCreateNewPlaylist}
      />
      <PopupCreateNewPlaylist
        isVisiblePopup={isVisiblePoupCreateNewPlaylist}
        isCreatNewPlaylistSucces={isCreatNewPlaylistSucces}
        setIsVisiblePopup={setIsVisiblePoupCreateNewPlaylist}
        handleMoveToPopupAddSong={handleOpenPopupAddSong_setInfoNewPlaylist}

      />
      <PopupMenu menu={menuIcon} isVisiblePopup={isVisiblePopupMenu} setIsVisiblePopup={setIsVisiblePopupMenu} />
      <PopupMenu menu={menuLongClick} isVisiblePopup={isVisiblePopupMenuLongClick} setIsVisiblePopup={setIsVisiblePopupMenuLongClick} />
      <PopupUpdatePlaylist
        isVisiblePopup={isVisiblePopupUpdatePlaylist}
        setIsVisiblePopup={setIsVisiblePopupUpdatePlaylist}
        playlistSeclected={playlistSeclected}
      />
      <PopupDelele
        parentNode={'playlists'}
        Seclected={playlistSeclected}
        isVisiblePopup={isVisiblePopupDeletePlaylist}
        setIsVisiblePopup={setIsVisiblePopupDeletePlaylist} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 175,
  },
})