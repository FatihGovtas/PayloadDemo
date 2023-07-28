import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import DrawerList from './DrawerList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconSi from 'react-native-vector-icons/SimpleLineIcons'
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomDrawerContent = ({ navigation }) => {
    const contentData = ['Categories', 'Media', 'Posts', 'Pages', 'Forms'];
    const adminData = ['Users', 'Alerts', 'Form Submissions', 'Main Menu'];



    const Logout = async () => {

        try {
            const response = await fetch('https://demo.payloadcms.com/api/' + 'users/logout', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const data = await response.json();
            console.log(data.message)
            await AsyncStorage.removeItem("token");
            navigation.navigate('Login');
            Alert.alert('Çıkış Başarılı');

        } catch (error) {
            console.log(error)
        }

    };






    return (
        <View style={styles.drawerContainer}>
            <View>
                <DrawerList title={"Content"} data={contentData} />
                <DrawerList title={"Admin"} data={adminData} />

            </View>
            <View style={{ justifyContent: 'space-between', }}>
                <TouchableOpacity style={styles.icon_style} onPress={() => navigation.navigate('Profile')}>
                    <IconMa name="account-circle" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon_style} onPress={Logout}>
                    <IconSi name="logout" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#141414',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    icon_style: {
        height: 30,
        width: 50,
        marginBottom: 20,
    },
})