import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react'
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataTable, Checkbox } from 'react-native-paper';
import ApiConfig, { PageEnum, PageUrl } from '../config/ApiConfig';
import { observer, inject } from 'mobx-react';


const Users = inject("MainStore")(observer(({ MainStore, navigation }) => {

  const itemsPerPage = 4; // Her sayfada gösterilecek öğe sayısı

  useEffect(() => {
    ApiConfig.getUser(navigation);
    ApiConfig.getData(PageUrl.Users);
  }, []);

  const handleCheckboxToggle = (itemId) => {
    // Öğeyi seçme veya seçimi kaldırma işlemini gerçekleştirir.
    if (MainStore.selectedItems.includes(itemId)) {
      MainStore.setSelectedItems(MainStore.selectedItems.filter((id) => id !== itemId));
    } else {
      MainStore.setSelectedItems([...MainStore.selectedItems, itemId]);
    }
  };
  const handleSelectAllToggle = () => {
    if (MainStore.selectAll) {
      MainStore.setSelectedItems([]);
    } else {
      const allItemIds = MainStore.data.map((item) => item.id);
      MainStore.setSelectedItems(allItemIds);
    }
    MainStore.setSelectAll(!MainStore.selectAll);
  };


  // Verileri sıralamak için bir işlev
  const sortData = (field) => {
    if (field === MainStore.sortedField) {
      // Eğer mevcut sıralama alanı zaten seçilmişse, sıralama yönünü değiştirin.
      const sortAscending = MainStore.sortAscending;
      MainStore.setSortAscending(!sortAscending);
    } else {
      MainStore.setSortedField(field);
      MainStore.setSortAscending(true);
    }
  };

  // Sıralamaya göre ve arama sorgusuna göre verileri filtreleme
  const filteredData = MainStore.data.filter((item) => item.email.toLowerCase().includes(MainStore.searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (MainStore.sortedField) {
      const aValue = a[MainStore.sortedField];
      const bValue = b[MainStore.sortedField];

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return MainStore.sortAscending ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return MainStore.sortAscending ? aValue - bValue : bValue - aValue;
      } else {
        return MainStore.sortAscending
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    }
    return 0;
  });

  // Sayfalama işlevi
  const handlePageChange = (page) => {
    MainStore.setPage(page);
  };

  onRefresh = () => {
    MainStore.setIsRefresh(true)
    ApiConfig.getData(PageUrl.Users);
  }


  return (
    <View style={{ paddingHorizontal: 15, backgroundColor: theme.colors.background, flex: 1 }}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={MainStore.isRefresh} onRefresh={onRefresh} />
      }>
        <View style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', }}>
          <Text style={styles.title_style}>Users</Text>
          <TouchableOpacity style={styles.button_style}>
            <Text style={[styles.title_style, { fontSize: theme.fontSizes.small }]}>Yeni Oluştur</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Şuna göre sırala: E-posta"
            placeholderTextColor={theme.colors.text}
            value={MainStore.searchQuery}
            onChangeText={(query) => MainStore.setSearchQuery(query)}
          />
        </View>

        <ScrollView horizontal style={styles.container}>
          <DataTable style={{ width: 700 }}>
            <DataTable.Header style={styles.table_title}>
              <DataTable.Title style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox.Android
                  color={theme.colors.text}
                  status={MainStore.selectAll ? 'checked' : 'unchecked'}
                  onPress={handleSelectAllToggle}
                />
              </DataTable.Title>
              <DataTable.Title onPress={() => sortData('email')} sortDirection={MainStore.sortedField === 'email' ? (MainStore.sortAscending ? 'ascending' : 'descending') : 'none'}>
                E-posta
              </DataTable.Title>
              <DataTable.Title onPress={() => sortData('id')} sortDirection={MainStore.sortedField === 'id' ? (MainStore.sortAscending ? 'ascending' : 'descending') : 'none'}>
                ID
              </DataTable.Title>
              <DataTable.Title onPress={() => sortData('name')} sortDirection={MainStore.sortedField === 'name' ? (MainStore.sortAscending ? 'ascending' : 'descending') : 'none'}>
                Name
              </DataTable.Title>
            </DataTable.Header>

            {filteredData.slice(MainStore.page * itemsPerPage, (MainStore.page + 1) * itemsPerPage).map((item) => (
              <DataTable.Row key={item.id} style={{ justifyContent: 'center' }}>
                <DataTable.Cell style={{ flex: 0.3 }}>
                  <Checkbox.Android
                    color={theme.colors.text}
                    status={MainStore.selectedItems.includes(item.id) ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxToggle(item.id)}
                  />
                </DataTable.Cell>
                <DataTable.Cell>{item.email}</DataTable.Cell>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>



        {/* Sayfalama */}
        <DataTable.Pagination
          page={MainStore.page}
          numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={(page) => handlePageChange(page)}
          label={`${MainStore.page + 1} / ${Math.ceil(filteredData.length / itemsPerPage)}`}
        />


        {(MainStore.selectedItems.length != 0) ?
          <View>
            <Text style={[styles.title_style, { fontSize: theme.fontSizes.small, marginLeft: 20, marginBottom: 15 }]}>{MainStore.selectedItems.length} Categories seçildi</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button_style}>
                <Text style={[styles.title_style, { fontSize: theme.fontSizes.small }]}>Düzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_style} onPress={() => {
                ApiConfig.deleteAlert(MainStore.selectedItems, PageUrl.Users, PageEnum.Users);
              }}>
                <Text style={[styles.title_style, { fontSize: theme.fontSizes.small }]}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View> : null
        }

      </ScrollView>
    </View>
  )
}));

export default Users

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
    color: theme.colors.text,
  },
  container: {
    backgroundColor: theme.colors.itemBackground, // Gri arka plan rengi
    padding: 10,
  },
  table_title: {
    color: theme.colors.text,
  },
})