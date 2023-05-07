import React from 'react';
import { Image, Text, View, FlatList, SafeAreaView, Alert } from 'react-native';
import HeaderApp from '../components/header/HeaderApp';
import { colors, icons, images } from '../constants';
import SquareAlbum from '../components/misc/SquareAlbum';
import { ScrollView } from 'react-native-gesture-handler';
import CircleAlbum from '../components/misc/CircleAlbum';
import RectangleAlbum from '../components/misc/RectangleAlbum';
import TitleAlbum from '../components/misc/TitleAlbum';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const dataAlbum = [
  {
    id: 0,
    name: 'Name 1',
    img: images.demo
  },
  {
    id: 1,
    name: 'Name 2',
    img: images.demo
  },
  {
    id: 2,
    name: 'Name 3',
    img: images.demo
  },
  {
    id: 3,
    name: 'Name 4',
    img: images.demo
  },
  {
    id: 4,
    name: 'Name 5',
    img: images.demo
  }
]

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = _data => 50;
export default function Library() {
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderApp title={'Library'} />
        <View>
          <Image source={icons.musicNote1} style={{ position: 'absolute', left: 0, bottom: '15%', height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
          <Image source={icons.musicNote2} style={{ position: 'absolute', right: 0, bottom: '15%', height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
        </View>
       <View style={{ marginHorizontal: 24}}>
       <View >
          <TitleAlbum name={'Listening history'} />
          <FlatList
            data={dataAlbum}
            renderItem={({ item }) =>
              <SquareAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton}/>}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View>
          <TitleAlbum name={'Artists'} />
          <FlatList
            data={dataAlbum}
            renderItem={({ item }) => <CircleAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton}/>}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <TitleAlbum name={'Playlist'} />
          <FlatList
            data={dataAlbum}
            renderItem={({ item }) => <RectangleAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton}/>}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <TitleAlbum name={'Album'} />

          <FlatList
            data={dataAlbum}
            renderItem={({ item }) =>
              <SquareAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton}/>}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <TitleAlbum name={'Following'} />
          <FlatList
            data={dataAlbum}
            renderItem={({ item }) => <CircleAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton}/>}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View>
          <TitleAlbum name={'Likes'} />
          <FlatList
            data={dataAlbum}
            renderItem={({ item }) =>
              <SquareAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton}/>}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{ flex: 1, height: 50 }}></View>
       </View>
      </ScrollView>
    </SafeAreaView>
  )
};

