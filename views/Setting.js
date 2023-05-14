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
export default function Setting() {
    return(
        <View style={styles.container}>
            <HeaderApp iconLeft={icons.arrowBack} title='Setting'/>
            <View style={styles.contentContainer}>
                <MyWhiteButton title='Basic settings'/>
                <MyWhiteButton title='Interface style'/>
                <MyWhiteButton title='Notifications'/>
            </View>
        </View>
    )
}