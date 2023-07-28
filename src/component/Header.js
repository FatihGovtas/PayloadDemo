import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons'

const Header = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: '#141414', paddingHorizontal: 15, paddingTop: 10, height:90 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Ana Sayfa')}>
                    <IconMa name="inbox" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IconMa name="menu" size={40} color="white" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ color: 'white', }}>Ana Sayfa</Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})