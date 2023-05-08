import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, colors, images } from '../constants'
import TitleAlbum from '../components/misc/TitleAlbum'
import RectangleImg from '../components/search/RectangleImg'
import SquareImg from '../components/search/SquareImg'
const dataSearch = [
  {
    id: 1,
    songName: 'Song name 1',
    songImg: images.defaultAvt,
    artistName: 'Artis 1',
    isLiked: true
  },
  {
    id: 2,
    songName: 'Song name 2',
    songImg: images.defaultAvt,
    artistName: 'Artis 2',
    isLiked: false
  },
  {
    id: 3,
    songName: 'Song name 3',
    songImg: images.defaultAvt,
    artistName: 'Artis 3',
    isLiked: false
  },
  {
    id: 4,
    songName: 'Song name 4',
    songImg: images.defaultAvt,
    artistName: 'Artis 4',
    isLiked: true
  },
  {
    id: 5,
    songName: 'Song name 5',
    songImg: images.defaultAvt,
    artistName: 'Artis 5',
    isLiked: true
  },
  {
    id: 6,
    songName: 'Song name 5',
    songImg: images.defaultAvt,
    artistName: 'Artis 5',
    isLiked: true
  },
  {
    id: 7,
    songName: 'Song name 1',
    songImg: images.defaultAvt,
    artistName: 'Artis 1',
    isLiked: true
  },
  {
    id: 8,
    songName: 'Song name 2',
    songImg: images.defaultAvt,
    artistName: 'Artis 2',
    isLiked: false
  },
  {
    id: 9,
    songName: 'Song name 3',
    songImg: images.defaultAvt,
    artistName: 'Artis 3',
    isLiked: false
  },

]
export default function Search() {
  return (
    <View>
      <HeaderApp title={'Search'} iconLeft={icons.arrowBack} />
      <View style={styles.InputTextContainer}>
        <Image source={icons.search} style={styles.Icon} />
        <TextInput placeholder={'Demo'} style={styles.InputText} />
      </View>
      <View style={{ marginLeft: 24 }}>
        <TitleAlbum name={'Tìm kiếm gần đây'} />
        <FlatList
          style={{ marginTop: 10 }}
          data={dataSearch}
          renderItem={({ item, index }) =>
            <RectangleImg
              id={item.id}
              songImg={item.songImg}
            />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ marginLeft: 24 }}>
        <TitleAlbum name={'Đề xuất'} />
        <FlatList
          style={{ marginTop: 10, marginBottom: 120}}
          data={dataSearch}
          renderItem={({ item, index }) =>
            <SquareImg
              id={item.id}
              songImg={item.songImg}
            />}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  InputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
    margin: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20
  },
  InputText:
  {
    padding: 4,
    margin: 0,
    height: 40,
    color: "#555454",
    flex: 1
  },
  Icon:
  {
    marginLeft: 10,
    marginTop: 4,
    marginRight: 8,
    marginBottom: 4,
    tintColor: colors.primary,
    height: 24,
    width: 24,
  },
})