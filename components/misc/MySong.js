import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants";

export default function MySong({ id, songName, songImg, artistName, handleLayout }) {

    return (
        <View>
            <TouchableOpacity
                onPress={() => handleLayout(id)}
                style={styles.container}
            >
                <Text style={styles.stt}>{id}</Text>
                <View style={styles.songContainer}>
                    <Image style={styles.songImg} source={songImg} />
                    <View style={styles.textSong}>
                        <Text style={styles.artistName}>{artistName}</Text>
                        <Text style={styles.songName}>{songName}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:
    {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // alignContent: 'center',

        paddingLeft: '2%',
        marginRight: 0,
        marginVertical: 3,

        width: 'auto',
        height: 80,

        // backgroundColor: colors.black
    },
    stt:
    {
        width: 20,
        marginLeft: '2%',

        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 29,

        color: colors.black

        // backgroundColor: '#ffffff'


    },
    songContainer:
    {
        display: 'flex',
        flexDirection: 'row',

        width: 450,
        height: 73,
        marginLeft: '2%',
        alignItems: 'center',

        backgroundColor: '#ffffff',
        borderRadius: 100,

        shadowColor: colors.black,
        shadowRadius: 10,
        elevation: 10

    },
    songImg:
    {
        width: 63,
        height: 63,
        marginLeft: '1.1%',
        alignSelf: 'center',

        borderRadius: 100,
        borderColor: colors.primary,
        borderWidth: 2

    },
    textSong:
    {
        display: 'flex',
        flexDirection: 'column',
        height: 49,
        justifyContent: 'space-between',
        marginLeft: '3%'
    },
    artistName:
    {
        fontFamily: 'Montserrat',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 16,
        color: colors.black
    },
    songName:
    {
        fontFamily: 'Montserrat',
        // fontStyle: 'italic',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24,
        color: colors.black
    }

})

