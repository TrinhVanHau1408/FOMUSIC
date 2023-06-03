import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions, Animated, FlatList } from "react-native";
import { colors, icons, images, sizes } from '../../constants'
import IconText from "./IconText";

const heigtScreen = Dimensions.get('window').height;

export default function Edit({ title, handleNavigator,
    height = heigtScreen * 0.5,
    edit
}) {

    const translateY = React.useState(new Animated.Value(heigtScreen * 0.5))[0];

    React.useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [])

    return (
        <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                onPress={handleNavigator}
                activeOpacity={1.0} />
            <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                <View style={styles.liststyle} >
                    {title &&
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between'}}>
                            <View style={{ display: 'flex', flexDirection: 'row'}}>
                                <Image source={{ uri: title.imageUrl }} style={{ width: 50, height: 50 }} />
                                <Text style={{fontSize:20, marginTop:10, marginLeft:15}}>{title.name}</Text>
                            </View>
                            <View style={{ width: 390, height: 1, backgroundColor: colors.backgrougLyrics, marginRight: 30, marginTop: 10 }} />
                        </View>}
                    <FlatList
                        data={edit}
                        renderItem={({ item }) => {
                            return <IconText
                                icon={item.icon}
                                title={item.title}
                                handleonClick={item.handle} />
                        }}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{ flex: 1, height: 100 }}></View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        marginHorizontal: 2,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: '99%',
        maxHeight: heigtScreen * 0.5,
        backgroundColor: 'rgba(255, 255, 255,1)',
        translateY: - heigtScreen * 0.5,
        zIndex: 1
    },

    liststyle: {
        width: '99%',
        margin: 20,
        display: 'flex',
    }

});
