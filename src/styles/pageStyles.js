import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const styles = StyleSheet.create({
    title_style: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.large,
    },
    button_style: {
        color: theme.colors.text,
        backgroundColor: theme.colors.itemBackground,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        marginLeft: 15,
        height: 30,
    },
    input_style: {
        padding: 8,
        marginBottom: 8,
        height: 50,
        color: theme.colors.text,
        backgroundColor: theme.colors.itemBackground,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.itemBackground,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        height: 50,
        color: theme.colors.text,
    },
    container: {
        backgroundColor: theme.colors.itemBackground, // Gri arka plan rengi
        padding: 10,
    },
    table_title: {
        color: theme.colors.text,
    },
})

export default styles;