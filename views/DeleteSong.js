import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { colors } from '../constants'
import { deleteDataFirebase } from '../firebase/controllerDB'

export default function DeleteSong({
    setIsVisibleMenuSingleSong,
    setIsDeleteSong,
    id,
    songName
}) {
    const onDeleteSong = async () => {

        try {
            const rep = await deleteDataFirebase(`songs/${id}`)
            if (rep) {
                ToastAndroid.show(`Successful`, ToastAndroid.SHORT);

            }
            else {
                ToastAndroid.show(`Failed`, ToastAndroid.SHORT);
            }
        }
        catch (err) {
            ToastAndroid.show(`Failed: ${err}`, ToastAndroid.SHORT);
        }
        setIsDeleteSong(false)
        setIsVisibleMenuSingleSong(true)

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                onPress={() => {
                    setIsDeleteSong(false)
                    setIsVisibleMenuSingleSong(true)
                }
                }
                activeOpacity={1.0} />
            <View style={{
                position: 'absolute',
                top: '40%',
                backgroundColor: '#FFFF',
                marginLeft: '10%',
                marginRight: '10%',
                width: '80%',
                padding: 5,
                borderRadius: 20,
            }}>
                <Text style={(styles.textwithMarginTop)}>Bạn có chắc xoá bài hát</Text>
                <Text style={styles.text}>{songName}</Text>
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.optionYes} onPress={onDeleteSong} >
                        <Text style={styles.textYes}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionNo} onPress={() => {
                        setIsDeleteSong(false)
                        setIsVisibleMenuSingleSong(true)
                    }}>
                        <Text style={styles.textNo}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container:
    {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        // color: '#FFFFFF',
        alignSelf: 'center',
        // marginVertical: 300,
    },
    optionContainer:
    {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
        // backgroundColor: colors.primary

    },
    optionYes:
    {
        width: 120,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#AD004A',
    },
    optionNo:
    {
        width: 120,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#00AD63',
    },
    textYes:
    {
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 45,
        alignSelf: 'center',
        color: '#AD004A',
    },
    textNo:
    {
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 45,
        alignSelf: 'center',
        color: '#00AD63',
    },

    textwithMarginTop:
    {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 18,
        color: colors.primary,
        alignSelf: 'center',
        marginTop: 30
    },
    text:
    {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 18,
        color: colors.primary,
        alignSelf: 'center',
    },


})
