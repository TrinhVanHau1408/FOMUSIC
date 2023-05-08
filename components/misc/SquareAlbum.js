import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, images } from '../../constants';
export default function SquareAlbum(props) {

    const { id, name, img, handleButton, isAlbum, type } = props
    return (
        <View style={[styles.container,isAlbum&&styles.marginx2]}>
            <TouchableOpacity onPress={handleButton}>
                <Image source={img ? img : images.demo} style={type?styles.img_circle:styles.img} />
                <Text style={type?styles.textNameUser:styles.textName}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        marginRight: 16,
    },

    marginx2: {
        marginHorizontal: 16,
        marginVertical: 16,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'cover',
    },
    img_circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'cover',
    },
    textName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#000000'
    },
    textNameUser: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: 500,
        fontWeight:'bold',
        marginTop:20,
        textAlign: 'center',
        color: '#000000'
    }
})
