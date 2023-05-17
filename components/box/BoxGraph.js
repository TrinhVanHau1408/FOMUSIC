import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, Picker, Image, Platform } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-native-datepicker';
import { icons, colors, images } from '../../constants'

// import { Svg, Path } from 'react-native-svg';
import { LineChart } from "react-native-chart-kit";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function BoxGraph({
    title = "Thống kê chung"
}) {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                data: [500, 300, 1200, 900, 1800, 1500]
            }
        ]
    };
    const [chartWidth, setChartWidth] = useState(0);
    useEffect(() => {
        const { width } = Dimensions.get('window');
        setChartWidth(width - 50);
    }, []);

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: colors.backgrougLyrics,
        backgroundGradientTo: colors.backgrougLyrics,
        decimalPlaces: 0,
        color: () => colors.primary, // Màu sắc mặc định là màu xanh dương

        style: {
            borderRadius: 16
        }
    }
    const [ date, setDate ] =  useState(new Date())
    const [ show, setShow ] = useState(false)

    const onChange = (e, selected) => {
        const currentDate = selected|| date
        setShow(true)
        setDate(currentDate)
        let template = new Date(currentDate)
        let fDate = template.getDate() + '/' + (template.getMonth()+1) + '/' + template.getFullYear()
    }
    const showMode = () => {
        setShow(true)
    }


    return (
        <View style={{ height: 800, width: '100%' }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.boxlarge}>
                {/* <LineChart /> */}
                <View>
                    <View onPress={showMode}  style={{ width: 180, height: 40, backgroundColor: "#979797", marginTop: 10, marginLeft: 20, borderRadius: 10, display: 'flex', flexDirection: 'row', padding: 7, justifyContent: 'center' }} >
                        <Text>Tháng 4, 2023</Text>
                        <Image style={{ marginLeft: 5 }} source={icons.frame902} />
                    </View>
                    {show&&
                    (<DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={'date'}
                    display={'default'}
                    onChange={onChange}
                    />)}


                </View>
                <LineChart
                    data={data}
                    width={chartWidth}
                    height={310}
                    style={{ borderRadius: 20 }}

                    //    yAxisLabel={'#'}
                    chartConfig={chartConfig}
                    segments={0}
                    withDots={false}
                    withShadow={false}
                    withInnerLines={false}
                    withOuterLines={false}
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                />
            </View>
            <View style={styles.componentsbox}>
                <View style={styles.box}>
                    <Text style={styles.textTop}>Tổng số bài hát</Text>
                    <Text style={styles.textBottom}>10</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textTop}>Lượt nghe</Text>
                    <Text style={styles.textBottom}>123,456</Text>
                </View>
            </View>
            <View style={styles.componentsbox}>
                <View style={styles.box}>
                    <Text style={styles.textTop}>Lượt tải về</Text>
                    <Text style={styles.textBottom}>234</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textTop}>Lượt yêu thích</Text>
                    <Text style={styles.textBottom}>245</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: colors.black,
        fontWeight: "bold",
    },
    boxlarge: {
        backgroundColor: colors.backgrougLyrics,
        height: "45%",
        marginTop: 15,
        borderRadius: 15,
        paddingLeft: 0

    },
    componentsbox:
    {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,

    },
    box:
    {
        width: '46%',
        height: 100,
        backgroundColor: colors.backgrougLyrics,
        borderRadius: 15,
        padding: 15
    },
    textTop: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.black,

    },
    textBottom: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.black,
        fontWeight: 'bold',
    },
})