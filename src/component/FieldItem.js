import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/pageStyles';
import Icon from 'react-native-vector-icons/FontAwesome5'

const FieldItem = ({ item }) => {

    const formik = useFormikContext();
    const index = formik.values.fields.indexOf(item);

    const removeField = () => {
        const currentFields = formik.values.fields;
        const updatedFields = currentFields.filter((_, i) => i !== index);

        formik.setFieldValue('fields', updatedFields);
    }

    return (
        <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'center', }}>
                <Text style={[styles.table_title, { fontSize: 16, fontWeight: 'bold' }]}>Text</Text>
                <TouchableOpacity onPress={removeField}>
                    <Icon name="trash" size={16} color="white" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[styles.table_title, { marginBottom: 10 }]}>Name</Text>
                <TextInput
                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                    value={formik.values.fields[index].name}
                    onChangeText={(text) => {
                        const updatedFields = [...formik.values.fields];
                        updatedFields[index] = { ...item, name: text };
                        formik.setFieldValue('fields', updatedFields);
                    }}
                    onBlur={formik.handleBlur('name')}
                />
                {formik.touched.fields?.[index]?.name && formik.errors.fields?.[index]?.name && <Text style={{ color: 'red', fontSize: 10 }}>{formik.errors.fields[index].name}</Text>}
                <Text style={[styles.table_title, { marginBottom: 10 }]}>Label</Text>
                <TextInput
                    style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                    value={formik.values.fields[index].label}
                    onChangeText={(text) => {
                        const updatedFields = [...formik.values.fields];
                        updatedFields[index] = { ...item, label: text };
                        formik.setFieldValue('fields', updatedFields);
                    }}
                    onBlur={formik.handleBlur('label')}
                />
                {formik.touched.fields?.[index]?.label && formik.errors.fields?.[index]?.label && <Text style={{ color: 'red', fontSize: 10 }}>{formik.errors.fields[index].label}</Text>}
            </View>
        </View>
    )
}

export default FieldItem