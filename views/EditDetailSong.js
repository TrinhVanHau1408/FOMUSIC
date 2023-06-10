import { StyleSheet, Image, Text, TextInput, View, FlatList, ToastAndroid, Alert, ScrollView, TouchableOpacity } from 'react-native';
import HeaderApp from "../components/header/HeaderApp";
import { colors, icons, images } from "../constants";
import MyInput from '../components/misc/MyInput';
import { useState } from 'react';
import { pick, types, isCancel } from 'react-native-document-picker'
import { uploadFileStorage } from '../firebase/controllerStorage';
import { readDataFirebase, writeDataFirebase } from '../firebase/controllerDB';
import { serverTimestamp } from 'firebase/database'


// ToastAndroid.show('Successful', ToastAndroid.SHORT);

export default function EditDetailSong({ navigation, route }) {
    const { id, songdetails } = route.params
    // console.log(id, songdetails)

    const [imageName, setImageName] = useState()
    const [imageUrl, setImageUrl] = useState(songdetails.artwork)
    const [mp3Url, setMp3Url] = useState(songdetails.url)
    const [mp3Name, setMp3Name] = useState(songdetails.name)
    const [nameSong, setNameSong] = useState(songdetails.name)
    const [nameAuthor, setNameAuthor] = useState(songdetails.nameAuthor)
    const [nameSinger, setNameSinger] = useState(songdetails.artist)
    const [typeSong, setTypeSong] = useState(songdetails.genre)
    const [albumName, setAlbumName] = useState(songdetails.albumName)
    const [dayProduce, setDayProduce] = useState(`${songdetails.createAt}`)
    const [nameExport, setNameExport] = useState(songdetails.nameExport)
    const [lyrics, setLyrics] = useState(songdetails.lyrics)

    // processing event onlick upload songs
    const onlickUpload = async () => {

        // upoad lên firebase

        try {
            let urlFirebaseImage = songdetails.artwork
            if (imageUrl!=songdetails.artwork) {

                const result = await fetch(imageUrl)
                const blob = await result.blob()
                urlFirebaseImage = await uploadFileStorage(`images/${nameSong}`, blob)
            }

            try {
                let urlFirebaseMp3 = mp3Url
                if(songdetails.url)
                {
                    const result = await fetch(mp3Url)
                    const blob = await result.blob()
                    urlFirebaseMp3 = await uploadFileStorage(`songs/${nameSong}`, blob)
                }

                // fixed artisId, artist . Hau will change when finsh signin for Artist
                const dataUpload = {
                    albumName: albumName,
                    artist: "Bảo Anh",
                    artistId: "artist1",
                    artwork: urlFirebaseImage,
                    createAt: serverTimestamp(),
                    duration: "5:50",
                    genre: typeSong,
                    genreId: "genre1",
                    lyrics: lyrics,
                    name: nameSong,
                    releaseAt: serverTimestamp(),
                    url: urlFirebaseMp3,
                    reactHeart: {},
                    modifyAt: serverTimestamp(),
                    nameAuthor: nameAuthor,
                    nameExport: nameExport
                }

                try {
                    const rep = await writeDataFirebase('songs', dataUpload, id)
                    if(rep)
                    {
                        ToastAndroid.show(`Successful`, ToastAndroid.SHORT);
                    }else
                    {
                        ToastAndroid.show(`Failed`, ToastAndroid.SHORT);
                    }
                }
                catch (e) {
                    ToastAndroid.show(`Failed: ${e}`, ToastAndroid.SHORT);
                }

            }
            catch (e) {
                ToastAndroid.show(`Failed: ${e}`, ToastAndroid.SHORT);
            }
        }
        catch (e) {
            ToastAndroid.show(`Failed: ${e}`, ToastAndroid.SHORT);
        }

    }

    // This is function select file .mp3 on local
    const selectFileMp3 = async () => {
        try {
            const res = await pick({
                type: [types.audio]
            })

            setMp3Name(res[0].name)
            setMp3Url(res[0].uri)
        } catch (err) {
            if (isCancel(err)) {
                console.log("User cancelled upload", err)
            }
            else {
                console.log(err)
            }
        }
        console.log("button pressed");
    }

    // This is function select file image on local
    const selectFileImage = async () => {
        try {
            const res = await pick({
                type: [types.images]
            })
            // const result = await fetch(res[0].uri)
            // const blog = await result.blob()
            // // console.log(blog)
            // // const file = await RNFS.readFile('content://com.android.providers.media.documents/document/image%3A17', 'base64')
            // // console.log(file)
            // await uploadFileStorage(`images/${res[0].name}`, blog)

            setImageName(res[0].name)
            setImageUrl(res[0].uri)
        } catch (err) {
            if (isCancel(err)) {
                console.log("User cancelled upload", err)
            }
            else {
                console.log(err)
            }
        }
        console.log("button pressed");
    }

    return (
        <View style={styles.container}>
            <HeaderApp goBack={() => { navigation.goBack() }} handleNavigator={onlickUpload} iconLeft={icons.arrowBack} iconRight={icons.listAdd} />

            <ScrollView style={styles.containerContent}>
                <View>
                    <TouchableOpacity onPress={selectFileImage}>
                        <Image source={imageUrl ? { uri: imageUrl } : images.defaultAvt} style={styles.imgSong} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>
                        Tên bài hát
                    </Text>
                    <View style={styles.textView}>
                        <TextInput style={styles.textContent}
                            placeholder={"Nhập tên bài hát"}
                            value={nameSong}
                            onChangeText={text => setNameSong(text)} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Tác giả
                    </Text>
                    <View style={styles.textView}>
                        <TextInput
                            style={styles.textContent}
                            placeholder={"Nhập tên Tác giả"}
                            value={nameAuthor}
                            onChangeText={text => setNameAuthor(text)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Ca sĩ
                    </Text>
                    <View style={styles.textView}>
                        <TextInput style={styles.textContent}
                            placeholder={"Nhập tên ca sĩ"}
                            value={nameSinger}
                            onChangeText={text => setNameSinger(text)} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Thể loại
                    </Text>
                    <View style={styles.textView}>
                        <TextInput style={styles.textContent}
                            placeholder={"Nhập tên thể loại"}
                            value={typeSong}
                            onChangeText={text => setTypeSong(text)} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Album
                    </Text>
                    <View style={styles.textView}>
                        <TextInput style={styles.textContent}
                            placeholder={"Nhập tên Album"}
                            value={albumName}
                            onChangeText={text => setAlbumName(text)} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Ngày phát hành
                    </Text>
                    <View style={styles.textView}>
                        <TextInput style={styles.textContent}
                            placeholder={"Nhập ngày phát hành"}
                            value={dayProduce}
                            onChangeText={text => setDayProduce(text)} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Nhà sản xuất
                    </Text>
                    <View style={styles.textView}>
                        <TextInput style={styles.textContent}
                            placeholder={"Nhập nhà sản xuất"}
                            value={nameExport}
                            onChangeText={text => setNameExport(text)} />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={selectFileMp3}>
                        <Text style={styles.title}>
                            File nhạc
                        </Text>
                        <View style={
                            {
                                display: 'flex',
                                flexDirection: 'row',
                                // alignItems:'flex-start',
                                // alignContent: 'space-between',
                                width: '100%',
                                height: 38,
                                borderRadius: 20,
                                borderColor: colors.primary,
                                borderWidth: 1,
                                backgroundColor: '0xffffff',
                                paddingLeft: 20,
                                paddingTop: 5,
                                justifyContent: 'space-between'
                            }
                        }>
                            <Text style={[styles.textContent, { paddingTop: 2 }]}>{mp3Name}</Text>
                            <Image source={icons.upload} style={{ height: 25, marginRight: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>
                        Lời bài hát
                    </Text>
                    <View style={styles.longtextView}>
                        <TextInput style={styles.textContent}
                            placeholder={"Nhập lời bài hát"}
                            value={lyrics}
                            onChangeText={text => setLyrics(text)} />
                    </View>
                </View>

            </ScrollView>
        </View>

    )

}

const styles = StyleSheet.create({
    container:
    {
        display: 'flex',
        flex: 1,
        // marginHorizontal: '7%',
        // backgroundColor: colors.primary
    },
    imgSong:
    {
        // flex: 1,
        width: 160,
        height: 160,
        backgroundColor: colors.primary,
        alignSelf: 'center',

        borderRadius: 15
    },
    containerContent:
    {
        display: 'flex',
        flex: 1,
        marginHorizontal: '7%',
        marginBottom: 70,
        // backgroundColor: colors.black

    },
    textView:
    {
        display: 'flex',
        // alignItems:'flex-start',
        alignContent: 'center',
        width: '100%',
        height: 38,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: '0xffffff'
    },
    longtextView:
    {
        display: 'flex',
        // alignItems: 'center',
        alignContent: 'center',
        width: 360,
        height: 200,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
    },
    title:
    {
        marginLeft: '3%',
        marginTop: 10,
        fontFamily: 'Montserrat',
        fontSize: 12,
        fontWeight: '500',
        color: '#797979',
    },
    textContent:
    {
        // alignSelf: 'flex-start',
        marginLeft: '5%',
        fontFamily: 'Montserrat',
        fontSize: 15,
        fontWeight: '500',
        color: colors.primary,
        // backgroundColor: colors.black

    },
})