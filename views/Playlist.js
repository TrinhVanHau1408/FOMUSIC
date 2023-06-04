import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import RectangleAlbum from '../components/misc/RectangleAlbumLong'
import Edit from '../components/misc/Edit'
import CreatePlaylist from '../components/misc/CreatePlaylist'
import { icons, images } from '../constants'
import { ScrollView } from 'react-native-gesture-handler'
import { getPlayLists } from '../redux/slices/playlistsSlice';
import { useDispatch, useSelector } from 'react-redux'
import UpdatePlaylist from '../components/misc/UpdatePlaylist'
import DeletePlaylists from '../components/misc/DeletePlaylists'
import RequestAddSongs from '../components/misc/RequestAddSongs'
import AddSongPlaylists from '../components/misc/RequestAddSongs'
import { writeDataFirebase } from '../firebase/controllerDB'
import DeleteSongPlaylists from '../components/misc/DeleteSongPlaylist'

export default function Playlist({ navigation, route }) {
  const { id } = route.params
  const { loading, error, playlists } = useSelector((state) => state.playlists)
  const user = useSelector((state) => state.user)
  const [isVisible, setIsVisible] = useState(false)
  const [islongClick, setIsLongClick] = useState(false)
  const [isUpdateName, setIsUpdateName] = useState(false)
  const [arrayplaylist, setArrayPlaylist] = useState(null)
  const [idSelector, setIdSelector] = useState(null)
  const [isDelete, setIsDelete] = useState(null)
  const [isUpdateDes, setIsUpdateDes] = useState(null)
  const [isUpdateImage, setIsUpdateImage] = useState(null)
  const [isAddSongs, setIsAddSongs] = useState(null)
  const [isNext, setIsNext] = useState(null)
  const [songAdded, setSongAdded] = useState([])
  const [isAdd, setIsAdd] = useState(null)
  const [ isDeleteSong, setIsDeleteSong] = useState()


  const dispatch = useDispatch();

  const handleCreatePlaylist = (status) => {
    setIsAddSongs(status)
    setIsVisible(!status)
  }

  const handleRequestSongs = (status) => {
    setIsAddSongs(status)
    setIsVisible(!status)
  }

  // console.log(user)

  const handleRequestNext = (status, song) => {
    setIsNext(status)
    setIsAddSongs(!status)
    setSongAdded(song)
  }
  const handleUpdateNamePlaylist = (status) => {
    setIsUpdateName(status)
    setIsLongClick(!status)
    dispatch(getPlayLists({}))
  }

  const handleDeletePlaylist = (status) => {
    setIsDelete(status)
    setIsLongClick(!status)
    dispatch(getPlayLists({}))
  }
  const handleUpdateDesPlaylist = (status) => {
    setIsUpdateDes(status)
    setIsLongClick(!status)
    dispatch(getPlayLists({}))
  }
  const handleUpdateImagePlaylist = (status) => {
    setIsUpdateImage(status)
    setIsLongClick(!status)
    dispatch(getPlayLists({}))
  }

  const handleOutside = (status) => {
    setIsNext(status)
    setIsAddSongs(!status)
  }

  const handleOnCreate = (status) => {
    setIsNext(status)
    dispatch(getPlayLists({}))
  }

  const handleAddSongs = (status) => {
    setIsAdd(status)
    setIsLongClick(!status)
  }

  const handleDeleteSongs = (status) => {
    setIsDeleteSong(status)
    setIsLongClick(!status)
  }

  const sigleEdit = [
    {
      icon: icons.listAdd,
      title: 'Tạo playlist',
      handle: handleCreatePlaylist
    },
    {
      icon: icons.search,
      title: 'Tìm kiếm playlist',
      handle: null
    }
  ]

  const multiEdit = [
    {
      icon: icons.removeCircle,
      title: `Xóa playlist`,
      handle: handleDeletePlaylist
    },
    {
      icon: icons.editProfile,
      title: `Thay đổi tên`,
      handle: handleUpdateNamePlaylist
    },
    {
      icon: icons.editProfile,
      title: `Cập nhật mô tả`,
      handle: handleUpdateDesPlaylist
    },
    {
      icon: icons.editProfile,
      title: `Thay đổi hình ảnh`,
      handle: handleUpdateImagePlaylist
    },
    {
      icon: icons.editProfile,
      title: `Thêm bài hát`,
      handle: handleAddSongs
    },
    {
      icon: icons.editProfile,
      title: `Xóa bài hát`,
      handle: handleDeleteSongs
    }
  ]

  useEffect(() => {
    const getdata = async () => {
      dispatch(getPlayLists({}))
    }
    getdata()
  }, [])

  useEffect(() => {
    const data = []
    for (key in playlists) {
      if (playlists[key].userId == user.user.uid) {
        data.push({
          title: playlists[key].name,
          imageUrl: playlists[key].imageUrl,
          id: key
        })
      }
    }
    setArrayPlaylist(data)
  }, [playlists])

  const handleButton = () => {
    Alert.alert('Test', 'Library playlist');
  }
  const goBack = () => {
    navigation.goBack();
  }

  const handleNavigatorDetailPlaylist = (id) => {
    navigation.navigate('DetailPlaylist', { id: id });
  }

  const handleLayout = () => {
    setIsVisible(false);
  }

  const handleNavigator = () => {
    setIsVisible(true);
  }

  const handleLongPress = (id) => {
    setIdSelector(id)
    setIsLongClick(true);
  }

  const handleLayoutLongPress = () => {
    setIsLongClick(false);
  }

  const handleOulineAdd = (status) => {
    setIsAdd(status);
    setIsLongClick(!status);
  }

  const handleOulineDelete = (status) => {
    setIsDeleteSong(status);
    setIsLongClick(!status);
  }

  const handleDelete = async(status, song) => {
    setIsDeleteSong(!status)
    setIsLongClick(status)
    var new_data = {...playlists[idSelector].songs}
    // console.log(song)
    Object.keys(song).map(key =>
      {
        delete new_data[key]
      })
    // console.log(new_data)
    try{
      const rep = await writeDataFirebase( `playlists/${idSelector}`, new_data, "songs")
      console.log(rep)
      if(rep)
      {
        ToastAndroid.show('Successful', ToastAndroid.SHORT);
        dispatch(getPlayLists({}))
      }
      else{
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      }
    }
    catch(err) {
      console.log(err)
      ToastAndroid.show('Failed', ToastAndroid.SHORT);
    }
  }

  const handleAdd = async (status, song) => {
    setIsAdd(!status)
    setIsLongClick(status)

    const new_data = {...playlists[idSelector].songs,...song}

    try {
      const rep = writeDataFirebase(`playlists/${idSelector}`, new_data, "songs")
      console.log(rep)
      if (rep) {
        ToastAndroid.show('Successful', ToastAndroid.SHORT);
        dispatch(getPlayLists({}))
      }
      else{
        ToastAndroid.show('Failed', ToastAndroid.SHORT);
      }
    }
    catch (err) {
      console.error(err)
      ToastAndroid.show('Failed', ToastAndroid.SHORT);
    }
  }

  return (
    <View style={{ position: 'relative' }}>

      <HeaderApp
        title={'Playlist'}
        iconLeft={icons.arrowBack}
        iconRight={icons.option}
        goBack={goBack}
        handleNavigator={handleNavigator} />
      <View style={styles.container}>
        {
          arrayplaylist ?
            <FlatList
              data={arrayplaylist}
              renderItem={({ item, index }) =>
                <RectangleAlbum
                  id={item.id}
                  name={item.title}
                  img={{ uri: item.imageUrl }}
                  type={2}
                  handleButton={handleButton}
                  isPlaylist={true}
                  handleNavigator={handleNavigatorDetailPlaylist}
                  handleLongPress={handleLongPress} />}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
            /> :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="blue" />
            </View>
        }
      </View>
      <View style={{ flex: 1, height: 100 }}></View>

      {isVisible && <Edit handleNavigator={handleLayout} height={null} edit={sigleEdit} />}
      {islongClick && <Edit title={playlists[idSelector]} handleNavigator={handleLayoutLongPress} height={null} edit={multiEdit} />}
      {isUpdateName && <UpdatePlaylist type={'name'} id={idSelector} handleNavigator={handleUpdateNamePlaylist} height={null} />}
      {isDelete && <DeletePlaylists id={idSelector} title={playlists[idSelector]} handleNavigator={handleDeletePlaylist} height={null} />}
      {isUpdateDes && <UpdatePlaylist type={'description'} id={idSelector} handleNavigator={handleUpdateDesPlaylist} height={null} />}
      {isUpdateImage && <UpdatePlaylist type={'image'} id={idSelector} handleNavigator={handleUpdateImagePlaylist} height={null} />}
      {isAddSongs && <RequestAddSongs title={"Tiếp theo"} handleNavigator={handleRequestSongs} handleRequestNext={handleRequestNext} />}
      {isNext && <CreatePlaylist song={songAdded} handleNavigator={handleOnCreate} handleOutside={handleOutside} height={null} />}
      {isAdd && <AddSongPlaylists title={"Xong"} songed={playlists[idSelector].songs} handleNavigator={handleOulineAdd} handleRequestNext={handleAdd} />}
      {isDeleteSong && <DeleteSongPlaylists title={"Xong"} songed={playlists[idSelector].songs} handleNavigator={handleOulineDelete} handleRequestNext={handleDelete}/>}

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