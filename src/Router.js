import "react-native-gesture-handler"
import { StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "./screens/Login"
import Forgot from "./screens/Forgot"
import Categories from "./screens/Categories"
import Media from "./screens/Media"
import Posts from "./screens/Posts"
import Pages from "./screens/Pages"
import Forms from "./screens/Forms"
import Users from "./screens/Users"
import Alerts from "./screens/Alerts"
import FormSubmissions from "./screens/FormSubmissions"
import MainMenu from "./screens/MainMenu"
import Anasayfa from "./screens/Anasayfa"
import Profile from "./screens/Profile"
import Header from "./component/Header"
import CustomDrawerContent from "./component/CustomDrawerContent"
import { PaperProvider } from 'react-native-paper';
import darkTheme from "./styles/darkTheme"
import CreateCategories from "./screens/CreateCategories"
import CreateUsers from "./screens/CreateUsers"
import CreatePosts from "./screens/CreatePosts"
import CreateAlerts from "./screens/CreateAlerts"
import CreatePages from "./screens/CreatePages"
import CreateForms from "./screens/CreateForms"

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default class Router extends Component {

    MyDrawer = () => {
        return (
            <Drawer.Navigator
                drawerContent={({ navigation }) => <CustomDrawerContent navigation={navigation} />}
                screenOptions={{
                    headerShown: true,
                    drawerStyle: styles.drawerStyle,
                    overlayColor: 'transparent',
                    drawerPosition: 'right',
                    drawerType: 'front',
                    swipeEdgeWidth: 0,
                    drawerItemStyle: { marginVertical: 0 },
                    headerTintColor: 'white',
                    unmountOnBlur: true,// bileşenin önbellekte saklanmasını engeller
                    header: ({ navigation }) => <Header navigation={navigation} />,

                }}>
                <Drawer.Screen name="Ana Sayfa" component={Anasayfa} />
                <Drawer.Screen name="Categories" component={Categories} />
                <Drawer.Screen name="Media" component={Media} />
                <Drawer.Screen name="Posts" component={Posts} />
                <Drawer.Screen name="Pages" component={Pages} />
                <Drawer.Screen name="Forms" component={Forms} />
                <Drawer.Screen name="Users" component={Users} />
                <Drawer.Screen name="Alerts" component={Alerts} />
                <Drawer.Screen name="Form Submissions" component={FormSubmissions} />
                <Drawer.Screen name="Main Menu" component={MainMenu} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="CreateCategories" component={CreateCategories} />
                <Drawer.Screen name="CreateUsers" component={CreateUsers} />
                <Drawer.Screen name="CreatePosts" component={CreatePosts} />
                <Drawer.Screen name="CreateAlerts" component={CreateAlerts} />
                <Drawer.Screen name="CreatePages" component={CreatePages} />
                <Drawer.Screen name="CreateForms" component={CreateForms} />
            </Drawer.Navigator>
        )
    }


    render() {
        return (
            <PaperProvider theme={darkTheme}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Forgot" component={Forgot} />
                        <Stack.Screen name="Drawer" component={this.MyDrawer} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        marginTop: 60,
        flex: 1,
    },
});