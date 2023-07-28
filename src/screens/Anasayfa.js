import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect } from 'react'
import CustomList from '../component/CustomList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Anasayfa = ({ navigation }) => {

    const contentData = ['Categories', 'Media', 'Posts', 'Pages', 'Forms'];
    const adminData = ['Users', 'Alerts', 'Form Submissions', 'Main Menu'];


    const getUser = async () => {
        const url = `https://demo.payloadcms.com/api/users/me`;
        axios.get(url).then(async (res) => {
            console.log(res.data.user)
            if (res.data.user == null) {
                await AsyncStorage.removeItem("token");
                navigation.navigate('Login');
                Alert.alert('No user');
            }
        })
            .catch((e) => {
                console.log(e)
                Alert.alert(e)
            })
    };


    useEffect(() => {
        getUser();
    }, [])


    return (
        <View style={styles.main}>
            <ScrollView style={{ padding: 10, flex: 1 }}>
                <CustomList title={"Content"} data={contentData} />
                <CustomList title={"Admin"} data={adminData} />
                <View style={styles.divide} />
                <View style={{ paddingBottom: 30 }}>
                    <Text style={[styles.title_style, { fontSize: 20 }]}>Join our Discord</Text>
                    <Text style={styles.text_style}>Every day, developers are actively talking about Payload and helping each other build awesome things in our Discord community. It can be a great resource to learn about what's happening with Payload before anyone else and get quick help straight from the Payload team as well as our community. Click here to join!</Text>
                    <Text style={[styles.title_style, { fontSize: 20 }]}>GraphQL Playground</Text>
                    <Text style={styles.text_style}>Did you know that Payload gives you a complete GraphQL server too? Try the GraphQL playground for this demo.</Text>
                    <Text style={[styles.title_style, { fontSize: 20 }]}>Talk with us</Text>
                    <Text style={styles.text_style}>We're here to help! You can email us with any questions.</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Anasayfa

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#141414',
        flex: 1,
    },

    title_style: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    text_style: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    divide: {
        height: 1,
        backgroundColor: '#222222',
        marginVertical: 30,
    }
})