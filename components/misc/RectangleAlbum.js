import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, images } from '../../constants';
export default function RectangleAlbum(props) {
    const { id, name, img, handleButton } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleButton}>
                <Image source={img ? img : images.demo} style={styles.img} />
                <Text style={styles.textName}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 227,
        marginRight: 20,
    },

    img: {
        width: 227,
        height: 133,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'stretch'
    },
    textName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#000000'
    }
})
