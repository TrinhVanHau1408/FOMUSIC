import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, images } from '../../constants';
export default function RectangleAlbum(props) {
    const { id, name, img, handleNavigator, isPlaylist, isDetailPlaylist } = props
    return (
        <View style={[styles.container, isPlaylist && styles.container1]}>
            <TouchableOpacity onPress={handleNavigator}>
                <Image source={img ? img : images.demo} style={[styles.img, isPlaylist ? styles.sizeImg2 : styles.sizeImg1]} />
                <Text style={[styles.textName, isPlaylist && styles.textBold, isDetailPlaylist && styles.marginTop]}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,

    },

    container1: {
        marginBottom: 24,
    },
    img: {

        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'stretch'
    },

    sizeImg1: {
        width: 227,
        height: 133,
    },
    sizeImg2: {
        width: 266,
        height: 126,
    },
    textName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#000000'
    },
    textBold: {
        fontWeight: 'bold'
    },
    marginTop: {
        marginTop: 18
    }
})
