import React from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, FlatList, Image } from 'react-native'
import HeaderApp from '../components/header/HeaderApp'
import RowBoxTranfer from '../components/box/RowBoxTranfer'
import RowBoxTitle from '../components/box/RowBoxTitle';
import TitleAlbum from '../components/misc/TitleAlbum';
import SquareAlbum from '../components/misc/SquareAlbum';
import { images, icons, colors } from '../constants';
const dataAlbum = [
    {
        id: 0,
        name: 'Name 1',
        img: images.demo
    },
    {
        id: 1,
        name: 'Name 2',
        img: images.demo
    },
    {
        id: 2,
        name: 'Name 3',
        img: images.demo
    },
    {
        id: 3,
        name: 'Name 4',
        img: images.demo
    },
    {
        id: 4,
        name: 'Name 5',
        img: images.demo
    }
]

export default function Home() {
    return (
        <ScrollView style={styles.container}>
            <HeaderApp title={'Home'} />
            <View>
                <Image source={icons.musicNote1} style={{ position: 'absolute', left: 0,top: -55, height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
                <Image source={icons.musicNote2} style={{ position: 'absolute', right: 0,top: -55, height: 82, width: 51, resizeMode: 'stretch', tintColor: colors.primary }} />
            </View>
            <View style={styles.content}>
                <TitleAlbum name={'TOP CHARTS'} />
                <RowBoxTranfer style={styles.tranfer} />
            </View>

            <View style={{ marginTop: 10, marginLeft: 20 }}>
                <View >
                    <TitleAlbum name={'TOP CHARTS'} />
                    <FlatList
                        data={dataAlbum}
                        renderItem={({ item }) =>
                            <SquareAlbum id={item.id} name={item.name} img={item.img} />}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View >
                    <TitleAlbum name={'TOP CHARTS'} />
                    <FlatList
                        data={dataAlbum}
                        renderItem={({ item }) =>
                            <SquareAlbum id={item.id} name={item.name} img={item.img} />}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </ScrollView>
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
