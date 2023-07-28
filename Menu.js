import { MultipleSelectList } from 'react-native-dropdown-select-list'

import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import darkTheme from './src/styles/darkTheme'

const Menu = () => {
  const [selected, setSelected] = useState("")

  const data = [
    { key: '1', value: 'Mobiles', },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]

  return (
    <PaperProvider theme={darkTheme}>
      <MultipleSelectList
        placeholder='Sütunlar'
        searchPlaceholder='Ara'
        boxStyles={{ backgroundColor: '#333333', width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
        inputStyles={{ color: 'white' }}
        dropdownStyles={{ backgroundColor: '#333333', }}
        dropdownTextStyles={{ color: 'white' }}
        badgeTextStyles={{}}
        checkBoxStyles={{ backgroundColor: 'white', }}
        labelStyles={{ color: 'white' }}
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        onSelect={() => { }}
        label="Categories"
      />
    </PaperProvider>

  )
}

export default Menu