import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Checkbox, Divider } from 'react-native-paper';
import styles from '../styles/pageStyles';
import { theme } from '../styles/theme';
import ApiConfig, { JsonData, PageUrl, cmsUrl } from '../config/ApiConfig';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MainStore from '../store/MainStore';

const CreateUsers = ({ navigation }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(MainStore.data);
    }, [])

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Geçerli bir e-posta adresi giriniz')
            .required('E-posta alanı zorunludur')
            .test('is-email-exist', 'Bu e-posta zaten sistemde kayıtlı', function (value) {
                return !isEmailExist(value);
            }),
        password: Yup.string().min(3, 'Parola en az 3 karakter olmalı').required('Parola alanı zorunludur'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Parolalar eşleşmiyor') // Eşleşme kontrolü
            .required('Parolayı onaylayın'),
    });

    const isEmailExist = (value) => {
        const isExist = users.some((user) => user.email === value);
        return isExist;
    };

    const handleCheckboxChange = (values, setFieldValue) => {
        setFieldValue('enableAPIKey', !values.enableAPIKey);
    };

    const handleSave = (values) => {
        const { email, password, name, enableAPIKey } = values;

        const sendData = JsonData.userData;
        sendData.name = name;
        sendData.email = email;
        sendData.password = password;
        sendData.enableAPIKey = enableAPIKey;
        ApiConfig.sendDataToPayload(PageUrl.Users, sendData);
        navigation.navigate('Users');
    };

    return (
        <View style={{ paddingHorizontal: 15, backgroundColor: theme.colors.background, flex: 1, justifyContent: 'space-between' }}>
            <ScrollView>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        enableAPIKey: false,
                        name: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                        <View>
                            <Text style={styles.title_style}>{values.email === '' ? '[Başlıksız]' : values.email}</Text>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>E-posta</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {touched.email && errors.email && <Text style={{ color: 'red', fontSize: 10 }}>{errors.email}</Text>}
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Yeni Parola</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.password}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                {touched.password && errors.password && <Text style={{ color: 'red', fontSize: 10 }}>{errors.password}</Text>}
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Parolayı Onayla</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.confirmPassword}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={{ color: 'red', fontSize: 10 }}>{errors.confirmPassword}</Text>
                                )}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox.Android
                                    color={theme.colors.text}
                                    status={values.enableAPIKey ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange(values, setFieldValue)}
                                />
                                <Text style={styles.table_title}>Api anahtarını etkinleştir</Text>
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={[styles.table_title, { marginBottom: 10 }]}>Name</Text>
                                <TextInput
                                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                                {touched.name && errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
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
    );
}

export default CreateUsers
