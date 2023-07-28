import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import { observer, inject } from 'mobx-react';
const ContentItem = inject("MainStore")(observer(({ item, navigation, MainStore }) => {
    return (
        <TouchableOpacity style={styles.conteiner} onPress={() => {
            MainStore.setData([]);
            MainStore.setProps();
            console.log(MainStore.data)
            navigation.navigate(item)
        }}>
            <Text style={styles.text_style}>{item}</Text>
            {(item != "Media") ?
                <TouchableOpacity style={styles.icon_style} onPress={() => { }}>
                    <Icon name="plus" size={40} color="white" />
                </TouchableOpacity> : null}
        </TouchableOpacity>
    )
}));

export default ContentItem

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: '#222222',
        height: 150,
        width: 200,
        marginVertical: 15,
        marginHorizontal: 10,
        padding: 25,
        flex: 1
    },
    text_style: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 15,
    },
    icon_style: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    }
})