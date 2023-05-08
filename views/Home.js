import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, FlatList, Image } from 'react-native'
import HeaderApp from '../components/header/HeaderApp'
import RowBoxTranfer from '../components/box/RowBoxTranfer'
import RowBoxTitle from '../components/box/RowBoxTitle';
import TitleAlbum from '../components/misc/TitleAlbum';
import SquareAlbum from '../components/misc/SquareAlbum';
import ControlMusic from '../components/misc/ControlMusic';
import BoxTranfer from '../components/box/BoxTranfer';
import { images, icons, colors } from '../constants';
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
    }
]

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [idSong, setIdSong] = useState(0);
    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);

    }
    return (
            <View style={styles.container}>
            <HeaderApp title={'Home'} />
            <View>
                <Image source={icons.musicNote1} style={{ position: 'absolute', left: 0, top: -55, height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
                <Image source={icons.musicNote2} style={{ position: 'absolute', right: 0, top: -55, height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
            </View>
            <View style={styles.content}>
                <TitleAlbum name={'TOP CHARTS'} />
                {/* <RowBoxTranfer style={styles.tranfer} /> */}
                <BoxTranfer />
            </View>

            <View style={{ marginTop: 10, marginLeft: 20 }}>
                <View >
                    <TitleAlbum name={'TOP CHARTS'} />
                    <FlatList
                        data={dataLike}
                        renderItem={({ item }) =>
                            <SquareAlbum
                            id={item.id}
                            name={item.songName}
                            img={item.songImg}
                            handleLayout={handleLayout} />}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View >
                    <TitleAlbum name={'TOP CHARTS'} />
                    <FlatList
                        data={dataLike}
                        renderItem={({ item }) =>
                            <SquareAlbum
                                id={item.id}
                                name={item.songName}
                                img={item.songImg}
                                handleLayout={handleLayout} />}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            {isVisible && <ControlMusic song={dataLike.find(({ id }) => id === idSong)} />}
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {

        marginHorizontal: 20,
    }
})
