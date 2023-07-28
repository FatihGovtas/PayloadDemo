import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import DrawerItem from './DrawerItem'
import { useNavigation } from '@react-navigation/native';

const DrawerList = ({ title, data }) => {
    const navigation = useNavigation();
    return (
        <FlatList
            style={styles.list_style}
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => <DrawerItem item={item} navigation={navigation} />}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <Text style={styles.title_style}>{title}</Text>}
        >
            <Text style={styles.title_style}>{title}</Text>
        </FlatList>
    )
}

export default DrawerList

const styles = StyleSheet.create({
    title_style: {
        color: '#797979',
        marginBottom: 5,
    },
    list_style: {
        marginBottom: 10,
    }
})