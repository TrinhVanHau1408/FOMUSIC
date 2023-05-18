import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import HeaderApp from "../components/header/HeaderApp";
import { icons, colors, images } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import BoxGraph from '../components/box/BoxGraph.js';
import MyLike from '../components/like/MyLike';


const dataLike = [
    {
        id: 1,
        songName: 'Song name 1',
        songImg: images.defaultAvt,
        artistName: 'Artis 1',
        isLiked: true
    },
    {
        id: 2,
        songName: 'Song name 2',
        songImg: images.defaultAvt,
        artistName: 'Artis 2',
        isLiked: false
    },
    {
        id: 3,
        songName: 'Song name 3',
        songImg: images.defaultAvt,
        artistName: 'Artis 3',
        isLiked: false
    },
    {
        id: 4,
        songName: 'Song name 4',
        songImg: images.defaultAvt,
        artistName: 'Artis 4',
        isLiked: true
    },
    {
        id: 5,
        songName: 'Song name 5',
        songImg: images.defaultAvt,
        artistName: 'Artis 5',
        isLiked: true
    },
    {
        id: 6,
        songName: 'Song name 5',
        songImg: images.defaultAvt,
        artistName: 'Artis 5',
        isLiked: true
    }
]

export default function Systems({navigation}) {
    const [isVisible, setIsVisible] = useState(false);

    const [idSong, setIdSong] = useState(0);
    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);

    }
    const goBack = () => {
        navigation.goBack()
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <HeaderApp
                    title='Systems'
                    iconLeft={icons.arrowBack}
                    goBack={goBack} />
                <View style={styles.container}>
                    <BoxGraph />
                </View>
                <View style={styles.mucsicaddComponent}>
                    <Text style={styles.title}>Thống kê bài hát đã thêm</Text>
                    <View>
                        {
                            dataLike.map((item, index) => {
                                return <MyLike
                                    id={item.id}
                                    idSongSelected={idSong}
                                    songName={item.songName}
                                    songImg={item.songImg}
                                    artistName={item.artistName}
                                    isLike={item.isLiked}
                                    index={index}
                                    handleLayout={handleLayout}
                                />
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '47%',
    },
    title: {
        paddingLeft: 20,
        fontSize: 22,
        color: colors.black,
        fontWeight: "bold",
    },
})