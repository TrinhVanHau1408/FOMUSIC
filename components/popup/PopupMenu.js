import { View, Text, Modal, TouchableWithoutFeedback, FlatList, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../constants';
import IconText from '../misc/IconText';
export default function PopupMenu({ menu, title = "popup menu", isVisiblePopup, setIsVisiblePopup }) {
    // console.log(menu)
    // const [isOpen, setIsOpen] = useState(true);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisiblePopup}

        >

            <TouchableWithoutFeedback
                onPressOut={() => setIsVisiblePopup(false)}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.container}>
                        <View style={styles.liststyle} >
                           
                            <FlatList
                                data={menu}
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
                    </View>
                </View>

            </TouchableWithoutFeedback>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: 'auto',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 5,
      
       
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'absolute',
        bottom: '6%',
        zIndex: 1
        
    },

    liststyle: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row'
    }
});