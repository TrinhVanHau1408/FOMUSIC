import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, icons, images } from '../../constants'
export default function MyLike({ id,idSongSelected, songName, songImg, artistName, isLike, index, handleLayout,setIdSong  }) {
    const [isLiked, setIsIsLiked] = useState(isLike);
    // const handlePlayMusic = () => {
    //     Alert.alert('Play music');
        
    // }
    // useEffect(() => {
    //     setIdSong(id);
    //     // Alert.alert('id',id)
    // },[id]);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>handleLayout(id)}
                style={styles.info}
            >
                <View style={styles.stt}>
                    {idSongSelected===id?<Image source={icons.playing}/>:
                    <Text>{id}</Text>}
                </View>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: songImg}} style={styles.img} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.songName}>{songName}</Text>
                    <Text style={styles.artistName}>{artistName}</Text>
                </View>
            </TouchableOpacity>

            <View style={[styles.button, isLiked ? styles.buttonClick : styles.buttonUnClick]}>
                <TouchableOpacity onPress={() => { setIsIsLiked(!isLiked) }}>
                    <Image source={isLiked ? icons.heart : icons.unHeart} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 22,
        marginVertical: 12,

        // backgroundColor: colors.primary
    },
    stt: {
        marginRight: 22,
        fontFamily: 'Montserrat',
        fontSize: 17,
        
    },
    imgContainer: {
        resizeMode: 'cover', height: 80,
        width: 80,
        overflow: 'hidden',
        borderRadius: 20,
        shadowColor: '#171717',
        elevation: 5
      
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    content: {
        marginLeft: 22,
        fontFamily: 'Montserrat',
    },
    songName: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    artistName: {
        fontSize: 12,
        lineHeight: 15,
    },
})