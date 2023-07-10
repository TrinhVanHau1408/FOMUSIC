import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, images } from '../../constants';
import { useSelector } from 'react-redux';
export default function CircleAlbum(props) {

    const {follows} = useSelector((state) => state.user)
    const { id, name, img, handleNavigatorAllFollowing, handleNavigatorArtist } = props
    const [aritst, setArtist] = useState();
    useEffect(() => {
        if (follows) {
            const filterArtist = follows.filter(({key}) => key === id)[0];
            setArtist(filterArtist);
        }
    }, [id])
    console.log('ARTIST IN CircleAlbum: ', aritst)
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            // style={styles.buttonƯ}
            onPress={() =>handleNavigatorAllFollowing?handleNavigatorAllFollowing():handleNavigatorArtist(aritst) }
            >
                <Image source={name?(img ? {uri: img} : images.demo):img} style={styles.img} />
                <Text style={styles.textName}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 98,
        marginRight: 16,
        // backgroundColor: colors.black
    },

    img: {
        width: 98,
        height: 98,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.primary,
        resizeMode: 'cover',
    },
    textName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#000000',
        // backgroundColor: colors.black
    }
})
