import axios from "axios";
import { Alert } from "react-native";
import MainStore from "../store/MainStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecondStore from "../store/SecondStore";


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

const JsonData = {
    categoriesData: {
        name: '',
        archived: false,
    },
    userData: {
        name: '',
        email: '',
        password: '',
        enableAPIKey: false
    },
    postsData: {
        title: '',
        category: [],
        layout: [
            {
                columns: [
                    {
                        richText: [
                            {
                                children: [
                                    {
                                        text: ''
                                    }
                                ]
                            }
                        ]
                    }
                ],
                blockType: "content"
            }
        ],
    },
    alertsData: {
        name: '',
        placement: 'global',// global, documents
        content: [
            {
                children: [
                    {
                        text: ''
                    }
                ]
            }
        ]
    },
    pagesData: {
        title: '',
        hero: {
            basic: {
                richText: [
                    {
                        children: [
                            {
                                text: ''
                            }
                        ]
                    }
                ]
            }
        },
        layout: [
            {
                columns: [
                    {
                        richText: [
                            {
                                children: [
                                    {
                                        text: ''
                                    }
                                ]
                            }
                        ]
                    }
                ],
                blockType: "content"
            }
        ],
    },
    formsData: {
        title: '',
        submitButtonLabel: '',
        fields: [],
        confirmationMessage: [
            {
                children: [
                    {
                        text: ''
                    }
                ]
            }
        ]
    }

};



class ApiConfig {


    getData = async (PageUrl) => {
        axios.get(cmsUrl + PageUrl).then((res) => {
            MainStore.setData(res.data.docs);//store daki datayı set et
            MainStore.setProps();
            console.log(MainStore.data)
        })
            .catch((e) => {
                console.log(e)
            })
    }

    getSecondData = async (PageUrl) => {
        axios.get(cmsUrl + PageUrl).then((res) => {
            SecondStore.setData(res.data.docs);//store daki datayı set et
            console.log(SecondStore.data)
        })
            .catch((e) => {
                console.log(e)
            })
    }

    sendDataToPayload = async (pageUrl, dataToSend) => {
        try {
            const response = await axios.post(cmsUrl + pageUrl, dataToSend);

            if (response.status === 201) {
                console.log('Veri başarıyla gönderildi!');
                console.log('Sunucu tarafından dönen veri:', response.data);
            } else {
                console.log('Veri gönderirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Hata:', error.message);
        }
    };


    newData = async (PageUrl, page) => {
        try {
            const response = await axios.post(cmsUrl + PageUrl);
            console.log(response.data);
            Alert.alert(`1 ${page} eklendi`);

        } catch (error) {
            console.log(error)
            Alert.alert('Hata', 'Ekleme işlemi sırasında bir hata oluştu.');
        }
    }

    updateData = async (idList, PageUrl, page) => {
        try {
            for (let index = 0; index < idList.length; index++) {
                const id = idList[index];
                const response = await axios.post(cmsUrl + PageUrl + id);
                console.log(response.data);
            }//burda set et
            Alert.alert(`${idList.length} ${page} update edildi`);

        } catch (error) {
            console.log(error)
            Alert.alert('Hata', 'Update işlemi sırasında bir hata oluştu.');
        }
    }

    deleteData = async (idList, PageUrl, page) => {
        try {
            for (let index = 0; index < idList.length; index++) {
                const id = idList[index];
                const response = await axios.delete(cmsUrl + PageUrl + id);
                console.log(response.data);
            }//burda set et
            //MainStore.setProps();
            this.getData(PageUrl);
            Alert.alert(`${idList.length} ${page} silindi`);
        } catch (error) {
            console.log(error);
            Alert.alert('Hata', 'Silme işlemi sırasında bir hata oluştu.');
        }
    };



    getUser = async (navigation) => {
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


    deleteAlert = (idList, pageUrl, page) => {
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
                    onPress: () => this.deleteData(idList, pageUrl, page),
                },
            ],
            { cancelable: false }
        );
    };


}

export { cmsUrl, PageEnum, PageUrl, JsonData }
export default new ApiConfig();