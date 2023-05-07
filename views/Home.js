import React from 'react'
import {StyleSheet, View } from 'react-native'
import HeaderApp from '../components/header/HeaderApp'
import RowBoxTranfer from '../components/box/RowBoxTranfer'
import RowBoxTitle from '../components/box/RowBoxTitle'


export default function Home () {
    return (
     <View style={styles.container}>
        <HeaderApp style={styles.header} title={'Home'}/>
        <View style={styles.content}>
            <RowBoxTranfer style={styles.tranfer}/>
            <View style={styles.rowcontent}>
                <View style={styles.row}>
                    <RowBoxTitle/>            
                </View>
                <View style={styles.row}>
                    <RowBoxTitle title="RECENTLY PLAYED"/>            
                </View>
            </View>
        </View>
     </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
       flex: 1, 
    },
    content:
    {
        flex:8,
        flexDirection: 'column',
    },
    rowcontent: {
       height:"60%",
       flexDirection: 'column',
    },
    tranfer:
    {
        height:"40%",
    },
    row:
    {
        height:"45%",
    }
})
