import { View, Text } from 'react-native'
import React from 'react'
import Router from './src/Router'
import { Provider } from 'mobx-react'
import MainStore from './src/store/MainStore'
import SecondStore from './src/store/SecondStore'

const App = () => {
  return (
    <Provider MainStore={MainStore} SecondStore={SecondStore}><Router /></Provider>
  )
}

export default App