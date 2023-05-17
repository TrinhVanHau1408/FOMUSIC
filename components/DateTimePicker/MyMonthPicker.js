import { Props } from "@react-native-community/checkbox/dist/CheckBox.android"
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../constants";

const styles=StyleSheet.create({
    container:
    {
        width: 125,
        height: 20,
        marginRight: '3%'
        // backgroundColor: colors.primary
    }
})

export default function MyMonthPicker ()
{
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurentValue] = useState();

    const dataMonth = [
        {label: 'Tháng 1, 2023', value: '1/2023'},
        {label: 'Tháng 2, 2023', value: '2/2023'},
        {label: 'Tháng 3, 2023', value: '3/2023'},
        {label: 'Tháng 4, 2023', value: '4/2023'},
        {label: 'Tháng 5, 2023', value: '5/2023'},
        {label: 'Tháng 6, 2023', value: '6/2023'},
        {label: 'Tháng 7, 2023', value: '7/2023'},
        {label: 'Tháng 8, 2023', value: '8/2023'},
        {label: 'Tháng 9, 2023', value: '9/2023'},
        {label: 'Tháng 10, 2023', value: '10/2023'},
        {label: 'Tháng 11, 2023', value: '11/2023'},
        {label: 'Tháng 12, 2023', value: '12/2023'},
       
    ]

    return(
        <View style={styles.container}>
            <DropDownPicker 

                items={dataMonth}
                open={isOpen}
                setOpen={() => setIsOpen(!isOpen)}
                value={currentValue}
                setValue={val => setCurentValue(val)}
                maxHeight={100}
                autoScroll
                disableBorderRadius={true}

                placeholder="Tháng 5/2023"
                placeholderStyle={{fontSize: 1, fontWeight: '400', lineHeight: 13, color: colors.black}}
                showTickIcon={true}
                dropDownDirection="BOTTOM"
            />
        </View>
    )
}
