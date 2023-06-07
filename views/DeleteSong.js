import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { colors } from '../constants'

export default function DeleteSong() {
    return(
        <View style={styles.container}>
            <Text style={(styles.textwithMarginTop)}>Bạn có chắc xoá bài hát</Text>
            <Text style={styles.text}>"Tên bài hát"</Text>
            <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.optionYes}>
                    <Text style={styles.textYes}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionNo}>
                    <Text style={styles.textNo}>No</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container:
    {
        display: 'flex',
        flexDirection: 'column',
        width: 377,
        height: 170,
        // color: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.primary,
        alignSelf: 'center',
        marginVertical: 300,
        backgroundColor: '#FFFFFF'
    },
    optionContainer: 
    {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        alignSelf:'center',
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
