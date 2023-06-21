import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { images } from '../../constants'

export default function SquareSongSearch({id, name, image, handleClick}) {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={image ? { uri: image } : images.demo} style={styles.imgSong} />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View>
                            <Text style={styles.textNameSong}>{name}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    imgSong: {
        height: 70,
        width: 70,
        borderRadius: 5
    },
    textNameSong: {
        marginLeft: 30,
        fontSize: 18,
        fontWeight: 'bold'
    }
})
