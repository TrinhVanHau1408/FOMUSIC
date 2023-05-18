import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { colors, icons, images } from '../constants';
import HeaderApp from '../components/header/HeaderApp';

import ItemNoti from '../components/notification/ItemNoti';


const dataNoti = [
    {
        id: 1,
        notiImage: images.defaultAvt,
        title: 'You have new playlist',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 2,
        notiImage: images.defaultAvtt,
        title: 'Your favourite artist release a new album!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 3,
        notiImage: images.defaultAvt,
        title: 'Your favourite playlist just have been updated!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 4,
        notiImage: images.defaultAvt,
        title: 'You have new playlist',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 5,
        notiImage: images.defaultAvt,
        title: 'Your favourite artist release a new album!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 6,
        notiImage: images.defaultAvt,
        title: 'Your favourite playlist just have been updated!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 7,
        notiImage: images.defaultAvt,
        title: 'You have new playlist',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 8,
        notiImage: images.defaultAvt,
        title: 'Your favourite artist release a new album!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 9,
        notiImage: images.defaultAvt,
        title: 'Your favourite playlist just have been updated!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    }
]

export default function Notification({ navigation}) {
    const goBack = () => {
       
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1 }}>
            <HeaderApp title='Notification' iconLeft={icons.arrowBack} goBack={goBack} />
            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={dataNoti}
                    renderItem={({ item }) =>
                        <ItemNoti
                            id={item.id}
                            imgNoti={item.notiImage}
                            title={item.title}
                            owner={item.owner}
                            time={item.time}
                        />}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>
    )
}