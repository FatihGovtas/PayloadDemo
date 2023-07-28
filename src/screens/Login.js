import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Linking, StatusBar, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const Login = async () => {

        try {
            const response = await fetch('https://demo.payloadcms.com/api/' + 'users/login', {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.status == 200) {   // 200 => Giriş Başarılı
                const data = await response.json();
                console.log(data)
                AsyncStorage.setItem('token', data.token);
                console.log(AsyncStorage.getItem('token'))
                setEmail('')
                setPassword('')
                Alert.alert('Uyarı', 'Giriş Başarılı');
                navigation.navigate('Drawer');

            } else {
                Alert.alert('HATA', 'Email veya Parola hatalı!');
            }
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {

        const retrieveToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); // Token'ı asenkron olarak alın

                if (token) {
                    console.log(token);
                    navigation.navigate('Drawer');
                } else {
                    // Token yoksa, kullanıcının oturumu açık değilse, giriş sayfasına yönlendirme yapabilirsiniz.
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error("Token alınırken bir hata oluştu:", error);
                // Hata durumuna göre yönlendirme yapabilir veya hata mesajları gösterebilirsiniz.
            }
        };

        retrieveToken();
    }, []);



    GoUrl = () => {
        return (
            <TouchableOpacity onPress={() => {
                Linking.openURL("https://github.com/payloadcms/public-demo");
            }}>
                <Text style={{ textDecorationLine: 'underline', color: 'white' }}>here</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content"></StatusBar>
            <View style={styles.form}>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <Text style={styles.title}>Payload</Text>
                </View>
                <View>
                    <Text style={styles.text_style}>To log in, use the email <Text style={{ fontWeight: '700' }}>demo@payloadcms.com</Text> with the password <Text style={{ fontWeight: '700' }}>demo</Text>. This demo CMS will reset every hour.</Text>
                    <Text style={styles.text_style}>The code for this demo is open source and can be found <GoUrl />.</Text>
                </View>
                <View>
                    <Text style={styles.input_label}>E-posta <Text style={styles.error_color}>*</Text></Text>
                    <TextInput
                        value={email}
                        onChangeText={text => setEmail(text)}
                        returnKeyType='next'
                        style={styles.input_item} />
                    <Text style={styles.input_label}>Parola <Text style={styles.error_color}>*</Text></Text>
                    <TextInput
                        value={password}
                        onChangeText={text => setPassword(text)}
                        returnKeyType='go'
                        secureTextEntry={true}
                        style={styles.input_item} />
                    <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                        <Text style={[styles.text_style, { textDecorationLine: 'underline' }]}>Parolanızı mı unuttunuz?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.login_button} onPress={Login}>
                        <Text style={styles.login_button_text}>Giriş</Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom: 30,
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    form: {
        marginHorizontal: 25,
    },
    input_label: {
        color: 'white',
        marginBottom: 10,
    },
    input_item: {
        backgroundColor: '#222222',
        marginBottom: 25,
        borderColor: '#B9D9EA',
        borderWidth: 0.2,
        color: 'white',
    },
    login_button: {
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
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

export default Login