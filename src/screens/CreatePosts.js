import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Checkbox, Divider } from 'react-native-paper';
import styles from '../styles/pageStyles';
import { theme } from '../styles/theme';
import ApiConfig, { JsonData, PageUrl, cmsUrl } from '../config/ApiConfig';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MainStore from '../store/MainStore';
import DropdownMenu from '../component/DropdownMenu';
import SecondStore from '../store/SecondStore';
import { observer, inject } from 'mobx-react';

const CreatePosts = inject("SecondStore")(observer(({ SecondStore, navigation }) => {

    useEffect(() => {
        SecondStore.setValue([]);//..
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string(),
        text: Yup.string().required('Page layout zorunludur'),
    });

    const handleSave = (values) => {
        const { title, text } = values;
        console.log(SecondStore.value)
        const sendData = JsonData.postsData;
        sendData.title = title;
        sendData.category = SecondStore.value;       // kategori almada hata var
        sendData.layout[0].columns[0].richText[0].children[0].text = text;
        ApiConfig.sendDataToPayload(PageUrl.Posts, sendData);
        navigation.navigate('Posts');
    };

    return (
        <View style={{ paddingHorizontal: 15, backgroundColor: theme.colors.background, flex: 1, justifyContent: 'space-between' }}>
            <ScrollView>
                <Formik
                    initialValues={{
                        title: '',
                        text: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <Text style={styles.title_style}>{values.title === '' ? '[Başlıksız]' : values.title}</Text>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Title</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                />
                                {touched.title && errors.title && <Text style={{ color: 'red', fontSize: 10 }}>{errors.title}</Text>}
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Category</Text>
                                <DropdownMenu />
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Page Layout</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.text}
                                    onChangeText={handleChange('text')}
                                    onBlur={handleBlur('text')}
                                />
                                {touched.text && errors.text && (
                                    <Text style={{ color: 'red', fontSize: 10 }}>{errors.text}</Text>
                                )}
                            </View>
                            <Divider style={{ marginVertical: 30 }} />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.colors.text,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 50,
                                    width: 100,
                                    borderRadius: 5,
                                    marginBottom: 25,
                                }}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: theme.colors.secondary }}>Kaydet</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}));

export default CreatePosts