import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, images } from '../../constants';
export default function SquareAlbum(props) {

    const { id, name, artwork, handleNavigator, isAlbum, handleLayout } = props
    return (
        <View style={[styles.container,isAlbum&&styles.marginx2]}>
            <TouchableOpacity onPress={()=>handleNavigator(id)}>
                <Image source={artwork ? {uri:artwork} : images.demo} style={styles.img} />
                <Text style={styles.textName}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 143,
        marginRight: 16,
        // backgroundColor: colors.primary
    },

    marginx2: {
        marginHorizontal: 16,
        marginVertical: 16,
    },
    img: {
        width: '100%',
        marginBottom: 3,
        height: 143,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'cover',
    },
    textName: {
      
        fontFamily: 'Montserrat',
        fontSize: 14,
        lineHeight: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000000'
    }
})