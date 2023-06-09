import { View, Text, Image, TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { colors, icons, images } from '../../constants'
import { useDispatch, useSelector } from 'react-redux';
import { followingArtistByUserId, getAllArtistFollowByUserId } from '../../redux/slices/userSlice';
import { serverTimestamp } from 'firebase/database';
export default function MyFollowing({artist, id, userName, userImg, follower, isFollow, following, handleNavigatorArtist }) {
    // console.log('isFollowing', isFollowing)
    // const [isFollow, setIsFollow] = useState(id === id);
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    // console.log("isFollowing",isFollowing)
    const [isFollowing, setIsFollowing] = useState(isFollow);
    const handleToggleFollowing = () => {
        if (!isFollowing) {
            ToastAndroid.show(`Bạn đã theo dõi ${userName}`, ToastAndroid.SHORT);
        } else {
            ToastAndroid.show(`Bạn đã hủy theo dõi ${userName}`, ToastAndroid.SHORT);
        }
        setIsFollowing(!isFollowing)
        dispatch(followingArtistByUserId({userId: user.uid, artistId: id, active: !isFollowing, timestamp: serverTimestamp() }));
        dispatch(getAllArtistFollowByUserId({userId: user.uid}))
      
        
        
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() =>handleNavigatorArtist(artist)}>
            <View style={styles.info}>
                <View style={styles.img}>
                    <Image source={userImg? {uri: userImg} : images.demo}
                        style={{
                            resizeMode: 'cover', 
                            height: 80,
                            width: 80,
                        }}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.userName}>{userName}</Text>
                    <View style={styles.contentFollow}>
                        <Text>Follower</Text>
                        <Text style={styles.numberFollow}>{follower}</Text>
                    </View>
                    <View style={styles.contentFollow}>
                        <Text>Following</Text>
                        <Text style={styles.numberFollow}>{following}</Text>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
            <View style={[styles.button, isFollowing ? styles.buttonClick : styles.buttonUnClick]}>
                <TouchableOpacity onPress={handleToggleFollowing} >
                    <Text style={isFollowing ? styles.textClick : styles.textUnClick}>{isFollowing ? 'Following' : 'Follow'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 12,
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 100,
        overflow: 'hidden',
        shadowColor: '#171717',
        // shadowOffset: { width: -2, height: 4 },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        elevation: 10

    },
    content: {
        margin: 2
    },
    userName: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 22
    },
    contentFollow: {
        display: 'flex', flexDirection: 'row',
        marginLeft: 22
    },
    text: {
        fontFamily: 'Montserrat',
        fontWeight: 500,
        fontSize: 12,
        marginLeft: 22
    },
    numberFollow: {
        marginLeft: 10,
    },
    button: {
        fontFamily: 'Montserrat',
        width: 96,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },

    buttonClick: {
        backgroundColor: colors.primary,

    },

    buttonUnClick: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    textClick: {
        color: '#FFFFFF'
    },
    textUnClick: {
        color: colors.primary
    },



})