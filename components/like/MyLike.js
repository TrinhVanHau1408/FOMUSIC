import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, icons, images } from '../../constants'
export default function MyLike({ id, songName, songImg, artistName, isLike, index }) {
    const [isLiked, setIsIsLiked] = useState(isLike);
    const handlePlayMusic = () => {
        Alert.alert('Play music');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handlePlayMusic}
                style={styles.info}
            >
                <View style={styles.stt}>
                    <Text>{index + 1}</Text>
                </View>
                <View >
                    <Image source={songImg} style={styles.img} />
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
        marginHorizontal: 30,
        marginVertical: 12,
    },
    stt: {
        marginRight: 22,
        fontFamily: 'Montserrat',
        fontSize: 17
    },
    img: {
        resizeMode: 'cover', height: 70,
        width: 66,
        borderColor: colors.primary,
        borderRadius: 15,
        borderWidth: 3
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 100,
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