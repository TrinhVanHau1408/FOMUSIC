import { StyleSheet, Image, Text, View, FlatList, SafeAreaView, Alert, ScrollView } from 'react-native';
import HeaderApp from "../components/header/HeaderApp";
import { colors, icons, images } from "../constants";
import { format } from 'date-fns';


export default function DetailSong({ navigation, route }) {
    const { detailSong } = route.params;
    // console.log(detailSong)
    return (
        <View style={styles.container}>
            <HeaderApp iconLeft={icons.arrowBack} goBack={() => navigation.goBack()} />
            <View>
                <Image source={{ uri: detailSong.artwork }} style={styles.imgSong} />
            </View>
            <ScrollView style={styles.containerContent}>
                {/* <MyTextView 
                title='Tên bài hát' 
                text={musics.title} 
                /> */}
                <View>
                    <Text style={styles.title}>
                        Tên bài hát
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{detailSong.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Tác giả
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{detailSong.nameAuthor}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Ca sĩ
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{detailSong.artist}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Thể loại
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{detailSong.genre}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Album
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{detailSong.albumName}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Ngày phát hành
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{typeof detailSong.releaseAt =='number' ? format(detailSong.releaseAt, 'dd/MM/yyyy') : detailSong.releaseAt}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Nhà sản xuất
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{detailSong.nameExport}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Lời bài hát
                    </Text>
                    <View style={styles.longtextView}>
                        <Text style={styles.textContent}>{detailSong.lyrics}</Text>
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
        marginHorizontal: '7%',
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
        // backgroundColor: colors.black
        marginBottom: 70,

    },
    textView:
    {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        width: 360,
        height: 38,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 8
    },
    longtextView:
    {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        width: 360,
        height: 200,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: '#FFFFFF'
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
        alignSelf: 'flex-start',
        marginLeft: '5%',
        fontFamily: 'Montserrat',
        fontSize: 15,
        fontWeight: '500',
        color: colors.primary,


    },
})