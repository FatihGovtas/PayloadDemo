import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react'
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DataTable, Checkbox } from 'react-native-paper';
import axios from 'axios';

const PageComponent = ({pageName, itemsPerPage}) => {
  return (
    <View>
      <Text>PageComponent</Text>
    </View>
  )
}

export default PageComponent

const styles = StyleSheet.create({})