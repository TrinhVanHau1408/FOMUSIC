import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { images, colors } from '../../constants'
export default function RectangleImg({id, songImg}) {
    return (
        <View style={styles.container}>
            <Image source={songImg} style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    },
    img: {
        width: 140,
        height: 153,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 2
    }
})