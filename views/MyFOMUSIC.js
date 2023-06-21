import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import HeaderApp from '../components/header/HeaderApp';
import { icons, images } from '../constants';
import MySongWithOptionMenu from '../components/misc/MySongWithOptionMenu';
import { useState, useEffect } from 'react';
import ControlMusic from '../components/misc/ControlMusic';
import { readDataFirebaseWithChildCondition } from '../firebase/controllerDB';
import Edit from '../components/misc/Edit';
import DeleteSong from './DeleteSong';

export default function MyFOMUSIC({ navigation, route }) {
    const [idSong, setIdSong] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleMenuSingleSong, setIsVisibleMenuSingleSong] = useState(false);
    const [isDeleteSong, setIsDeleteSong] = useState(false)
    const [isVisibleMenuSingle, setIsVisibleMenuSingle] = useState(false); // this is single to control menu of artist
    const [objsongsArtist, setObjsongsArtist] = useState();
    const [songsArtist, setSongsArtist] = useState() // here is array contains the songs of artist
    const [idSongSelected, setIdSongSelected] = useState() // here is id select to do something

    const [isReturnChild, setIsReturnChild] = useState(false) // 

    // this is signal of event screen child goback
    // This is function processing when handle menu of My FoMusic
    // ----------------------------------------------------------------

    const MenuSingle = [
        {
            title: "Đăng bài hát",
            icon: icons.listAdd,
            handle: () => {
                navigation.navigate('Upload', { previousScreen: route.name })
            }
        },
        {
            title: "Tìm kiếm bài hát",
            icon: icons.search,
            handle: handleNavigatorEditDetaillSong
        },
    ]
    // --------------------------------------------------------------

    const handleNavigatorDetailSong = () => {
        navigation.navigate('DetailSong', { detailSong: objsongsArtist[idSongSelected] })
    }
    const handleNavigatorEditDetaillSong = () => {
        navigation.navigate('EditDetailSong', { songdetails: objsongsArtist[idSongSelected], id: idSongSelected, previousScreen: route.name })
    }
    const handleNavigatorDeleteSong = () => {
        setIsDeleteSong(true)
        setIsVisibleMenuSingleSong(false)
    }
    const MenuSingleSong = [
        {
            title: "Xem thông tin bài hát",
            icon: icons.blackEyeOpen,
            handle: handleNavigatorDetailSong
        },
        {
            title: "Sửa thông tin bài hát",
            icon: icons.blackEditProfile,
            handle: handleNavigatorEditDetaillSong
        },
        {
            title: "Thêm bài hát yêu thích",
            icon: icons.heartAdd,
            handle: handleNavigatorDetailSong
        },
        {
            title: "Ẩn bài hát",
            icon: icons.blackEyeClose,
            handle: handleNavigatorEditDetaillSong
        },
        {
            title: "Thêm vào playlist",
            icon: icons.playlistAdd,
            handle: handleNavigatorEditDetaillSong
        },
        {
            title: "Thêm vào Album",
            icon: icons.listAdd,
            handle: handleNavigatorEditDetaillSong
        },
        {
            title: "Xóa bài hát",
            icon: icons.removeCircle,
            handle: handleNavigatorDeleteSong
        },
    ]
    //----------------------------------------------------------------

    const handleLayout = (id) => {
        setIsVisible(true);
        setIdSong(id);
    }
    const goBack = () => {
        navigation.goBack();
    }
    const handleNavigatorOptionSong = (id) => {
        // navigation.navigate('OptionSong');
        setIsVisibleMenuSingleSong(true)
        setIdSongSelected(id)
    }

    const handleMenuOfMyFoMusic = () => {
        setIsVisibleMenuSingle(true)
    }

    // This is function get all songs of artists, with condition is artistId (current fixed artists is "artist1")
    // Funtion will be activity when songs in firebase change
    useEffect(() => {

        const getSongsArtist = async () => {
            const rep = await readDataFirebaseWithChildCondition('songs', 'artistId', 'artist1')
            if (rep) {
                const data = Object.entries(rep).map(([key, value]) => {
                    return {
                        title: value.title,
                        artist: value.artist,
                        songImg: value.artwork,
                        id: key,
                    }
                })
                // console.log(data)
                setObjsongsArtist(rep)
                setSongsArtist(data)
            }
            else {
                setSongsArtist([])
            }
        }
        getSongsArtist()

    }, [isDeleteSong, isVisibleMenuSingleSong, isVisibleMenuSingle, route.params])

    return (
        <View style={{ flex: 1 }}>
            <HeaderApp title='My FOMusic' iconLeft={icons.arrowBack} goBack={goBack} iconRight={icons.option} handleNavigator={handleMenuOfMyFoMusic} />
            <View style={{ marginTop: 28 }}>
                {songsArtist ?
                    <FlatList
                        data={songsArtist}
                        renderItem={({ item, index }) =>
                            <MySongWithOptionMenu
                                id={item.id}
                                idSongSelected={idSong}
                                songName={item.title}
                                songImg={{ uri: item.songImg }}
                                artistName={item.artist}
                                index={index}
                                handleNavigator={handleNavigatorOptionSong}
                                handleLayout={handleLayout}
                            />
                        }
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                    /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <ActivityIndicator size="large" color="blue" /> */}
                        <Text>Chưa có bài hát nào được đăng</Text>
                    </View>
                }
            </View>
            {isVisible && <ControlMusic song={music.find(({ id }) => id === idSong)} />}
            {isVisibleMenuSingleSong && <Edit handleNavigator={() => setIsVisibleMenuSingleSong(false)} edit={MenuSingleSong} height={380} />}
            {isVisibleMenuSingle && <Edit handleNavigator={() => setIsVisibleMenuSingle(false)} edit={MenuSingle} height={170} />}
            {isDeleteSong && <DeleteSong id={idSongSelected} song={objsongsArtist[idSongSelected]} setIsVisibleMenuSingleSong={setIsVisibleMenuSingleSong} setIsDeleteSong={setIsDeleteSong} />}
        </View>
    )
}