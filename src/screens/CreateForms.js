import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Checkbox, Divider } from 'react-native-paper';
import styles from '../styles/pageStyles';
import { theme } from '../styles/theme';
import ApiConfig, { JsonData, PageUrl, cmsUrl } from '../config/ApiConfig';
import { Formik, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import FieldList from '../component/FieldList';


const CreateForms = ({ navigation }) => {

    useEffect(() => {
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Bu alan gereklidir'),
        fields: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Bu alan gereklidir'),
                label: Yup.string(),
            })
        ),
        submitButtonLabel: Yup.string(),
        confirmationMessage: Yup.string().required('Bu alan gereklidir'),
    });

    const handleSave = (values) => {
        const { title, fields, submitButtonLabel, confirmationMessage } = values;
        const sendData = JsonData.formsData;
        sendData.title = title;
        sendData.fields = fields;
        console.log(fields);
        sendData.submitButtonLabel = submitButtonLabel;
        sendData.confirmationMessage[0].children[0].text = confirmationMessage;
        ApiConfig.sendDataToPayload(PageUrl.Forms, sendData);
        navigation.navigate('Forms');
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            submitButtonLabel: '',
            fields: [],
            confirmationMessage: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSave,
    });

    return (
        <View style={{ paddingHorizontal: 15, backgroundColor: theme.colors.background, flex: 1, justifyContent: 'space-between' }}>
            <ScrollView>
                <FormikProvider value={formik}>
                    <View>
                        <Text style={styles.title_style}>{formik.values.title === '' ? '[Başlıksız]' : formik.values.title}</Text>
                        <View style={{ marginVertical: 20 }}>
                            <Text style={[styles.table_title, { marginBottom: 10 }]}>Title</Text>
                            <TextInput
                                style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                value={formik.values.title}
                                onChangeText={formik.handleChange('title')}
                                onBlur={formik.handleBlur('title')}
                            />
                            {formik.touched.title && formik.errors.title && <Text style={{ color: 'red', fontSize: 10 }}>{formik.errors.title}</Text>}
                            <FieldList></FieldList>
                            <Text style={[styles.table_title, { marginBottom: 10 }]}>Submit Button Label</Text>
                            <TextInput
                                style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                value={formik.values.submitButtonLabel}
                                onChangeText={formik.handleChange('submitButtonLabel')}
                                onBlur={formik.handleBlur('submitButtonLabel')}
                            />
                            {formik.touched.submitButtonLabel && formik.errors.submitButtonLabel && (<Text style={{ color: 'red', fontSize: 10 }}>{formik.errors.submitButtonLabel}</Text>)}
                            <Text style={[styles.table_title, { marginBottom: 10 }]}>Confirmation Message</Text>
                            <TextInput
                                style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                value={formik.values.confirmationMessage}
                                onChangeText={formik.handleChange('confirmationMessage')}
                                onBlur={formik.handleBlur('confirmationMessage')}
                            />
                            {formik.touched.confirmationMessage && formik.errors.confirmationMessage && <Text style={{ color: 'red', fontSize: 10 }}>{formik.errors.confirmationMessage}</Text>}
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
                            onPress={formik.handleSubmit}
                        >
                            <Text style={{ color: theme.colors.secondary }}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                </FormikProvider>
            </ScrollView>
        </View>
    )
};

export default CreateForms