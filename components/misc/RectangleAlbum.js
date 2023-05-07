import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function RectangleAlbum(props) {

    const { id, name, img } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity>
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
