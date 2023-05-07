import { View, Text, FlatList, Alert, StyleSheet } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import RectangleAlbum from '../components/misc/RectangleAlbum'
import { icons, images } from '../constants'

const dataPlaylist = [
    {
        id: 0,
        name: 'Playlist 1',
        img: images.demo
    },
    {
        id: 1,
        name: 'Playlist 2',
        img: images.demo
    },
    {
        id: 2,
        name: 'Playlist 3',
        img: images.demo
    },
    {
        id: 3,
        name: 'Playlist 4',
        img: images.demo
    },
    {
        id: 4,
        name: 'Playlist 5',
        img: images.demo
    },
    {
        id: 5,
        name: 'Playlist 6',
        img: images.demo
    }
]
export default function Playlist() {
    const handleButton = () => {
        Alert.alert('Test', 'Library playlist');
    }
    return (
        <View>
            <HeaderApp title={'Playlist'} iconLeft={icons.arrowBack} iconRight={icons.option} />
            <View style={styles.container}>
                <FlatList
                    data={dataPlaylist}
                    renderItem={({ item }) =>
                        <RectangleAlbum
                            id={item.id}
                            name={item.name}
                            img={item.img}
                            handleButton={handleButton}
                            isPlaylistPahe={true} />}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={{ flex: 1, height: 100 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})