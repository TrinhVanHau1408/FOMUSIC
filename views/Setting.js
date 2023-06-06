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
export default function Setting({navigation}) {
    const handleNavigatorBasicSetting = () => {
        navigation.navigate('BasicSettings')
    }
    const handleNavigatorInterfaceStyle = () => {
        navigation.navigate('InterfaceStyle')
    }
    const handleNavigatorNotifications = () => {
        navigation.navigate('Notification')
    }
    const handleNavigatorMyFOMUSIC = () => {
        navigation.navigate('MyFOMUSIC')
    }
    const goBack= () => {
        navigation.goBack()
    }
    return(
        <View style={styles.container}>
            <HeaderApp iconLeft={icons.arrowBack} title='Setting' goBack={goBack}/>
            <View style={styles.contentContainer}>
                <MyWhiteButton title='Basic settings' handleNavigator={handleNavigatorBasicSetting}/>
                <MyWhiteButton title='Interface style' handleNavigator={handleNavigatorInterfaceStyle}/>
                <MyWhiteButton title='Notifications' handleNavigator={handleNavigatorNotifications}/>
                <MyWhiteButton title='MyFOMUSIC' handleNavigator={handleNavigatorMyFOMUSIC}/>
            </View>
        </View>
    )
}