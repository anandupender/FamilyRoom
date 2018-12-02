import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Card } from "react-native-elements";

import AppContainer from './App/Navigation/StackNavigation'

const { width } = Dimensions.get('window');
const height = width * 0.8;

export default class App extends React.Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}
