import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import HeaderApp from '../components/header/HeaderApp'
import { icons, images, colors } from '../constants'
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';
import RectangleAlbum from '../components/misc/RectangleAlbum';
import TitleAlbum from '../components/misc/TitleAlbum'
import { getDataAsyncStorage } from '../utilities/AsyncStorage';
const music = [
    {
    title: 'Lovely',
    artist: 'Billie Eilish',
    songImg: images.imgLovely,
    // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
    duration: 2 * 60 + 53,
    id: '1',
  },
  {
    title: 'Understand',
    artist: 'Keshi',
    songImg: images.imgUnderstand,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '2',
    track_number: '2'
  },{
    title: 'Snooze',
    artist: 'SZA',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '3',
    track_number: '3'
  },{
    title: 'If you',
    artist: 'BigBang',
    songImg: images.imgIfYou,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '4',
    track_number: '4'
  },{
    title: 'Shoong',
    artist: 'Teayang',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '5',
    track_number: '5'
  },{
    title: 'Die For You',
    artist: 'The Weeknd',
    songImg: images.imgDieForYou,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '6',
    track_number: '6'
  },
  {
    title: 'double take',
    artist: 'dhruv',
    songImg: images.imgDoubleTakeL,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '7',
    track_number: '7'
  }
  ]
const dataAlbum = [
    {
      id: 0,
      name: 'Tình yêu',
      img:images.playlistTinhYeu
    },
    {
      id: 1,
      name: 'Buồn',
      img: images.playlistBuon
    },
    {
      id: 2,
      name: 'Lofi',
      img: images.playlistLofi
    },
    {
      id: 3,
      name: 'Top trend',
      img: images.playlistTinhYeu
    },
    {
      id: 4,
      name: 'Bolero',
      img: images.playlistBolero
    }
  ]
const username = "User Name"
const follower = "100"
const following = "124"
export default function Profile({navigation}) {

    const {user} = useSelector((state) => state.user);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        getDataAsyncStorage('user')
        .then(data => {
            console.log(data)
        })
    }, [])
  
    // const[user, setUser] = useState();
    const [idSong, setIdSong] = useState(0);

    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);

    }

    const goBack = () => {
        navigation.goBack()
    }

    const handleNavigatorEditProfile = () => {
        navigation.navigate('Upload')
    }
    return (
        <View style={{ flex: 1 }}>
            <HeaderApp 
                title={'Profile'} 
                iconLeft={icons.arrowBack} 
                iconRight={icons.editProfile}
                goBack={goBack}
                handleNavigator={handleNavigatorEditProfile}
                />
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <View style={{ marginLeft: -100 , marginRight: 15 }}>
                        <Image source={(user&&user.imgUrl)?user.imgUrl:images.demo} style={styles.img} />   
                    </View>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.black }}>{user&&user.displayName}</Text>
                        <Text style={{ }}>Follower {follower}</Text>
                        <Text>Following {following}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.line}></View>
            {/* <View style={{ marginTop: 28 }}> */}
            <View style={{marginLeft:24}}>
                <TitleAlbum name={'Your playlists'} />
                <FlatList
                    data={dataAlbum}
                    renderItem={({ item }) => 
                    {
                        return  (<View style={{marginRight:24}}>
                            <RectangleAlbum id={item.id} name={item.name} img={item.img} />
                        </View>)
                    }}
                    keyExtractor={(item, index) => index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
                <View style={{marginLeft:24}}>
                    <TitleAlbum  name={'Your likes'} />
                </View>
                <FlatList
                    style={{ marginTop: 10, marginBottom: 50 }}
                    data={music}
                    renderItem={({ item, index }) =>
                        <MyLike
                            id={item.id}
                            idSongSelected={idSong}
                            songName={item.title}
                            songImg={item.songImg}
                            artistName={item.artist}
                            isLike={true}
                            index={index}
                            handleLayout={handleLayout}
                        />}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                />
            {isVisible && <ControlMusic song={dataLike.find(({ id }) => id === idSong)} />}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 25, 
        fontFamily: 'Montserrat', 
        marginBottom: 27 
    },
    containerImg: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
     
    },
    img: {
        height: 140, 
        width: 140,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'cover',

    },
    line: {
        height: 3,
        width: '100%',
        borderColor: '#EDEDED',
        elevation: 4,
        marginTop: 28
    },
})