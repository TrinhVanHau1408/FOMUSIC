import { StyleSheet, Image, Text, View, FlatList, SafeAreaView, Alert } from 'react-native';
import HeaderApp from "../components/header/HeaderApp";
import { colors, icons, images } from "../constants";


const musics = [
    {
        title: 'Lovely',
        artist: 'Billie Eilish',
        songImg: images.imgLovely,
        // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
        duration: 2 * 60 + 53,
        id: '1',
    },
]
export default function DetailSong({ navigation }) {
    return (
        <View style={styles.container}>
            <HeaderApp iconLeft={icons.arrowBack} />
            <View>
                <Image source={images.defaultAvt} style={styles.imgSong}/>
            </View>
            <View style={styles.containerContent}>
                {/* <MyTextView 
                title='Tên bài hát' 
                text={musics.title} 
                /> */}
                <View>
                    <Text style={styles.title}>
                        Tên bài hát
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Tác giả
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Ca sĩ
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Thể loại
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Album
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Ngày phát hành
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Nhà sản xuất
                    </Text>
                    <View style={styles.textView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>
                        Lời bài hát
                    </Text>
                    <View style={styles.longtextView}>
                        <Text style={styles.textContent}>{musics.title}</Text>
                    </View>
                </View>

            </View>
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
        backgroundColor: '#FFFFFF'
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
        colors: '#797979',
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