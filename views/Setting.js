import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native/'
import HeaderApp from '../components/header/HeaderApp'
import { icons } from '../constants'
import MyButton from '../components/misc/MyButton'
import MyWhiteButton from '../components/misc/MyWhiteButton'
import { getArtistByUserId } from '../redux/slices/artistSlice'
import { useDispatch, useSelector } from 'react-redux'

const styles = StyleSheet.create({
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
export default function Setting({ navigation }) {
    const { artist } = useSelector((state) => state.artist)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

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
        if (artist) {
            navigation.navigate('MyFOMUSIC')
        }
        else {
            Alert.alert("Bạn không phải là nghệ sĩ")
        }
    }
    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        if (user) {
            dispatch(getArtistByUserId({ userId: user.uid }))
        }
        else{
            Alert.alert("Bạn chưa đăng nhập")
        }

    }, [])

    return (
        <View style={styles.container}>
            <HeaderApp iconLeft={icons.arrowBack} title='Setting' goBack={goBack} />
            <View style={styles.contentContainer}>
                <MyWhiteButton title='Basic settings' handleNavigator={handleNavigatorBasicSetting} />
                <MyWhiteButton title='Interface style' handleNavigator={handleNavigatorInterfaceStyle} />
                <MyWhiteButton title='Notifications' handleNavigator={handleNavigatorNotifications} />
                <MyWhiteButton title='MyFOMUSIC' handleNavigator={handleNavigatorMyFOMUSIC} />
            </View>
        </View>
    )
}