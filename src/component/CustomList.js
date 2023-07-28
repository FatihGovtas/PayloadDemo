import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ContentItem from './ContentItem'

const CustomList = ({ title, data }) => {
    const navigation = useNavigation();
    return (
        <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => <ContentItem item={item} navigation={navigation} />}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <Text style={styles.title_style}>{title}</Text>}
        >
            <Text style={styles.title_style}>{title}</Text>
        </FlatList>
    )
}

export default CustomList

const styles = StyleSheet.create({
    title_style: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 10,
    },
})