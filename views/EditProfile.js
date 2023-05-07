import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, images, colors } from '../constants'
import SquareAlbum from '../components/misc/SquareAlbum'
import MyButton from '../components/misc/MyButton';
import MyInput from '../components/misc/MyInput'


export default function EditProfile(
    {
        title = "Edit picture",
        follower = "100",
        following = "124"
    }
) {
    return (
        <View style={{ flex: 1 }}>
            <HeaderApp title={'Edit Profile'} iconLeft={icons.arrowBack} />
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                <SquareAlbum id={1} name={title} img={null} isPlaylist={true} isDetailPlaylist={true} type={true} />
            </View>
            <View style={styles.contentContainer}>
                <View style={{color:colors.primary}}>
                    <MyInput icon={icons.userSquare} placeholder={'Display Name'} />
                    <MyInput icon={icons.schedule} placeholder={'Birthday'} />
                    <MyInput icon={icons.menu} placeholder={'Bio'} />
                </View>

                <View style={{ marginTop: 20 }}>
                    <MyButton title={'Save'}/>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 25, 
        fontFamily: 'Montserrat', 
        marginBottom: 27 
    },
    containerImg: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
     
    },
    img: {
        height: 140, 
        width: 140,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'cover',

    },
    line: {
        height: 3,
        width: '100%',
        borderColor: '#EDEDED',
        elevation: 4,
        marginTop: 28
    },
    contentContainer: {
        marginTop: 20,
    },
})