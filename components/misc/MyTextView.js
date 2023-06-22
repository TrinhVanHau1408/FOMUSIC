import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../constants";

export default function MyTextView(props) {
    const { title, text } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.containerContent}>
                <Text style={styles.textContent}>{text}</Text>
            </View>
        </View>

    )

}
const styles = StyleSheet.create({
    container:
    {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary
    },
    title:
    {
        fontFamily: 'Montserrat',
        fontSize: 12,

        fontWeight: '500',
        colors: '#797979',
    },
    textContent:
    {
        display: 'flex',
        width: 360,
        height: 38,
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: '#FFFFFF'

    },
    containerContent:
    {
        display: 'flex',
        flex: 1,
        borderRadius: 10,
        borderColor: colors.primary
    }
})