import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../styles/pageStyles'
import FieldItem from './FieldItem'
import { useFormikContext } from 'formik';
import { theme } from '../styles/theme'

const FieldList = () => {

    const formik = useFormikContext();
    const { values, setFieldValue } = formik;

    const addField = () => {
        const newItem = {
            name: '',
            label: '',
            blockType: 'text'
        }

        setFieldValue('fields', [...values.fields, newItem]);

    }
    

    return (
        <FlatList
            style={{}}
            scrollEnabled={false}
            data={values.fields}
            renderItem={({ item }) => <FieldItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => {
                return <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={addField}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, borderColor: theme.colors.text, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                        <Text style={styles.table_title}>+</Text>
                    </View>
                    <Text style={styles.table_title}>Field Ekle</Text>
                </TouchableOpacity>
            }}
        >
        </FlatList>
    )
}

export default FieldList