import { View, FlatList, Text, StyleSheet, ScrollView } from "react-native";
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

const music1 = [
    {
    title: 'Lovely',
    artist: 'Billie Eilish',
    songImg: images.imgLovely,
    // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
    duration: 2 * 60 + 53,
    id: '1',
  },
  {
    title: 'Understand',
    artist: 'Keshi',
    songImg: images.imgUnderstand,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '2',
    track_number: '2'
  },{
    title: 'Snooze',
    artist: 'SZA',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '3',
    track_number: '3'
  }]
  const music2=[{
    title: 'If you',
    artist: 'BigBang',
    songImg: images.imgIfYou,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '4',
    track_number: '4'
  },{
    title: 'Shoong',
    artist: 'Teayang',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '5',
    track_number: '5'
  },{
    title: 'Die For You',
    artist: 'The Weeknd',
    songImg: images.imgDieForYou,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '6',
    track_number: '6'
  },
  {
    title: 'double take',
    artist: 'dhruv',
    songImg: images.imgDoubleTakeL,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '7',
    track_number: '7'
  }
  ]

export default function Home3() {
    return (
        <ScrollView>
            <HeaderApp title='BXH' iconRight={icons.userCircleBlack} />
            <View>
                <View style={styles.headerFlatlist}>
                    <Text style={styles.textHeaderFlatlist}>
                        Tất Cả
                    </Text>
                    <MyMonthPicker />

                </View>
                <FlatList
                    style={{zIndex: -5}}
                    data={music1}
                    renderItem={({ item, index }) =>
                        <MySong
                            id={item.id}
                            songName={item.title}
                            songImg={item.songImg}
                            artistName={item.artist}
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
                    data={music2}
                    renderItem={({ item, index }) =>
                        <MySong
                            id={item.id}
                            songName={item.title}
                            songImg={item.songImg}
                            artistName={item.artist}
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


        </ScrollView>
    )
} 