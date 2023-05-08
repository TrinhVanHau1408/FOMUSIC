import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, images, colors } from '../constants'
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';
const dataLike = [
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
    }
]
const username = "User Name"
const follower = "100"
const following = "124"
export default function Profile() {
    const [isVisible, setIsVisible] = useState(false);

    const [idSong, setIdSong] = useState(0);
    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);

    }
    return (
        <View style={{ flex: 1 }}>
            <HeaderApp title={'Profile'} iconLeft={icons.arrowBack} iconRight={icons.edit}/>
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <View style={{ marginLeft: -100 , marginRight: 15 }}>
                        <Image source={images.demo} style={styles.img} />   
                    </View>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.black }}>{username}</Text>
                        <Text style={{ }}>Follower {follower}</Text>
                        <Text>Following {following}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.line}></View>
            {/* <View style={{ marginTop: 28 }}> */}
            <FlatList
                style={{ marginTop: 28, marginBottom: 50 }}
                data={dataLike}
                renderItem={({ item, index }) =>
                    <MyLike
                        id={item.id}
                        idSongSelected={idSong}
                        songName={item.songName}
                        songImg={item.songImg}
                        artistName={item.artistName}
                        isLike={item.isLiked}
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