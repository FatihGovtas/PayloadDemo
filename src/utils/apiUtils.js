import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cmsUrl = "https://demo.payloadcms.com/api/";
const PageUrl = {
    Categories: 'categories/',
    Media: 'media/',
    Posts: 'posts/',
    Pages: 'pages/',
    Forms: 'forms/',
    Users: 'users/',
    Alerts: 'alerts/',
    FormSubmissions: 'form-submissions/',
    MainMenu: 'main-menu/',
};
const PageEnum = {
    Categories: 'Categories',
    Media: 'Media',
    Posts: 'Posts',
    Pages: 'Pages',
    Forms: 'Forms',
    Users: 'Users',
    Alerts: 'Alerts',
    FormSubmissions: 'Form Submissions',
    MainMenu: 'Main Menu',
};

/*const getUser = async (navigation) => {
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
};*/

const getUser = async (navigation) => {
    const url = `https://demo.payloadcms.com/api/users/me`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.user === null) {
        await AsyncStorage.removeItem("token");
        navigation.navigate('Login');
        Alert.alert('No user');
      } else {
        console.log(data.user);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Bir hata oluştu.');
    }
  };
  



const deleteItem = async (idList, pageUrl, page) => {
    try {
        for (let index = 0; index < idList.length; index++) {
            const id = idList[index];
            const response = await axios.delete(cmsUrl + pageUrl + id);
            console.log(response.data);
        }//burda set et
        Alert.alert(`${idList.length} ${page} silindi`);
    } catch (error) {
        console.log(error);
        Alert.alert('Hata', 'Silme işlemi sırasında bir hata oluştu.');
    }
};



const deleteAlert = (idList, pageUrl, page) => {
    Alert.alert(
        'Silmeyi Onayla',
        idList.length + " " + page + ' silmek üzeresiniz',
        [
            {
                text: 'İptal',
                style: 'cancel',
            },
            {
                text: 'Onayla',
                onPress: () => deleteItem(idList, pageUrl, page),
            },
        ],
        { cancelable: false }
    );
};


export { getUser, cmsUrl, PageEnum, PageUrl, deleteItem, deleteAlert };