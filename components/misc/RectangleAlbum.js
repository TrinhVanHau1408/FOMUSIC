import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, images } from '../../constants';


export default function RectangleAlbum(props) {
    const { id, name, artwork, type, handleNavigator, isPlaylist, isDetailPlaylist } = props
    // console.log('artwork img playlist recAlbum: ', artwork)

    return (
        <View style={[styles.container, (isPlaylist && type===2) && styles.container1]}>
            <TouchableOpacity onPress={() => handleNavigator(id)}>
                <Image source={artwork ? {uri: artwork} : images.demo} style={[styles.sizeImg1, type===2? styles.imgBorderNoColor : styles.img]} />
                <Text style={[styles.textName, isPlaylist && styles.textNormal, isDetailPlaylist && styles.marginTop]}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        // width: '77%',
        // backgroundColor: colors.primary
    },

    container1: {
        marginBottom: 24,
        
        
        // backgroundColor: colors.black
    },
    img: {

        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: "cover",
    },
    imgBorderNoColor:
    {
        borderRadius: 20,
        borderWidth: 2,
        // resizeMode: 'stretch',
    },
    sizeImg1: {
        width: 315,
        height: 177,
      
    },
    sizeImg2: {
        width: 315,
        height: 177,
    },
    textName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000000'
    },
    textNormal: {
        fontWeight: 'normal'
    },
    marginTop: {
        marginTop: 18
    },
    resizeMode: {
        resizeMode: 'center'
    }
})
