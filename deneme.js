import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {
    DataTable, MD3LightTheme as DefaultTheme,
    PaperProvider, useTheme, MD3DarkTheme
} from 'react-native-paper';
import { theme } from './src/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import darkTheme from './src/styles/darkTheme';
const data = [
    { id: '1', name: 'Öğe 1', description: 'Bu bir açıklama 1' },
    { id: '2', name: 'Öğe 2', description: 'Bu bir açıklama 2' },
    { id: '3', name: 'Öğe 3', description: 'Bu bir açıklama 3' },
    // Diğer veriler
];

const DataTableWithSortingPaginationAndSearch = () => {
    const [sortedField, setSortedField] = useState(null);
    const [sortAscending, setSortAscending] = useState(true);
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 2; // Her sayfada gösterilecek öğe sayısı

    // Verileri sıralamak için bir işlev
    const sortData = (field) => {
        if (field === sortedField) {
            // Eğer mevcut sıralama alanı zaten seçilmişse, sıralama yönünü değiştirin.
            setSortAscending((prev) => !prev);
        } else {
            setSortedField(field);
            setSortAscending(true);
        }
    };

    // Sıralamaya göre ve arama sorgusuna göre verileri filtreleme
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortedField) {
            const aValue = a[sortedField].toLowerCase();
            const bValue = b[sortedField].toLowerCase();
            return sortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
    });

    // Sayfalama işlevi
    const handlePageChange = (page) => {
        setPage(page);
    };


    return (
        <PaperProvider theme={darkTheme}>
            <View style={{ paddingHorizontal: 15, backgroundColor: darkTheme.colors.background, flex: 1 }}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', }}>
                        <Text style={styles.title_style}>Categories</Text>
                        <TouchableOpacity style={styles.button_style}>
                            <Text style={[styles.title_style, { fontSize: theme.fontSizes.small }]}>Yeni Oluştur</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchBar}>
                        <Icon name="search" size={20} color="white" style={styles.searchIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Şuna göre sırala: Name"
                            placeholderTextColor={theme.colors.text}
                            value={searchQuery}
                            onChangeText={(query) => setSearchQuery(query)}
                        // Diğer TextInput özelliklerini ekleyebilirsiniz
                        />
                    </View>

                    <View style={styles.container}>
                        <DataTable>
                            <DataTable.Header style={styles.table_title}>
                                <DataTable.Title
                                    textStyle={styles.table_title}
                                    style={styles.table_title}

                                    onPress={() => sortData('name')}
                                    sortDirection={sortedField === 'name' ? (sortAscending ? 'ascending' : 'descending') : 'none'}>
                                    Ad
                                </DataTable.Title>
                                <DataTable.Title onPress={() => sortData('description')} sortDirection={sortedField === 'description' ? (sortAscending ? 'ascending' : 'descending') : 'none'}>
                                    Açıklama
                                </DataTable.Title>
                            </DataTable.Header>

                            {filteredData.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item) => (
                                <DataTable.Row key={item.id}>
                                    <DataTable.Cell textStyle={styles.table_title} style={styles.table_title}>{item.name}</DataTable.Cell>
                                    <DataTable.Cell>{item.description}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>



                    {/* Sayfalama */}
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
                        onPageChange={(page) => handlePageChange(page)}
                        label={`${page + 1} / ${Math.ceil(filteredData.length / itemsPerPage)}`}
                    />
                </ScrollView>
            </View>
        </PaperProvider>

    );
};

export default DataTableWithSortingPaginationAndSearch;

const styles = StyleSheet.create({
    title_style: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.large,
    },
    button_style: {
        color: theme.colors.text,
        backgroundColor: theme.colors.itemBackground,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        marginLeft: 15,
        height: 30,
    },
    input_style: {
        padding: 8,
        marginBottom: 8,
        height: 50,
        color: theme.colors.text,
        backgroundColor: theme.colors.itemBackground,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.itemBackground,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        height: 50,
    },
    container: {
        backgroundColor: theme.colors.itemBackground, // Gri arka plan rengi
        padding: 10,
    },
    table_title: {
        color: theme.colors.text,
    },
})
