import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, images } from '../../constants';
export default function CircleAlbum(props) {

    const { id, name, img, handleNavigator } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            // style={styles.buttonƯ}
            onPress={() =>handleNavigator(id)}
            >
                <Image source={img ? img : images.demo} style={styles.img} />
                <Text style={styles.textName}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 98,
        marginRight: 16,
        // backgroundColor: colors.black
    },

    img: {
        width: 98,
        height: 98,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'cover',
    },
    textName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#000000',
        // backgroundColor: colors.black
    }
})
