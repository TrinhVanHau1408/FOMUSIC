import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import IconSquare from '../assets/user-square.png';
export default function MyInput(props) {
    return (
        <View style={styles.InputTextContainer}>
            <Image source={props.icon} style={styles.Icon}></Image>
            <TextInput placeholder={props.myPlaceholder} style={styles.InputText} />
        </View>
    )
}

const styles = StyleSheet.create({
    InputTextContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        borderColor:"#8950F8",
        borderWidth:1,
        margin:5,
        marginLeft:15,
        marginRight:15,
        borderRadius:20
      },
      InputText:
      {
        padding:4,
        margin:0,
        color:"#555454",
        flex: 1
      },
      Icon:
      {
        marginLeft:10,
        marginTop:4,
        marginRight:8,
        marginBottom:4
      },
})