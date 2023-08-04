import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome'

const ExampleDropdown = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SelectDropdown
        data={countries}
        buttonStyle={{ backgroundColor: '#222222', borderRadius: 5, paddingLeft:20 }}
        renderDropdownIcon={() => {
          return <Icon name="angle-down" size={25} color="white" />
        }}
        buttonTextStyle={{ color: 'white' }}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          setSelectedItem(selectedItem);
        }}
        dropdownIconPosition='right'
        dropdownStyle={{backgroundColor:'#444444', borderRadius:5}}
        rowStyle={{}}
        defaultButtonText='Categories'
        rowTextStyle={{color:'white'}}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
    </View>
  );
};

export default ExampleDropdown;
