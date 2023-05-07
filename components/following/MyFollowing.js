import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors, icons, images } from '../../constants'
export default function MyFollowing({ id, userName, userImg, isFollowing, follower, following }) {
    const [isFollow, setIsFollow] = useState(isFollowing);
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.img}>
                    <Image source={userImg}
                        style={{
                            resizeMode: 'cover', height: 70,
                            width: 70,
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
            <View style={[styles.button, isFollow ? styles.buttonClick : styles.buttonUnClick]}>
                <TouchableOpacity onPress={() => { setIsFollow(!isFollow) }}>
                    <Text style={isFollow ? styles.textClick : styles.textUnClick}>{isFollow ? 'Following' : 'Follow'}</Text>
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
        height: 70,
        width: 70,
        borderRadius: 100,
        overflow: 'hidden',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

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
        width: 80,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
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