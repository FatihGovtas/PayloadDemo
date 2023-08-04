import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Checkbox, Divider } from 'react-native-paper';
import styles from '../styles/pageStyles';
import { theme } from '../styles/theme';
import ApiConfig, { JsonData, PageUrl, cmsUrl } from '../config/ApiConfig';
import { Formik } from 'formik';
import * as Yup from 'yup';


const CreatePages = ({ navigation }) => {

    useEffect(() => {
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Bu alan gereklidir'),
        hero: Yup.string(),
        layout: Yup.string().required('Bu alan gereklidir'),
    });

    const handleSave = (values) => {
        const { title, hero, layout } = values;
        const sendData = JsonData.pagesData;
        sendData.title = title;
        sendData.hero.basic.richText[0].children[0].text = hero;
        sendData.layout[0].columns[0].richText[0].children[0].text = layout;
        ApiConfig.sendDataToPayload(PageUrl.Pages, sendData);
        navigation.navigate('Pages');
    };

    return (
        <View style={{ paddingHorizontal: 15, backgroundColor: theme.colors.background, flex: 1, justifyContent: 'space-between' }}>
            <ScrollView>
                <Formik
                    initialValues={{
                        title: '',
                        hero: '',
                        layout: ''
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
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Hero</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.hero}
                                    onChangeText={handleChange('hero')}
                                    onBlur={handleBlur('hero')}
                                />
                                {touched.hero && errors.hero && (<Text style={{ color: 'red', fontSize: 10 }}>{errors.hero}</Text>)}
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Page Layout</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.layout}
                                    onChangeText={handleChange('layout')}
                                    onBlur={handleBlur('layout')}
                                />
                                {touched.layout && errors.layout && <Text style={{ color: 'red', fontSize: 10 }}>{errors.layout}</Text>}
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
};

export default CreatePages