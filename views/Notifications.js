import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors, icons, images } from '../constants';
import HeaderApp from '../components/header/HeaderApp';

import ItemNoti from '../components/notification/ItemNoti';
import MyButton from '../components/misc/MyButton';
import MyButtonWithCheckBox from '../components/misc/MyButtonWithCheckBox';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
    },
    contentContainer:
    {
        // height: '30%',
        marginTop: '5%',
        // alignItems: 'flex-start',

    },
})

export default function Notifications({ navigation }) {

    const goBack = () => {
        console.log('oke')
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1 }}>
            {/* <HeaderApp
                iconLeft={icons.arrowBack}
                title='Notification'
                goBack={goBack} /> */}
                 <HeaderApp 
            iconLeft={icons.arrowBack} 
            title='Notifications'
            goBack={goBack}/>
            <View style={{ marginTop: '5%' }}>
                <MyButtonWithCheckBox title={'Enable all'} />
                <MyButtonWithCheckBox title={'New follower'} />
                <MyButtonWithCheckBox title={'Repost of your post'} />
                <MyButtonWithCheckBox title={'New post by followed user'} />
                <MyButtonWithCheckBox title={'Enable allLike and plays on your post'} />
                <MyButtonWithCheckBox title={'New FOMUSIC features and tips'} />
                <MyButtonWithCheckBox title={'Surveys and feedback'} />
                <MyButtonWithCheckBox title={'FOMusic offers'} />

            </View>
        </View>
    )
}