import { StyleSheet, Image, Text, TextInput, View, Modal, ToastAndroid, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import HeaderApp from "../components/header/HeaderApp";
import { colors, icons, images } from "../constants";
import { useState, useEffect } from 'react';
import { pick, types, isCancel } from 'react-native-document-picker'
import { uploadFileStorage } from '../firebase/controllerStorage';
import { readDataFirebase, writeDataFirebase } from '../firebase/controllerDB';
import { serverTimestamp } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
// import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown'
import { getAlbum } from '../redux/slices/albumSlice';
import DatePicker from 'react-native-modern-datepicker'


// ToastAndroid.show('Successful', ToastAndroid.SHORT);
const alltype = ["Bolero", "Rap", "Nhạc Trẻ", "Nhạc Đỏ", "Nhạc EDM", "Nhạc Trịnh"]

export default function EditDetailSong({ navigation }) {
    const { artist } = useSelector((state) => state.artist)
    const { album } = useSelector((state) => state.album)
    const dispatch = useDispatch()

    const today = new Date()

    const [open, setOpen] = useState(false)
    const [allAlbums, setAllAlbum] = useState([])
    const [isupLoad, setIsupLoad] = useState(false)

    const [imageName, setImageName] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [mp3Url, setMp3Url] = useState()
    const [mp3Name, setMp3Name] = useState()
    const [nameSong, setNameSong] = useState()
    const [nameAuthor, setNameAuthor] = useState()
    const [nameSinger, setNameSinger] = useState(artist.name)
    const [typeSong, setTypeSong] = useState(alltype[0])
    const [albumName, setAlbumName] = useState()
    const [dayProduce, setDayProduce] = useState(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 1}`)
    const [nameExport, setNameExport] = useState()
    const [lyrics, setLyrics] = useState()

    // processing event onlick upload songs
    const onlickUpload = async () => {

        // kiểm tra
        if (!nameSong) {
            Alert.alert('Tên bài hát không được trống')
            return
        }
        if (!nameAuthor) {
            Alert.alert('Tên tác giả không được trống')
            return
        }
        if (!nameSinger) {
            Alert.alert('Tên ca sĩ không được trống')
            return
        }
        if (!typeSong) {
            Alert.alert('Thể loại bài hát không được trống')
            return
        }
        if (!albumName) {
            Alert.alert('Tên album không được trống')
            return
        }
        if (!dayProduce) {
            Alert.alert('Ngày phát hành không được trống')
            return
        }
        if (!nameExport) {
            Alert.alert('Nhà sản xuất không được trống')
            return
        }
        if (!mp3Name) {
            Alert.alert('Bạn chưa upload file nhạc')
            return
        }
        if (!lyrics) {
            Alert.alert('Bài bát chưa có lời')
            return
        }

        // upoad lên firebase
        setIsupLoad(true)
        try {
            let urlFirebaseImage = "https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/images%2FdefaultAvt.jpg?alt=media&token=bdbe9c78-be0b-41c7-afa1-d0ebbd193ba9&_gl=1*1fyo95k*_ga*MzgxMzQ1MzAyLjE2ODI1NjYwMjQ.*_ga_CW55HF8NVT*MTY4NjM3NzEyMi40Mi4xLjE2ODYzNzcyMjEuMC4wLjA."
            if (imageUrl) {
                const result = await fetch(imageUrl)
                const blob = await result.blob()
                urlFirebaseImage = await uploadFileStorage(`images/${nameSong}`, blob)
            }

            try {
                const result = await fetch(mp3Url)
                const blob = await result.blob()
                const urlFirebaseMp3 = await uploadFileStorage(`songs/${nameSong}`, blob)

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
                    releaseAt: dayProduce,
                    url: urlFirebaseMp3,
                    reactHeart: {},
                    modifyAt: serverTimestamp(),
                    nameAuthor: nameAuthor,
                    nameExport: nameExport
                }

                try {
                    const rep = await writeDataFirebase('songs', dataUpload)
                    if (rep) {
                        ToastAndroid.show(`Successful`, ToastAndroid.SHORT);
                    } else {
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

        setIsupLoad(false)

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

    const renderIcon = () => {
        return <Image source={icons.dropdown} />
    }
    useEffect(() => {
        if (!album) {
            dispatch(getAlbum({}))
        }
    }, [])

    useEffect(() => {
        if (album) {
            const data = Object.entries(album).map(([key, value]) => {
                // console.log(key, value)
                return value.name
            })
            setAllAlbum(data)
            setAlbumName(data[0])
            // console.log(data)
        }

    }, [album])

    // console.log(date)
    const handleChangeDate = (propDate) => {
        setDayProduce(propDate)
    }

    return (
        <View style={styles.container}>
            <HeaderApp goBack={() => { navigation.goBack() }} handleNavigator={onlickUpload} iconLeft={icons.arrowBack} iconRight={icons.save} />

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
                            value={nameSinger}
                            placeholder={"Nhập tên ca sĩ"}
                            onChangeText={text => setNameSinger(text)} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Thể loại
                    </Text>
                    <View style={styles.PickerView}>
                        {/* <TextInput style={styles.textContent}
                            placeholder={"Nhập tên thể loại"}
                            onChangeText={text => setTypeSong(text)} /> */}
                        {/* <Picker
                            selectedValue={typeSong}
                            style={styles.Picker}
                            onValueChange={(itemValue, itemIndex) => setTypeSong(itemValue)}
                        >
                            <Picker.Item style={styles.pickerItem} label="Rap" value="Rap" />
                            <Picker.Item style={styles.pickerItem} label="Bolero" value="Boloro" />

                        </Picker> */}
                        <SelectDropdown
                            data={alltype}
                            defaultValue={typeSong}
                            defaultIndex={0}
                            value={typeSong}
                            onSelect={(selectedItem, index) => {
                                setTypeSong(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            buttonStyle={styles.PickerButton}
                            buttonTextStyle={styles.PickerButtonText}
                            dropdownStyle={styles.dropdownStyle}
                            renderDropdownIcon={renderIcon}
                        />

                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Album
                    </Text>
                    <View style={styles.PickerView}>

                        {/* <TextInput style={styles.textContent}
                            placeholder={"Nhập tên Album"}
                            value={albumName}
                            onChangeText={text => setAlbumName(text)} /> */}
                        <SelectDropdown
                            data={allAlbums}
                            defaultValue={albumName}
                            defaultIndex={0}
                            value={albumName}
                            onSelect={(selectedItem, index) => {
                                setAlbumName(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            buttonStyle={styles.PickerButton}
                            buttonTextStyle={styles.PickerButtonText}
                            dropdownStyle={styles.dropdownStyle}
                            renderDropdownIcon={renderIcon}
                        />

                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Ngày phát hành
                    </Text>
                    <View style={styles.textView}>
                        {/* <TextInput style={styles.textContent}
                            value={dayProduce}
                            placeholder={"Nhập ngày phát hành"}
                            onChangeText={text => setDayProduce(text)} /> */}
                        <TouchableOpacity onPress={() => setOpen(true)}
                            style={{
                                width: '100%', height: '100%',
                            }}>
                            <View style={{
                                width: '100%', height: '100%',
                                display: 'flex', justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center',
                                paddingLeft: 15,
                                paddingRight: 15
                            }}
                            >
                                <Text style={{ color: colors.primary, fontSize: 15, }}>{dayProduce}</Text>
                                <Image source={icons.schedule} />
                            </View>
                        </TouchableOpacity>
                        <Modal animationType='slide'
                            transparent={true}
                            visible={open}>
                            <View style={styles.centeredView} >
                                <View style={styles.modalView}>
                                    <DatePicker
                                        mode='calendar'
                                        selected={dayProduce}
                                        onDateChange={handleChangeDate}
                                    />
                                    <TouchableOpacity onPress={() => setOpen(false)}>
                                        <Text>Đóng</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>

                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Nhà sản xuất
                    </Text>
                    <View style={styles.textView}>
                        <TextInput style={styles.textContent}
                            value={nameExport}
                            placeholder={"Nhập nhà sản xuất"}
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
                            value={lyrics}
                            placeholder={"Nhập lời bài hát"}
                            onChangeText={text => setLyrics(text)} />
                    </View>
                </View>

            </ScrollView >
            {isupLoad && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor:'rgba(255, 255, 255, 0.6)',

            }}>
                <ActivityIndicator size="large" color="blue" />
            </View>}
        </View >

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
    PickerView:
    {
        display: 'flex',
        // alignItems:'flex-start',
        // alignContent: 'center',
        width: '100%',
        height: 38,
        // borderRadius: 20,
        // borderColor: colors.primary,
        // borderWidth: 1,
        backgroundColor: '0xffffff',
        // justifyContent: 'center',
        // alignItems:'flex-start'
    },
    PickerButton:
    {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255,0.1)',
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
    },
    PickerButtonText: {
        textAlign: 'left',
        color: colors.primary
    },
    pickerItem: {
        fontSize: 16,
        color: colors.UnNavagate
    },
    dropdownStyle: {
        // backgroundColor: colors.primary
        borderRadius: 20,
    },
    centeredView:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView:
    {
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5
    }

})