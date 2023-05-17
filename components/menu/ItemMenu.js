import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors, icons } from '../../constants'

export default function ItemMenu({ title, icon, handleNavigator }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleNavigator}
            >
                <Image source={icon} style={styles.img}/>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },

    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40
    },
    img: {
        height: 42,
        width: 42,
        tintColor: colors.primary,
    },
    text: {
        marginLeft: 20,
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Montserrat'
    }
})

