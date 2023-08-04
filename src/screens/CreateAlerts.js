import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Checkbox, Divider } from 'react-native-paper';
import styles from '../styles/pageStyles';
import { theme } from '../styles/theme';
import ApiConfig, { JsonData, PageUrl, cmsUrl } from '../config/ApiConfig';
import { Formik } from 'formik';
import * as Yup from 'yup';


const CreateAlerts = ({ navigation }) => {

    useEffect(() => {
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        content: Yup.string().required('Bu alan gereklidir'),
    });

    const handleSave = (values) => {
        const { name, content } = values;
        const sendData = JsonData.alertsData;
        sendData.name = name;
        sendData.content[0].children[0].text = content;
        ApiConfig.sendDataToPayload(PageUrl.Alerts, sendData);
        navigation.navigate('Alerts');
    };

    return (
        <View style={{ paddingHorizontal: 15, backgroundColor: theme.colors.background, flex: 1, justifyContent: 'space-between' }}>
            <ScrollView>
                <Formik
                    initialValues={{
                        name: '',
                        content: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <Text style={styles.title_style}>{values.name === '' ? '[Başlıksız]' : values.name}</Text>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Name</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                                {touched.name && errors.name && <Text style={{ color: 'red', fontSize: 10 }}>{errors.name}</Text>}
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Content</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.content}
                                    onChangeText={handleChange('content')}
                                    onBlur={handleBlur('content')}
                                />
                                {touched.content && errors.content && (
                                    <Text style={{ color: 'red', fontSize: 10 }}>{errors.content}</Text>
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
};

export default CreateAlerts