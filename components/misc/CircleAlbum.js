import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function CircleAlbum(props) {

    const { id, name, img } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Image source={img ? img : images.demo} style={styles.img} />
                <Text style={styles.textName}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 83,
        marginRight: 16,
    },

    img: {
        width: 83,
        height: 83,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.primary
    },
    textName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#000000'
    }
})
