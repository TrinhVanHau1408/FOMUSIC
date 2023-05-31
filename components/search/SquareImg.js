import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { images, colors } from '../../constants'
export default function SquareImg({id, songImg}) {
    return (
        <View style={styles.container}>
            <Image source={songImg} style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
        marginBottom: 15,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 2
    }
})