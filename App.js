import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import AddNewContact from './screens/AddNewContact';
import ViewContact from './screens/ViewContact';
import EditContact from './screens/EditContact';

import * as firebase from 'firebase';

import {SECRET_firebaseConfig} from './config';

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen},
    Add: { screen: AddNewContact},
    View: { screen: ViewContact},
    Edit: { screen: EditContact},
  },
  {
    defaultNavigationOptions: {
      headerTintColor:"#fff",
      headerStyle: {
        backgroundColor: "#74B9FF"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
firebase.initializeApp(SECRET_firebaseConfig);

export default App;
