import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';
import styles from '../styles/pageStyles';
import { theme } from '../styles/theme';
import ApiConfig, { JsonData, PageUrl } from '../config/ApiConfig';

const CreateCategories = ({ navigation, isModal }) => {

    const [title, setTitle] = useState('');
    const [isArchived, setIsArchived] = useState(false);

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const handleCheckboxChange = () => {
        setIsArchived((prevIsArchived) => !prevIsArchived);
    };

    const handleSave = () => {
        const sendData = JsonData.categoriesData;
        sendData.name = title;
        sendData.archived = isArchived;
        ApiConfig.sendDataToPayload(PageUrl.Categories, sendData);
        if (!isModal) {
            navigation.navigate('Categories');
        } else {
            ApiConfig.getSecondData(PageUrl.Categories);
        }
    };

    return (
        <View style={{ paddingHorizontal: 15, backgroundColor: theme.colors.background, flex: 1, justifyContent: 'space-between' }}>
            <View>
                <Text style={styles.title_style}>{(isModal) ? "Yeni Category" : (title == "") ? "[Başlıksız]" : title}</Text>
                <View style={{ marginVertical: 20 }}>
                    <Text style={[styles.table_title, { marginBottom: 10 }]}>Name</Text>
                    <TextInput
                        style={[styles.input_style, { borderWidth: 1, borderColor: 'gray' }]}
                        value={title}
                        onChangeText={handleTitleChange}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox.Android
                        color={theme.colors.text}
                        status={isArchived ? 'checked' : 'unchecked'}
                        onPress={handleCheckboxChange}
                    />
                    <Text style={styles.table_title}>Archived</Text>
                </View>
                <Text style={{ color: 'gray', marginLeft: 10 }}>Archiving filters it being an option in the posts collection</Text>
                <Divider style={{ marginVertical: 30 }}></Divider>
            </View>
            <TouchableOpacity style={{
                backgroundColor: theme.colors.text,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 100,
                borderRadius: 5,
                marginBottom: 25
            }} onPress={handleSave}>
                <Text style={{ color: theme.colors.secondary }}>Kaydet</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateCategories