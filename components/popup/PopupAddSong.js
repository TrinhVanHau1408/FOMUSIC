import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Image, ToastAndroid } from 'react-native'
import MyAdd from '../misc/MyAdd'
import MyInput from '../misc/MyInput';
import { icons, colors } from '../../constants';
import MyButton from '../misc/MyButton';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { readDataFirebase, writeDataFirebase } from '../../firebase/controllerDB';
import { convertObjectToArray } from '../../utilities/Object';
import { getAllPlaylistByUserId, setPlayLists } from '../../redux/slices/playlistsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { uploadFileStorage } from '../../firebase/controllerStorage';
import { serverTimestamp } from 'firebase/database';
const filterSongs = [
    {
        "key": "song1",
        "albumName": "Hello",
        "artist": "Bảo Anh",
        "artistId": "artist1",
        "artwork": "https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/images%2Fbaoanh.jpg?alt=media&token=f4c4b4ad-c5be-486e-97d6-4e5173270945",
        "createAt": "03/04/2022",
        "duration": "1:23",
        "genre": "RAP",
        "genreId": "genre1",
        "lyrics": "I'm findin' ways to articulate the feelin' I'm goin' through I just can't say I don't love you 'Cause I love you, yeah It's hard for me to communicate the thoughts that I hold But tonight, I'm gon' let you know Let me tell the truth Baby, let me tell the truth, yeah You know what I'm thinkin', see it in your eyes You hate that you want me, hate it when you cry You're scared to be lonely, 'specially in the night I'm scared that I'll miss you, happens every time I don't want this feelin', I can't afford love I try to find a reason to pull us apart It ain't workin', 'cause you're perfect, and I know that you're worth it I can't walk away, oh Even though we're goin' through it And it makes you feel alone Just know that I would die for you Baby, I would die for you, yeah The distance and the time between us It'll never change my mind 'Cause baby, I would die for you Baby, I would die for you, yeah I'm findin' ways to manipulate the feelin' you're goin' through But, baby girl, I'm not blamin' you Just don't blame me, too, yeah 'Cause I can't take this pain forever And you won't find no one that's better 'Cause I'm right for you, babe I think I'm right for you, babe You know what I'm thinkin', see it in your eyes You hate that you want me, hate it when you cry It ain't workin', 'cause you're perfect, and I know that you're worth it I can't walk away, oh Even though we're goin' through it And it makes you feel alone Just know that I would die for you Baby, I would die for you, yeah The distance and the time between us It'll never change my mind 'Cause baby, I would die for you, uh Baby, I would die for you, yeah I would die for you, I would lie for you Keep it real with you, I would kill for you My baby I'm just sayin', yeah I would die for you, I would lie for you Keep it real with you, I would kill for you My baby Na-na-na, na-na-na, na-na, ooh Even though we're goin' through it And it makes you feel alone Just know that I would die for you Baby, I would die for you, yeah The distance and the time between us It'll never change my mind 'Cause baby, I would die for you Baby, I would die for you, yeah (oh, babe)",
        "name": "baihat1",
        "reactHeart": {
            "3XUNpCHKq3bC64NzRBEzzFx2": false,
            "3XUNpCHKq3bC64NzVwHNRBEzzFx2": false
        },
        "releaseAt": "25/09/2022",
        "url": "https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/CoAyCuaAnhAy-BaoAnh-9430793.mp3?alt=media&token=87f57b10-8516-4731-aae0-9639dc522d95&_gl=1*1n4zafm*_ga*MTI4MTA1OTE3My4xNjg1MzQ4NDMw*_ga_CW55HF8NVT*MTY4NTc4MTMzOS4xNy4xLjE2ODU3ODE1OTkuMC4wLjA."
    },
    {
        "key": "song2",
        "albumName": "Ai Can Ai",
        "artist": "Bảo Anh",
        "artistId": "artist1",
        "artwork": "https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/images%2Fbaoanh.jpg?alt=media&token=f4c4b4ad-c5be-486e-97d6-4e5173270945",
        "buffer": 30,
        "createAt": "21/5/2023",
        "duration": "4:34",
        "genre": "Nhạc Việt",
        "genreId": "genre2",
        "lyrics": "Giấc mộng năm ấy ta có Nhẹ nhàng như cơn gió Giờ đã hoá tàn tro Anh là người em từng yêu Tim rơi trong một chiều Hoàng hôn thời niên thiếu Dẫu là luôn thấy đôi mắt Buồn làm tim đau thắt Vẫn hoài yêu Bao năm tháng Cũng chẳng thể đo được hết Nhớ thương đã trao Ngày mà mình nằm hàng giờ Nhìn mây bay trên trời xanh Ngày mà một lời tỏ tình Rơi theo mưa nhanh nhanh Từng lần hẹn hò Giờ lại thành ký ức vẽ lên bức tranh Tháng năm đã qua Đẹp như thước phim chúng ta Hay tua chậm Nhiều năm về sau tình cờ thấy nhau Đôi mắt người vẫn một màu sẫm nâu Cà phê trên tay anh đưa tay em cầm lấy Có thể được xem như Mình vừa cầm tay nhau Xin lỗi vì đã chẳng thể tốt hơn Xin lỗi chẳng thể trưởng thành sớm hơn Anh nói điều ấy Khi trái tim em tan nát từ lâu Và đã phải học cách gượng cười Chỉ tiếc Cô ấy giờ đây Cô ấy của anh Chỉ tiếc Cô ấy của anh Không phải là em Gió của những tháng năm ấy Thổi qua đáy thung lũng Tận cùng những ngày yêu Anh là nụ hôn đầu tiên Chỉ xuất hiện một lần Ngỡ người thân yêu nhất Dẫu là luôn thấy đôi mắt Buồn làm tim đau thắt Vẫn hoài yêu Bao năm tháng Cũng chẳng thể đo được hết Nhớ thương đã trao Ngày mà mình nằm hàng giờ Nhìn mây bay trên trời xanh Ngày mà một lời tỏ tình Rơi theo mưa nhanh nhanh Từng lần hẹn hò Giờ lại thành ký ức vẽ lên bức tranh Tháng năm đã qua Đẹp như thước phim chúng ta Hay tua chậm Nhiều năm về sau tình cờ thấy nhau Đôi mắt người vẫn một màu sẫm nâu Cà phê trên tay anh đưa tay em cầm lấy Có thể được xem Như mình vừa cầm tay nhau Xin lỗi vì đã chẳng thể tốt hơn Xin lỗi chẳng thể trưởng thành sớm hơn Anh nói điều ấy Khi trái tim em tan nát từ lâu Và ta đâu còn là gì của nhau Cô ấy giờ là cô ấy của anh Cô ấy của anh giờ không phải em Anh vốn luôn có cô ấy cạnh bên Chỉ là giờ đây Em không còn được là cô ấy Xin lỗi vì đã chẳng thể tốt hơn Xin lỗi chẳng thể trưởng thành sớm hơn Anh nói điều ấy Khi trái tim em tan nát từ lâu Và ta đâu còn là gì của nhau Chỉ tiếc Cô ấy giờ đây Cô ấy của anh Chỉ tiếc Cô ấy của anh Không phải là em",
        "modifyAt": "",
        "name": "Cô Ấy Của Anh Ấy",
        "reactHeart": {
            "3XUNpCHKq3bC64NzVwHNRBEzzFx2": "",
            "5aLJic5COdUdxjxpBG8ajQHpIO03": ""
        },
        "releaseAt": "21/5/2023",
        "url": "https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/CoAyCuaAnhAy-BaoAnh-9430793.mp3?alt=media&token=87f57b10-8516-4731-aae0-9639dc522d95"
    },
    {
        "key": "song3",
        "albumName": "Mơ",
        "artist": "Mỹ Anh",
        "artistId": "artist2",
        "artwork": "",
        "createAt": "",
        "duration": "3:45",
        "genre": "RAP",
        "genreId": "genre1",
        "lyrics": "Cần điều gì thì nói ra Sự thật đẹp tựa đóa hoa Điều gì cần phải nói ra Để mình trở thành chúng ta I'm doing thing slowly Khi hai chân đang đi hướng trái tim I'm doing thing slowly Khi môi em trôi qua như cuốn phim Cuốn không gian lại thân mình va vào nhau Mau đốt trụi bao khổ đau Người đừng nói hãy ôm thật lâu bae Đến khi nắng không màu I'm doing things slowly Đôi khi ta cứ thế chẳng bước đi Đôi khi ta cứ thế Vài lần tìm được lối ra Đường về dài một lối hoa Vài lần buồn chờ tối qua Khi mà người từ chối ta I'm doing thing slowly Khi hai chân đang đi hướng trái tim I'm doing thing slowly Khi môi em trôi qua như cuốn phim Cuốn không gian lại thân mình va vào nhau Mau đốt trụi bao khổ đau Người đừng nói hãy ôm thật lâu bae Đến khi nắng không màu I'm doing things slowly Đôi khi ta cứ thế chẳng bước đi Đôi khi ta cứ thế Cuốn không gian lại thân mình va vào nhau Mau đốt trụi bao khổ đau Người đừng nói hãy ôm thật lâu bae Đến khi nắng không màu I'm doing things slowly Đôi khi ta cứ thế chẳng bước đi Đôi khi ta cứ thế",
        "modifyAt": "",
        "name": "Slowly",
        "reactHeart": {
            "3XUNpCHKq3bC64NzVwHNRBEzzFx2": "",
            "4QoEok3ghdXH7DmJJzomMyjeryT2": "",
            "5aLJic5COdUdxjxpBG8ajQHpIO03": "",
            "VIJatTsgdeMlZD8ZE0QJ48kFdq12": ""
        },
        "releaseAt": "",
        "url": "https://firebasestorage.googleapis.com/v0/b/fomusicapp-12403.appspot.com/o/images%2FThinhSuy.jpeg?alt=media&token=c242b17e-9992-4ac4-bbb2-bb7548c8b579"
    }
]
export default function PopupAddSong({ playlist, title, infoImg, setMySongPlaylist, isVisiblePopup, setIsVisiblePopup, handleGoBackPopup }) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const { playlists } = useSelector((state) => state.playlists)
    const [allSong, setAllSong] = useState();
    const [filterSong, setFilterSong] = useState([]);
    const [songIdPicks, setSongIdPicks] = useState([]);
    const [inputSearch, setInputSearch] = useState('')
    const { key, name, description } = playlist;
    console.log("Check key: ", key)

    const getAllSong = async () => {
        const snapshotSongs = await readDataFirebase('songs')
        const convertArraySong = convertObjectToArray(snapshotSongs);
        setAllSong(convertArraySong);
        setFilterSong([])
    }

    useEffect(() => {
        if (isVisiblePopup == true) {
            getAllSong();
        }
    }, [isVisiblePopup])

    useEffect(() => {
        if (inputSearch != '') filterSongByInput(inputSearch)
        else getAllSong();
    }, [inputSearch])

    const filterSongByInput = (inputSearch) => {
        inputSearch = inputSearch.toLowerCase();
        // Lọc theo tên bài hát or tên nghệ sĩ
        //  // normalize("NFD").replace(/[\u0300-\u036f]/g, "") => convert thành chữ không chứa các dấu
        const filter = allSong.filter(({ name, artist }) => (
            name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputSearch)
            || artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputSearch)
        ))
        // console.log('filterSong: ', filterSong)
        setFilterSong(filter)
    }

    const handlePickSong = (songIdPick) => {
        // console.log("requestAddsong ")
        // kiểm tra xem songPickId đã có trong songPickIds chua
        // nếu chưa thì add vào songPickIds

        if (songIdPicks.includes(songIdPick)) {
            // console.log("đã có rồi")

            // Xóa songId
            setSongIdPicks(
                songIdPicks.filter(songId => songId != songIdPick)
            )
            // ToastAndroid.show('Đã chọn', ToastAndroid.SHORT);
        } else {
            // console.log("Cần thêm mới")

            // Thêm song Id
            setSongIdPicks([...songIdPicks, songIdPick])
            // ToastAndroid.show('Đã bỏ chọn', ToastAndroid.SHORT);
        }

        // console.log("mang song id pick: ", songIdPicks);
    }

    // const handleCreateNewPlaylist = () => {
    //     handleClickButtonCreate(songIdPicks)
    //     setInputSearch('');
    // }
    const createNewPlaylistWithSong = async () => {

        const objSongIdPicks = songIdPicks.reduce(function (acc, value) {
            acc[value] = "";
            return acc;
        }, {});


        let imageUrl = ''
        const { imgUrlNewPlaylist, imgNameNewPlaylist } = infoImg;
        if (imgUrlNewPlaylist) {
            const result = await fetch(imgUrlNewPlaylist)
            const blob = await result.blob()
            imageUrl = await uploadFileStorage(`images/${imgNameNewPlaylist}`, blob)
        }

        const newPlaylist = {
            name: name,
            description: description,
            userId: user.uid,
            imageUrl: imageUrl,
            songs: objSongIdPicks,
            createdAt: serverTimestamp(),
            modifyAt: serverTimestamp(),
        }

        // console.log('newPlaylist: ',newPlaylist)

        // Thêm dữ liệu newplaylist vào firebase

        try {
            const responeNewPlaylist = await writeDataFirebase('playlists', newPlaylist);
            if (responeNewPlaylist) {
                // dispatch(getAllPlaylistByUserId({ userId: user.uid }))
                dispatch(getAllPlaylistByUserId({ userId: user.uid }))
                setIsVisiblePopup(false);

                ToastAndroid.show('Tạo playlist mới thành công', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Tạo playlist mới thất bại', ToastAndroid.SHORT);
            }
        } catch (e) {
            ToastAndroid.show('Tạo playlist mới thất bại ' + e.code, ToastAndroid.SHORT);
        }
    }


    const addSongInPlaylist = async () => {
        const objSongIdPicks = songIdPicks.reduce(function (acc, value) {
            acc[value] = "";
            return acc;
        }, {});

        const dataSongs = { ...playlist.songs, ...objSongIdPicks }
        console.log('songIdPicks handleAdd 134', dataSongs)

        try {
            const resAddSong = await writeDataFirebase(`playlists/${key}`, dataSongs, 'songs')

            if (resAddSong) {

                console.log("handle add song")
                let indexPlaylist = -1;

                const updatedDataArray = playlists.map((obj, index) => {
                    // console.log("obj", obj)
                    if (obj.key === key) {
                        indexPlaylist = index;
                        return {
                            ...obj,
                            songs: dataSongs
                        };
                    }
                    return obj;
                });
                console.log("handle add song")

                console.log('dispatch(setPlayLists', updatedDataArray[indexPlaylist])

                setMySongPlaylist(updatedDataArray[indexPlaylist])
                dispatch(setPlayLists(updatedDataArray))
                ToastAndroid.show('Successful', ToastAndroid.SHORT);
                setIsVisiblePopup(false)
            }
            else {
                ToastAndroid.show('Failed', ToastAndroid.SHORT);
            }
        }
        catch (error) {
            console.log(error)
            ToastAndroid.show('Failed', ToastAndroid.SHORT);
        }
    }

    const handleCreateNewPlaylist = async () => {
        // Xử lý ảnh
        // Nếu có chọn ảnh

        console.log("key:, ", key)
        if (key === undefined) {
            createNewPlaylistWithSong();
        } else {
            addSongInPlaylist();
        }


    }

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisiblePopup}

        >

            <TouchableWithoutFeedback
                onPressOut={() => setIsVisiblePopup(false)}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15 }}>
                    <View style={styles.container}>
                        <View style={{ marginLeft: 15 }}>
                            {handleGoBackPopup && <TouchableOpacity onPress={handleGoBackPopup}>
                                <Image source={icons.arrowBack} />
                            </TouchableOpacity>}
                            <View>
                                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{playlist.name}</Text>
                            </View>
                            {/* <View ><Text style={{ textAlign: 'center' }}>Mô</Text></View> */}
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <MyInput placeholder={"Search"} icon={icons.search} setState={setInputSearch} valueState={inputSearch} />
                        </View>

                        {filterSong ?
                            <FlatList
                                style={{ marginTop: 28, marginBottom: 15, height: 275 }}
                                data={filterSong}
                                renderItem={({ item, index }) => {
                                    if (item) {
                                        return (<MyAdd
                                            songId={item.key}
                                            songName={item.name}
                                            songImg={item.artwork}
                                            artistName={item.artist}
                                            songIdPicks={songIdPicks}
                                            handleAdd={handlePickSong}
                                        />)
                                    }
                                }}
                                keyExtractor={(item, index) => index}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="blue" />
                            </View>}

                        {/* <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> */}
                        {/* <TouchableOpacity style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 10 }}>
                                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>title</Text>
                            </TouchableOpacity> */}

                        {/* <MyButton title={'Tạo playlist'} handleButton={handleCreateNewPlaylist} /> */}
                        <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionButton} onPress={handleCreateNewPlaylist} >
                            <Text style={styles.textButton}>{title}</Text>
                        </TouchableOpacity>
                        </View>
                        
                        {/* </View> */}
                        <View style={{ flex: 1, height: 15 }}></View>
                    </View>
                </View>

            </TouchableWithoutFeedback>

        </Modal>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: 'auto',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 15,
        paddingBottom: 20,
        paddingTop: 20
    },

    liststyle: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row'
    },optionContainer: 
    {
        display: 'flex',
        justifyContent: 'center',
        
        alignSelf:'center',
        marginTop: 20,
        justifyContent: 'space-between',
        // backgroundColor: colors.primary

    },
    optionButton:
    {
        paddingHorizontal: 15,
        borderRadius: 30,
        backgroundColor: colors.primary,

    }, textButton:
    {
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 45,
        alignSelf: 'center',
        color: '#ffffff',
    },
});