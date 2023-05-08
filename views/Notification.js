import React, { useState } from 'react';
import { View } from 'react-native';
import { colors, icons, images, FlatList } from '../constants';
import HeaderApp from '../components/header/HeaderApp';

import ItemNoti from '../components/notification/ItemNoti';
import defaultAvt from '../assets/images/defaultAvt.jpg';

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
        notiImage: defaultAvt,
        title: 'Your favourite artist release a new album!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 3,
        notiImage: defaultAvt,
        title: 'Your favourite playlist just have been updated!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 4,
        notiImage: defaultAvt,
        title: 'You have new playlist',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 5,
        notiImage: defaultAvt,
        title: 'Your favourite artist release a new album!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 6,
        notiImage: defaultAvt,
        title: 'Your favourite playlist just have been updated!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 7,
        notiImage: defaultAvt,
        title: 'You have new playlist',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 8,
        notiImage: defaultAvt,
        title: 'Your favourite artist release a new album!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    },
    {
        id: 9,
        notiImage: defaultAvt,
        title: 'Your favourite playlist just have been updated!',
        owner: 'from FOMUSIC',
        time: '3hrs',
    }
]

export default function Notification () {
    return (
        <View style={{flex: 1}}>
            <HeaderApp title='Notification' iconLeft={icons.arrowBack} />
            <View style={{marginTop: 20}}>
                <FlatList
                    data={dataNoti}
                    renderItem={({item}) =>
                        <ItemNoti
                            id={item.id}
                            imgNoti={item.notiImage}
                            title={item.title}
                            owner={item.owner}
                            time={item.time}
                        />}                    
                />        
            </View>
        </View>
    )
}