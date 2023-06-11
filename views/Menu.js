import { View } from 'react-native'
import React, { useEffect } from 'react'
// import { useNavigation } from '@react-navigation/native';

import { StackActions } from '@react-navigation/native';
import { icons } from '../constants'
import HeaderApp from '../components/header/HeaderApp'
import ItemMenu from '../components/menu/ItemMenu'
import { signOut, auth } from '../firebase/connectDB'
import { removeDataAsyncStorage } from '../utilities/AsyncStorage'
import { setUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/slices/authSlice';
import { getArtistByUserId } from '../redux/slices/artistSlice'


export default function Menu({ navigation }) {
    // const navigate = useNavigation();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user)
    const { artist } = useSelector((state) => state.artist)

    const handleNavigatorSetting = () => {
        navigation.navigate('Setting');
    }
    const handleNavigatorSystem = () => {
        navigation.navigate('Systems');
    }
    const handleNavigatorNotification = () => {
        navigation.navigate('Notifications');
    }
    const handleNavigatorProfile = () => {
        navigation.navigate('Profile');
    }
    const handleNavigatorUpload = () => {
        if (artist) {
            navigation.navigate('Upload')
        }
        else {
            Alert.alert("Bạn không phải là nghệ sĩ")
        }
    }

    async function logout() {
        try {
            const isLogout = await removeDataAsyncStorage('userUid');
            if (isLogout) {
                console.log("isLogouts")
                // navigation.navigate('Init');
                dispatch(setUser());
                navigation.dispatch(StackActions.popToTop());
                navigation.navigate('Login');

            } else {
                console.log('Error remove user - logout');
            }
        } catch {

        }
    }
    const handleNavigatorLogout = async () => {
        // signOut(auth).then(() => {

        //     logout();

        // }).catch((error) => {
        //     console.log('Auth logout error: ', error.code);
        // });

        dispatch(logOut({}))

        if (!loading && error == null) {
            logout();
        }


    }
    useEffect(() => {
        if (user) {
            dispatch(getArtistByUserId({ userId: user.uid }))
        }
        else {
            Alert.alert("Bạn chưa đăng nhập")
        }

    }, [])

    return (
        <View style={{
            flex: 1,
            marginBottom: 20,
            backgroundColor: '#ffffff'
        }}>
            <View style={{ marginTop: 17 }}>
                <HeaderApp title={'Menu'} iconLeft={icons.arrowBack} />
            </View>

            <View>
                <ItemMenu icon={icons.setting} title={'Setting'} handleNavigator={handleNavigatorSetting} />
                <ItemMenu icon={icons.setting} title={'System'} handleNavigator={handleNavigatorSystem} />
                <ItemMenu icon={icons.notification} title={'Notifications'} handleNavigator={handleNavigatorNotification} />
                <ItemMenu icon={icons.userSquare} title={'Profile'} handleNavigator={handleNavigatorProfile} />
                <ItemMenu icon={icons.upload} title={'Upload'} handleNavigator={handleNavigatorUpload} />
                <ItemMenu icon={icons.logOut} title={'Logout'} handleNavigator={handleNavigatorLogout} />

            </View>
        </View>
    )
}