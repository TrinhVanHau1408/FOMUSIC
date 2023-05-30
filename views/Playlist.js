import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import RectangleAlbum from '../components/misc/RectangleAlbumLong'
import Edit from '../components/misc/Edit'
import CreatePlaylist from '../components/misc/CreatePlaylist'
import { icons, images } from '../constants'
import { ScrollView } from 'react-native-gesture-handler'
import { getPlayLists } from '../redux/slices/playlistsSlice'
import { useDispatch, useSelector } from 'react-redux'
import UpdatePlaylist from '../components/misc/UpdatePlaylist'
import DeletePlaylists from '../components/misc/DeletePlaylists'

// const playlist = [
//   {
//     title: 'SVT Playlist 2023',
//     artist: 'FOMUSIC ',
//     songImg: images.playlistSVT,
//     // url: require(''),
//     duration: 2 * 60 + 53,
//     id: '1',
//   },
//   {
//     title: 'Playlist For Relax',
//     artist: 'FOMISUC',
//     songImg: images.playlistFlower,
//     // url: require(''),
//     duration: 2 * 60,
//     id: '2',
//     track_number: '2'
//   },
//   {
//     title: 'Nhac Buon Ngay Mua',
//     artist: 'FOMUSIC',
//     songImg: images.playlistBuon,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '3',
//     track_number: '3'
//   },
//   {
//     title: 'Twice Are Once',
//     artist: 'FOMUSIC',
//     songImg: images.playlistTwice,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '4',
//     track_number: '4'
//   },
// ]
export default function Playlist({ navigation, route }) {
  const { id } = route.params
  const { loading, error, playlists } = useSelector((state) => state.playlists)
  const [isVisible, setIsVisible] = React.useState(false)
  const [islongClick, setIsLongClick] = React.useState(false)
  const [isCreate, setIsCreate] = React.useState(false)
  const [isUpdateName, setIsUpdateName] = React.useState(false)
  const [arrayplaylist, setArrayPlaylist] = React.useState(null)
  const [ idSelector, setIdSelector ] = React.useState(null)
  const [ isDelete, setIsDelete ] = React.useState(null)
  const [ isUpdateDes, setIsUpdateDes ] = React.useState(null)
  const [ isUpdateImage, setIsUpdateImage ] = React.useState(null)

  const dispatch = useDispatch();

  const handleCreatePlaylist = (status) => {
    setIsCreate(status)
    setIsVisible(!status)
    dispatch(getPlayLists({}))
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
    }
  ]

  React.useEffect(() => {
    const getdata = async () => {
      dispatch(getPlayLists({}))
    }
    getdata()
  }, [])

  React.useEffect(() => {
    const data = []
    for (key in playlists) {
      data.push({
        title: playlists[key].name,
        imageUrl: playlists[key].imageUrl,
        id: key
      })
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

  return (
    <View>
      <ScrollView>
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
      </ScrollView>
      {isVisible && <Edit handleNavigator={handleLayout} height={null} edit={sigleEdit} />}
      {islongClick && <Edit title={playlists[idSelector]} handleNavigator={handleLayoutLongPress} height={null} edit={multiEdit} />}
      {isCreate && <CreatePlaylist handleNavigator={handleCreatePlaylist} height={null} />}
      {isUpdateName && <UpdatePlaylist type={'name'} id={idSelector} handleNavigator={handleUpdateNamePlaylist} height={null} />}
      {isDelete && <DeletePlaylists id={idSelector} title={playlists[idSelector]} handleNavigator={handleDeletePlaylist} height={null}/>}
      {isUpdateDes && <UpdatePlaylist type={'description'} id={idSelector} handleNavigator={handleUpdateDesPlaylist} height={null} />}
      {isUpdateImage && <UpdatePlaylist type={'image'} id={idSelector} handleNavigator={handleUpdateImagePlaylist} height={null} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})