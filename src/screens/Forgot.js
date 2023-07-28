import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Forgot = ({navigation}) => {

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.forgot_form}>
                <View style={{ marginBottom: 25 }}>
                    <Text style={styles.title}>Parolamı Unuttum</Text>
                </View>
                <View>
                    <Text style={[styles.input_label, { marginBottom: 25 }]}>Lütfen e-posta adresinizi aşağıdaki alana girin. Parolanızı nasıl sıfırlayacağınızı gösteren bir e-posta adresi alacaksınız.</Text>
                </View>
                <View>
                    <Text style={styles.input_label}>E-posta adresi <Text style={styles.error_color}>*</Text></Text>
                    <TextInput style={styles.input_item}></TextInput>
                    <TouchableOpacity style={styles.gonder_button} onPress={() => { }}>
                        <Text style={styles.login_button_text}>Gönder</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                    <Text style={styles.text_style}>Giriş ekranına geri dön</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#141414',
        flex: 1,
        justifyContent: 'center',
    },
    text_style: {
        color: 'white',
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    forgot_form: {
        marginHorizontal: 25,
    },
    input_label: {
        color: 'white',
        marginBottom: 10,
    },
    input_item: {
        backgroundColor: '#222222',
        marginBottom: 40,
        borderColor: '#B9D9EA',
        borderWidth: 0.2,
        color: 'white',
    },
    gonder_button: {
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    login_button_text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },
    error_color: {
        color: '#ff6f76'
    }
});

export default Forgot