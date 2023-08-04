import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { theme } from '../styles/theme'
import { observer, inject } from 'mobx-react';
import CreateCategories from '../screens/CreateCategories';
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons'

const DropdownMenu = inject("SecondStore")(observer(({ SecondStore, navigation }) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
  }, [])


  return (
    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
      <DropDownPicker
        multiple={true}
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        items={SecondStore.data}
        //setItems={setItems}
        schema={{
          label: 'name',
          value: 'id'
        }}
        theme={DropDownPicker.setTheme("DARK")}
        placeholder='Bir değer seçin'
        listMode="SCROLLVIEW"
        style={{ backgroundColor: theme.colors.itemBackground, borderRadius: 0, borderColor: 'gray' }}
        containerStyle={{ flex: 1, marginRight: 0 }}
        dropDownStyle={{ backgroundColor: 'white' }}
        textStyle={{ color: theme.colors.text }}
        onChangeValue={(value) => {
          console.log(value);
          SecondStore.setValue(value);
        }}
      >
      </DropDownPicker>
      <TouchableOpacity style={{ backgroundColor: theme.colors.itemBackground, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: 1 }} onPress={handleSave}>
        <Text style={{ color: 'white' }}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal animationType='slide' transparent={true} visible={showModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background, paddingVertical: 20 }}>
          <View>
            <CreateCategories isModal={true}></CreateCategories>
            <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 0, right: 10 }}>
              <IconMa name="close" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  )
}));

export default DropdownMenu

const styles = StyleSheet.create({})