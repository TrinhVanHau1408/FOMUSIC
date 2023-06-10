import { View, Text, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { colors, icons } from '../constants'
import { getDataAsyncStorage } from '../utilities/AsyncStorage';
import { getUserUid } from '../redux/slices/userSlice';
import { getAllPlaylistByUserId } from '../redux/slices/playlistsSlice';
export default function Wellcome({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const checkUser = async () => {
    try {
      const userUid = await getDataAsyncStorage('userUid');

      if (userUid != null) {

        dispatch(getUserUid({ userUid }));

        if (!loading && error == null) {
          navigation.navigate('App');
          dispatch(getAllPlaylistByUserId({userId: userUid}));
        }

      } else {
        navigation.navigate('Login');
      }

    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    // Khi người dùng vừa mở app
    // thì check xem người dùng đã login từ lần trước chưa
    // Nếu còn giữ login thì navigate Home
    // Nếu không còn thì navigate Login
    checkUser();

  }, [])

  

  return (
    <View style={{
      backgroundColor: colors.primary,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{ marginBottom: 10 }}>
        <Image source={icons.logoFomusic} />
      </View>
      <View>
        <Image source={icons.fomusic} />
      </View>
    </View>
  )
}