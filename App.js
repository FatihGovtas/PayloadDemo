import { View, Text } from 'react-native'
import React from 'react'
import Router from './src/Router'
import { Provider } from 'mobx-react'
import MainStore from './src/store/MainStore'

const App = () => {
  return (
    <Provider MainStore={MainStore}><Router /></Provider>
  )
}

export default App