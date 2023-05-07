import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { icons, colors } from '../../constants';

const HeaderSign = ({ title, goBack }) => {

   

    return (<View style={styles.container}>
        <TouchableOpacity
            style={styles.containerBack}
            onPress={goBack}
        >
            <Image
                source={icons.arrowBack}
                style={styles.IconBack}
            />
        </TouchableOpacity>
        <View style={styles.containerIcon}>
            <View style={styles.containerLogo}>
                <Image source={icons.logoFomusic} style={styles.logo}></Image>
            </View>
            <View style={styles.containerText}>
                <Text style={styles.text}>{title.toUpperCase()}</Text>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Montserrat',
    },
    containerBack: {
        flex: 1,
        padding: 4,
        margin: 4
    },
    IconBack:
    {
        width: 28,
        height: 28
    },
    containerIcon: {
        flex: 4,
        alignItems: "center",
        margin: 5,

    },
    containerLogo: {

        alignItems: "center",
        padding: 5,
        width: 99,
        height: 92,
        tintColor: colors.primary,
    },

    containerText:
    {
        alignItems: "center",

    },
    logo:
    {
        width: 70,
        resizeMode: "contain"
    },
    text:
    {
        color: colors.primary,
        fontWeight: 700,
        fontSize: 24,
        fontStyle: 'normal',
        lineHeight: 30,
    }
})

export default HeaderSign