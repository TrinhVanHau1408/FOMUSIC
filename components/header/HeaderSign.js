import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import IconBack from '../../assets/arrow-back-simple.png';
import IconSign from '../../assets/logo-fomusic.png'

const HeaderSign = ({
    title = "SIGN UP"
    }) => {

    return (<View style={styles.container}>
        <View style={styles.containerBack}>
            <Image source={IconBack} style={styles.IconBack}></Image>
        </View>
        <View style={styles.containerIcon}>
            <View style={styles.containerLogo}>
                <Image source={IconSign} style={styles.logo}></Image>
            </View>
            <View style={styles.containerText}>
                <Text style={styles.text}>{title}</Text>
            </View>
            
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerBack: {
        flex: 1,
        padding:4,
        margin:4
    },
    containerIcon: {
        flex: 4,
        alignItems: "center",
        margin:5,
    },
    containerLogo:{
        flex: 4,
        alignItems: "center",
        padding:5
    },
    IconBack:
    {
        width:28,
        height:28
    },
    containerText:
    {
        flex: 1,
        alignItems: "center"
    },
    logo:
    {
        width:70,
        resizeMode:"contain"
    },
    text:
    {
        color:"#8950F8",
        fontSize:16,
        fontWeight:"bold"
    }
})

export default HeaderSign