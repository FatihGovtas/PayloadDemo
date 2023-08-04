import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MainStore from '../store/MainStore'

const DrawerItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            MainStore.setData([]);
            MainStore.setProps();
            console.log(MainStore.data)
            navigation.navigate(item)
        }}>
            <Text style={styles.text_style}>{item}</Text>
        </TouchableOpacity>
    )
}

export default DrawerItem

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    text_style: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})