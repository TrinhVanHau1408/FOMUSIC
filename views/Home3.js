import { View, FlatList, Text, StyleSheet } from "react-native";
import HeaderApp from "../components/header/HeaderApp";
import { colors, icons, images } from "../constants";
import MySong from "../components/misc/MySong";
// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import MonthPicker from "react-native-month-year-picker";
import MyMonthPicker from "../components/DateTimePicker/MyMonthPicker";
// import { MonthPickerDropdown } from "react-month-picker-dropdown";
// import 'react-month-picker-dropdown/dist/index.css';


const styles = StyleSheet.create({
    headerFlatlist:
    {
        height: 50, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        // alignContent: 'center',
        // alignItems: 'center',
        // backgroundColor: colors.black
    },
    textHeaderFlatlist:
    {
        marginLeft: '4%', 
        marginBottom: '3%', 
        fontSize: 16, lineHeight: 20, 
        fontWeight: 'bold', 
        color: colors.black,
        alignContent: 'center',
        alignSelf: 'center'
    },
    baCham:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 10,
        width: 50
    },
    motCham:
    {
        width: 6,
        height: 6,
        backgroundColor: '##D9D9D9',

        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary

    }
})

const dataSong = [
    {
        id: 1,
        songName: 'Bubble it',
        songImg: images.defaultAvt,
        artistName: 'Yemi Alade ft Spice ',
    },
    {
        id: 2,
        songName: 'WAP',
        songImg: images.defaultAvt,
        artistName: 'Cardi B ft megan...',
    },
    {
        id: 3,
        songName: 'Bubble it',
        songImg: images.defaultAvt,
        artistName: 'Yemi Alade ft Spice ',
    },
]

export default function Home3() {
    return (
        <View>
            <HeaderApp title='Home' iconRight={icons.userCircleBlack} />
            <View>
                <View style={styles.headerFlatlist}>
                    <Text style={styles.textHeaderFlatlist}>
                        Tất Cả
                    </Text>
                    <MyMonthPicker />

                </View>
                <FlatList
                    style={{zIndex: -5}}
                    data={dataSong}
                    renderItem={({ item, index }) =>
                        <MySong
                            id={item.id}
                            songName={item.songName}
                            songImg={item.songImg}
                            artistName={item.artistName}
                            index={index}
                        />}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.baCham}>
                    <View style={styles.motCham} />
                    <View style={styles.motCham} />
                    <View style={styles.motCham} />
                </View>
            </View>

            <View style={{ marginTop: '7%' }}>
                <View style={styles.headerFlatlist}>
                    <Text style={styles.textHeaderFlatlist}>
                        Top Hits Việt Nam
                    </Text>
                    <MyMonthPicker/>
                </View>
                <FlatList
                style={{zIndex: -5}}
                    data={dataSong}
                    renderItem={({ item, index }) =>
                        <MySong
                            id={item.id}
                            songName={item.songName}
                            songImg={item.songImg}
                            artistName={item.artistName}
                            index={index}
                        />}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.baCham}>
                    <View style={styles.motCham} />
                    <View style={styles.motCham} />
                    <View style={styles.motCham} />
                </View>
            </View>


        </View>
    )
} 