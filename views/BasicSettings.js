import React from 'react'
import { View, StyleSheet } from 'react-native/'
import HeaderApp from '../components/header/HeaderApp'
import { icons } from '../constants'
import MyButton from '../components/misc/MyButton'
import MyWhiteButton from '../components/misc/MyWhiteButton'

const styles=StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column'
    },
    contentContainer:
    {
        marginTop: '5%',
    },
})
export default function BasicSettings() {
    return(
        <View style={styles.container}>
            <HeaderApp iconLeft={icons.arrowBack} title='Basic Setting'/>
            <View style={styles.contentContainer}>
                <MyWhiteButton title='Clear application cache'/>
                <MyWhiteButton title='Show comments on the waveform'/>
            </View>
        </View>
    )
}