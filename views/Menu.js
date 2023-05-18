import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'
import HeaderApp from '../components/header/HeaderApp'
import ItemMenu from '../components/menu/ItemMenu'
import {signOut, auth} from '../firebase/connectDB'
import { removeDataAsyncStorage } from '../untiles/AsyncStorage'
export default function Menu({navigation}) {
    const handleNavigatorSetting = () => {
        navigation.navigate('Setting');
    }
    const handleNavigatorSystem = () => {
        navigation.navigate('System');
    }
    const handleNavigatorNotification = () => {
        navigation.navigate('Notifications');
    }
    const handleNavigatorProfile = () => {
        navigation.navigate('Profile');
    }
    const handleNavigatorUpload = () => {
        navigation.navigate('Upload');
    }
    const handleNavigatorLogout = () => {
        signOut(auth).then(() => {
           
           let isLogout = removeDataAsyncStorage('user');
           if (isLogout) {
            navigation.navigate('Login');
           } else {
            console.log('Error remove user - logout');
           }
          }).catch((error) => {
            console.log('Logout error: ', error.code);
          });
    }
    return (
        <View style={{
            flex: 1,
            marginBottom: 20,
            backgroundColor: '#ffffff'
        }}>
            <View style={{marginTop: 17}}>
                <HeaderApp title={'Menu'} iconLeft={icons.arrowBack} />
            </View>

            <View>
                <ItemMenu icon={icons.setting} title={'Setting'} handleNavigator={handleNavigatorSetting}/>
                <ItemMenu icon={icons.setting} title={'System'} handleNavigator={handleNavigatorSystem}/>
                <ItemMenu icon={icons.notification} title={'Notifications'} handleNavigator={handleNavigatorNotification}/>
                <ItemMenu icon={icons.userSquare} title={'Profile'} handleNavigator={handleNavigatorProfile}/>
                <ItemMenu icon={icons.upload} title={'Upload'} handleNavigator={handleNavigatorUpload}/>
                <ItemMenu icon={icons.logOut} title={'Logout'} handleNavigator={handleNavigatorLogout}/>

            </View>
        </View>
    )
}